import { NextRequest, NextResponse } from 'next/server';

import { getMockLiveRevenue } from '@/src/mocks/live-revenue-mock';

export const dynamic = 'force-dynamic';

/**
 * Mock for `GET /liverevenue/:eventId?startDate=&endDate=`.
 * Only reached when `NEXT_PUBLIC_API_BASE_URL` is unset, because axios then
 * sends requests to this Next.js server instead of the real backend.
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ eventId: string }> }
) {
  const { eventId } = await params;
  const startDate = request.nextUrl.searchParams.get('startDate') ?? undefined;
  const endDate = request.nextUrl.searchParams.get('endDate') ?? undefined;

  return NextResponse.json(getMockLiveRevenue({ eventId, startDate, endDate }), {
    headers: { 'x-mock-data': 'true' },
  });
}
