const SHA256 = require('crypto-js/sha256');
const BlockClass = require('./StarBlock.js');
const hex2ascii = require('hex2ascii');
const level = require('level');
const chainDB = './chaindata';
const chainDB2 = './chaindata2';
const crypto = require('crypto');
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');
var bigInt = require("big-integer");
const db = level(chainDB, { createIfMissing: true }, function (err, db) {
    if (err instanceof level.errors.OpenError) {
        console.log('failed to open database')
    }
})
/*const db2 = level(chainDB2, { createIfMissing: true }, function (err, db2) {
    if (err instanceof level.errors.OpenError) {
        console.log('failed to open database')
    }
})*/
//Nevzat
// Add data to levelDB with key/value pair
function addDataToLevelDB(key,value){

    return db.put(key, value);
}
function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
}
// Get data from levelDB with key
function getDataFromLevelDB(key){
    var result = db.get(key);
    return result;
}
// Get Block Height
function getDBBlockHeight() {
    return new Promise((resolve, reject) => {
        let i = 0;
        db.createReadStream().on('data', (data) => {
            i++;
        }).on('error', (err) => {
            reject(err);
        }).on('close', () => {
            resolve(i);
        });
    });
}
let errorLog = [];

// /* ===== Blockchain Class ==========================
// |  Class with a constructor for new blockchain     |
// |  ================================================*/

//module.exports =
class Blockchain{
    constructor(isim){
        this.ad = isim;
        this.difficulty = 2;
        this.total_chain_height = -1;
        //if chain is empty
        this.addBlock(new BlockClass.StarBlock("GENESIS Block"));
    }



    // Get block height
    async getBlockHeight(){
        const chain_height = await getDBBlockHeight();
        return chain_height;
    }
    async bringBlockbyHash(blockHash){
        return await getDataFromLevelDBByHash(blockHash);
    }
    async bringBlockbyWalletAddress(address){
        return await getDataFromLevelDBByWalletAddress(address);
    }

    // get block
    async getBlock(blockHeight){
        const serializedBlock = await getDataFromLevelDB(blockHeight);
        return JSON.parse(serializedBlock)
    }
    // Add new block
    async addBlock(newBlock){
        //console.log("[" +this.ad+ "] before addBlock chain height: " +this.total_chain_height );
        //return newBlock.height;
        newBlock.height = this.total_chain_height + 1;
        if(newBlock.height>0){
            var prevBlock =  await this.getBlock(newBlock.height - 1);
            newBlock.previousBlockHash = prevBlock.hash;
        }
        newBlock.time = new Date().getTime();//.toString().slice(0,-3);
        //var hashHesaplanacakBody = JSON.stringify(newBlock);

        //newBlock.hash = SHA256(hashHesaplanacakBody).toString();
        await newBlock.mineBlock(this.difficulty);

        //console.log(BigInt(string););
        var hexString = newBlock.hash.toString(16);
        var recall_int = parseInt(hexString, 16);
        //console.log("Mod_value:"+ 1000000000002 % 10);
        //var a =getRndInteger(0, 1000000000002);
        //console.log("a:" + a + " mod:"+ a%10 );
        var a = 1; //smallest number
        newBlock.recall_block = Math.floor(Math.random()*(this.total_chain_height-a+1))+a;;
        //console.log("recall:" + newBlock.recall_block + " mod:"+ newBlock.recall_block%10 );
        //console.log("recall:"+ recall_int, "--large_recall:"+ bigInt(recall_int))
        console.log("added block height: " + newBlock.height + " hash:" + newBlock.hash.toString() +" -its recall: "+ newBlock.recall_block);

        //newBlock.data =
        this.total_chain_height++;

        await addDataToLevelDB(newBlock.height, JSON.stringify(newBlock));
        console.log("Block " + (newBlock.height)+" added to DB");
        return newBlock.height;
    }


