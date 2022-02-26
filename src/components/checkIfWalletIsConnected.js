export const checkIfWalletIsConnected = async () => {
  try {
    const { solana } = window;
    if (solana && solana.isPhantom) {
      alert("Phantom Wallet is found!");
      
      const response = await solana.connect({ onlyIfTrusted: true });
      console.log("Connected with Public Key: ", response.publicKey.toString());

      return response.publicKey.toString();
    }
    alert(
      "Something gone wrong: It seems that Phantom Wallet 👻 is not installed yet."
    );
  } catch (error) {
    console.log("something gone wrong. Error: ", error);
    console.log(error);
  }
};
