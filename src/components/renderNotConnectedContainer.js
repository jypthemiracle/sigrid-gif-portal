import { connectWallet } from "./connectWallet";

export const renderNotConnectedContainer = () => (
    <button className="cta-button connect-wallet-button" onClick={connectWallet}>
        Connect To Wallet
    </button>
)
