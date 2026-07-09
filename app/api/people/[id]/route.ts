import { NextRequest } from 'next/server';
import { getAuthContext } from '@/lib/api/auth';
import { successResponse, validationErrorResponse, notFoundResponse, internalErrorResponse } from '@/lib/api/responses';
import { updatePersonSchema } from '@/lib/validation';
import * as peopleRepository from '@/lib/repositories/people';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const auth = await getAuthContext();
    if (!auth) {
      return validationErrorResponse('Authentication required');
    }

    const person = await peopleRepository.getPersonById(params.id, auth.organizationId);
    if (!person) {
      return notFoundResponse('Person');
    }

    return successResponse(person);
  } catch (error) {
    console.error('[GET /api/people/:id]', error);
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
    const validated = updatePersonSchema.safeParse(body);

    if (!validated.success) {
      return validationErrorResponse(
        validated.error.errors.map((e) => `${e.path}: ${e.message}`).join(', ')
      );
    }

    const person = await peopleRepository.updatePerson(params.id, auth.organizationId, validated.data);
    if (!person) {
      return notFoundResponse('Person');
    }

    return successResponse(person);
  } catch (error) {
    console.error('[PATCH /api/people/:id]', error);
    return internalErrorResponse();
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const auth = await getAuthContext();
    if (!auth) {
      return validationErrorResponse('Authentication required');
    }

    const person = await peopleRepository.deletePerson(params.id, auth.organizationId);
    if (!person) {
      return notFoundResponse('Person');
    }

    return successResponse({ id: person.id });
  } catch (error) {
    console.error('[DELETE /api/people/:id]', error);
    return internalErrorResponse();
  }
}
