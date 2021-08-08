const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let crypto;
try {
    crypto = require('crypto');
} catch (err) {
    console.log('crypto support is disabled!');
}

const products = require('./data/products');

const StormDB = require('stormdb');

// start db with "./db.stormdb" storage location
const engine = new StormDB.localFileEngine('./db.stormdb');
const db = new StormDB(engine);
const NO_SOURCE = 'nosource'; //marker indicating that this transaction does not need reference transactions as it was added by the owner
const KEY_OPTIONS = {
    modulusLength: 4096,
    publicKeyEncoding: {
        type: 'spki',
        format: 'pem',
    },
    privateKeyEncoding: {
        type: 'pkcs8',
        format: 'pem',
        cipher: 'aes-256-cbc',
        passphrase: 'top secret',
    },
};
const PASSWORD = 'top secret'; //passphrase for private key
function getKeys() {
    let data = {};
    let { publicKey, privateKey } = crypto.generateKeyPairSync(
        'rsa',
        KEY_OPTIONS
    );
    data = { newpublicKey: publicKey, newprivateKey: privateKey };
    return data;
}
let { newpublicKey, newprivateKey } = getKeys();
let privateKey = newprivateKey;
let publicKey = newpublicKey;
//User object template, first user is the server itself, representing the entity of the shop
let UserObject = {
    name: 'server',
    library: [],
    privateKey: privateKey,
    publicKey: publicKey,
    transactions: [],
    balance: 0.0,
    makePayment: (amount, publicKey) => {},
};
//transaction object template
let TransactionObject = {
    reference: [], //hashed list of previous transactions
    senderKey: publicKey,
    recieverKey: 'init',
    amount: 132,
};
let BlockChainObject = {
    transactionHash: 'init', //hash the transaction object to obtain this value
    nonce: 123, //in our case, a nonce is simply any number greater than 100 that a miner generates randomly in a range of 500 numbers
};

db.default({ users: [UserObject], blockchain: [] });

// save changes to db
db.save();

function addCoins(amount, publicKey) {
    transactions.push({
        id: transactions.length,
        input: publicKey,
        output: publicKey,
        amount: amount,
        transaction_ref: NEW_COINS,
    });
}

function createUser(username) {
    //Generate keys
    let { newprivateKey, newpublicKey } = getKeys();
    //setup initial transaction state
    let initialTransaction = TransactionObject;
    initialTransaction.recieverKey = newpublicKey;
    initialTransaction.amount = 100;
    initialTransaction.senderKey = publicKey;
    //assign new data
    let newUser = UserObject;
    newUser.name = username;
    newUser.publicKey = newpublicKey;
    newUser.privateKey = newprivateKey;
    newUser.balance = 100;

    newUser.transactions = [initialTransaction];

    db.get('users').push(newUser);
    db.save();
    return {
        user: newUser,
    };
}

function getUser(publicKey) {
    let usersDb = db.get('users').value();
    // console.log(usersDb);

    let targetUser = usersDb.find((element) => {
        // console.log('input key: ' + publicKey.replace(/(\r\n|\n|\r)/gm, ' '));
        // console.log(
        //     'db key: ' + element.publicKey.replace(/(\r\n|\n|\r)/gm, ' ')
        // );

        return (
            element.publicKey.replace(/(\r\n|\n|\r)/gm, ' ') ===
            publicKey.replace(/(\r\n|\n|\r)/gm, ' ')
        );
    });
    //console.log(targetUser);
    return targetUser;
}
function getUserIndex(publicKey) {
    let usersDb = db.get('users').value();
    // console.log(usersDb);

    let targetUser = usersDb.find((element) => {
        // console.log('input key: ' + publicKey.replace(/(\r\n|\n|\r)/gm, ' '));
        // console.log(
        //     'db key: ' + element.publicKey.replace(/(\r\n|\n|\r)/gm, ' ')
        // );

        return (
            element.publicKey.replace(/(\r\n|\n|\r)/gm, ' ') ===
            publicKey.replace(/(\r\n|\n|\r)/gm, ' ')
        );
    });
    let index = usersDb.indexOf(targetUser);
    //console.log(targetUser);
    return index;
}
function checkoutTransaction(privateKey, senderPublicKey, products, amount) {
    //setup initial transaction state
    let user = getUser(senderPublicKey);
    //console.log(senderPublicKey);
    //console.log(user);
    if (amount > user.balance) {
        return false;
    } else {
        user.balance = user.balance - amount;
    }
    let transactionIds = user.transactions.map((item, index) => index);

    let checkoutTransactionObject = TransactionObject;
    checkoutTransactionObject.recieverKey = publicKey;
    checkoutTransactionObject.amount = -amount;
    checkoutTransactionObject.senderKey = senderPublicKey;
    checkoutTransactionObject.transaction_ref = transactionIds;

    user.library.push(products);
    user.transactions.push(checkoutTransactionObject);
    console.log('user idx:  ' + getUserIndex(senderPublicKey));
    db.get('users').get(getUserIndex(senderPublicKey)).set(user);

    db.save();

    return true;
}
function addTokens(receiverpublicKey, amount) {
    let user = getUser(receiverpublicKey);
    //console.log(senderPublicKey);
    //console.log(user);
    user.balance = user.balance + amount;

    let transactionIds = user.transactions.map((item, index) => index);

    let checkoutTransactionObject = TransactionObject;
    checkoutTransactionObject.recieverKey = receiverpublicKey;
    checkoutTransactionObject.amount = amount;
    checkoutTransactionObject.senderKey = publicKey;
    checkoutTransactionObject.transaction_ref = transactionIds;

    user.transactions.push(checkoutTransactionObject);
    console.log('user idx:  ' + getUserIndex(receiverpublicKey));
    db.get('users').get(getUserIndex(receiverpublicKey)).set(user);

    db.save();
}
function updateUserInDatabase(user) {}
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept'
    );
    next();
});
//Route settings
app.listen(5000, console.log('Sever running on port 5000'));

app.get('/', (req, res) => {
    res.send('Server is running');
});

app.get('/api/products', (req, res) => {
    res.json(products);
});

app.get('/api/products/:id', (req, res) => {
    const product = products.find((p) => req.params.id);
    req.json(products);
});

app.post('/signin', (req, res) => {
    const publicKey = req.body.publicKey;
    let user = getUser(publicKey);

    res.send(user);
});
app.post('/signup', (req, res) => {
    const username = req.body.username;

    const data = createUser(username);
    //console.log(data);

    res.send(data);
});
app.post('/checkout', (req, res) => {
    const products = req.body.products;
    const privateKey = req.body.privateKey;
    const publicKey = req.body.publicKey;
    const amount = req.body.amount;
    checkoutTransaction(privateKey, publicKey, products, amount);
    let user = getUser(publicKey);

    res.send(user);
});
app.post('/addTokens', (req, res) => {
    const publicKey = req.body.publicKey;
    const amount = req.body.amount;
    addTokens(publicKey, amount);
    let user = getUser(publicKey);

    res.send(user);
});
