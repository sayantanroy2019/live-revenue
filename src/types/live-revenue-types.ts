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
