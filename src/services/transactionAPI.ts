import api from './api'
import { Transaction, ApiResponse, CreateTransactionPayload, UpdateTransactionPayload } from '@/types'

export const transactionAPI = {
  // Income operations
  getIncomeList: async (): Promise<ApiResponse<Transaction[]>> => {
    const response = await api.get('/api/income')
    return response.data
  },

  getIncomeById: async (id: number): Promise<ApiResponse<Transaction>> => {
    const response = await api.get(`/api/income/${id}`)
    return response.data
  },

  createIncome: async (payload: CreateTransactionPayload): Promise<ApiResponse<Transaction>> => {
    const response = await api.post('/api/income', payload)
    return response.data
  },

  updateIncome: async (id: number, payload: CreateTransactionPayload): Promise<ApiResponse<Transaction>> => {
    const response = await api.put(`/api/income/${id}`, payload)
    return response.data
  },

  deleteIncome: async (id: number): Promise<ApiResponse<null>> => {
    const response = await api.delete(`/api/income/${id}`)
    return response.data
  },

  // Expense operations
  getExpenseList: async (): Promise<ApiResponse<Transaction[]>> => {
    const response = await api.get('/api/expense')
    return response.data
  },

  getExpenseById: async (id: number): Promise<ApiResponse<Transaction>> => {
    const response = await api.get(`/api/expense/${id}`)
    return response.data
  },

  createExpense: async (payload: CreateTransactionPayload): Promise<ApiResponse<Transaction>> => {
    const response = await api.post('/api/expense', payload)
    return response.data
  },

  updateExpense: async (id: number, payload: CreateTransactionPayload): Promise<ApiResponse<Transaction>> => {
    const response = await api.put(`/api/expense/${id}`, payload)
    return response.data
  },

  deleteExpense: async (id: number): Promise<ApiResponse<null>> => {
    const response = await api.delete(`/api/expense/${id}`)
    return response.data
  },
}
