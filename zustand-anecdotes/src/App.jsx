import { useEffect } from 'react';
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Filter from './components/Filter';
import { useAnecdoteStore } from './store';
import anecdoteService from './services/anecdotes'

const App = () => {

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