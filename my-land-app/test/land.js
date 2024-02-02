const { expect } = require('chai');

describe('Land Contract', function () {
  let Land;
  let landContract;
  let owner;
  let addr1;
  let addr2;

  beforeEach(async function () {
    Land = await ethers.getContractFactory('Land');
    [owner, addr1, addr2] = await ethers.getSigners();

    landContract = await Land.deploy();
    await landContract.deployed();
  });

  describe('Deployment', function () {
    it('Should set the right owner', async function () {
      expect(await landContract.Land_Inspector()).to.equal(owner.address);
    });
  });

  describe('Land Management', function () {
    it('Should add a new land', async function () {
      await landContract.addLand(100, 'City A', 'State X', 100000, 123, 456, 'IPFS_HASH', 'DOCUMENT_HASH');
      const landsCount = await landContract.getLandsCount();
      expect(landsCount).to.equal(1);

      const land = await landContract.lands(1);
      expect(land.area).to.equal(100);
      expect(land.city).to.equal('City A');
      expect(land.state).to.equal('State X');
      // Add more assertions based on your contract's logic
    });

    it('Should reject invalid land addition', async function () {
      // Perform assertions for rejecting invalid land addition
    });

    // Add more test cases for other functions in your contract
    // For example, functions related to buyers, sellers, inspections, etc.
  });
});