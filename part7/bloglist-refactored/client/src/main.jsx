import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BlogProvider } from './context/BlogContext.jsx'
import { UserProvider } from './context/UserContext.jsx'
import { BrowserRouter } from 'react-router-dom'

import App from './App'
import './globals.css'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <BlogProvider>
      <UserProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </UserProvider>
    </BlogProvider>
  </QueryClientProvider>
)
