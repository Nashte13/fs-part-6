import { useAnecdoteStore } from "../store";

const AnecdoteForm = () => {
  const { actions } = useAnecdoteStore();

  const addAnecdote = async (e) => {
    e.preventDefault();
    const content = e.target.anecdote.value.trim();

    if (!content) {
      return;
    }

    await actions.add(content);
    e.target.reset();
  };

  return (
    <div>
      <h1>Add new Anecdote</h1>
      <form onSubmit={addAnecdote}>
        <input name="anecdote" />
        <button type="submit">add</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
