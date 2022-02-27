import { Connection, PublicKey, clusterApiUrl } from '@solana/web3.js';
import { Program, Provider, web3 } from '@project-serum/anchor';

// set out network to devnet
const network = clusterApiUrl('devnet');

// Controls how we want to acknowledge when a transaction is "done".
// Basically, we can actually choose when to receive a confirmation for when our transaction has succeeded.
const opts = {
    preflightCommitment: "processed"
}

export const getProvider = () => {
    const connection = new Connection(network, opts.preflightCommitment);
    const provider = new Provider(
        connection, window.solana, opts.preflightCommitment,
    )
    return provider;
}
