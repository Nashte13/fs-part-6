import { create } from "zustand";
import anecdoteService from "./services/anecdotes";

export const useAnecdoteStore = create((set, get) => ({
  anecdotes: [],
  filter: "",
  actions: {
    setAnecdotes: (anecdotes) => set({ anecdotes }),

    vote: async (id) => {
        const anecdote = get().anecdotes.find((item) => String(item.id) === String(id));

        if (!anecdote) return

        const updatedAnecdote = await anecdoteService.updatedVote(
          id,
          anecdote.votes + 1
        )

        set((state) => ({
          anecdotes: state.anecdotes.map((item) => 
            String(item.id) === String(id) ? updatedAnecdote : item
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
