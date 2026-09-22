import { redirect } from 'next/navigation';

import { MOCK_EVENT_ID } from '@/src/mocks/live-revenue-mock';

/**
 * There is no standalone home page; send visitors straight to the demo event
 * so `http://localhost:3000/` no longer 404s.
 */
export default function Home() {
  redirect(`/live-revenue/${MOCK_EVENT_ID}`);
}
