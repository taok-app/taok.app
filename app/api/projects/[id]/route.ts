import { NextRequest } from 'next/server';
import { getAuthContext } from '@/lib/api/auth';
import { successResponse, validationErrorResponse, notFoundResponse, internalErrorResponse } from '@/lib/api/responses';
import { updateProjectSchema } from '@/lib/validation';
import * as projectRepository from '@/lib/repositories/project';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const auth = await getAuthContext();
    if (!auth) {
      return validationErrorResponse('Authentication required');
    }

    const project = await projectRepository.getProjectById(params.id, auth.organizationId);
    if (!project) {
      return notFoundResponse('Project');
    }

    return successResponse(project);
  } catch (error) {
    console.error('[GET /api/projects/:id]', error);
    return internalErrorResponse();
  }
}

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const auth = await getAuthContext();
    if (!auth) {
      return validationErrorResponse('Authentication required');
    }

    const body = await request.json();
    const validated = updateProjectSchema.safeParse(body);

    if (!validated.success) {
      return validationErrorResponse(
        validated.error.errors.map((e) => `${e.path}: ${e.message}`).join(', ')
      );
    }

    const project = await projectRepository.updateProject(params.id, auth.organizationId, validated.data);
    if (!project) {
      return notFoundResponse('Project');
    }

    return successResponse(project);
  } catch (error) {
    console.error('[PATCH /api/projects/:id]', error);
    return internalErrorResponse();
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const auth = await getAuthContext();
    if (!auth) {
      return validationErrorResponse('Authentication required');
    }

    const project = await projectRepository.deleteProject(params.id, auth.organizationId);
    if (!project) {
      return notFoundResponse('Project');
    }

    return successResponse({ id: project.id });
  } catch (error) {
    console.error('[DELETE /api/projects/:id]', error);
    return internalErrorResponse();
  }
}
