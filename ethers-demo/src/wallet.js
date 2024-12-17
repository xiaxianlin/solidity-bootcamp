import { ethers } from 'ethers'

function createRandomWallet() {
    const wallet = ethers.Wallet.createRandom()
    console.log('New Wallet Address:', wallet.address)
    console.log('New Wallet Private Key:', wallet.privateKey)
    return wallet
}

async function importWalletWithPrivateKey(privateKey, provider) {
    const wallet = new ethers.Wallet(privateKey, provider)
    console.log('Imported Wallet Address:', wallet.address)
    return wallet
}

function importWalletWithMnemonic(mnemonic) {
    const wallet = ethers.Wallet.fromPhrase(mnemonic)
    console.log('Imported Wallet Address:', wallet.address)
    return wallet
}

const privateKey = ''
const mnemonic = ''
const url = ''
async function main() {
    try {
        const provider = new ethers.JsonRpcProvider(url)

        const randomWallet = createRandomWallet()

        const importedWalletWithPrivateKey = await importWalletWithPrivateKey(privateKey, provider)

        const importedWalletWithMnemonic = importWalletWithMnemonic(mnemonic)

        const message = 'Hello, Ethereum!'
        const signedMessage = await randomWallet.signMessage(message)
        console.log('Signed Message:', signedMessage)

        const recipient = randomWallet.address // Use the random wallet address as the recipient
        const feeData = await provider.getFeeData()
        console.log(`Current gas price: ${ethers.formatUnits(feeData.gasPrice, 'gwei')} gwei`)
        const gasLimit = 21000 // Set gas limit

        const tx = await importedWalletWithPrivateKey.sendTransaction({
            to: recipient,
            value: ethers.parseEther('0.001'), // Send 0.01 ETH
            gasLimit: gasLimit, // Set gas limit
            gasPrice: feeData.gasPrice // Get the current gas price
        })
        console.log('Transaction hash:', tx.hash)

        const receipt = await tx.wait()
        console.log('Transaction confirmed:', receipt)

        const newBalance = await provider.getBalance(randomWallet.address)
        console.log(`New Balance: ${ethers.formatEther(newBalance)} ETH`)
    } catch (error) {
        console.error('Error:', error)
    }
}

main()
