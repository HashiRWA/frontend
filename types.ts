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
  id:string,
  asset:string,
  collateral:string,
  strikeprice:string,
  maturity: number,
  name:string,
  type: "Lend"|"Borrow",
  principle:number,
  interest:number,
}
