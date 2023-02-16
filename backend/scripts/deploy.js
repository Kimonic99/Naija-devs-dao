const hre = require("hardhat");
const { NAIJADEVS_NFT_CONTRACT_ADDRESS } = require("../constants");

async function main() {
// Deploy the FakeNFTMarketplace contract first
const FakeNFTMarketplace = await ethers.getContractFactory(
  "FakeNFTMarketplace"
);
const fakeNftMarketplace = await FakeNFTMarketplace.deploy();
await fakeNftMarketplace.deployed();

console.log("FakeNFTMarketplace deployed to: ", fakeNftMarketplace.address);

// Now deploy the CryptoDevsDAO contract
const NaijaDevsDAO = await ethers.getContractFactory("NaijaDevsDAO");
const naijaDevsDAO = await NaijaDevsDAO.deploy(
  fakeNftMarketplace.address,
  NAIJADEVS_NFT_CONTRACT_ADDRESS,
  {
    // This assumes your metamask account has at least 1 ETH in its account
    // Change this value as you want
    value: ethers.utils.parseEther("0.1"),
  }
);
await naijaDevsDAO.deployed();

console.log("NaijaDevsDAO deployed to: ", naijaDevsDAO.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
