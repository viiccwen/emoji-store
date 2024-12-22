# Emoji Store 🚀

**Emoji Store** is a decentralized NFT marketplace built on Ethereum. It allows users to list and purchase emojis as NFTs. These emojis are unique digital assets securely traded on the blockchain.

![picture](https://imgur.com/gQMfICo.jpg)

## Features ✨

- **List Emojis as NFTs:**
  Users can provide emojis, descriptions, and prices to list them as NFTs.

- **Buy NFTs:**
  Browse all listed NFTs and purchase them using cryptocurrency (ETH).

- **Secure Blockchain Transactions:**
  Transactions are handled using smart contracts to ensure transparency and security.

- **Dynamic Updates:**
  Instantly displays the owner and price of each NFT.

## Tech Stack 🛠️

### Frontend
- **React**
- **Next.js**
- **TailwindCSS**: For a visually appealing UI.
- **wagmi**: To interact with the Ethereum blockchain.
- **ethers.js**: To manage smart contracts and Ethereum transactions.

### Backend (Smart Contract)
- **Solidity**: For writing smart contracts.
- **Sepolia Testnet**: Deployed on Ethereum's test network.

### Smart Contract Features
- `addEmoji`: List a new emoji as an NFT.
- `purchaseEmoji`: Purchase a specific emoji NFT.
- `getEmojiCount`: Retrieve the total number of listed NFTs.
- `getEmoji`: Query details of a specific emoji NFT.

## Contract Address 📜
- **Sepolia Testnet:**
  `0xFC059Fe6e1ee844E02143Cac536aD994b638c547`

You can view the contract activity on [Sepolia Etherscan](https://sepolia.etherscan.io/address/0xFC059Fe6e1ee844E02143Cac536aD994b638c547).

## Quick Start 🚀

### 1. Clone the Repository
```bash
git clone https://github.com/viiccwen/emoji-store.git
cd emoji-store
```

### 2. Install Dependencies
```bash
bun install # make sure you have bun
```

### 3. Start the Local Development Server
```bash
bun run dev
```
Open [http://localhost:{server port}](http://localhost:3000) in your browser.

### 5. Deploy Smart Contracts (Optional)
If you need to redeploy the smart contracts:
1. Install Truffle or Hardhat.
2. Use `bunx hardhat deploy` to deploy the contract.

## Usage 📚

### List an NFT
1. Click the `List` button.
2. Enter the emoji, description, and price.
3. Submit the transaction to list it as an NFT.

### Purchase an NFT
1. Browse available NFTs.
2. Click the `Purchase` button and confirm the transaction.
3. Once completed, the NFT ownership will update to you.

## Future Plans 🛠️
- Support for secondary markets (reselling functionality).
- Add support for more blockchain networks (e.g., Polygon).
- Provide transaction history for each NFT.

## Contributing 🙌
We welcome issues and PRs to improve this project!

1. Fork this repository.
2. Create a branch: `git checkout -b feat:{feature-name}`.
3. Commit your changes: `git commit -m 'Add some feature'`.
4. Push the branch: `git push origin feat:{feature-name}`.
5. Open a PR.

## License 📜
This project is licensed under the [MIT License](LICENSE).

---

Start using **Emoji Store** and experience the power of blockchain-based NFT marketplaces! 🥳🚀🔥
