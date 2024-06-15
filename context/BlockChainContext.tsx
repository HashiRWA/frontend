"use client"

import { createContext, useState, useCallback, useEffect } from "react"
import { Keplr,Key,OfflineAminoSigner,OfflineDirectSigner} from '@keplr-wallet/types';
import { useChain } from "../hooks/useChain";
import { useContractRead } from "@/hooks/useContractRead";
import { useContractWrite } from "@/hooks/useContractWrite";
import { useGiveApproval } from "@/hooks/useGiveApproval";


export type BlockChainContext ={
	address: string | undefined,
	signer: (OfflineAminoSigner & OfflineDirectSigner) | undefined,
	pools: any[],
	positions:any[],
	loading:boolean
	
	
	connect:() => Promise<Key | undefined>,
	lend: (market: any,amount:string) => Promise<{
		transferData: any;
		depositData: any;
	} | undefined>
	borrow: (market: string, amount: string) => Promise<{
		borrowData: any;
	} | undefined>
	withdraw: (contractAddress: string, amount: string) => Promise<{
		closeLendData: any;
	} | undefined>
	withdrawInterest: (contractAddress: string) => Promise<{
		closeLendData: any;
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
	const [loading, setLoading] = useState<boolean>(false)


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

	const getPools = async (contractAddress:string,id:string) => {

		if(!signer){
			console.log("Please connect wallet")
			return undefined
		}

		const {data:poolConfig,error:poolConfigError} = await useContractRead({
			contractAddress: contractAddress,
			query:{
				poolConfig:{}
			},
			signer
		})

		const {data:totalAssets,error:totalAssetsError} = await useContractRead({
			contractAddress: contractAddress,
			query:{
				getTotalAssetAvailable:{}
			},
			signer
		})

		const {data:totalCollateral,error:totalCollateralError} = await useContractRead({
			contractAddress: contractAddress,
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
			contractAddress: market.id,
			query:{
				getWithdrawablePositions:{
					user:address
				}
			},
			signer
		})

		const {data:repayablePositions,error:repayablePositionsError} = await useContractRead({
			contractAddress: market.id,
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

		setLoading(true)

		if(!signer){
			console.log("No Wallet Connected")
			setLoading(false)
			return
		}

		if(!address){
			console.log("No Wallet Connected")
			setLoading(false)
			return
		}


		const {data:transferData,error:transferError} = await useGiveApproval({
			senderAddress:address,
			contractAddress:market,
			signer,
		})

		const {data:depositData,error:depositError} = await useContractWrite({
			senderAddress:address,
			contractAddress:market,
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
			setLoading(false)
			return undefined
		}

		setLoading(false)

		return {
			transferData,
			depositData
		}
	}

	const borrow = async(market:string,amount:string) =>{
		setLoading(true)

		if(!signer){
			console.log("No Wallet Connected")
			setLoading(false)
			return
		}

		if(!address){
			console.log("No Wallet Connected")
			setLoading(false)
			return
		}

		const {data:transferData,error:transferError} = await useGiveApproval({
			senderAddress:address,
			contractAddress:market,
			signer,
		})

		const {data:borrowData,error:borrowError} = await useContractWrite({
			senderAddress:address,
			contractAddress:market,
			args: { 
				transact:{
					borrow:{
						amount,
					}
				}
			},
			signer
		})

		if(borrowError){
			console.log(
				"borrowError",borrowError,
				"transferError",transferError
			)
			setLoading(false)
			return undefined
		}

		setLoading(false)

		return {
			borrowData,
			transferData
		}
	}

	const withdraw = async(contractAddress:string,amount:string) => {

		setLoading(true)

		if(!signer){
			console.log("Please connect wallet")
			setLoading(false)
			return undefined
		}

		console.log(contractAddress,amount)

		const {data:closeLendData,error:closeLendError} = await useContractWrite({
			senderAddress:address,
			contractAddress: contractAddress,
			args:{
				transact:{
					withdraw:{
						denom:"mantra1c0wehfltspqczqmgv86nn0asf5jstld0yvqzzjtsavsn7pgzakusqa77lj",
						amount: amount,
					}
				}
			},
			signer
		})

		if(closeLendError){

			console.log(
				"closeLendError",closeLendError,
			)

			setLoading(false)
			return undefined
		}

		console.log(
			"closeLendData",closeLendData,
		)

		setLoading(false)

		return{
			closeLendData:closeLendData.res,
		}
	}

	const withdrawInterest = async(contractAddress:string) => {

		setLoading(true)

		if(!signer){
			console.log("Please connect wallet")
			setLoading(false)
			return undefined
		}


		const {data:closeLendData,error:closeLendError} = await useContractWrite({
			senderAddress:address,
			contractAddress: contractAddress,
			args:{
				transact:{
					withdrawInterest:{
					}
				}
			},
			signer
		})

		if(closeLendError){

			console.log(
				"closeLendError",closeLendError,
			)

			setLoading(false)
			return undefined
		}

		console.log(
			"closeLendData",closeLendData,
		)

		setLoading(false)

		return{
			closeLendData:closeLendData.res,
		}
	}



	useEffect(()=>{
		(async()=>{
			setLoading(true)
			let pool;
			pool = await getPools("mantra1pcpdl0kts7djtwwyyx5pn0xpg2t7husy3jmxxhc26tnlk7qc4rvqrgqj47","mantra1pcpdl0kts7djtwwyyx5pn0xpg2t7husy3jmxxhc26tnlk7qc4rvqrgqj47")
			if(pool){
				setPools([
					pool
				])
			}
			setLoading(false)
		})()
	},[signer])


	useEffect(()=>{
		(async()=>{
			setLoading(true)
			pools.forEach(async(market)=>{
				const data = await getPositions(market)
				if(data){	
					if(data.repayablePositions[0]!=='0'||data.repayablePositions[1]!=='0')
						setPositions([...positions,{
							id:`${market?.asset}_${market?.collateral}_${market?.maturationdat}_LEND`,
							asset:market?.asset,
							market:market.id,
							collateral:market?.collateral,
							strikeprice:market?.strikeprice,
							maturity: market?.maturationdate,
							type: "Lend",
							principle:data.repayablePositions[0],
							interest:data.repayablePositions[1],
						}])

					// positionsData.push({
					// 	asset:market?.asset,
					// 	collateral:market?.collateral,
					// 	strikeprice:market?.strikeprice,
					// 	maturity: market?.maturationdate,
					// 	type: "BORROW"
					// })
				}
			})
			setLoading(false)
		})()
	},[pools])

	

	return (
		<BlockChainContext.Provider value={{
			address,
			signer,
			pools,
			positions,
			loading,
			connect,
			lend,
			borrow,
			withdraw,
			withdrawInterest
		}}>
			{children}
		</BlockChainContext.Provider>
	)
}