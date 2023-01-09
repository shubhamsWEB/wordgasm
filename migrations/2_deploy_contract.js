/* eslint-disable no-undef */
const WordCoin = artifacts.require("Wordcoin");
const Wordgasm = artifacts.require('Wordgasm');

module.exports = async function(deployer,network,accounts) {
    await deployer.deploy(WordCoin);
    const wordCoin = await WordCoin.deployed();
    await deployer.deploy(Wordgasm,wordCoin.address);
    const wordgasm = await Wordgasm.deployed();
};

