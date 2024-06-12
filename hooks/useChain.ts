import { assets, chains } from "chain-registry"
import { chainRegistryChainToKeplr } from "@chain-registry/keplr"
import { ChainInfo } from "@keplr-wallet/types"
 

export function useChain(name:string):{
	res: [
		typeof chains[number] | undefined,
		typeof assets[number] | undefined,
		ChainInfo | undefined
	],
	error : string | undefined
}{

	const chain = chains?.find(({chain_name})=>chain_name==name)
	const asset = assets?.find(({chain_name})=>chain_name==name)


	if(chain){
		const config: ChainInfo = chainRegistryChainToKeplr(chain , assets, {
			getRestEndpoint: (chain) => chain.apis?.rest?.[1]?.address as string,
			getRpcEndpoint: (chain) => chain.apis?.rpc?.[1]?.address as string
		})

		return {
			res: [
				chain,
				asset,
				config,
			],
			error: undefined
		}
	}

	return {
		res: [
			undefined, 
			undefined, 
			undefined
		],
		error: "NOT_FOUND"
	}
	
}

