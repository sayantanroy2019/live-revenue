import { NextResponse } from 'next/server';

import { MOCK_REDEMPTIONS } from '@/src/mocks/live-revenue-mock';

export const dynamic = 'force-dynamic';

/** Mock for `GET /liverevenue/:eventId/redemptions`. */
export async function GET() {
  return NextResponse.json(MOCK_REDEMPTIONS, { headers: { 'x-mock-data': 'true' } });
}
