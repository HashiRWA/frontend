
export const rpcURL = "https://rpc.hongbai.mantrachain.io";


export const WhitelistedTokenAddresses = {
  "mantra15cxyuljght67pazn72kggeqa6ejj7f6gpeypa8yw6tzm95qr0cksq7css2" : 
    {
      address: "mantra15cxyuljght67pazn72kggeqa6ejj7f6gpeypa8yw6tzm95qr0cksq7css2",
      name: "GOLD BOND RWA TOKEN",
      symbol: "GB-RWA",
      decimals: 6
    },
    "mantra1c0wehfltspqczqmgv86nn0asf5jstld0yvqzzjtsavsn7pgzakusqa77lj" : 
    {
        address: "mantra1c0wehfltspqczqmgv86nn0asf5jstld0yvqzzjtsavsn7pgzakusqa77lj",
        name: "USDC Coin",
        symbol: "USDC",
        decimals: 6
    }
};


export const getTokenDetails = (address: string) : {
  address: string;
  name: string;
  symbol: string;
  decimals: number;
} => {
  // @ts-ignore
  return WhitelistedTokenAddresses[address];
}
