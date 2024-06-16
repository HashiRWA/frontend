
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


export const marketAddresses = [
  "mantra1gj4pzlcwugsan5tp492p3rqh5f7dpynvcx8ngk2uye8yvlgjsgeqx2uxe8",
  "mantra1thhh6udvmpghhh3j0k5qkjpzjvete6hjvm7zss05gh9tua79wgkqx9eelp",
  "mantra1g8yjhsthsmyflefs7wv2zw2dr5z2t5lexke85vln2wd9g9h9ckmq7hj4pt",
  "mantra173xju83s09skkzfa5geygyc5hsc77y5gneycw9uw5t00zv4alalsng70vu",
  "mantra1sjufd09aqs52frl5cvt65mqgpzfp05kqqxlawfcz2lxwl5xvcmmqkfmt4c",
]