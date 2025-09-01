export interface BillingRecord {
  id?: number;
  name: string;
  chargeType?: string;
  amount: number | null | undefined;
  currency?: string;
  active: boolean;
}
