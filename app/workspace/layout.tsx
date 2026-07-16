import WorkspaceLayout from '@/components/workspace/layout/WorkspaceLayout'

export const metadata = {
  title: 'Workspace - Taok',
  description: 'TAOK Workspace - Manage your research, companies, and team',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <WorkspaceLayout>{children}</WorkspaceLayout>
}
