import { NextRequest, NextResponse } from "next/server";
import { SigningCosmWasmClient, SigningCosmWasmClientOptions } from "@cosmjs/cosmwasm-stargate"
import { GasPrice, calculateFee } from "@cosmjs/stargate"
import { HdPath } from "@cosmjs/crypto";
import { DirectSecp256k1HdWallet, makeCosmoshubPath } from "@cosmjs/proto-signing";
import fs from 'fs';

const MNEMONIC = "average legal choose solve apology flat above clutch east forest total control"

interface Options {
    readonly httpUrl: string
    readonly networkId: string
    readonly feeToken: string
    readonly bech32prefix: string
    readonly hdPath: HdPath
    readonly faucetUrl?: string
    readonly fees: {
      upload: number,
      init: number,
      exec: number
    },
    readonly gasPrice: GasPrice,
}

interface FormConfig {
    name: string;
    symbol: string;
    maturationdate: number;
    debtinterestrate: string;
    strikeprice: string;
    lendinterestrate: string;
    lockInPeriod:string;
    overcollateralizationfactor: string;
    asset: string;
    collateral: string;
}

interface Network {
    setup: (password: string, filename?: string) => Promise<[string, SigningCosmWasmClient]>
}
  

const mantraOptions: Options = {
    httpUrl: 'https://rpc.hongbai.mantrachain.io:443',
    networkId: 'mantra-hongbai-1',
    bech32prefix: 'mantra',
    feeToken: 'uom',
    faucetUrl: 'https://faucet.hongbai.mantrachain.io',
    hdPath: makeCosmoshubPath(0),
    fees: {
      upload: 5000000,
      init: 1000000,
      exec: 500000,
    },
    gasPrice: GasPrice.fromString("0.01uom"),
}

export interface ContractConfig {
    label: string,
    init: FormConfig,
}

const initOptions = (options: Options): Network => {

    const loadOrCreateWallet = async (options: Options): Promise<DirectSecp256k1HdWallet> => {
      const wallet = await DirectSecp256k1HdWallet.fromMnemonic(
          MNEMONIC
        , {hdPaths: [options.hdPath], prefix: options.bech32prefix,});
  
      return wallet;
    };
  
    const connect = async (
      wallet: DirectSecp256k1HdWallet,
      options: Options
    ): Promise<SigningCosmWasmClient> => {
      const clientOptions = {
        prefix: options.bech32prefix,
        gasPrice: options.gasPrice
      } as SigningCosmWasmClientOptions
      return await SigningCosmWasmClient.connectWithSigner(options.httpUrl, wallet, clientOptions)
    };
  
    const setup = async (): Promise<[string, SigningCosmWasmClient]> => {
      const wallet = await loadOrCreateWallet(options);
      const client = await connect(wallet, options);
  
      const [account] = await wallet.getAccounts();
      console.log("Address" ,account.address)
      return [account.address, client];
    }
  
    return {setup};
  
}


export async function POST(request:NextRequest) {

    const data  : ContractConfig= await request.json();
    const [addr, client] = await initOptions(mantraOptions).setup("password");
    

    const uploadFee = calculateFee(
        mantraOptions.fees.upload, 
        mantraOptions.gasPrice
    )

    const wasm = fs.readFileSync(process.cwd() + '/app/api/contract.wasm');
    const uploadRes = await client.upload(addr, wasm, uploadFee)

    const codes = await client.getCodes() 
    const hash = codes.filter((x:any) => x.id === uploadRes?.codeId).map((x:any) => x.checksum)[0];

    const instantiateResponse = await client.instantiate(
        addr, 
        uploadRes?.codeId, 
        {
          ...data?.init,
          oracle:addr,
          admin:addr
        }, 
        data?.label, 
        "auto"
    )

    return NextResponse.json({
        data: instantiateResponse?.contractAddress,
    })
}
