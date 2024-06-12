"use client"

import { createContext, useState } from "react"
import { Keplr,Key,OfflineAminoSigner,OfflineDirectSigner} from '@keplr-wallet/types';
import { useChain } from "@/hooks/useChain";

export type AuthContext ={
	connect:() => Promise<Key | undefined>,
	address: string | undefined,
	signer: (OfflineAminoSigner & OfflineDirectSigner) | undefined
}

interface AuthContextProviderProps {
	children: JSX.Element | JSX.Element[]
}


export const AuthContext = createContext({} as AuthContext)

export function AuthProvider({children}:AuthContextProviderProps) {

	
	const {res:[chain,asset,config],error} = useChain("mantrachaintestnet")
	const _chain_id = chain?.chain_id

	const [address,setAddress] = useState<string>("")
	const [signer,setSigner] = useState<OfflineAminoSigner&OfflineDirectSigner>()


	const _get_keplr = async ():Promise<Keplr|undefined> => {

		if (window.keplr) {
			return window.keplr
		}
		
		if (document.readyState === "complete") {
			return window.keplr
		}
		
		return new Promise((resolve) => {
			const documentStateChange = (event: Event) => {
				if (
					event.target &&
					(event.target as Document).readyState === "complete"
				) {
					resolve(window.keplr)
					document.removeEventListener("readystatechange", documentStateChange)
				}
			}
			
			document.addEventListener("readystatechange", documentStateChange)
		})
	}

	const connect = async ():Promise<Key|undefined> => {

		const keplr =  await _get_keplr()

		if(!keplr) {
			alert("Please install keplr extension")
			return undefined
		}

		if(!_chain_id){
			alert("500 CHAIN_NOT_FOUND")
			return undefined
		}

		await keplr.enable(_chain_id)
		const account =  await keplr.getKey(_chain_id)
		const offlineSigner = keplr.getOfflineSigner(_chain_id)

		setSigner(offlineSigner)
		setAddress(account?.bech32Address)
		
		return account
	}
	

	return (
		<AuthContext.Provider value={{
			connect,
			address,
			signer
		}}>
			{children}
		</AuthContext.Provider>
	)
}