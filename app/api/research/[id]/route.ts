import { NextRequest } from 'next/server';
import { getAuthContext } from '@/lib/api/auth';
import { successResponse, listResponse, validationErrorResponse, notFoundResponse, internalErrorResponse } from '@/lib/api/responses';
import { updateResearchSessionSchema } from '@/lib/validation';
import * as researchRepository from '@/lib/repositories/research';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const auth = await getAuthContext();
    if (!auth) {
      return validationErrorResponse('Authentication required');
    }

    const session = await researchRepository.getResearchSessionById(params.id, auth.organizationId);
    if (!session) {
      return notFoundResponse('Research Session');
    }

    const messages = await researchRepository.getSessionMessages(params.id, auth.organizationId);

    return successResponse({
      ...session,
      messages,
    });
  } catch (error) {
    console.error('[GET /api/research/:id]', error);
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
    const validated = updateResearchSessionSchema.safeParse(body);

    if (!validated.success) {
      return validationErrorResponse(
        validated.error.errors.map((e) => `${e.path}: ${e.message}`).join(', ')
      );
    }

    const session = await researchRepository.updateResearchSession(params.id, auth.organizationId, validated.data);
    if (!session) {
      return notFoundResponse('Research Session');
    }

    return successResponse(session);
  } catch (error) {
    console.error('[PATCH /api/research/:id]', error);
    return internalErrorResponse();
  }
}
