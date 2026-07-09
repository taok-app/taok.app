import { NextRequest, NextResponse } from 'next/server';

interface ApiErrorResponse {
  success: false;
  error: {
    type: 'UNAUTHORIZED' | 'FORBIDDEN' | 'VALIDATION_ERROR' | 'NOT_FOUND' | 'INTERNAL_ERROR';
    message: string;
  };
}

interface ApiSuccessResponse<T> {
  success: true;
  data: T;
}

interface ApiListResponse<T> {
  success: true;
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
  };
}

export type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse;
export type ApiListResponseType<T> = ApiListResponse<T> | ApiErrorResponse;

export function successResponse<T>(data: T, status = 200): NextResponse<ApiSuccessResponse<T>> {
  return NextResponse.json({ success: true, data }, { status });
}

export function listResponse<T>(
  data: T[],
  page: number,
  limit: number,
  total: number,
  status = 200
): NextResponse<ApiListResponse<T>> {
  return NextResponse.json(
    {
      success: true,
      data,
      pagination: { page, limit, total },
    },
    { status }
  );
}

export function errorResponse(
  type: ApiErrorResponse['error']['type'],
  message: string,
  status = 400
): NextResponse<ApiErrorResponse> {
  return NextResponse.json(
    {
      success: false,
      error: { type, message },
    },
    { status }
  );
}

export function unauthorizedResponse(): NextResponse<ApiErrorResponse> {
  return errorResponse('UNAUTHORIZED', 'Authentication required', 401);
}

export function forbiddenResponse(): NextResponse<ApiErrorResponse> {
  return errorResponse('FORBIDDEN', 'Access denied', 403);
}

export function validationErrorResponse(message: string): NextResponse<ApiErrorResponse> {
  return errorResponse('VALIDATION_ERROR', message, 400);
}

export function notFoundResponse(resource = 'Resource'): NextResponse<ApiErrorResponse> {
  return errorResponse('NOT_FOUND', `${resource} not found`, 404);
}

export function internalErrorResponse(): NextResponse<ApiErrorResponse> {
  return errorResponse('INTERNAL_ERROR', 'Internal server error', 500);
}
