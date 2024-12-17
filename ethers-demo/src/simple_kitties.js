import { ethers } from 'ethers'
import * as dotenv from 'dotenv'
dotenv.config()

const abi = [
    {
        inputs: [],
        name: 'createKittyGen0',
        outputs: [
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256'
            }
        ],
        stateMutability: 'nonpayable',
        type: 'function'
    },
    {
        inputs: [
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256'
            }
        ],
        name: 'kitties',
        outputs: [
            {
                internalType: 'uint256',
                name: 'genes',
                type: 'uint256'
            },
            {
                internalType: 'uint256',
                name: 'birthTime',
                type: 'uint256'
            },
            {
                internalType: 'uint256',
                name: 'momId',
                type: 'uint256'
            },
            {
                internalType: 'uint256',
                name: 'dadId',
                type: 'uint256'
            },
            {
                internalType: 'uint256',
                name: 'generation',
                type: 'uint256'
            }
        ],
        stateMutability: 'view',
        type: 'function'
    }
]

const address = '0x983236bE64Ef0f4F6440Fa6146c715CC721045fA'
const privateKey = process.env.PRIVATE_KEY
console.log('privateKey', privateKey)
const { JsonRpcProvider, formatUnits } = ethers
async function main() {
    try {
        const provider = new ethers.getDefaultProvider('sepolia')
        const signer = new ethers.Wallet(privateKey, provider)
        const contract = new ethers.Contract(address, abi, signer)

        const Kitty = await contract.kitties(1)
        console.log('Kitty 1 Genes:', Kitty.genes.toString())
        console.log('Kitty 1 BirthTime:', Kitty.birthTime.toString())
        console.log('Kitty 1 MomId:', Kitty.momId.toString())
        console.log('Kitty 1 DadId:', Kitty.dadId.toString())
        console.log('Kitty 1 Generation:', Kitty.generation.toString())

        const feeData = await provider.getFeeData()
        console.log(`Current gas price: ${formatUnits(feeData.gasPrice, 'gwei')} gwei`)
        const gasLimit = 300000

        console.log('Attempting to create a new Generation 0 kitty...')
        const createTxResponse = await contract.createKittyGen0({ gasLimit, gasPrice: feeData.gasPrice })
        console.log('Transaction sent, waiting for receipt...')
        const receipt = await createTxResponse.wait()
        console.log('Transaction receipt:', receipt)

        const newKittyId = ethers.toBigInt(receipt.logs[0].topics[3])

        const newKitty = await contract.kitties(newKittyId.toString())
        console.log('New Kitty TokenId:', newKittyId.toString())
        console.log('New Kitty Genes:', newKitty.genes.toString())
        console.log('New Kitty BirthTime:', newKitty.birthTime.toString())
        console.log('New Kitty MomId:', newKitty.momId.toString())
        console.log('New Kitty DadId:', newKitty.dadId.toString())
        console.log('New Kitty Generation:', newKitty.generation.toString())
    } catch (error) {
        console.error('Error:', error)
    }
}

main()
