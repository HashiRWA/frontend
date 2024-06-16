"use client";

import { createContext, useState, useCallback, useEffect } from "react";
import {
  Keplr,
  Key,
  OfflineAminoSigner,
  OfflineDirectSigner,
} from "@keplr-wallet/types";
import { useChain } from "../hooks/useChain";
import { useContractRead } from "@/hooks/useContractRead";
import { useContractWrite } from "@/hooks/useContractWrite";
import {marketAddresses} from "@/constants";
import { useGiveApproval } from "@/hooks/useGiveApproval";

export type BlockChainContext ={
	address: string | undefined,
	signer: (OfflineAminoSigner & OfflineDirectSigner) | undefined,
	pools: any[],
	positions:any[],
	loading:boolean,
	
	
	connect:() => Promise<Key | undefined>,
	lend: (market: any,amount:string) => Promise<{
		transferData: any;
		depositData: any;
	} | undefined>,
	borrow: (market:string,amount:string,asset_addr:string,collateral_addr:string) => Promise<{
		borrowData: any;
	} | undefined>,
	withdraw: (contractAddress: string, amount: string) => Promise<{
		closeLendData: any;
	} | undefined>,
	repay: (contractAddress: string, amount: string, asset_addr: string, collateral_addr: string,principle:string) => Promise<{
		repayDebtData: any;
	} | undefined>,
	getRepayQuotation: (market: string) => Promise<{
		quoteData: any;
	} | undefined>,
	getWithdrawQuotation: (market: string) => Promise<{
		quoteData: any;
	} | undefined>,
	withdrawInterest: (contractAddress: string) => Promise<{
		closeLendData: any;
	} | undefined>,
	
}

interface BlockChainContextProviderProps {
  children: JSX.Element | JSX.Element[];
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

