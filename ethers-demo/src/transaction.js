import { ethers } from 'ethers'
import * as dotenv from 'dotenv'
dotenv.config()

const { JsonRpcProvider, parseEther, parseUnits } = ethers

const provider = new ethers.getDefaultProvider('sepolia')

const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider)

const recipientAddress = '0x37b03e25EE21f76665D69b2E45d3ff219D3968e3'
const amountToSend = '0.00001' // In ETH

async function main() {
    const tx = {
        to: recipientAddress,
        value: parseEther(amountToSend),
        gasLimit: 21000,
        gasPrice: parseUnits('10', 'gwei')
    }

    try {
        console.log('Sending transaction...')
        const txResponse = await wallet.sendTransaction(tx)
        console.log(`Transaction hash: ${txResponse.hash}`)

        // Wait for the transaction to be mined
        const receipt = await txResponse.wait()
        console.log('Transaction confirmed in block:', receipt.blockNumber)
    } catch (error) {
        console.error('Transaction failed:', error)
    }
}

main()
