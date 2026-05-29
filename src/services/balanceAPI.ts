import api from './api'
import { BalanceSummary, ApiResponse, MonthlyReport, DateRangeReport } from '@/types'

export const balanceAPI = {
  getBalance: async (): Promise<ApiResponse<BalanceSummary>> => {
    const response = await api.get('/api/balance')
    return response.data
  },

  getBalanceRange: async (date_from: string, date_to: string): Promise<ApiResponse<DateRangeReport>> => {
    const response = await api.get('/api/balance/range', {
      params: { date_from, date_to },
    })
    return response.data
  },

  getMonthlyReport: async (year?: number): Promise<ApiResponse<MonthlyReport[]>> => {
    const params = year ? { year } : {}
    const response = await api.get('/api/balance/monthly', { params })
    return response.data
  },

  getByCategory: async (): Promise<ApiResponse<any>> => {
    const response = await api.get('/api/balance/by-category')
    return response.data
  },
}
