/*const BlockClass = require('./StarBlock.js');
const BlockChClass = require('./Blockchain.js');
const hex2ascii = require('hex2ascii');
const level = require('level');
const chainDB = './chaindata';*/
//let blockchain = new BlockChClass.Blockchain();
/*(function theLoop (i) {
    setTimeout(() => {
        blockchain.addBlock(new BlockClass.StarBlock(`Test data ${i}`)).then(() => {
            if (--i) {
                theLoop(i)
            }
        })
    }, 10);
})(15);
setTimeout(() => blockchain.validateChain(), 2000)
*/
/*async function guncelle(key){
    var blok = await bc.getBlock(key);
    blok.body = "Nevza"+key;
    await bc.updateBlock(key, blok);
}
async function guncelle2(key){
    console.log("guncelledım2")
    var blok = await bc.getBlock(key);
    blok.previousBlockHash = "05cd8ebfa7022a4bac220ae08a2f105bf582fc67613b4143f16cf0fb78c01723";
    await bc.updateBlock(key, blok);
}
const main = async ()=> {
    bc = new BlockClass.StarBlock();

    //await guncelle(4);
    await guncelle2(8);
    for (var i = 0; i < 10; i++) {
        //const data1Result = await kayitEkle("Data"+(i+1));
    }

    const sonuc = await bc.getBlock(3);
    console.log(sonuc)
    let errlog = await bc.validateChain();
    if (errlog.length > 0) {
        console.log('Block errors = ' + errorLog.length);
        console.log('Blocks: ' + errlog);
    } else {
        console.log('No errors detected');
    }
    console.log("Chain analysis result " + errlog.toString())
}
main();*/
////

/*let blockchain = new Blockchain();

(function theLoop (i) {
    setTimeout(() => {
        blockchain.addBlock(new BlockClass.StarBlock(`Test data ${i}`)).then(() => {
            if (--i) {
                theLoop(i)
            }
        })
    }, 10);
})(10);
setTimeout(() => blockchain.validateChain(), 2000)*/
//const kayitEkle = (name) => bc.addBlock(new StarBlock(name))

////////////
/*(function theLoop (i) {
    setTimeout(() => {
        blockchain.addBlock(new BlockClass.StarBlock(`Test data ${i}`)).then(() => {
            if (--i) {
                theLoop(i)
            }
        })
    }, 10);
})(15);*/
//setTimeout(() => blockchain.validateChain(), 2000)
/*let bc = new BlockClass.StarBlock();
let blockchain = new Blockchain();
async function guncelle(key){
    var blok = await bc.getBlock(key);
    blok.body = "Nevza"+key;
    await bc.updateBlock(key, blok);
}
async function guncelle2(key){
    console.log("guncelledım2")
    let blok = await blockchain.getBlock(key);
    blok.previousBlockHash = "05cd8ebfa7022a4bac220ae08a2f105bf582fc67613b4143f16cf0fb78c01723";
    await blockchain.updateBlock(key, blok);
}
const test = async  () =>{
    (function theLoop (i) {
        setTimeout(() => {
            blockchain.addBlock(new BlockClass.StarBlock(`Test data ${i}`)).then(() => {
                if (--i) {
                    theLoop(i)
                }
            })
        }, 100);
    })(10);
}
test();
const main = async ()=> {
    //bc = new Blockchain();
    //await guncelle(4);
    await guncelle2(8);
    for (var i = 0; i < 10; i++) {
        //const data1Result = await kayitEkle("Data"+(i+1));
    }

    const sonuc = await blockchain.getBlock(3);
    console.log(sonuc)
    let errlog = await blockchain.validateChain();
    if (errlog.length > 0) {
        console.log('Block errors = ' + errorLog.length);
        console.log('Blocks: ' + errlog);
    } else {
        console.log('No errors detected');
    }
    console.log("Chain analysis result " + errlog.toString())
}
main();
////
*/