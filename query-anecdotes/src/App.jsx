import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAnecdotes, createAnecdote, updateVotes} from './requests'

import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'

const App = () => {
  const queryClient = useQueryClient()

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData({ queryKey: ['anecdotes'] })
      queryClient.setQueryData(['anecdotes'], anecdotes.concat(newAnecdote))
    }
  })

  const updateVotesMutation = useMutation({
    mutationsFn: updateVotes,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    }
  })

  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.reset()
    newAnecdoteMutation.mutate({ content, votes: 0})
  }

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    refetchOnWindowFocus: false,
  })

  console.log(JSON.parse(JSON.stringify(result)))

  if (result.isPending) {
    return <div>loading data...</div>
  }

  const anecdotes = result.data

   const handleVote = (anecdote) => {
     console.log("vote");
     updateVotesMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 })
   };

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default App