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
  asset:string,
  collateral:string,
  strikeprice:string,
  maturity: number
  type: "Lend"|"Borrow",
  principle:number,
  interest:number,
}
