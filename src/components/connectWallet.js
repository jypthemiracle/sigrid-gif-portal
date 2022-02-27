export const connectWallet = async (setWalletAddress) => {
    const { solana } = window;
    if (solana) {
        const response = await solana.connect();
        console.log('Connected with Public Key:', response.publicKey.toString());
        console.log(">>>", setWalletAddress)
        setWalletAddress(response.publicKey.toString());
    }
    return;
}
