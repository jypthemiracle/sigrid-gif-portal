export const checkIfWalletIsConnected = async () => {
  try {
    const { solana } = window;
    if (solana && solana.isPhantom) {
      console.log("Phantom Wallet is found!");
      
      const response = await solana.connect({ onlyIfTrusted: true });
      console.log("Connected with Public Key: ", response.publicKey.toString());

      return response.publicKey.toString();
    }
    alert(
      "Something gone wrong: It seems that Phantom Wallet 👻 is not installed yet."
    );
  } catch (error) {
    alert("Hey, please unlock your Phantom Wallet to connect!");
    console.log(error);
  }
};
