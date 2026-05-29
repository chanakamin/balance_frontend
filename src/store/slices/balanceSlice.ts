import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { BalanceSummary, MonthlyReport, DateRangeReport } from '../../types'
import { balanceAPI } from '../../services/balanceAPI'

interface BalanceState {
  summary: BalanceSummary | null
  monthlyReport: MonthlyReport[]
  dateRangeReport: DateRangeReport | null
  categoryBreakdown: any[]
  isLoading: boolean
  error: string | null
}

const initialState: BalanceState = {
  summary: null,
  monthlyReport: [],
  dateRangeReport: null,
  categoryBreakdown: [],
  isLoading: false,
  error: null,
}

export const fetchBalance = createAsyncThunk(
  'balance/fetchBalance',
  async (_, { rejectWithValue }) => {
    try {
      const response = await balanceAPI.getBalance()
      if (!response.success) {
        return rejectWithValue(response.error || 'Failed to fetch balance')
      }
      return response.data
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.error || 'Failed to fetch balance')
    }
  }
)

export const fetchMonthlyReport = createAsyncThunk(
  'balance/fetchMonthlyReport',
  async (year: number | undefined, { rejectWithValue }) => {
    try {
      const response = await balanceAPI.getMonthlyReport(year)
      if (!response.success) {
        return rejectWithValue(response.error || 'Failed to fetch monthly report')
      }
      return response.data || []
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.error || 'Failed to fetch monthly report')
    }
  }
)

export const fetchBalanceRange = createAsyncThunk(
  'balance/fetchBalanceRange',
  async ({ date_from, date_to }: { date_from: string; date_to: string }, { rejectWithValue }) => {
    try {
      const response = await balanceAPI.getBalanceRange(date_from, date_to)
      if (!response.success) {
        return rejectWithValue(response.error || 'Failed to fetch balance range')
      }
      return response.data
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.error || 'Failed to fetch balance range')
    }
  }
)

export const fetchByCategory = createAsyncThunk(
  'balance/fetchByCategory',
  async (_, { rejectWithValue }) => {
    try {
      const response = await balanceAPI.getByCategory()
      if (!response.success) {
        return rejectWithValue(response.error || 'Failed to fetch category breakdown')
      }
      return response.data || []
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.error || 'Failed to fetch category breakdown')
    }
  }
)

const balanceSlice = createSlice({
  name: 'balance',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Balance
      .addCase(fetchBalance.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchBalance.fulfilled, (state, action) => {
        state.isLoading = false
        state.summary = action.payload
      })
      .addCase(fetchBalance.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      })
      // Fetch Monthly Report
      .addCase(fetchMonthlyReport.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchMonthlyReport.fulfilled, (state, action) => {
        state.isLoading = false
        state.monthlyReport = action.payload
      })
      .addCase(fetchMonthlyReport.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      })
      // Fetch Balance Range
      .addCase(fetchBalanceRange.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchBalanceRange.fulfilled, (state, action) => {
        state.isLoading = false
        state.dateRangeReport = action.payload
      })
      .addCase(fetchBalanceRange.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      })
      // Fetch By Category
      .addCase(fetchByCategory.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchByCategory.fulfilled, (state, action) => {
        state.isLoading = false
        state.categoryBreakdown = action.payload
      })
      .addCase(fetchByCategory.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      })
  },
})

export const { clearError } = balanceSlice.actions
export default balanceSlice.reducer
