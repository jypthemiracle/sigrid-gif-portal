import React, { useEffect, useState } from "react";
import twitterLogo from "./assets/twitter-logo.svg";
import idl from './idl.json';
import "./App.css";
import kp from './keypair.json'
import { Connection, PublicKey, clusterApiUrl } from '@solana/web3.js';
import { Program, Provider, web3 } from '@project-serum/anchor';
import { checkIfWalletIsConnected } from "./components/checkIfWalletIsConnected";
import { renderNotConnectedContainer } from "./components/renderNotConnectedContainer";
import { RenderConnectedContainer } from "./components/renderConnectedContainer";
import { SIGRID_GIFS } from "./assets/SIGRID_GIFS";
import { getGifList } from "./components/getGifList";

// Constants
const TWITTER_HANDLE = "jypthemiracle";
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;

// SystemProgram is a reference to the Solana runtime!
const { SystemProgram, Keypair } = web3;

// That's it. Now, we have a permanent keypair!
// If you go and refresh, you'll see that after you initialize the account — it stays even after refresh!
const arr = Object.values(kp._keypair.secretKey)
const secret = new Uint8Array(arr)
const baseAccount = web3.Keypair.fromSecretKey(secret)

// Get our program's id from the IDL file.
const programID = new PublicKey(idl.metadata.address);

const App = () => {
  // State
  const [walletAddress, setWalletAddress] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const [gifList, setGifList] = useState(null);

  // When our component first mounts, let us check to see if we have connected the wallet.
  useEffect(() => {
    const onLoad = async () => {
      const registeredWalletAddress = await checkIfWalletIsConnected();
      // TODO: setState of parent component on child component
      setWalletAddress(registeredWalletAddress);
    };
    window.addEventListener("load", onLoad);
    return () => window.removeEventListener("load", onLoad);
  }, []);

  useEffect(() => {
    if (walletAddress) {
      console.log('Fetching GIF list...');
      getGifList(programID, baseAccount, setGifList);
    }
  }, [walletAddress]);

  return (
    <div className="App">
      <div className={walletAddress ? "authed-container" : "container"}>
        <div className="container">
          <div className="header-container">
            <p className="header">👩 SIGRID GIF PORTAL (Yeah)</p>
            <p className="sub-text">
              The GIF collection of Sigrid Raabe in Solana Blockchain ✨
            </p>
            {/* Render your connect to wallet button right here */}
            {!walletAddress && renderNotConnectedContainer(setWalletAddress)}
            {walletAddress && <RenderConnectedContainer inputValue={inputValue} setInputValue={setInputValue} gifList={gifList} setGifList={setGifList} programID={programID} baseAccount={baseAccount}/>}
          </div>
          <div className="footer-container">
            <img
              alt="Twitter Logo"
              className="twitter-logo"
              src={twitterLogo}
            />
            <a
              className="footer-text"
              href={TWITTER_LINK}
              target="_blank"
              rel="noreferrer"
            >{`Created by @${TWITTER_HANDLE}`}</a>
          </div>
        </div>
      </div>
     </div>
  );
};

export default App;
