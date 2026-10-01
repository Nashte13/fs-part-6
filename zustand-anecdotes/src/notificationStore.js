import { create } from "zustand";

let timeoutId

export const useNotificationStore = create((set) => ({
    notification: {message: null, type: null},
    actions: {
        showNotification: (message, type = 'success') => {
            clearTimeout(timeoutId)
            set({ notification: {message, type} })
            
            timeoutId = setTimeout(() => {
                set({message: null})
            }, 5000)
        },
    },
}))