import React, { useEffect, useState } from "react";
import twitterLogo from "./assets/twitter-logo.svg";
import "./App.css";
import { checkIfWalletIsConnected } from "./components/checkIfWalletIsConnected";
import { renderNotConnectedContainer } from "./components/renderNotConnectedContainer";
import { RenderConnectedContainer } from "./components/renderConnectedContainer";
import { SIGRID_GIFS } from "./assets/SIGRID_GIFS";

// Constants
const TWITTER_HANDLE = "jypthemiracle";
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;

const App = () => {
  // State
  const [walletAddress, setWalletAddress] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const [gifList, setGifList] = useState(SIGRID_GIFS);

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
      
      // Call Solana program here.
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
            {!walletAddress && renderNotConnectedContainer()}
            {walletAddress && <RenderConnectedContainer inputValue={inputValue} setInputValue={setInputValue} gifList={gifList}/>}
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
            >{`built on @${TWITTER_HANDLE}`}</a>
          </div>
        </div>
      </div>
     </div>
  );
};

export default App;
