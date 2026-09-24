import { create } from "zustand";

export const useAnecdoteStore = create((set) => ({
  anecdotes: [],
  filter: "",
  actions: {
    vote: (id) =>
      set((state) => ({
        anecdotes: state.anecdotes.map((a) =>
          a.id === id ? { ...a, votes: a.votes + 1 } : a,
        ),
      })),
    add: (content) =>
      set((state) => {
        const newId = Date.now();
        return {
          anecdotes: state.anecdotes.concat({ id: newId, content, votes: 0 }),
        };
      }),
    setFilter: (filter) => set({ filter }),
  },
}));
