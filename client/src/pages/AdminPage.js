import { Button } from 'antd';
import useAuthStore from '@/auth/authStore';

// Placeholder target for the ProtectedRoute + auth scaffolding.
// Safe to delete (with its route in App.js) if the portfolio stays fully public.
const AdminPage = () => {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  return (
    <div className="container" style={{ paddingBlock: 64 }}>
      <h1>Admin</h1>
      <p style={{ marginBlock: 12 }}>Signed in as {user?.email ?? 'unknown user'}.</p>
      <Button onClick={logout}>Sign out</Button>
    </div>
  );
};

export default AdminPage;
