const anchor = require('@project-serum/anchor');
const { SystemProgram } = anchor.web3;

const main = async() => {
  console.log("🚀 Starting test...")

  const provider = anchor.Provider.env();

  anchor.setProvider(provider);
  const program = anchor.workspace.Myepicproject;

  // we need to create some credentials for the BaseAccount we're creating.
  const baseAccount = anchor.web3.Keypair.generate();

  const tx = await program.rpc.startStuffOff({
      accounts: {
          baseAccount: baseAccount.publicKey,
          user: provider.wallet.publicKey,
          systemProgram: SystemProgram.programId,
      },
      signers: [baseAccount],
  });

  console.log("📝 Your transaction signature", tx);
  let account = await program.account.baseAccount.fetch(baseAccount.publicKey);
  console.log('👀 GIF Count', account.totalGifs.toString())

  // call add_gif function of Rust in addGif of JavaScript
  await program.rpc.addGif("https://64.media.tumblr.com/f26deaa333ebc23911169d6dcb2e9d32/6307ee9ae8a548fc-68/s500x750/9efd7adfef23559b7f3c46f70ab460fb01cc5cef.gifv", {
      accounts: {
          baseAccount: baseAccount.publicKey,
          user: provider.wallet.publicKey,
      }
  })

  // Call the account.
  account = await program.account.baseAccount.fetch(baseAccount.publicKey);
  console.log('👀 GIF Count', account.totalGifs.toString())

  // Access gif_list on the account!
  console.log('👀 GIF List', account.gifList);
}

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

runMain();