import DashboardLayout from '../../components/layouts/DashboardLayout';
import AdminSidebar from '../../components/layouts/AdminSidebar';

export default function AdminDashboard() {
  return (
    <DashboardLayout sidebar={<AdminSidebar />}>
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      <p>Manage your site here.</p>
    </DashboardLayout>
  );
}
