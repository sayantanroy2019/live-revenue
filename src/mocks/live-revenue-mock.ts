import { IEventTransactionResponse, ITransactions } from '@/src/types/live-revenue-types';

/**
 * Mock data for the Live Revenue dashboard.
 *
 * Served by the route handlers under `src/app/liverevenue/…` so the UI works
 * without a backend. When `NEXT_PUBLIC_API_BASE_URL` is set, axios calls the
 * real backend instead and these mocks are never hit.
 *
 * Numbers are internally consistent:
 *   - topups list sums to `topups.total_top_up_amount` / `no_of_topups`
 *   - redemptions list sums to `redemptions.total_redemption_amount` / `total_rfid_sales`
 *   - left_over = balance − redemptions − onsite refunds − wipe card
 */

export const MOCK_EVENT_ID = 'demo-event';

const EVENT_START = '2026-09-18T12:00:00.000Z';
const EVENT_END = '2026-09-21T23:59:59.000Z';
const EVENT_DAYS = 4;
const DAY_MS = 24 * 60 * 60 * 1000;

const BASE_TRANSACTIONS: ITransactions = {
  startDate: EVENT_START,
  endDate: EVENT_END,
  topups: {
    total_top_up_amount: 4_295_460,
    no_of_topups: 8_742,
    card_fees: 128_400,
    balance: 4_167_060,
    total_upi_payment_amount: 2_451_300,
    total_card_payment_amount: 1_092_860,
    total_cash_payment_amount: 751_300,
  },
  redemptions: {
    total_redemption_amount: 3_612_845,
    total_rfid_sales: 21_318,
  },
  left_over_amount: 300_565,
  onsite_refunds: {
    total_amount: 212_400,
    cards_count: 618,
  },
  wipe_card: {
    total_amount: 41_250,
    cards_count: 133,
  },
  total_online_refund_amount: 96_750,
};

/** Shape consumed by `view-all-topups-modal.tsx` (it expects a plain array). */
export interface IMockTopupRow {
  name: string;
  total_sales: number;
  topup_amount: number;
}

export const MOCK_TOPUPS: IMockTopupRow[] = [
  { name: 'Gate A – Counter 1', total_sales: 1_412, topup_amount: 698_500 },
  { name: 'Gate A – Counter 2', total_sales: 1_286, topup_amount: 631_200 },
  { name: 'Gate B – Counter 1', total_sales: 1_104, topup_amount: 542_900 },
  { name: 'Gate B – Counter 2', total_sales: 987, topup_amount: 486_300 },
  { name: 'VIP Lounge Desk', total_sales: 356, topup_amount: 412_800 },
  { name: 'Online Pre-Topup', total_sales: 2_148, topup_amount: 1_053_760 },
  { name: 'Roaming Team 1', total_sales: 812, topup_amount: 298_400 },
  { name: 'Roaming Team 2', total_sales: 637, topup_amount: 171_600 },
];

/** Shape consumed by `view-all-redemptions-modal.tsx` (it expects a plain array). */
export interface IMockRedemptionRow {
  name: string;
  machines_count: number;
  total_orders: number;
  total_sale: number;
}

export const MOCK_REDEMPTIONS: IMockRedemptionRow[] = [
  { name: 'Food Court – North', machines_count: 6, total_orders: 4_812, total_sale: 1_086_400 },
  { name: 'Food Court – South', machines_count: 5, total_orders: 3_974, total_sale: 862_150 },
  { name: 'Beverage Bar 1', machines_count: 4, total_orders: 5_206, total_sale: 718_900 },
  { name: 'Beverage Bar 2', machines_count: 3, total_orders: 3_415, total_sale: 471_320 },
  { name: 'Merch Store', machines_count: 2, total_orders: 1_268, total_sale: 306_475 },
  { name: 'Dessert Kiosk', machines_count: 2, total_orders: 1_642, total_sale: 98_200 },
  { name: 'Water Station', machines_count: 3, total_orders: 1_001, total_sale: 69_400 },
];

/**
 * Scale every numeric figure so the date filter visibly changes the dashboard.
 * A one-day range shows roughly a quarter of the four-day totals.
 */
const scaleTransactions = (t: ITransactions, factor: number): ITransactions => {
  const s = (n: number) => Math.round(n * factor);
  return {
    ...t,
    topups: {
      total_top_up_amount: s(t.topups.total_top_up_amount),
      no_of_topups: s(t.topups.no_of_topups),
      card_fees: s(t.topups.card_fees),
      balance: s(t.topups.balance),
      total_upi_payment_amount: s(t.topups.total_upi_payment_amount),
      total_card_payment_amount: s(t.topups.total_card_payment_amount),
      total_cash_payment_amount: s(t.topups.total_cash_payment_amount),
    },
    redemptions: {
      total_redemption_amount: s(t.redemptions.total_redemption_amount),
      total_rfid_sales: s(t.redemptions.total_rfid_sales),
    },
    left_over_amount: s(t.left_over_amount),
    onsite_refunds: {
      total_amount: s(t.onsite_refunds.total_amount),
      cards_count: s(t.onsite_refunds.cards_count),
    },
    wipe_card: {
      total_amount: s(t.wipe_card.total_amount),
      cards_count: s(t.wipe_card.cards_count),
    },
    total_online_refund_amount: s(t.total_online_refund_amount),
  };
};

export const getMockLiveRevenue = ({
  eventId,
  startDate,
  endDate,
}: {
  eventId: string;
  startDate?: string;
  endDate?: string;
}): IEventTransactionResponse => {
  let transactions = BASE_TRANSACTIONS;

  const start = startDate ? new Date(startDate) : undefined;
  const end = endDate ? new Date(endDate) : start;

  if (start && end && !isNaN(start.getTime()) && !isNaN(end.getTime()) && end >= start) {
    const days = Math.floor((end.getTime() - start.getTime()) / DAY_MS) + 1;
    const factor = Math.min(1, days / EVENT_DAYS);
    transactions = {
      ...scaleTransactions(BASE_TRANSACTIONS, factor),
      startDate: start.toISOString(),
      endDate: end.toISOString(),
    };
  }

  return {
    event: {
      id: eventId,
      name: 'Cirkle Music Festival 2026 · Demo Data',
      startDate: EVENT_START,
      endDate: EVENT_END,
    },
    transactions,
  };
};
