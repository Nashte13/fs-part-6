import { useEffect } from 'react';
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Filter from './components/Filter';
import { useAnecdoteStore } from './store';
import anecdoteService from './services/anecdotes'

const App = () => {
  const setAnecdotes = useAnecdoteStore((state) => state.actions.setAnecdotes)

  useEffect(() => {
    anecdoteService.getAll()
      .then((data) => setAnecdotes(data))
      .catch((error) => {
        console.error('Error fetching anecdotes:', error)
      })
  }, [setAnecdotes])

  return (
    <div>
      <h1>Anecdote Voting</h1>
      <Filter />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default App;