import { useAnecdoteStore } from '../store'

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

    return (
        <ul>
            {sorted.map( anecdote => (
                <li key={anecdote.id}>
                    {anecdote.content} <br />
                    has {anecdote.votes} votes
                    <button onClick={() => actions.vote(anecdote.id)}>vote</button>
                </li>
            ))}
        </ul>
    )
}

export default AnecdoteList