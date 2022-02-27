import idl from '../idl.json';
import { getProvider } from './getProvider';
import { Program, Provider, web3 } from '@project-serum/anchor';
import { SIGRID_GIFS } from '../assets/SIGRID_GIFS';

export const getGifList = async (programID, baseAccount, setGifList) => {
    try {
        console.log(">>>>>", baseAccount)
        const provider = getProvider();
        const program = new Program(idl, programID, provider);
        const account = await program.account.baseAccount.fetch(baseAccount.publicKey);

        console.log("Got the Account", account);
        console.log("*****", account.gifList)
        let newList = account.gifList.reduce((acc, cur, idx) => {
            console.log("cur", cur);
            acc.push(cur["gifLink"]);
            return acc;
        }, SIGRID_GIFS);
        console.log("NEWLIST", newList);
        setGifList(newList);
    } catch (error) {
        alert('There is an encountered error', error);
        console.log(error);
    }
}
