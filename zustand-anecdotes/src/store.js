import { create } from "zustand";

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
    add: async (content) =>
      set((state) => {
        const newAnecdote = await anecdoteService.createNew(content)

        set((state) => ({
          anecdotes: state.anecdotes.concat({ newAnecdote }),
        }))
      }),
    setFilter: (filter) => set({ filter }),
  },
}));
