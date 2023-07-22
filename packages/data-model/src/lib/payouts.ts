export interface PayoutsResponse {
  total: number;
  equalShare: number;
  payouts: Payout[];
}

export interface Payout {
  owes: string;
  owed: string;
  amount: number;
}
