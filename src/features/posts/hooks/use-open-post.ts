import { create } from 'zustand'

type State = {
  id: string | undefined
  isOpen: boolean
  onOpen: (id: string) => void
  onClose: () => void
}

export const useOpenPost = create<State>((set) => ({
  id: undefined,
  isOpen: false,
  onOpen: (id: string) => set({ isOpen: true, id }),
  onClose: () => set({ isOpen: false }),
}))
