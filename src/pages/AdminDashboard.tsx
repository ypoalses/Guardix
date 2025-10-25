import React from 'react';
import { Layout } from '../components/layout/Layout';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';

export const AdminDashboard: React.FC = () => {
  return (
    <Layout title="Admin Dashboard">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <h3 className="text-lg font-semibold mb-2">Total Users</h3>
          <p className="text-3xl font-bold text-primary-600">0</p>
        </Card>
        <Card>
          <h3 className="text-lg font-semibold mb-2">Total Pets</h3>
          <p className="text-3xl font-bold text-primary-600">0</p>
        </Card>
        <Card>
          <h3 className="text-lg font-semibold mb-2">Active Tags</h3>
          <p className="text-3xl font-bold text-primary-600">0</p>
        </Card>
        <Card>
          <h3 className="text-lg font-semibold mb-2">Total Scans</h3>
          <p className="text-3xl font-bold text-primary-600">0</p>
        </Card>
      </div>
    </Layout>
  );
};
