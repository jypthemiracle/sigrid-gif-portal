import idl from "../idl.json";
import { getProvider } from "./getProvider";
import { Program, Provider, web3 } from "@project-serum/anchor";
import { SystemProgram } from "@solana/web3.js";
import { getGifList } from "./getGifList";

export const createGifAccount = async (programID, baseAccount, setGifList) => {
  try {
    const provider = getProvider();
    const program = new Program(idl, programID, provider);
    console.log("baseAccount >>>", baseAccount);
    await program.rpc.startStuffOff({
      accounts: {
        baseAccount: baseAccount.publicKey,
        user: provider.wallet.publicKey,
        systemProgram: SystemProgram.programId,
      },
      signers: [baseAccount],
    });
    console.log(
      "Created a new BaseAccount w/ address: ",
      baseAccount.publicKey.toString()
    );
    await getGifList(programID, baseAccount, setGifList);
  } catch (error) {
    console.log("Error creating BaseAccount account: ", error);
  }
};
