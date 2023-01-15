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
        wordgasm = await Wordgasm.new(wordCoin.address);
    })

    describe('Test Wordcoin', async () => {
        it('matches name successfully',async () => {
            const name = await wordCoin.name();
            assert.equal(name,'Wordgasm Coin');
        })
        it('check transfer event',async () => {
            const balanceBefore = await wordCoin.balanceOf(customer);
            assert.equal(balanceBefore.toString(),tokens('0'),'Customer balance before transfer');
            await wordCoin.transfer(customer,tokens('100'),{from:owner});
           const balanceAfter = await wordCoin.balanceOf(customer);
            assert.equal(balanceAfter.toString(),tokens('100'),'Customer balance after transfer');
        })
    })
});