const HDWalletProvider =  require('truffle-hdwallet-provider');
const Web3 = require('web3');
const { interface, bytecode } = require('./compile');

const provider = new HDWalletProvider(
  'kid cargo essay stock chuckle primary grape day film convince obtain lunch',
  'https://rinkeby.infura.io/v3/82e7042cec2d4ac0bbfb2118f3b3ef87'
);

const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log(`Attempting to deploy the contract from account ${accounts[0]}`);

  // error codeconst result = await new web3.eth.Contract( JSON.parse(interface)) .deploy({ data: bytecode }) .send({   from: accounts[0],   gas: '2000000'});
  // resolved codeconst result = await new web3.eth.Contract( JSON.parse(interface)) .deploy({ data: bytecode }) .send({ from: accounts[0] }); // remove 'gas' for outside network

  // error codeconst lottery = await new web3.eth.Contract(JSON.parse(interface)) .deploy({ data: bytecode }) .send({ from: accounts[0], gas: '1000000' });
  // resolved codeconst lottery = await new web3.eth.Contract(JSON.parse(interface)) .deploy({ data: '0x' + bytecode }) .send({ from: accounts[0] })

  const result = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({data: '0x'+bytecode, arguments: ['Hi There!']})
    .send({from: accounts[0]});
  console.log(`Contract deployed at : ${result.options.address}`);
};

deploy();