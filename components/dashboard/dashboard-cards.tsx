import { getDashboardStats, getRecentCompanies, getRecentResearchSessions } from '@/lib/db/dashboard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Building2, Users, BookOpen } from 'lucide-react';

interface DashboardProps {
  organizationId: string;
}

export async function DashboardStats({ organizationId }: DashboardProps) {
  const stats = await getDashboardStats(organizationId);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Companies</CardTitle>
          <Building2 className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.companies}</div>
          <p className="text-xs text-muted-foreground">in your workspace</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">People</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.people}</div>
          <p className="text-xs text-muted-foreground">decision makers tracked</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Research Sessions</CardTitle>
          <BookOpen className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.researchSessions}</div>
          <p className="text-xs text-muted-foreground">research projects</p>
        </CardContent>
      </Card>
    </div>
  );
}

export async function RecentCompanies({ organizationId }: DashboardProps) {
  const companies = await getRecentCompanies(organizationId, 5);

  if (companies.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Recent Companies</CardTitle>
          <CardDescription>No companies yet. Start by adding your first company.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            <p>Companies you research will appear here</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Companies</CardTitle>
        <CardDescription>Latest companies added to your workspace</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {companies.map((company) => (
            <div key={company.id} className="flex items-start justify-between border-b pb-3 last:border-0">
              <div className="flex-1">
                <p className="font-medium text-sm">{company.display_name}</p>
                <p className="text-xs text-muted-foreground">{company.domain || company.website}</p>
              </div>
              {company.industry && (
                <Badge variant="secondary" className="text-xs">
                  {company.industry}
                </Badge>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export async function RecentResearchSessions({ organizationId }: DashboardProps) {
  const sessions = await getRecentResearchSessions(organizationId, 5);

  if (sessions.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Recent Research Sessions</CardTitle>
          <CardDescription>No research sessions yet. Start a new research project.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            <p>Your research sessions will appear here</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Research Sessions</CardTitle>
        <CardDescription>Latest research projects</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {sessions.map((session) => (
            <div key={session.id} className="flex items-start justify-between border-b pb-3 last:border-0">
              <div className="flex-1">
                <p className="font-medium text-sm line-clamp-1">{session.query}</p>
                <p className="text-xs text-muted-foreground">
                  {new Date(session.created_at).toLocaleDateString()}
                </p>
              </div>
              <Badge
                variant={session.status === 'completed' ? 'default' : 'secondary'}
                className="text-xs capitalize"
              >
                {session.status}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
