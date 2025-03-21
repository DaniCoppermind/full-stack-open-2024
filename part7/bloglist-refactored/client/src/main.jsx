import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BlogProvider } from './context/BlogContext'

import App from './App'
import './globals.css'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <BlogProvider>
      <App />
    </BlogProvider>
  </QueryClientProvider>
)
