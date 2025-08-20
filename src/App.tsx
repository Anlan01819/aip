// 由于使用了 JSX 语法但没有直接使用 React 对象，可以移除这个导入
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from '@/contexts/AuthContext'
import { AuthPage } from '@/components/Auth/AuthPage'
import { MainLayout } from '@/components/Layout/MainLayout'
import { OrganizationList } from '@/components/Organization/OrganizationList'
import { OrganizationExplore } from '@/components/Organization/OrganizationExplore'
import { ProjectList } from '@/components/Project/ProjectList'
import { Dashboard } from '@/components/Dashboard/Dashboard'

function AppContent() {
  const { session, loading, error, retry } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen bg-secondary-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-secondary-600 mb-4">??????...</p>
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
              <p className="text-red-600 text-sm mb-2">{error}</p>
              <button 
                onClick={retry}
                className="bg-red-600 text-white px-4 py-2 rounded-md text-sm hover:bg-red-700 transition-colors"
              >
                ????
              </button>
            </div>
          )}
          <div className="text-xs text-secondary-400 mt-4">
            ???????????????????????????
          </div>
        </div>
      </div>
    )
  }

  return (
    <Router>
      {session ? (
        <MainLayout>
          <Routes>
            <Route path="/" element={<Navigate to="/organizations" replace />} />
            <Route path="/organizations" element={<OrganizationList />} />
            <Route path="/organizations/explore" element={<OrganizationExplore />} />
            <Route path="/projects/:orgId" element={<ProjectList />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </MainLayout>
      ) : (
        <AuthPage />
      )}
    </Router>
  )
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  )
}

export default App