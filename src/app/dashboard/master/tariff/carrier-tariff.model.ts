export interface CarrierTariff {
  id: number;
  clientName: string;   // 👈 add this
  carrier: string;
  origin: string;
  destination: string;
  rate: number;
  currency: string;
  effectiveDate: Date;
  expiryDate?: Date;
}
