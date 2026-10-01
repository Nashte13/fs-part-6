import { create } from "zustand";

let timeoutId

export const useNotificationStore = create((set) => ({
    message: null,
    actions: {
        showNotification: (message) => {
            clearTimeout(timeoutId)
            set({ message })
            
            timeoutId = setTimeout(() => {
                set({message: null})
            }, 5000)
        },
    },
}))