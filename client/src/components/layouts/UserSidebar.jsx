import { Link } from 'react-router-dom';

export default function UserSidebar() {
  return (
    <nav>
      <ul className="space-y-4">
        <li><Link to="/user">Dashboard</Link></li>
        <li><Link to="/user/profile">Profile</Link></li>
        <li><Link to="/user/orders">Orders</Link></li>
      </ul>
    </nav>
  );
}
