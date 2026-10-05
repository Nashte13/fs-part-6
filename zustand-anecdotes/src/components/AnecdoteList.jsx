import { useAnecdoteStore } from '../store'
import {useNotificationStore} from '../notificationStore'
import { Button } from '@mui/material'

const AnecdoteList = () => {
    const {anecdotes, actions, filter} = useAnecdoteStore()

    //apply filter
    const query = (filter ?? '').toLowerCase()

    const filtered = anecdotes.filter(
        a =>
            a &&
            typeof a.content === 'string' &&
            a.content.toLowerCase().includes(query)
    )

  
    //sort by votes descending
    const sorted = filtered.toSorted((a, b) => b.votes - a.votes)

    const showNotification = useNotificationStore(
      (state) => state.actions.showNotification,
    );

    const handleVote = async (anecdote) => {
        await actions.vote(anecdote.id)
        showNotification(`Voted for: ${anecdote.content}`)
    }

    const deleteAnecdote = async (anecdote) => {
        await actions.remove(anecdote.id)
        showNotification(`Deleted anecdote: "${anecdote.content}"`)
    }

    return (
        <ul>
            {sorted.map( anecdote => (
                <li key={anecdote.id}>
                    {anecdote.content} <br />
                    has {anecdote.votes} votes
                    <button onClick={() => handleVote(anecdote)}>vote</button>
                    {anecdote.votes === 0 && (
                        <button onClick={() => deleteAnecdote(anecdote)}>
                            delete
                        </button>
                    )}
                </li>
            ))}
        </ul>
    )
}

export default AnecdoteList