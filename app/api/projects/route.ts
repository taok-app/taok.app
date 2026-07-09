import { NextRequest } from 'next/server';
import { getAuthContext, requireAuth } from '@/lib/api/auth';
import { successResponse, listResponse, validationErrorResponse, notFoundResponse, internalErrorResponse } from '@/lib/api/responses';
import { createProjectSchema, updateProjectSchema } from '@/lib/validation';
import * as projectRepository from '@/lib/repositories/project';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const auth = await getAuthContext();
    if (!auth) {
      return validationErrorResponse('Authentication required');
    }

    const { searchParams } = new URL(request.url);
    const page = Math.max(1, parseInt(searchParams.get('page') || '1', 10));
    const limit = Math.min(100, parseInt(searchParams.get('limit') || '20', 10));
    const offset = (page - 1) * limit;

    const projects = await projectRepository.getProjectsByOrganization(auth.organizationId, {
      limit,
      offset,
    });

    const total = await projectRepository.getProjectCount(auth.organizationId);

    return listResponse(projects, page, limit, total);
  } catch (error) {
    console.error('[GET /api/projects]', error);
    return internalErrorResponse();
  }
}

export async function POST(request: NextRequest) {
  try {
    const auth = await getAuthContext();
    if (!auth) {
      return validationErrorResponse('Authentication required');
    }

    const body = await request.json();
    const validated = createProjectSchema.safeParse(body);

    if (!validated.success) {
      return validationErrorResponse(
        validated.error.errors.map((e) => `${e.path}: ${e.message}`).join(', ')
      );
    }

    const project = await projectRepository.createProject(auth.organizationId, validated.data);

    return successResponse(project, 201);
  } catch (error) {
    console.error('[POST /api/projects]', error);
    return internalErrorResponse();
  }
}
