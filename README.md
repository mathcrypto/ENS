# ENS
1) Deploy ENS contract in the console of testrpc:

var ensContract = eth.contract([{"constant":true,"inputs":[{"name":"node","type":"bytes32"}],"name":"resolver","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"node","type":"bytes32"}],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"node","type":"bytes32"},{"name":"label","type":"bytes32"},{"name":"owner","type":"address"}],"name":"setSubnodeOwner","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"node","type":"bytes32"},{"name":"ttl","type":"uint64"}],"name":"setTTL","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"node","type":"bytes32"}],"name":"ttl","outputs":[{"name":"","type":"uint64"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"node","type":"bytes32"},{"name":"resolver","type":"address"}],"name":"setResolver","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"node","type":"bytes32"},{"name":"owner","type":"address"}],"name":"setOwner","outputs":[],"payable":false,"type":"function"},{"anonymous":false,"inputs":[{"indexed":true,"name":"node","type":"bytes32"},{"indexed":false,"name":"owner","type":"address"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"node","type":"bytes32"},{"indexed":true,"name":"label","type":"bytes32"},{"indexed":false,"name":"owner","type":"address"}],"name":"NewOwner","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"node","type":"bytes32"},{"indexed":false,"name":"resolver","type":"address"}],"name":"NewResolver","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"node","type":"bytes32"},{"indexed":false,"name":"ttl","type":"uint64"}],"name":"NewTTL","type":"event"}]); 


var ens = ensContract.new({ from: web3.eth.accounts[0], data: "0x33600060000155610220806100146000396000f3630178b8bf60e060020a600035041415610023576020600435015460405260206040f35b6302571be360e060020a600035041415610047576000600435015460405260206040f35b6316a25cbd60e060020a60003504141561006b576040600435015460405260206040f35b635b0fc9c360e060020a6000350414156100b8576000600435015433141515610092576002565b6024356000600435015560243560405260043560198061020760003960002060206040a2005b6306ab592360e060020a6000350414156101165760006004350154331415156100df576002565b6044356000600435600052602435602052604060002001556044356040526024356004356021806101e660003960002060206040a3005b631896f70a60e060020a60003504141561016357600060043501543314151561013d576002565b60243560206004350155602435604052600435601c806101ca60003960002060206040a2005b6314ab903860e060020a6000350414156101b057600060043501543314151561018a576002565b602435604060043501556024356040526004356016806101b460003960002060206040a2005b6002564e657754544c28627974657333322c75696e743634294e65775265736f6c76657228627974657333322c61646472657373294e65774f776e657228627974657333322c627974657333322c61646472657373295472616e7366657228627974657333322c6164647265737329", gas: 4700000}, function (e, contract) { console.log(e, contract); if (typeof contract.address !== 'undefined') { console.log('Contract mined! address: ' + contract.address + 'transactionHash: ' + contract.transactionHash);}});


2.Deploy FIFS registrar contract:

var registrarContract = eth.contract([{"constant":false,"inputs":[{"name":"subnode","type":"bytes32"},{"name":"owner","type":"address"}],"name":"register","outputs":[],"payable":false,"type":"function"},{"inputs":[{"name":"ensAddr","type":"address"},{"name":"node","type":"bytes32"}, {"name": "_startDate", "type": "uint256"}],"type":"constructor"}]);


