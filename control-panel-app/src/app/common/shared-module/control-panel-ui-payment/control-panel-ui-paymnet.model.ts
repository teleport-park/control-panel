export interface Payment {
  index: number;
  id: number;
  amount: number;
  currency: 'BYN' | 'COIN';
  children?: {name: string, amount: number, currency: 'COIN' | 'BYN'}[];
}
