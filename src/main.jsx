import React from 'react'
import ReactDOM from 'react-dom/client'
import './assets/css/tailwind.css'
import { RouterProvider } from 'react-router-dom'
import routes from './routes'
import { SearchProvider } from './context/SearchContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <SearchProvider> {/* SearchProvider ile tüm uygulamayı sarmalla */}
    <RouterProvider router={routes} />
  </SearchProvider>
)