	const getPools = async (contractAddress:string) => {

		if(!signer){
			console.log("Please connect wallet")
			return undefined
		}

		const {data:allDetails,error:allDetailsError} = await useContractRead({
			contractAddress: contractAddress,
			query:{
				allDetails:{}
			},
			signer
		})

		if(allDetailsError){

			console.log(
				"allDetailsError",allDetailsError,
			)

			return undefined
		}

		const pool = {
			id: contractAddress,
			totalAssets: allDetails.res?.[2],
			totalCollateral: allDetails.res?.[3],
			...allDetails.res?.[0],
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

		const {data:positions,error:positionsError} = await useContractRead({
			contractAddress: market.id,
			query:{
				getWithdrawableAndRepayablePositions:{
					user:address
				}
			},
			signer
		})

		if(positionsError){
			console.log(
				"positionsError",positionsError,
			)
			return undefined
		}

		console.log(
			"positions",positions,
		)


		return{
			withdrawablePositions:positions.res?.[0],
			repayablePositions:positions.res?.[1],
		}

		
	}

	const getWithdrawQuotation = async(market:string) =>{
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

		const {data:quoteData,error:quoteError} = await useContractRead({
			contractAddress:market,
			query:{
				getWithdrawQuote:{
					user: address,
				}
			},
			signer
		})

		console.log(quoteData,"quoteData")

		if(quoteError){
			console.log(
				"quoteError",quoteError,
			)

			setLoading(false)

			return undefined
		}

		setLoading(false)

		return {
			quoteData
		}
	}

	const getRepayQuotation = async(market:string) =>{
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

		const {data:quoteData,error:quoteError} = await useContractRead({
			contractAddress:market,
			query:{
				getRepayQuote:{
					user: address,
				}
			},
			signer
		})

		console.log(quoteData,"quoteData")

		if(quoteError){
			console.log(
				"quoteError",quoteError,
			)

			setLoading(false)

			return undefined
		}

		setLoading(false)

		return {
			quoteData
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
			amount,
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

	const borrow = async(market:string,amount:string,asset_addr:string,collateral_addr:string) =>{
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

		const {data:quoteData,error:quoteError} = await useContractRead({
			contractAddress:market,
			query:{
				getLoanQuote:{
					amount: amount,
				}
			},
			signer
		})

		console.log(quoteData,"quoteData")

		

		const {data:approvalData,error:approvalError} = await useContractWrite({
			senderAddress:address,
			contractAddress:collateral_addr,
			args:{
				increase_allowance:{
					spender: market,
					amount:quoteData?.res?.[2],
				}
			},
			signer
		})

		console.log(approvalData,"approvalData")


		const {data:borrowData,error:borrowError} = await useContractWrite({
			senderAddress:address,
			contractAddress:market,
			args: { 
				transact:{
					loan:{
						asset_denom: asset_addr,
						asset_amount : amount,
						collateral_denom: collateral_addr,
					}
				}
			},
			signer
		})


		if(borrowError||approvalError||quoteError){
			console.log(
				"borrowError",borrowError,
				"approvalError",approvalError,
				"quoteError",quoteError,
			)

			setLoading(false)

			return undefined
		}

		console.log(borrowData,"borrowed")

		setLoading(false)

		return {
			borrowData,
			approvalData,
			quoteData
		}
	}

	const repay = async(contractAddress:string,amount:string,asset_addr:string,collateral_addr:string,principle:string) => {

		setLoading(true)

		if(!signer){
			console.log("Please connect wallet")
			setLoading(false)
			return undefined
		}

		

		const {data:repayApprovalData,error:repayApprovalError} = await useContractWrite({
			senderAddress:address,
			contractAddress: collateral_addr,
			args:{
				increase_allowance:{
					spender: contractAddress,
					amount: amount,
				}
			},
			signer
		})

		console.log("asset_principle",principle)

		const {data:repayDebtData,error:repayDebtError} = await useContractWrite({
			senderAddress:address,
			contractAddress: contractAddress,
			args:{
				transact:{
					repay:{
						asset_denom: asset_addr,
						asset_principle: principle,
						collateral_denom: collateral_addr,
					}
				}
			},
			signer
		})

		if(repayDebtError||repayApprovalError){

			console.log(
				"repayDebtError",repayDebtError,
				"repayApprovalError",repayApprovalError
			)

			setLoading(false)
			return undefined
		}

		console.log(
			"repayDebtData",repayDebtData,
		)

		setLoading(false)

		return{
			repayDebtData:repayDebtData.res,
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
					withdrawInterest:{}
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
			let poolsData:any[] = [];
			setLoading(true)
			const data = localStorage.getItem("admin-pools")

			let addresses = []
			if(!data) addresses = [...marketAddresses]
			else addresses = [...marketAddresses,...JSON.parse(data)]

			addresses.forEach(async(addr)=>{
				const res = await getPools(addr)
				if(res){
					poolsData = [...poolsData,res]
					setPools(poolsData)
					setLoading(false)
				} 
			})
		})()
	},[signer])

	useEffect(()=>{
		(async()=>{
			let positionData:any[] = [];
			setLoading(true)
			pools.forEach(async(market)=>{
				const data = await getPositions(market);
				if(data){	
					if(parseInt(data?.withdrawablePositions[0])>0||parseInt(data?.withdrawablePositions[1])>0)
						positionData = [
							...positionData,{
								id:`${market?.asset}_${market?.collateral}_${market?.maturationdat}_LEND`,
								asset:market?.asset,
								market:market.id,
								collateral:market?.collateral,
								strikeprice:market?.strikeprice,
								maturity: market?.maturationdate,
								type: "Lend",
								principle:data?.withdrawablePositions[0],
								interest:data?.withdrawablePositions[1],
							}
						]


					if(parseInt(data?.repayablePositions[0])>0||parseInt(data?.repayablePositions[1])>0)
						positionData = [
							...positionData,{
								id:`${market?.asset}_${market?.collateral}_${market?.maturationdat}_BORROW`,
								asset:market?.asset,
								market:market.id,
								collateral:market?.collateral,
								maturity: market?.maturationdate,
								type: "Borrow",
								interest:data?.withdrawablePositions[1],
							}
						]

					
					setPositions(positionData)
					setLoading(false)
				}

			})
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
			repay,
			withdraw,
			getRepayQuotation,
			getWithdrawQuotation,
			withdrawInterest
		}}>
			{children}
		</BlockChainContext.Provider>
	)
}
