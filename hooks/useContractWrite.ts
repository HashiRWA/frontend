import { SigningCosmWasmClient } from "@cosmjs/cosmwasm-stargate"
import { OfflineAminoSigner, OfflineDirectSigner } from "@keplr-wallet/types"
import { GasPrice } from "@cosmjs/stargate"

export interface ContractConfig {
    senderAddress: string,
	contractAddress: string,
	args: any
	signer:OfflineDirectSigner
}

export async function useContractWrite({
    senderAddress,
	contractAddress,
	args,
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
		console.log("No Contract Address Provided")
		return {
			data:undefined,
			error:"NO_ADDR_PROVIDED",
			isPending
		} 
	}

    if(!senderAddress){
		console.log("No Sender Address Provided")
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

		const res = await client.execute(
            senderAddress,
			contractAddress, 
			args,
            "auto",
            "",
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

