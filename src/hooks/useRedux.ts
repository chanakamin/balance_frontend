import React from 'react'
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux'
import type { RootState, AppDispatch } from '../store'
import { checkAuthStatus } from '../store/slices/authSlice'

// Export pre-typed versions of useDispatch and useSelector
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

// Custom hook for app initialization
export const useInitializeApp = () => {
  const dispatch = useAppDispatch()
  const { isAuthenticated, isLoading } = useAppSelector((state) => state.auth)

  React.useEffect(() => {
    dispatch(checkAuthStatus())
  }, [dispatch])

  return { isAuthenticated, isLoading }
}
