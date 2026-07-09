import { NextRequest } from 'next/server';
import { getAuthContext } from '@/lib/api/auth';
import { successResponse, listResponse, validationErrorResponse, notFoundResponse, internalErrorResponse } from '@/lib/api/responses';
import { createResearchSessionSchema } from '@/lib/validation';
import * as researchRepository from '@/lib/repositories/research';
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

    const sessions = await researchRepository.getResearchSessionsByOrganization(auth.organizationId, {
      limit,
      offset,
    });

    const total = await researchRepository.getResearchSessionCount(auth.organizationId);

    return listResponse(sessions, page, limit, total);
  } catch (error) {
    console.error('[GET /api/research]', error);
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
    const validated = createResearchSessionSchema.safeParse(body);

    if (!validated.success) {
      return validationErrorResponse(
        validated.error.errors.map((e) => `${e.path}: ${e.message}`).join(', ')
      );
    }

    // Verify project exists and belongs to organization
    const project = await projectRepository.getProjectById(validated.data.project_id, auth.organizationId);
    if (!project) {
      return notFoundResponse('Project');
    }

    const session = await researchRepository.createResearchSession(auth.organizationId, validated.data);

    return successResponse(session, 201);
  } catch (error) {
    console.error('[POST /api/research]', error);
    return internalErrorResponse();
  }
}
