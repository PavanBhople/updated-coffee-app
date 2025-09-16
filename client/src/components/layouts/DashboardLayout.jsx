import React from 'react';

export default function DashboardLayout({ sidebar, children }) {
  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-gray-800 text-white p-4">{sidebar}</aside>
      <main className="flex-1 p-6 bg-gray-100">{children}</main>
    </div>
  );
}