var registrar = registrarContract.new( ens.address, 0, {from: web3.eth.accounts[0], data: "0x60606040818152806101c4833960a0905251608051600080546c0100000000000000000000000080850204600160a060020a0319909116179055600181905550506101768061004e6000396000f3606060405260e060020a6000350463d22057a9811461001e575b610002565b34610002576100f4600435602435600154604080519182526020808301859052815192839003820183206000805494830181905283517f02571be3000000000000000000000000000000000000000000000000000000008152600481018390529351879592949193600160a060020a03909316926302571be3926024808201939182900301818787803b156100025760325a03f11561000257505060405151915050600160a060020a038116158015906100ea575033600160a060020a031681600160a060020a031614155b156100f657610002565b005b60008054600154604080517f06ab5923000000000000000000000000000000000000000000000000000000008152600481019290925260248201899052600160a060020a03888116604484015290519216926306ab59239260648084019382900301818387803b156100025760325a03f11561000257505050505050505056", gas: 4700000}, function (e, contract){ console.log(e, contract); if (typeof contract.address !== 'undefined') { console.log('Contract mined! address: ' + contract.address + ' transactionHash: ' + contract.transactionHash);}});
null [object Object]
3- Set the owner of the name registrar process your account:

 ens.setOwner(0, registrar.address, {from: eth.accounts[0]});
 
 4- Deploy the publicResolver contract:
 var publicResolverContract = eth.contract([{"constant": true,"inputs": [{"name": "interfaceID","type": "bytes4"}],"name": "supportsInterface","outputs": [{"name": "","type": "bool"}],"payable": false,"type": "function"},{"constant": true,"inputs": [{"name": "node","type": "bytes32"}],"name": "content","outputs": [{"name": "ret","type": "bytes32"}],"payable": false,"type": "function"},{"constant": true,"inputs": [{"name": "node", "type": "bytes32"}],"name": "addr","outputs": [{"name": "ret","type": "address"}], "payable": false,"type": "function"},{"constant": true,"inputs": [{"name": "node","type": "bytes32"}, {"name": "kind","type": "bytes32"}],"name": "has","outputs": [{"name": "","type": "bool" }],"payable": false,"type": "function"},{"constant": false,"inputs": [{"name": "node","type": "bytes32"},{"name": "hash","type": "bytes32"}],"name": "setContent","outputs": [],"payable": false, "type": "function"},{ "constant": false,"inputs": [ {"name": "node","type": "bytes32"},{"name": "addr","type": "address"}],"name": "setAddr","outputs": [],"payable": false,"type": "function"},{ "inputs": [{"name": "ensAddr","type": "address"}],"payable": false, "type": "constructor"},{ "payable": false,"type": "fallback"}]);
 
 var publicResolver = publicResolverContract.new( ens.address, { from: web3.eth.accounts[0], data: "0x6060604052346100005760405160208061043a83398101604052515b60008054600160a060020a031916600160a060020a0383161790555b505b6103f2806100486000396000f3006060604052361561005c5763ffffffff60e060020a60003504166301ffc9a7811461006e5780632dff69411461009c5780633b3b57de146100be57806341b9dc2b146100ea578063c3d014d614610111578063d5fa2b0014610126575b346100005761006c5b610000565b565b005b3461000057610088600160e060020a031960043516610144565b604080519115158252519081900360200190f35b34610000576100ac6004356101af565b60408051918252519081900360200190f35b34610000576100ce6004356101c4565b60408051600160a060020a039092168252519081900360200190f35b34610000576100886004356024356101e2565b604080519115158252519081900360200190f35b346100005761006c600435602435610275565b005b346100005761006c600435600160a060020a036024351661030c565b005b60007f3b3b57de00000000000000000000000000000000000000000000000000000000600160e060020a0319831614806101a757507fd8389dc500000000000000000000000000000000000000000000000000000000600160e060020a03198316145b90505b919050565b6000818152600260205260409020545b919050565b600081815260016020526040902054600160a060020a03165b919050565b60007f6164647200000000000000000000000000000000000000000000000000000000821480156102295750600083815260016020526040902054600160a060020a031615155b8061026b57507f68617368000000000000000000000000000000000000000000000000000000008214801561026b575060008381526002602052604090205415155b5b90505b92915050565b60008054604080516020908101849052815160e060020a6302571be30281526004810187905291518694600160a060020a033381169516936302571be393602480830194919391928390030190829087803b156100005760325a03f11561000057505060405151600160a060020a03169190911490506102f457610000565b60008381526002602052604090208290555b5b505050565b60008054604080516020908101849052815160e060020a6302571be30281526004810187905291518694600160a060020a033381169516936302571be393602480830194919391928390030190829087803b156100005760325a03f11561000057505060405151600160a060020a031691909114905061038b57610000565b6000838152600160205260409020805473ffffffffffffffffffffffffffffffffffffffff1916600160a060020a0384161790555b5b5050505600a165627a7a72305820701af0e0110558c32c17f5a1f13078d4a09c60b4c9e505820d8b7baf74000d120029", gas: 4700000}, function (e, contract){ console.log(e, contract); if (typeof contract.address !== 'undefined') { console.log('Contract mined! address: ' + contract.address + ' transactionHash: ' + contract.transactionHash);}});

5- Now that you have both ens.address and publicResolver.address, download the script (ensutils.js) from https://github.com/ethereum/ens/blob/master/ensutils.js
Then change the ens.address and publicResolver.address with the ones you just deployed.
On the geth console, load the previous script using :
loadScript('/path/to/ensutils.js');

6- Registering a name with the FIFS registrar:
i) You will use the registrar address you deployed previously.
var myRegistrar = fifsRegistrarContract.at(registrar.address);
ii)You can skip the step of checking if a domain name is available as mentioned in http://docs.ens.domains/en/latest/userguide.html#fifs since you are working on your private blockchain and only you register and own names here.

iii) Now choose a name you want to register, in this example we chose 'eth'
testRegistrar.register(web3.sha3('eth'), eth.accounts[0], {from: eth.accounts[0]});
iv) You can now check if you are the owner of this name by this command:
ens.owner(namehash('eth'));

v) Setting a name’s resolver:
In this case, we will set the publicResolver:
ens.setResolver(namehash('eth'), publicResolver.address, {from: eth.accounts[0]});

vi) Then, call the resolver’s setAddr method to set the address the name resolves to:

publicResolver.setAddr(namehash('eth'), eth.accounts[0], {from: eth.accounts[0]})

7- Creating a subdomain:
We will create tessilab.eth
 ens.setSubnodeOwner(namehash('eth'), web3.sha3('tessilab'), eth.accounts[0], {from: eth.accounts[0]});
 After, you can set a resolver for it and address like previously.





