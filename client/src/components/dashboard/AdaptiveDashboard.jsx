import { useAuth } from '../../context/AuthContext';

export default function AdaptiveDashboard() {
  const { user, logout } = useAuth();
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900">WebMorph Dashboard</h1>
        <p className="text-gray-500 mt-2">Welcome, {user?.name}</p>
        <button onClick={logout} className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg">Logout</button>
      </div>
    </div>
  );
}
