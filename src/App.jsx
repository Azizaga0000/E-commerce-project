import './App.css'
import AppRoutes from './components/AppRoutes'
import { AuthProvider } from './components/AuthContext'

function App() {

  return (
    <>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </>
  )
}

export default App
