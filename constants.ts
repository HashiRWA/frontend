export const rpcURL = "https://rpc.hongbai.mantrachain.io";


export const WhitelistedTokenAddresses = {
  "mantra1nmd4qky3xdp5eu2rxw20kx32hcjg5sym527qmg7gfyut096st8kq9req6k" : 
    {
      address: "mantra1nmd4qky3xdp5eu2rxw20kx32hcjg5sym527qmg7gfyut096st8kq9req6k",
      name: "GOLD RWA",
      symbol: "GB-RWA",
      decimals: 6
    },
    "mantra10f64xuhs0un4veyw06n0tvtx522ynu4f868re3dgwmgzne5k53zs0wa4yd" : 
    {
        address: "mantra10f64xuhs0un4veyw06n0tvtx522ynu4f868re3dgwmgzne5k53zs0wa4yd",
        name: "Silver RWA",
        symbol: "SL-RWA",
        decimals: 6
    }
,
    "mantra1gnlxsl77a5gkj8jlzv9gwasxcdc54qaenfzn40tcrkldeze9y9uqjrrsyw" : 
    {
      address: "mantra1gnlxsl77a5gkj8jlzv9gwasxcdc54qaenfzn40tcrkldeze9y9uqjrrsyw",
      name: "Wheat RWA",
      symbol: "WH-RWA",
      decimals: 6
    },
    "mantra1yh6gt9uqmj38haeh2vfjpvtcgfgm5mrx8llgwjpre8k4r3uftm4q3mrmmr" : 
    {
        address: "mantra1yh6gt9uqmj38haeh2vfjpvtcgfgm5mrx8llgwjpre8k4r3uftm4q3mrmmr",
        name: "Platinum RWA",
        symbol: "PL-RWA",
        decimals: 6
    }
,
    "mantra1uaffqwv8qjtpznvh6unyzt7wqwsexhlmayc0xfpgkxtrjs88lmqqqns844" : 
    {
      address: "mantra1uaffqwv8qjtpznvh6unyzt7wqwsexhlmayc0xfpgkxtrjs88lmqqqns844",
      name: "Brass RWA",
      symbol: "BR-RWA",
      decimals: 6
    },
    "mantra18llpcz0xfwhk56lj6wzvakda465fnlnmxty7a7zfwaup79gxa6wqcmgfds" : 
    {
        address: "mantra18llpcz0xfwhk56lj6wzvakda465fnlnmxty7a7zfwaup79gxa6wqcmgfds",
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