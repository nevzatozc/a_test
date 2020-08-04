/* ===== Block Class ==============================
|  Class with a constructor for block 			   |
|  ===============================================*/
const crypto = require('crypto');
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');
var bigInt = require("big-integer");
class StarBlock{
    constructor(data){  // data {adres, star{....} }
        this.hash = this.calculateHash();
        this.height = 0;
        this.body = data;
        //this.address = data.address;
        //this.body = data;
        this.time = 0;
        this.previousBlockHash = 'hesaplaninca_yaziliyor';
        this.nonce=0;
        this.recall_block=0;
    }

    calculateHash() {
        return crypto.createHash('sha256').update( ''+this.time + this.nonce + + JSON.stringify(this.body)+this.previousBlockHash).digest('hex');
    }
    mineBlock(difficulty) {
        while (this.hash.substring(0, difficulty) !== Array(difficulty + 1).join('0')) {
            this.nonce++;
            this.hash = this.calculateHash();
        }

        console.log("Block mined: " +this.hash);

    }
}

module.exports.StarBlock = StarBlock;