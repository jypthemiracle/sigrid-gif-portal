import { connectWallet } from "./connectWallet";

export const renderNotConnectedContainer = (setWalletAddress) => (
    <button className="cta-button connect-wallet-button" onClick={() => connectWallet(setWalletAddress)}>
        Connect To Wallet
    </button>
)
