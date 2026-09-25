import { create } from "zustand";
import anecdoteService from "./services/anecdotes";

export const useAnecdoteStore = create((set) => ({
  anecdotes: [],
  filter: "",
  actions: {
    setAnecdotes: (anecdotes) => set({ anecdotes }),
    vote: (id) =>
      set((state) => ({
        anecdotes: state.anecdotes.map((a) =>
          a.id === id ? { ...a, votes: a.votes + 1 } : a,
        ),
      })),
    add: async (content) => {
      const newAnecdote = await anecdoteService.createNew(content);

      set((state) => ({
        anecdotes: state.anecdotes.concat(newAnecdote),
      }));
    },

    setFilter: (filter) => set({ filter }),
  },
}));
