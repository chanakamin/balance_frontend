import React from 'react'
import { useForm } from 'react-hook-form'
import { CreateTransactionPayload } from '@/types'
import { Button } from './Button'
import { format } from 'date-fns'

interface TransactionFormProps {
  type: 'income' | 'expense'
  onSubmit: (data: CreateTransactionPayload) => void
  isLoading?: boolean
  initialData?: CreateTransactionPayload & { id?: number }
}

const incomeCategories = [
  { id: 1, name: 'Salary' },
  { id: 2, name: 'Bonus' },
  { id: 3, name: 'Investment' },
]

const expenseCategories = [
  { id: 1, name: 'Food' },
  { id: 2, name: 'Transport' },
  { id: 3, name: 'Entertainment' },
  { id: 4, name: 'Utilities' },
  { id: 5, name: 'Other' },
]

export const TransactionForm: React.FC<TransactionFormProps> = ({
  type,
  onSubmit,
  isLoading = false,
  initialData,
}) => {
  const { register, handleSubmit, formState: { errors } } = useForm<CreateTransactionPayload>({
    defaultValues: initialData || {
      type,
      amount: 0,
      category_id: 1,
      description: '',
      date: format(new Date(), 'yyyy-MM-dd'),
    },
  })

  const categories = type === 'income' ? incomeCategories : expenseCategories

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="label">Amount</label>
        <input
          type="number"
          step="0.01"
          min="0"
          placeholder="0.00"
          className="input"
          {...register('amount', { required: 'Amount is required', min: { value: 0.01, message: 'Amount must be greater than 0' } })}
        />
        {errors.amount && <p className="text-red-500 text-sm mt-1">{errors.amount.message}</p>}
      </div>

      <div>
        <label className="label">Category</label>
        <select className="input" {...register('category_id')}>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="label">Description (Optional)</label>
        <input
          type="text"
          placeholder="Enter description"
          className="input"
          {...register('description')}
        />
      </div>

      <div>
        <label className="label">Date</label>
        <input
          type="date"
          className="input"
          {...register('date', { required: 'Date is required' })}
        />
        {errors.date && <p className="text-red-500 text-sm mt-1">{errors.date.message}</p>}
      </div>

      <Button
        type="submit"
        variant="primary"
        isLoading={isLoading}
        className="w-full"
      >
        {initialData ? 'Update Transaction' : 'Add Transaction'}
      </Button>
    </form>
  )
}
