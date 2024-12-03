export interface IOrder {
  productCount: number;
  title: string;
  id: number;
  date: Date;
  totalUAH: number;
  totalUSD: number;
  description: string | null;
}
