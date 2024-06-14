"use client"

import { createContext, useState, useCallback, useEffect } from "react"
import { Keplr,Key,OfflineAminoSigner,OfflineDirectSigner} from '@keplr-wallet/types';
import { useChain } from "../hooks/useChain";
import { quoterContract } from "@/contract";
import { useContractRead } from "@/hooks/useContractRead";
import { useContractWrite } from "@/hooks/useContractWrite";


export type BlockChainContext ={
	address: string | undefined,
	signer: (OfflineAminoSigner & OfflineDirectSigner) | undefined,
	pools: any[],
	positions:any[],
	
	
	connect:() => Promise<Key | undefined>,
	lend: (market: any,amount:string) => Promise<{
		transferData: any;
		depositData: any;
	} | undefined>
	
}

interface BlockChainContextProviderProps {
	children: JSX.Element | JSX.Element[]
}


export const BlockChainContext = createContext({} as BlockChainContext)

export function BlockChainProvider({children}:BlockChainContextProviderProps) {

	
	const {res:[chain,asset,config],error} = useChain("mantrachaintestnet")
	const _chain_id = chain?.chain_id

	const [address,setAddress] = useState<string>("")
	const [signer,setSigner] = useState<OfflineAminoSigner&OfflineDirectSigner>()

	const [pools,setPools] = useState<any[]>([])
	const [positions,setPositions] = useState<any[]>([])


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


	const getPools = async (address:string,id:number) => {

		if(!signer){
			console.log("Please connect wallet")
			return undefined
		}

		const {data:poolConfig,error:poolConfigError} = await useContractRead({
			contractAddress: quoterContract.address,
			query:{
				poolConfig:{}
			},
			signer
		})

		const {data:totalAssets,error:totalAssetsError} = await useContractRead({
			contractAddress: quoterContract.address,
			query:{
				getTotalAssetAvailable:{}
			},
			signer
		})

		const {data:totalCollateral,error:totalCollateralError} = await useContractRead({
			contractAddress: quoterContract.address,
			query:{
				getTotalCollateralAvailable:{}
			},
			signer
		})

		if(poolConfigError||totalAssetsError||totalCollateralError){

			console.log(
				"poolConfigError",poolConfigError,
				"totalAssetsError",totalAssetsError,
				"totalCollateralError",totalCollateralError
			)

			return undefined
		}

		const pool = {
			id,
			...poolConfig.res,
			totalAssets:totalAssets.res,
			totalCollateral:totalCollateral.res
		}

		return pool
	}


	const getPositions = async (market:any) => {

		if(!signer){
			console.log("Please connect wallet")
			return undefined
		}

		if(!address){
			console.log("Please connect wallet")
			return undefined
		}

		const {data:withdrawablePositions,error:withdrawablePositionsError} = await useContractRead({
			contractAddress: quoterContract.address,
			query:{
				getWithdrawablePositions:{
					user:address
				}
			},
			signer
		})

		const {data:repayablePositions,error:repayablePositionsError} = await useContractRead({
			contractAddress: quoterContract.address,
			query:{
				getTotalAssetAvailable:{
					user:address
				}
			},
			signer
		})


		if(withdrawablePositionsError||repayablePositionsError){

			console.log(
				"withdrawablePositionsError",withdrawablePositionsError,
				"repayablePositionsError",repayablePositionsError,
			)

			return undefined
		}

		console.log(
			"withdrawablePositions",withdrawablePositions,
			"repayablePositions",repayablePositions,
		)


		return{
			repayablePositions:repayablePositions.res,
			withdrawablePositions:withdrawablePositions.res
		}

		
	}

	const lend = async(market:any,amount:string) =>{

		if(!signer){
			console.log("No Wallet Connected")
			return
		}

		if(!address){
			console.log("No Wallet Connected")
			return
		}

		const {data:transferData,error:transferError} = await useContractWrite({
			senderAddress:address,
			contractAddress:"mantra1c0wehfltspqczqmgv86nn0asf5jstld0yvqzzjtsavsn7pgzakusqa77lj",
			args: { 
				transfer:{ 
					amount,
					recipient:quoterContract.address
				}
			},
			signer
		})

		const {data:depositData,error:depositError} = await useContractWrite({
			senderAddress:address,
			contractAddress:quoterContract.address,
			args: { 
				transact:{
					deposit:{
						denom: "mantra1c0wehfltspqczqmgv86nn0asf5jstld0yvqzzjtsavsn7pgzakusqa77lj", 
						amount,
					}
				}
			},
			signer
		})

		if(depositError||transferError){
			console.log(
				"transferError",transferError,
				"depositError",depositError
			)
			return undefined
		}

		return {
			transferData,
			depositData
		}
	}


	useEffect(()=>{
		(async()=>{
			let pool;
			pool = await getPools("",0)
			if(pool){
				setPools([
					pool
				])
			}
		})()
	},[signer])


	useEffect(()=>{
		(async()=>{
			let positionsData:any[] = []
			pools.forEach(async(market,index)=>{
				const data = await getPositions(market)
				if(data){	
					if(data.repayablePositions[0]!=='0'||data.repayablePositions[1]!=='0')
						positionsData.push({
							id:index,
							asset:market?.asset,
							collateral:market?.collateral,
							strikeprice:market?.strikeprice,
							maturity: market?.maturationdate,
							type: "Lend",
							principle:data.repayablePositions[0],
							interest:data.repayablePositions[1],
						})


					// positionsData.push({
					// 	asset:market?.asset,
					// 	collateral:market?.collateral,
					// 	strikeprice:market?.strikeprice,
					// 	maturity: market?.maturationdate,
					// 	type: "BORROW"
					// })
				}
			})

			setPositions(positionsData)
		})()
	},[pools])

	

	return (
		<BlockChainContext.Provider value={{
			address,
			signer,
			pools,
			positions,

			connect,
			lend
		}}>
			{children}
		</BlockChainContext.Provider>
	)
}