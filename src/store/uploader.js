import { MAX_FILES } from '@/lib/utils'
import { toast } from 'sonner'
import { create } from 'zustand'

const useUploaderStore = create((set) => ({
  data: [],
  selectedFile: null,
  setFiles: (newFiles) => set({ data: newFiles }),
  reset: () => set({ data: [] }),
  addFiles: (newFiles) =>
    set((state) => {
      if (state.data.length + newFiles.length > MAX_FILES) {
        toast.error(`Cannot upload more than ${MAX_FILES} files`)
        return state
      }
      return { data: [...state.data, ...newFiles] }
    }),
  removeFile: (index) =>
    set((state) => ({ data: state.data.filter((_, i) => i !== index) })),
  setSelected: (index) =>
    set((state) => ({ selectedFile: { ...state.data[index] } })),
  editFile: (index, data) =>
    set((state) => {
      const newFiles = state.data.map((file, i) => (i === index ? data : file))
      return { data: newFiles }
    })
}))

export default useUploaderStore
