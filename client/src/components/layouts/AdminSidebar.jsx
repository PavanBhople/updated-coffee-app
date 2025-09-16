import { Link } from 'react-router-dom';

export default function AdminSidebar() {
  return (
    <nav>
      <ul className="space-y-4">
        <li><Link to="/admin">Dashboard</Link></li>
        <li><Link to="/admin/users">Users</Link></li>
        <li><Link to="/admin/analytics">Analytics</Link></li>
      </ul>
    </nav>
  );
}
