// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.4.22 <0.9.0;

contract Wordgasm {
    mapping(bytes32 =>Word) public wordRegistry;
    mapping(address =>Word[]) public userWordRegistry;
    Word[] public words;


    event NewWordAdded(address indexed _from, bytes32 _word);
      struct Word {
        bytes32 definition;
        address owner;
        bytes32 word;
    }

     // This function allows users to add new words to the blockchain
    function submitWord(bytes32 _newWord, bytes32 _definition ) public {
        // Ensure that the word has not already been submitted
        require(wordRegistry[_newWord].word !="" , "This word has already been submitted");

        // Add the word to the blockchain and store the definition and the address of the submitter
        userWordRegistry[msg.sender].push(Word(_definition,msg.sender,_newWord));
        wordRegistry[_newWord] = Word(_definition,msg.sender,_newWord);
        emit NewWordAdded(msg.sender,_newWord);
        words.push(Word(_definition,msg.sender,_newWord));
    }

    function transferOwnership(bytes32 _word, address _newOwner) public {
        // Ensure that the caller is the owner of the word
        require(wordRegistry[_word].owner == msg.sender, "Only the owner can transfer ownership");

        // Transfer ownership of the word to the new owner
        wordRegistry[_word].owner = _newOwner;
        uint j= 0;
        for(uint i=0;i<userWordRegistry[msg.sender].length;i++){
            if(userWordRegistry[msg.sender][i].word != _word) {
                // updatedWords[j] = userWordRegistry[msg.sender][i];
                userWordRegistry[msg.sender][j] = userWordRegistry[msg.sender][i];
                j++;
            } else {
                userWordRegistry[_newOwner].push(userWordRegistry[msg.sender][i]);
            }
        }

    }

    function getAllWords() public view returns (Word[] memory) {
        return words;
    }

    function getUserWords() public view returns (Word[] memory) {
        return userWordRegistry[msg.sender];
    }
}