const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
require('events').EventEmitter.defaultMaxListeners = 0;

const provider = ganache.provider();
const web3 = new Web3(provider);

const ENDPOINT = 'https://rinkeby.infura.io/v3/82e7042cec2d4ac0bbfb2118f3b3ef87'
const API_KEY = '82e7042cec2d4ac0bbfb2118f3b3ef87';
const API_SECRET = '7ce62cbcf8d841249e2e23a889d5f17b';


const { interface, bytecode } = require('../compile');

let accounts;
let inbox;
beforeEach(async () => {
  accounts = await web3.eth.getAccounts();
  inbox = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({data: bytecode, arguments: ['Hi there!']})
    .send({from: accounts[0], gas: '1000000'});

  inbox.setProvider(provider);
});

describe('Inbox', () => {
  it('deployes contract', () => {
    assert.ok(inbox.options.address);
  });

  it('has default message', async() => {
    const message = await inbox.methods.message().call();
    assert.equal(message, 'Hi there!');
  });

  it('can change the message', async() => {
    await inbox.methods.setMessage('bye').send({from: accounts[0]});
    const message = await inbox.methods.message().call();
    assert.equal(message, 'bye');
  })
});