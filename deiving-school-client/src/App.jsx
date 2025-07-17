import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ClientLandingPage from './pages/ClientLandingPage';
import ClientDashboard from './pages/ClientDashboard';
import AdminDashboard from './pages/AdminDashboard';

const RequireAuth = ({ children, allowedRole }) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (!token) return <Navigate to="/client" />;
  if (role !== allowedRole) return <Navigate to="/" />;
  return children;
};

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/client" element={<ClientLandingPage />} />
      <Route path="/client-dashboard" element={
        <RequireAuth allowedRole="client">
          <ClientDashboard />
        </RequireAuth>
      } />
      <Route path="/admin" element={
        <RequireAuth allowedRole="admin">
          <AdminDashboard />
        </RequireAuth>
      } />
    </Routes>
  );
}

export default App;
