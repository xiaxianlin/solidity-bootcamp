import { ethers } from 'ethers'

// const contractABI = [
//     {
//         constant: true,
//         inputs: [],
//         name: 'name',
//         outputs: [
//             {
//                 name: '',
//                 type: 'string'
//             }
//         ],
//         payable: false,
//         stateMutability: 'view',
//         type: 'function'
//     }
// ]

const contractABI = ['function name() view returns (string)']

const contractAddress = '0xdaCc865922356723C01305F819E65ffB1b14520D'

async function main() {
    try {
        const provider = ethers.getDefaultProvider('sepolia')
        const readOnlyContract = new ethers.Contract(contractAddress, contractABI, provider)
        const name = await readOnlyContract.name()
        console.log('Token Name:', name)
    } catch (error) {
        console.error('Error in contract interaction:', error)
    }
}

main()
