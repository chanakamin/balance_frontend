export interface User {
  id: number
  username: string
  created_at: string
}

export interface Transaction {
  id: number
  user_id: number
  type: 'income' | 'expense'
  amount: number
  category_id: number
  category_name?: string
  description?: string
  date: string
  created_at: string
}

export interface Category {
  id: number
  type: 'income' | 'expense'
  name: string
}

export interface BalanceSummary {
  total_income: number
  total_expense: number
  net_balance: number
}

export interface MonthlyReport {
  month: string
  income: number
  expense: number
  balance: number
}

export interface DateRangeReport {
  start_date: string
  end_date: string
  total_income: number
  total_expense: number
  net_balance: number
  transaction_count: number
}

export interface CategoryBreakdown {
  category: string
  amount: number
  percentage: number
}

export interface ApiResponse<T> {
  success: boolean
  data?: T
  message?: string
  error?: string
}

export interface CreateTransactionPayload {
  type: 'income' | 'expense'
  amount: number
  category_id: number
  description?: string
  date: string
}

export interface UpdateTransactionPayload extends CreateTransactionPayload {
  id: number
}
