// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying Land contract with the account:", deployer.address);

  const Land = await ethers.getContractFactory("Land");
  const landContract = await Land.deploy();
  
  // Wait for the deployment transaction to be mined
  const deployedContract = await landContract.waitForDeployment();
 //await deployedContract.deployTransaction.wait();

  console.log("Land contract deployed at address:", deployedContract.target);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
