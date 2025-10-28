export interface ITopupsCardData {
  total_top_up_amount: number;
  no_of_topups: number;
  card_fees: number;
  balance: number;
  total_upi_payment_amount: number;
  total_card_payment_amount: number;
  total_cash_payment_amount: number;
}

export interface IRedemptionsData {
  total_redemption_amount: number;
  total_rfid_sales: number;
}

export interface IOnSiteRefundData {
  total_amount: number;
  cards_count: number;
}

export interface IWipeCardData {
  total_amount: number;
  cards_count: number;
}

export interface LiveRevenue {
  topups: ITopupsCardData;
  redemptions: IRedemptionsData;
  left_over_amount: number;
  onsite_refunds: IOnSiteRefundData;
  wipe_card: IWipeCardData;
  total_online_refund_amount: number;
}

// Event details
export interface IEvent {
  id: string;
  name: string;
  startDate: string; // ISO date string
  endDate: string; // ISO date string
}

// Top-up related statistics
export interface ITopups {
  total_top_up_amount: number;
  no_of_topups: number;
  card_fees: number;
  balance: number;
  total_upi_payment_amount: number;
  total_card_payment_amount: number;
  total_cash_payment_amount: number;
}

// Redemption-related statistics
export interface IRedemptions {
  total_redemption_amount: number;
  total_rfid_sales: number;
}

// Refunds and wipe card info
export interface IOnsiteRefunds {
  total_amount: number;
  cards_count: number;
}

export interface IWipeCard {
  total_amount: number;
  cards_count: number;
}

// Transaction summary section
export interface ITransactions {
  startDate: string;
  endDate: string;
  topups: ITopups;
  redemptions: IRedemptions;
  left_over_amount: number;
  onsite_refunds: IOnsiteRefunds;
  wipe_card: IWipeCard;
  total_online_refund_amount: number;
}

// Full API response
export interface IEventTransactionResponse {
  event: IEvent;
  transactions: ITransactions;
}
