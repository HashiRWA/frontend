

import { SigningCosmWasmClient } from "@cosmjs/cosmwasm-stargate"
import { OfflineAminoSigner, OfflineDirectSigner } from "@keplr-wallet/types"
import { GasPrice } from "@cosmjs/stargate"
import exp from "constants";

// create a hook called useMint that will mint a new token
const useMint = () => {
  // Setup connection and get the client

  async function createMint(signer : any, userAddr : String, tokenAddr : String, amount: String) {
    // Define the mint message
    const mintMsg = {
      mint: {
        recipient: userAddr,
        amount: amount
      }
    };

    const client = await SigningCosmWasmClient.connectWithSigner(
      "https://rpc.hongbai.mantrachain.io",
      signer as OfflineDirectSigner & OfflineAminoSigner,
      {
        gasPrice: GasPrice.fromString("0.01uom"),
      }
    )

    // Execute the mint function
    const result = await client.execute(
      userAddr.toString(),
      tokenAddr.toString(),
      mintMsg, 
      "auto",  
      ""
    );

    // Print the response
    console.log("Mint response:", result);
    return result;
  }

  return { createMint };
}

export default useMint;