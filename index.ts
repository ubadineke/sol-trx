import {
    Connection,
    Keypair,
    LAMPORTS_PER_SOL,
    PublicKey,
    Transaction,
    SystemProgram,
} from '@solana/web3.js';

//Define the connection
const connection = new Connection('https://api.devnet.solana.com', 'confirmed');

//Import sender's keypair
const senderSecretKey = Uint8Array.from([]); //replace with private key(array of numbers)
const senderKeypair = Keypair.fromSecretKey(senderSecretKey);

const receiverPublicKey = new PublicKey(''); //replace with receiver's public key

const amount = 1; // 1 SOL (you can change this amount)

// Create the transaction
const transaction = new Transaction().add(
    SystemProgram.transfer({
        fromPubkey: senderKeypair.publicKey,
        toPubkey: receiverPublicKey,
        lamports: amount * LAMPORTS_PER_SOL, // Convert SOL to lamports
    })
);

(async () => {
    try {
        // Sign the transaction
        const signature = await connection.sendTransaction(transaction, [senderKeypair]);
        console.log('Transaction sent with signature:', signature);

        // Confirm the transaction
        const confirmation = await connection.confirmTransaction(signature, 'confirmed');
        console.log('Transaction confirmed:', confirmation);
    } catch (error) {
        console.error('Error sending transaction:', error);
    }
})();
