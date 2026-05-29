import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { Transaction, CreateTransactionPayload } from '@/types'
import { transactionAPI } from '@/services/transactionAPI'

interface TransactionState {
  incomeList: Transaction[]
  expenseList: Transaction[]
  isLoading: boolean
  error: string | null
}

const initialState: TransactionState = {
  incomeList: [],
  expenseList: [],
  isLoading: false,
  error: null,
}

// Income thunks
export const fetchIncomeList = createAsyncThunk(
  'transactions/fetchIncome',
  async (_, { rejectWithValue }) => {
    try {
      const response = await transactionAPI.getIncomeList()
      if (!response.success) {
        return rejectWithValue(response.error || 'Failed to fetch income')
      }
      return response.data || []
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.error || 'Failed to fetch income')
    }
  }
)

export const createIncome = createAsyncThunk(
  'transactions/createIncome',
  async (payload: CreateTransactionPayload, { rejectWithValue }) => {
    try {
      const response = await transactionAPI.createIncome(payload)
      if (!response.success) {
        return rejectWithValue(response.error || 'Failed to create income')
      }
      return response.data
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.error || 'Failed to create income')
    }
  }
)

export const updateIncome = createAsyncThunk(
  'transactions/updateIncome',
  async ({ id, payload }: { id: number; payload: CreateTransactionPayload }, { rejectWithValue }) => {
    try {
      const response = await transactionAPI.updateIncome(id, payload)
      if (!response.success) {
        return rejectWithValue(response.error || 'Failed to update income')
      }
      return response.data
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.error || 'Failed to update income')
    }
  }
)

export const deleteIncome = createAsyncThunk(
  'transactions/deleteIncome',
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await transactionAPI.deleteIncome(id)
      if (!response.success) {
        return rejectWithValue(response.error || 'Failed to delete income')
      }
      return id
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.error || 'Failed to delete income')
    }
  }
)

// Expense thunks
export const fetchExpenseList = createAsyncThunk(
  'transactions/fetchExpense',
  async (_, { rejectWithValue }) => {
    try {
      const response = await transactionAPI.getExpenseList()
      if (!response.success) {
        return rejectWithValue(response.error || 'Failed to fetch expenses')
      }
      return response.data || []
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.error || 'Failed to fetch expenses')
    }
  }
)

export const createExpense = createAsyncThunk(
  'transactions/createExpense',
  async (payload: CreateTransactionPayload, { rejectWithValue }) => {
    try {
      const response = await transactionAPI.createExpense(payload)
      if (!response.success) {
        return rejectWithValue(response.error || 'Failed to create expense')
      }
      return response.data
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.error || 'Failed to create expense')
    }
  }
)

export const updateExpense = createAsyncThunk(
  'transactions/updateExpense',
  async ({ id, payload }: { id: number; payload: CreateTransactionPayload }, { rejectWithValue }) => {
    try {
      const response = await transactionAPI.updateExpense(id, payload)
      if (!response.success) {
        return rejectWithValue(response.error || 'Failed to update expense')
      }
      return response.data
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.error || 'Failed to update expense')
    }
  }
)

export const deleteExpense = createAsyncThunk(
  'transactions/deleteExpense',
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await transactionAPI.deleteExpense(id)
      if (!response.success) {
        return rejectWithValue(response.error || 'Failed to delete expense')
      }
      return id
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.error || 'Failed to delete expense')
    }
  }
)

const transactionSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Income
      .addCase(fetchIncomeList.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchIncomeList.fulfilled, (state, action) => {
        state.isLoading = false
        state.incomeList = action.payload
      })
      .addCase(fetchIncomeList.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      })
      // Create Income
      .addCase(createIncome.fulfilled, (state, action) => {
        state.incomeList.unshift(action.payload)
      })
      // Update Income
      .addCase(updateIncome.fulfilled, (state, action) => {
        const index = state.incomeList.findIndex((t) => t.id === action.payload.id)
        if (index !== -1) {
          state.incomeList[index] = action.payload
        }
      })
      // Delete Income
      .addCase(deleteIncome.fulfilled, (state, action) => {
        state.incomeList = state.incomeList.filter((t) => t.id !== action.payload)
      })
      // Fetch Expense
      .addCase(fetchExpenseList.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchExpenseList.fulfilled, (state, action) => {
        state.isLoading = false
        state.expenseList = action.payload
      })
      .addCase(fetchExpenseList.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      })
      // Create Expense
      .addCase(createExpense.fulfilled, (state, action) => {
        state.expenseList.unshift(action.payload)
      })
      // Update Expense
      .addCase(updateExpense.fulfilled, (state, action) => {
        const index = state.expenseList.findIndex((t) => t.id === action.payload.id)
        if (index !== -1) {
          state.expenseList[index] = action.payload
        }
      })
      // Delete Expense
      .addCase(deleteExpense.fulfilled, (state, action) => {
        state.expenseList = state.expenseList.filter((t) => t.id !== action.payload)
      })
  },
})

export const { clearError } = transactionSlice.actions
export default transactionSlice.reducer
