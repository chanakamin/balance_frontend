import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux'
import { fetchBalance, fetchMonthlyReport } from '@/store/slices/balanceSlice'
import { fetchIncomeList, fetchExpenseList } from '@/store/slices/transactionSlice'
import { BalanceSummary } from '@/components/BalanceSummary'
import { TransactionTable } from '@/components/TransactionTable'
import { LoadingSpinner } from '@/components/LoadingSpinner'

export const DashboardPage: React.FC = () => {
  const dispatch = useAppDispatch()
  const { summary, isLoading: balanceLoading } = useAppSelector((state) => state.balance)
  const { incomeList, expenseList, isLoading: transactionLoading } = useAppSelector((state) => state.transactions)

  useEffect(() => {
    dispatch(fetchBalance())
    dispatch(fetchMonthlyReport())
    dispatch(fetchIncomeList())
    dispatch(fetchExpenseList())
  }, [dispatch])

  const recentTransactions = [
    ...incomeList.map((t) => ({ ...t, type: 'income' as const })),
    ...expenseList.map((t) => ({ ...t, type: 'expense' as const })),
  ]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 10)

  if (balanceLoading && transactionLoading) {
    return <LoadingSpinner />
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">Welcome back! Here's your financial overview.</p>
      </div>

      {/* Balance Summary */}
      <BalanceSummary summary={summary} isLoading={balanceLoading} />

      {/* Recent Transactions */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Recent Transactions</h2>
        <TransactionTable transactions={recentTransactions} isLoading={transactionLoading} />
      </div>
    </div>
  )
}