    async validateBlock(blockHeight) {
        // get block object
        const block =  await this.getBlock(blockHeight);
        // get block hash
        let blockHash = block.hash;
        // remove block hash to test block integrity
        block.hash = "";
        var checkPoint= JSON .stringify(block);
        // generate block hash
        let currentBlockHash = SHA256(checkPoint).toString();
        //console.log('!!!blockHash= ' + blockHash +' & ' + 'validBlockHash= ' + validBlockHash);
        // Compare
        if (blockHash === currentBlockHash) {
            console.log('Block #' + blockHeight + ' validated'+ " Body : " + block.body);
            return true;
        } else {
            console.log('Block #' + blockHeight + ' has invalid hash '+ " Body : " + block.body);
            //console.log('blockHash= ' + blockHash +' & ' + 'validBlockHash= ' + validBlockHash);
            //console.log('???block '+ block.height + '  height: '+ block.height +'  Hash:'+ block.hash+ ' Time: ' +block.time + ' Body: '+checkPoint);
            throw "Block check error "+ blockHeight;
        }
    }
    /**validate chain functions****/

    async validateEachBlock(blockHeight) {

        for (let i = 0; i <= blockHeight; i++) {
            try {
                await this.validateBlock(i);
            } catch (err) {
                console.log('Error in validateBlockIntegrity ', err);
                errorLog.push(i);
            }
        }
        return errorLog;
    }

    async validateChainIntegrity(blockHeight) {
        //let errorLog = [];
        let currentBlock;
        let prevBlock;
        for (let i = 1; i <= blockHeight; i++) {

            currentBlock =  await this.getBlock(i);
            prevBlock =  await this.getBlock(i-1);
            if (currentBlock.previousBlockHash !== prevBlock.hash) {
                console.log("Previous Hash ERROR in validatechainIntegrity for Block " + i);
                errorLog.push(i);
            }
            else
                console.log("Hash is correct for Block " + i + " Body : " + currentBlock.body);
        }
        return errorLog;
    }

    async validateChain() {
        const blockHeight =  await this.getBlockHeight();

        let errorLog_1=[];
        errorLog_1=  await this.validateChainIntegrity(blockHeight-1);

        errorLog.concat(errorLog_1);

        //errorLog =  await this.validateEachBlock(blockHeight-1);
        errorLog.concat(errorLog_1);
        return errorLog;
    }
    async validateB() {
        const blockHeight =  await this.getBlockHeight();

        let errorLog_1=[];

        errorLog =  await this.validateEachBlock(blockHeight-1);
        errorLog.concat(errorLog_1);
        return errorLog;
    }
    async  guncelle(key){
        var blok = await bc.getBlock(key);
        blok.body = "Nevza"+key;
        await bc.updateBlock(key, blok);
    }
    async  guncelle2(key){
        var blok = await bc.getBlock(key);
        blok.previousBlockHash = "nevzatnevzatnevzat";
        await bc.updateBlock(key, blok);
    }
    async  updateBlock(key, blok){
        addDataToLevelDB(key, JSON.stringify(blok));
        console.log("Block " + (key)+" updated to DB");
        return key;
    }

}
let bc = new Blockchain();
const kayitEkle = (name) => bc.addBlock(new BlockClass.StarBlock(name))


const main = async ()=> {

    for (var i = 0; i < 100; i++) {
        const data1Result = await kayitEkle("Data"+(i+1));
    }
    /*await bc.guncelle2(8);
    const sonuc = await bc.getBlock(8);
    console.log(sonuc)
    let errlog = await bc.validateChain();
    if (errlog.length > 0) {
        console.log('Block errors = ' + errorLog.length);
        console.log('Blocks: ' + errlog);
    } else {
        console.log('No errors detected');
    }
    console.log("Chain analysis result " + errlog.toString());*/
    //
    /*let errlog2 = await bc.validateB();
    if (errlog2.length > 0) {
        console.log('Block errors = ' + errorLog.length);
        console.log('Blocks: ' + errlog2);
    } else {
        console.log('No errors detected22');
    }
    console.log("Chain analysis result2 " + errlog2.toString())*/
    //
}

main()

module.exports.Blockchain = Blockchain;
