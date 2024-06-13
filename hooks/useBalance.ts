import { SigningCosmWasmClient } from "@cosmjs/cosmwasm-stargate"
import { OfflineAminoSigner, OfflineDirectSigner } from "@keplr-wallet/types"
import { GasPrice } from "@cosmjs/stargate"

export interface ContractConfig {
    address: string,
	denom: string,
	signer:OfflineDirectSigner
}

export async function useBalance({
    address,
	denom,
    signer
}:ContractConfig): Promise<{
	balance:string|undefined,
	error:unknown|undefined,
}> {

	if(!signer){
		console.log("No Valid Signer")
		return {
			balance:undefined,
			error:"NO_VALID_SIGNER",
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

		const res = await client.getBalance(
            address,
            denom
		)

		return {
			balance: res?.amount,
			error:undefined,
		}

	}
	catch(error:unknown){
		return {
			balance:undefined,
			error,
		}
	}
	
}

