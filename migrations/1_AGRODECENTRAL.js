const AGRODECENTRAL = artifacts.require("./AGRODECENTRAL.sol");

module.exports = function(deployer) {
  deployer.deploy(AGRODECENTRAL);
};