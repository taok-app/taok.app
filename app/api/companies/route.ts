import { NextRequest } from 'next/server';
import { getAuthContext } from '@/lib/api/auth';
import { successResponse, listResponse, validationErrorResponse, notFoundResponse, internalErrorResponse } from '@/lib/api/responses';
import { createCompanySchema, searchCompaniesSchema } from '@/lib/validation';
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
    const industry = searchParams.get('industry');
    const location = searchParams.get('location');
    const domain = searchParams.get('domain');
    const page = Math.max(1, parseInt(searchParams.get('page') || '1', 10));
    const limit = Math.min(100, parseInt(searchParams.get('limit') || '20', 10));

    const validated = searchCompaniesSchema.safeParse({
      query,
      industry,
      location,
      domain,
      page,
      limit,
    });

    if (!validated.success) {
      return validationErrorResponse(
        validated.error.errors.map((e) => `${e.path}: ${e.message}`).join(', ')
      );
    }

    const companies = await companyRepository.searchCompanies(auth.organizationId, validated.data);
    const total = await companyRepository.getCompanyCount(auth.organizationId);

    return listResponse(companies, page, limit, total);
  } catch (error) {
    console.error('[GET /api/companies]', error);
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
    const validated = createCompanySchema.safeParse(body);

    if (!validated.success) {
      return validationErrorResponse(
        validated.error.errors.map((e) => `${e.path}: ${e.message}`).join(', ')
      );
    }

    const company = await companyRepository.createCompany(auth.organizationId, validated.data);

    return successResponse(company, 201);
  } catch (error) {
    console.error('[POST /api/companies]', error);
    return internalErrorResponse();
  }
}
