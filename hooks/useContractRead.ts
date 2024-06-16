import { SigningCosmWasmClient } from "@cosmjs/cosmwasm-stargate"
import { OfflineAminoSigner, OfflineDirectSigner } from "@keplr-wallet/types"
import { GasPrice } from "@cosmjs/stargate"

export interface ContractConfig {
	contractAddress: string,
	query: any
	signer:OfflineDirectSigner
}

export async function useContractRead({
	contractAddress,
	query,
	signer
}:ContractConfig): Promise<{
	data:any,
	error:unknown|undefined,
	isPending:boolean,
}> {

	let isPending = true

	if(!signer){
		console.log("No Valid Signer")
		return {
			data:undefined,
			error:"NO_VALID_SIGNER",
			isPending
		} 
	}

	if(!contractAddress){
		console.log("No Address Provided")
		return {
			data:undefined,
			error:"NO_ADDR_PROVIDED",
			isPending
		} 
	}


	const client = await SigningCosmWasmClient.connectWithSigner(
		"https://rpc.hongbai.mantrachain.io",
		signer as OfflineDirectSigner & OfflineAminoSigner,
		{
			gasPrice: GasPrice.fromString("0.01uom"),
		}
	)

	try{

		const res = await client.queryContractSmart(
			contractAddress, 
			query
		)

		return {
			data:{
				res
			},
			error:undefined,
			isPending:false
		}

	}
	catch(error:unknown){

		return {
			data:undefined,
			error,
			isPending
		}
		
	}

	
}

