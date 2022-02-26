export const checkIfWalletIsConnected = async () => {
  try {
    const { solana } = window;
    if (solana && solana.isPhantom) {
      alert("Phantom Wallet is found!");
      return;
    }
    alert(
      "Something gone wrong: It seems that Phantom Wallet is not installed yet."
    );
  } catch (error) {
    alert("something gone wrong. Error: ", error);
    console.log(error);
    return;
  }
};
