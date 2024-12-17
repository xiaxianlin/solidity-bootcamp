import { ethers } from 'ethers'

const { formatUnits, parseUnits } = ethers

const provider = ethers.getDefaultProvider('sepolia')

const accountAddress = '0xBf49Bd2B2c2f69c53A40306917112945e27577A4'

async function main() {
    try {
        const balance = await provider.getBalance(accountAddress)
        console.log(`Balance in Ether: ${formatUnits(balance, 'ether')}`)

        const transactionAmount = parseUnits('0.05', 'ether')
        console.log(`0.05 Ether in Wei: ${transactionAmount.toString()}`)
    } catch (error) {
        console.error('Error fetching:', error)
    }
}

main()
