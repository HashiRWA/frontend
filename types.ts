export interface Market {
  id: number;
  asset: string;
  collateral: string;
  liquidity: number;
  totalVolume: number;
  transitionPrice: number;
  tvl: number;
  apr: number;
  cdp: number;
  maturity: string;
}

export interface Position {
  id: number;
  type: string;
  asset: string;
  collateral: string;
  tp: number;
  maturity: string;
}
