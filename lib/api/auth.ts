import { getCurrentUserId, getUserOrganizationId } from '@/lib/auth/session';
import { forbiddenResponse, unauthorizedResponse } from './responses';

export interface AuthContext {
  userId: string;
  organizationId: string;
}

export async function getAuthContext(): Promise<AuthContext | null> {
  const userId = await getCurrentUserId();
  if (!userId) {
    return null;
  }

  const organizationId = await getUserOrganizationId(userId);
  if (!organizationId) {
    return null;
  }

  return { userId, organizationId };
}

export async function requireAuth() {
  const auth = await getAuthContext();
  if (!auth) {
    return unauthorizedResponse();
  }
  return auth;
}

export function verifyOrganizationAccess(orgIdFromData: string, contextOrgId: string) {
  if (orgIdFromData !== contextOrgId) {
    return forbiddenResponse();
  }
  return null; // Valid
}
