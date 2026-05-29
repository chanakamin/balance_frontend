import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface UIState {
  sidebarOpen: boolean
  modalOpen: boolean
  modalType: 'create' | 'edit' | null
  selectedTransactionId: number | null
  selectedTransactionType: 'income' | 'expense' | null
  notification: {
    type: 'success' | 'error' | 'info' | null
    message: string | null
  }
}

const initialState: UIState = {
  sidebarOpen: true,
  modalOpen: false,
  modalType: null,
  selectedTransactionId: null,
  selectedTransactionType: null,
  notification: {
    type: null,
    message: null,
  },
}

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen
    },
    openCreateModal: (state, action: PayloadAction<'income' | 'expense'>) => {
      state.modalOpen = true
      state.modalType = 'create'
      state.selectedTransactionType = action.payload
      state.selectedTransactionId = null
    },
    openEditModal: (state, action: PayloadAction<{ id: number; type: 'income' | 'expense' }>) => {
      state.modalOpen = true
      state.modalType = 'edit'
      state.selectedTransactionId = action.payload.id
      state.selectedTransactionType = action.payload.type
    },
    closeModal: (state) => {
      state.modalOpen = false
      state.modalType = null
      state.selectedTransactionId = null
      state.selectedTransactionType = null
    },
    showNotification: (
      state,
      action: PayloadAction<{ type: 'success' | 'error' | 'info'; message: string }>
    ) => {
      state.notification = action.payload
    },
    clearNotification: (state) => {
      state.notification = {
        type: null,
        message: null,
      }
    },
  },
})

export const {
  toggleSidebar,
  openCreateModal,
  openEditModal,
  closeModal,
  showNotification,
  clearNotification,
} = uiSlice.actions
export default uiSlice.reducer
