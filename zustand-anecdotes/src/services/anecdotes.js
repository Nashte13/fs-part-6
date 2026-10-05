const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
    const response = await fetch(baseUrl)

    if (!response.ok) {
        throw new Error('Failed to fetch notes')
    }

    return await response.json()
}

const createNew = async (content) => {
    const response = await fetch(baseUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            content,
            votes: 0,
        }),
    })

    if (!response.ok) {
        throw new Error('Failed to add anecdote')
    }

    return await response.json()
}

const updateVote = async (id, votes) => {
    const response = await fetch(`${baseUrl}/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            votes,
        }),
    })

    if (!response.ok) {
        throw new Error('Failed to update vote')
    }

    return await response.json()
}

const remove = async (id) => {
    const response = await fetch(`${baseUrl}/${id}`, {
        method: 'DELETE',
    })

    if (!response.ok) {
        throw new Error('failed to delete anecdote')
    }
}

export default { getAll, createNew, updateVote, remove }