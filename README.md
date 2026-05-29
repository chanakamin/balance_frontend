# Personal Finance Frontend

A modern React + TypeScript + Redux frontend for managing personal finances with income and expense tracking.

## Features

✅ **User Authentication** - Register and login with secure session-based authentication
✅ **Dashboard** - Overview of balance summary and recent transactions
✅ **Income Management** - Create, read, update, and delete income records
✅ **Expense Management** - Track and manage expenses with categories
✅ **Financial Reports** - View monthly reports and date-range analysis
✅ **Category Breakdown** - Visualize spending patterns by category
✅ **Responsive Design** - Works seamlessly on desktop, tablet, and mobile devices
✅ **Real-time Updates** - Instant feedback on all transactions

## Tech Stack

- **React 18** - UI library
- **TypeScript** - Type-safe development
- **Vite 5** - Fast build tool and dev server
- **Redux Toolkit** - State management
- **React Router v6** - Client-side routing
- **Tailwind CSS** - Utility-first styling
- **Axios** - HTTP client with interceptors
- **React Hook Form** - Efficient form handling
- **Recharts** - Data visualization charts
- **date-fns** - Date manipulation

## Project Structure

```
react_frontend/
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── Button.tsx
│   │   ├── Modal.tsx
│   │   ├── Navigation.tsx
│   │   ├── Sidebar.tsx
│   │   ├── ProtectedRoute.tsx
│   │   ├── BalanceSummary.tsx
│   │   ├── TransactionTable.tsx
│   │   ├── TransactionForm.tsx
│   │   └── ...
│   ├── pages/              # Page components
│   │   ├── LoginPage.tsx
│   │   ├── RegisterPage.tsx
│   │   ├── DashboardPage.tsx
│   │   ├── IncomeListPage.tsx
│   │   ├── ExpenseListPage.tsx
│   │   └── ReportsPage.tsx
│   ├── services/           # API integration
│   │   ├── api.ts          # Axios instance
│   │   ├── authAPI.ts
│   │   ├── transactionAPI.ts
│   │   └── balanceAPI.ts
│   ├── store/              # Redux state management
│   │   ├── index.ts        # Store configuration
│   │   └── slices/
│   │       ├── authSlice.ts
│   │       ├── transactionSlice.ts
│   │       ├── balanceSlice.ts
│   │       └── uiSlice.ts
│   ├── hooks/              # Custom React hooks
│   │   └── useRedux.ts
│   ├── types/              # TypeScript types
│   │   └── index.ts
│   ├── App.tsx             # Main app component
│   ├── main.tsx            # Entry point
│   └── index.css           # Global styles
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.ts
├── postcss.config.js
├── .env                    # Environment variables
└── index.html
```

## Setup Instructions

### Prerequisites

- Node.js 18+ and npm
- Backend API running on http://localhost:3000

### Installation

1. Navigate to the project directory:
```bash
cd react_frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create/update `.env` file:
```
VITE_API_URL=http://localhost:3000
```

### Development

Start the development server:
```bash
npm run dev
```

The frontend will be available at `http://localhost:5173/`

### Build

Create a production build:
```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_API_URL` | Backend API URL | `http://localhost:3000` |

## API Integration

The frontend communicates with the backend API using Axios with automatic CORS credentials. The API client is configured in `src/services/api.ts`.

### Endpoints Used

- **Auth**: `/auth/register`, `/auth/login`, `/auth/logout`, `/auth/me`
- **Income**: `/api/income` (GET, POST, PUT, DELETE)
- **Expense**: `/api/expense` (GET, POST, PUT, DELETE)
- **Balance**: `/api/balance`, `/api/balance/range`, `/api/balance/monthly`, `/api/balance/by-category`

## Authentication Flow

1. User registers with username and password (min 6 characters)
2. User logs in with credentials
3. Backend sets secure HTTP-only session cookie
4. All subsequent requests automatically include the session cookie
5. Frontend checks auth status on app initialization
6. Unauthenticated users are redirected to login page

## State Management

Redux Toolkit manages the following state:

- **Auth** - User authentication and session state
- **Transactions** - Income and expense lists
- **Balance** - Financial summary and reports
- **UI** - Modal and sidebar state

## Pages

### Authentication Pages
- **Login** - User login with error handling
- **Register** - New account creation with validation

### App Pages
- **Dashboard** - Balance summary and recent transactions
- **Income** - List and manage income records
- **Expense** - List and manage expense records
- **Reports** - Monthly reports, date range analysis, category breakdown

## Component Highlights

### ProtectedRoute
Ensures only authenticated users can access protected pages. Redirects to login if unauthenticated.

### TransactionForm
Reusable form for creating and editing transactions with React Hook Form validation.

### BalanceSummary
Displays income, expense, and net balance with visual indicators.

### TransactionTable
Comprehensive table with edit and delete actions for transactions.

## Error Handling

- API errors are captured by Axios interceptors
- 401 Unauthorized responses redirect to login
- User-friendly error messages display in UI
- Form validation provides immediate feedback

## Styling

Uses Tailwind CSS with custom utility classes defined in `src/index.css`:
- `.btn`, `.btn-primary`, `.btn-secondary`, `.btn-danger`
- `.card` for card containers
- `.table` for data tables
- `.input`, `.label` for form elements

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Building for Production

1. Update `VITE_API_URL` in `.env` for production backend URL
2. Build: `npm run build`
3. Vite generates optimized bundle in `dist/` directory
4. Deploy `dist/` folder to your hosting

## Troubleshooting

### CORS Errors
- Ensure backend has CORS configured with `credentials: true`
- Frontend uses `withCredentials: true` in Axios

### Authentication Issues
- Clear browser cookies and try logging in again
- Check backend session configuration
- Verify backend and frontend URLs match

### Build Errors
- Clear `node_modules` and reinstall: `rm -rf node_modules && npm install`
- Check TypeScript version compatibility

## Performance

- Code splitting by route for faster page loads
- Lazy loading of components
- Optimized Re-renders with React hooks
- Efficient state updates with Redux Toolkit

## License

MIT

## Support

For issues or questions, contact the development team.
