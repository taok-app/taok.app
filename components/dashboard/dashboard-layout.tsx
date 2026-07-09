import React from 'react';
import { DashboardStats, RecentCompanies, RecentResearchSessions } from '@/components/dashboard/dashboard-cards';

interface DashboardLayoutProps {
  organizationId: string;
}

export async function DashboardLayout({ organizationId }: DashboardLayoutProps) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back. Here's your research workspace overview.
        </p>
      </div>

      {/* Stats Cards */}
      <DashboardStats organizationId={organizationId} />

      {/* Recent Activity Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <RecentCompanies organizationId={organizationId} />
        <RecentResearchSessions organizationId={organizationId} />
      </div>
    </div>
  );
}
