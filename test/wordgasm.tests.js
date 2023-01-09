const { assert } = require('chai');
const WordCoin = artifacts.require("WordCoin");
const Wordgasm = artifacts.require("Wordgasm");
require('chai').use(require('chai-as-promised')).should()

contract('Wordgasm', ([owner,customer]) => {
    let wordCoin, wordgasm
   
    function tokens(number) {
        return web3.utils.toWei(number,'ether');
    }
   
    before(async () => {
        wordCoin = await WordCoin.new();
        wordgasm = await Wordgasm.new();
    })
});