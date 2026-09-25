import { create } from "zustand";
import anecdoteService from "./services/anecdotes";

export const useAnecdoteStore = create((set) => ({
  anecdotes: [],
  filter: "",
  actions: {
    setAnecdotes: (anecdotes) => set({ anecdotes }),
    vote: async (id) => {
      set((state) => {
        const anecdote = state.anecdotes.fid((a) => String(a.id) === String(id))

        if (!anecdote) {
          return state
        }

        const updatedAnecdote = {
          ...anecdote,
          votes: anecdote.votes + 1
        }

        return {
          anecdotes: state.anecdotes.map((a) =>
            String(a.id) === String(id) ? updatedAnecdote : a
          ),
        }
      })

      const currentState = useAnecdoteStore.getState()
      const anecdote = currentState.anecdotes.find((a) => String(a.id) === String(id))

      if (!anecdote) return
      const updatedAnecdote = await anecdoteService.updateVote(
        id,
        anecdote.votes + 1
      )

      set((state) => ({
        anecdotes: state.anecdotes.map((a) =>
          String(a.id) === String(updatedAnecdote.id) ? updatedAnecdote : a
        ),
      }))
    },
    add: async (content) => {
      const newAnecdote = await anecdoteService.createNew(content);

      set((state) => ({
        anecdotes: state.anecdotes.concat(newAnecdote),
      }));
    },

    setFilter: (filter) => set({ filter }),
  },
}));
