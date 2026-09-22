import { NextResponse } from 'next/server';

import { MOCK_TOPUPS } from '@/src/mocks/live-revenue-mock';

export const dynamic = 'force-dynamic';

/** Mock for `GET /liverevenue/:eventId/topups`. */
export async function GET() {
  return NextResponse.json(MOCK_TOPUPS, { headers: { 'x-mock-data': 'true' } });
}
