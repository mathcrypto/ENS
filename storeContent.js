var express = require('express');
var fs = require('fs');

var solc = require('solc');

var router = express.Router();
var cryptojs = require("crypto-js");

var sha256 = require("crypto-js/sha256");
var multer = require('multer');
var upload = multer({
	dest: 'uploads/'
});
var contract = fs.readFileSync("solidity/PublicResolver.sol").toString("utf-8");
var abi = [{
	"constant": true,
	"inputs": [{
		"name": "interfaceID",
		"type": "bytes4"
	}],
	"name": "supportsInterface",
	"outputs": [{
		"name": "",
		"type": "bool"
	}],
	"payable": false,
	"type": "function"
}, {
	"constant": true,
	"inputs": [{
		"name": "node",
		"type": "bytes32"
	}],
	"name": "content",
	"outputs": [{
		"name": "ret",
		"type": "bytes32"
	}],
	"payable": false,
	"type": "function"
}, {
	"constant": true,
	"inputs": [{
		"name": "node",
		"type": "bytes32"
	}],
	"name": "addr",
	"outputs": [{
		"name": "ret",
		"type": "address"
	}],
	"payable": false,
	"type": "function"
}, {
	"constant": true,
	"inputs": [{
		"name": "node",
		"type": "bytes32"
	}, {
		"name": "kind",
		"type": "bytes32"
	}],
	"name": "has",
	"outputs": [{
		"name": "",
		"type": "bool"
	}],
	"payable": false,
	"type": "function"
}, {
	"constant": false,
	"inputs": [{
		"name": "node",
		"type": "bytes32"
	}, {
		"name": "hash",
		"type": "bytes32"
	}],
	"name": "setContent",
	"outputs": [],
	"payable": false,
	"type": "function"
}, {
	"constant": false,
	"inputs": [{
		"name": "node",
		"type": "bytes32"
	}, {
		"name": "addr",
		"type": "address"
	}],
	"name": "setAddr",
	"outputs": [],
	"payable": false,
	"type": "function"
}, {
	"inputs": [{
		"name": "ensAddr",
		"type": "address"
	}],
	"payable": false,
	"type": "constructor"
}, {
	"payable": false,
	"type": "fallback"
}];
var alreadyDeployedContractAddress = "0xdf378afb6e5ce6d6108f811cee43b7aa603ef16f";
var ENS = require('ethereum-ens');
var Web3 = require('web3');
var web3 = new Web3();
var ens = new ENS(web3, '0x4ed3fd9a0a22e2dc68340d803aed6a1b2ebe5a04');
var publicResolver = web3.eth.contract(abi).at(alreadyDeployedContractAddress);
web3.setProvider(new web3.providers.HttpProvider("http://192.168.1.104:8545"));
var address = ens.resolver('tessilab.eth').addr();
var swarm = require("swarm-js").at("http://192.168.1.104:8500");
router.post('/', upload.single('file'), function(req, res, next) {
	console.log("req body: \n" + JSON.stringify(req.body));
	console.log("req file: \n" + JSON.stringify(req.file));
	fs.readFile(req.file.path, function(err, data) {
		if (err) {
			res.status(500).send('ko');
			return;
		}
		swarm.upload(new Buffer(data)).then(function(value) {
			console.log(value);
			var filehash = value;
		
		});
			var hash = "0xb99576bd748002f99c4d1fa859600090fa0b3b1db1a289c98c0da8b31fc66558";
              publicResolver.setContent(('tessilab.eth'), hash, {
					from: web3.eth.accounts[0],
					gas: '100000'
				});
            
               console.log(store);
               	res.send(store);
	
	});
});


module.exports = router;
