import { ethers } from 'ethers'

const { toUtf8Bytes, encodeRlp, toBeHex } = ethers
const transactionData = {
    assetId: 1,
    owner: '0xBf49Bd2B2c2f69c53A40306917112945e27577A4',
    description: 'fantastic token'
}

const assetIdHex = toBeHex(BigInt(transactionData.assetId))
const owner = toBeHex(BigInt(transactionData.owner))
const descriptionBytes = toUtf8Bytes(transactionData.description)

const rlpEncodedTransaction = encodeRlp([assetIdHex, owner, descriptionBytes])

console.log(`RLP encoded transaction data: ${rlpEncodedTransaction}`)

const documentData = 'secret document'

// SHA-256
const sha256Hash = ethers.sha256(ethers.toUtf8Bytes(documentData))

// Keccak-256
const keccak256Hash = ethers.keccak256(sha256Hash)

// it should be 0xd73931a00e470929e3db691d445afd39a55581037792ac1a10cdb6cc5cdef649
console.log(`final hash: ${keccak256Hash}`)
