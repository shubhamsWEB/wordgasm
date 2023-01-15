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

    describe('Test Wordgasm contract', async () => {
        it('matches name successfully',async () => {
            const name = await wordgasm.name();
            assert.equal(name,'Wordgasm App');
        })

        it('submit new word',async () => {
            await wordgasm.submitWord("0x7368756268616d","0x476f6f6420616e6420417573706963696f7573",{from:customer});
            const newWord = await wordgasm.wordRegistry("0x7368756268616d");
            const wordCoinBalance = await wordCoin.balanceOf(customer);
            assert.equal(wordCoinBalance.toString(),tokens('50'),'Rewarded wordcoin balance after submitting new word');
            await wordgasm.submitWord("0x6b696e67","0x476f6f6420616e6420417573706963696f7573",{from:customer});
            const allWords = await wordgasm.getAllWords();
            const userWords = await wordgasm.getUserWords({from:customer});
          
        })

        it("Transfer ownership", async() => {
            await wordgasm.transferOwnership("0x6b696e67",'0xa6df30FF11538Ca1034FB1C174B1d28B3B8013bF',{from:customer});
            const newWordOwner = await wordgasm.getUserWords({from:'0xa6df30FF11538Ca1034FB1C174B1d28B3B8013bF'});
            const wordName = newWordOwner[0].word;
            assert.equal(wordName,"0x6b696e6700000000000000000000000000000000000000000000000000000000","Check if the word is transferred to new owner");
            const prevWordOwener = await wordgasm.getUserWords({from:customer});
            const transferToAddress = prevWordOwener[1].transferdTo;
            assert.equal(transferToAddress,"0xa6df30FF11538Ca1034FB1C174B1d28B3B8013bF","Checks if the previous owner does not own the word");
        })
    })
});