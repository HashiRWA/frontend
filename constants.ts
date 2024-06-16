export const rpcURL = "https://rpc.hongbai.mantrachain.io";

export const marketAddresses = [
  "mantra1u2g05v64gkxlfc0tkjr25zkv6e0cm84cd2qww8kze0h30g29ayysc9wmgj", // GOLD
  "mantra1ez5qtq6n5r6290hg84gjd5cgssm2wqly3vshdymw96xf9ueexcsqs39hdx", // Silver
  "mantra1rxu3a0tm5anemx74pnd9g0t0n8kpk92275j7dls6dcl0kh2559ssv54a8p", // Wheat
  "mantra14yple7m86xzakwnm5ewum9tunpcmlxs78w8reh5t96529znr532s2p6zjh", // Platinum
  "mantra1pszvvktakz5p2u485jpacs80nwfe2mpwpxl3nm7n5zhxvxstyg7suwga8v"  // Brass
];

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