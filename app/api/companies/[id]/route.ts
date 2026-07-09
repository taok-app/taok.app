import { NextRequest } from 'next/server';
import { getAuthContext } from '@/lib/api/auth';
import { successResponse, validationErrorResponse, notFoundResponse, internalErrorResponse } from '@/lib/api/responses';
import { updateCompanySchema } from '@/lib/validation';
import * as companyRepository from '@/lib/repositories/company';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const auth = await getAuthContext();
    if (!auth) {
      return validationErrorResponse('Authentication required');
    }

    const company = await companyRepository.getCompanyById(params.id, auth.organizationId);
    if (!company) {
      return notFoundResponse('Company');
    }

    return successResponse(company);
  } catch (error) {
    console.error('[GET /api/companies/:id]', error);
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
    const validated = updateCompanySchema.safeParse(body);

    if (!validated.success) {
      return validationErrorResponse(
        validated.error.errors.map((e) => `${e.path}: ${e.message}`).join(', ')
      );
    }

    const company = await companyRepository.updateCompany(params.id, auth.organizationId, validated.data);
    if (!company) {
      return notFoundResponse('Company');
    }

    return successResponse(company);
  } catch (error) {
    console.error('[PATCH /api/companies/:id]', error);
    return internalErrorResponse();
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const auth = await getAuthContext();
    if (!auth) {
      return validationErrorResponse('Authentication required');
    }

    const company = await companyRepository.deleteCompany(params.id, auth.organizationId);
    if (!company) {
      return notFoundResponse('Company');
    }

    return successResponse({ id: company.id });
  } catch (error) {
    console.error('[DELETE /api/companies/:id]', error);
    return internalErrorResponse();
  }
}
