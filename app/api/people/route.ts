import { NextRequest } from 'next/server';
import { getAuthContext } from '@/lib/api/auth';
import { successResponse, listResponse, validationErrorResponse, notFoundResponse, internalErrorResponse } from '@/lib/api/responses';
import { createPersonSchema, searchPeopleSchema } from '@/lib/validation';
import * as peopleRepository from '@/lib/repositories/people';
import * as companyRepository from '@/lib/repositories/company';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const auth = await getAuthContext();
    if (!auth) {
      return validationErrorResponse('Authentication required');
    }

    const { searchParams } = new URL(request.url);
    const query = searchParams.get('query');
    const company_id = searchParams.get('company_id');
    const seniority = searchParams.get('seniority') as any;
    const page = Math.max(1, parseInt(searchParams.get('page') || '1', 10));
    const limit = Math.min(100, parseInt(searchParams.get('limit') || '20', 10));

    const validated = searchPeopleSchema.safeParse({
      query,
      company_id,
      seniority,
      page,
      limit,
    });

    if (!validated.success) {
      return validationErrorResponse(
        validated.error.errors.map((e) => `${e.path}: ${e.message}`).join(', ')
      );
    }

    const people = await peopleRepository.searchPeople(auth.organizationId, validated.data);
    const total = await peopleRepository.getPeopleCount(auth.organizationId);

    return listResponse(people, page, limit, total);
  } catch (error) {
    console.error('[GET /api/people]', error);
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
    const validated = createPersonSchema.safeParse(body);

    if (!validated.success) {
      return validationErrorResponse(
        validated.error.errors.map((e) => `${e.path}: ${e.message}`).join(', ')
      );
    }

    // Verify company exists and belongs to organization
    const company = await companyRepository.getCompanyById(validated.data.company_id, auth.organizationId);
    if (!company) {
      return notFoundResponse('Company');
    }

    const person = await peopleRepository.createPerson(auth.organizationId, validated.data);

    return successResponse(person, 201);
  } catch (error) {
    console.error('[POST /api/people]', error);
    return internalErrorResponse();
  }
}
