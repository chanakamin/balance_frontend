import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux'
import { fetchMonthlyReport, fetchBalanceRange, fetchByCategory } from '@/store/slices/balanceSlice'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { Button } from '@/components/Button'
import { LoadingSpinner } from '@/components/LoadingSpinner'
import { format, startOfYear, endOfYear } from 'date-fns'

export const ReportsPage: React.FC = () => {
  const dispatch = useAppDispatch()
  const { monthlyReport, dateRangeReport, categoryBreakdown, isLoading } = useAppSelector((state) => state.balance)
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear())
  const [dateFrom, setDateFrom] = useState(format(startOfYear(new Date()), 'yyyy-MM-dd'))
  const [dateTo, setDateTo] = useState(format(endOfYear(new Date()), 'yyyy-MM-dd'))

  useEffect(() => {
    dispatch(fetchMonthlyReport(selectedYear))
    dispatch(fetchByCategory())
  }, [dispatch, selectedYear])

  const handleDateRangeSubmit = () => {
    if (dateFrom && dateTo) {
      dispatch(fetchBalanceRange({ date_from: dateFrom, date_to: dateTo }))
    }
  }

  const COLORS = ['#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6']

  if (isLoading && monthlyReport.length === 0) {
    return <LoadingSpinner />
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Financial Reports</h1>
        <p className="text-gray-600 mt-2">Analyze your financial data with detailed reports</p>
      </div>

      {/* Year and Date Range Filters */}
      <div className="card space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Year Selector */}
          <div>
            <label className="label">Select Year (Monthly Report)</label>
            <select
              className="input"
              value={selectedYear}
              onChange={(e) => setSelectedYear(Number(e.target.value))}
            >
              {[2023, 2024, 2025, 2026].map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>

          {/* Date Range */}
          <div />
        </div>

        {/* Date Range Filter */}
        <div className="border-t pt-4">
          <h3 className="font-semibold text-gray-900 mb-4">Filter by Date Range</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="label">From</label>
              <input
                type="date"
                className="input"
                value={dateFrom}
                onChange={(e) => setDateFrom(e.target.value)}
              />
            </div>
            <div>
              <label className="label">To</label>
              <input
                type="date"
                className="input"
                value={dateTo}
                onChange={(e) => setDateTo(e.target.value)}
              />
            </div>
            <div className="flex items-end">
              <Button variant="secondary" onClick={handleDateRangeSubmit} className="w-full">
                Get Report
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Date Range Report */}
      {dateRangeReport && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="card">
            <p className="text-sm font-medium text-gray-600">Total Income</p>
            <p className="text-3xl font-bold text-green-600 mt-2">
              ${dateRangeReport.total_income.toFixed(2)}
            </p>
          </div>
          <div className="card">
            <p className="text-sm font-medium text-gray-600">Total Expense</p>
            <p className="text-3xl font-bold text-red-600 mt-2">
              ${dateRangeReport.total_expense.toFixed(2)}
            </p>
          </div>
          <div className="card">
            <p className="text-sm font-medium text-gray-600">Net Balance</p>
            <p className={`text-3xl font-bold mt-2 ${dateRangeReport.net_balance >= 0 ? 'text-blue-600' : 'text-red-600'}`}>
              ${dateRangeReport.net_balance.toFixed(2)}
            </p>
          </div>
        </div>
      )}

      {/* Monthly Chart */}
      {monthlyReport.length > 0 && (
        <div className="card">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Monthly Overview ({selectedYear})</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyReport}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="income" fill="#10b981" name="Income" />
              <Bar dataKey="expense" fill="#ef4444" name="Expense" />
              <Bar dataKey="balance" fill="#3b82f6" name="Balance" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Category Breakdown Chart */}
      {categoryBreakdown.length > 0 && (
        <div className="card">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Category Breakdown</h2>
          <div className="flex justify-center">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryBreakdown.slice(0, 5)} // Limit to 5 categories for clarity
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ category, percentage }) => `${category}: ${percentage}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="amount"
                >
                  {categoryBreakdown.slice(0, 5).map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* Monthly Table */}
      {monthlyReport.length > 0 && (
        <div className="card">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Monthly Details</h2>
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>Month</th>
                  <th>Income</th>
                  <th>Expense</th>
                  <th>Balance</th>
                </tr>
              </thead>
              <tbody>
                {monthlyReport.map((report, idx) => (
                  <tr key={idx}>
                    <td className="font-medium">{report.month}</td>
                    <td className="text-green-600 font-semibold">${report.income.toFixed(2)}</td>
                    <td className="text-red-600 font-semibold">${report.expense.toFixed(2)}</td>
                    <td className={`font-semibold ${report.balance >= 0 ? 'text-blue-600' : 'text-red-600'}`}>
                      ${report.balance.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
