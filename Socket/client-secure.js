const net = require('net');
const crypto = require('crypto'); // use crypto utils
const fs = require('fs');  // read from the filesystem 
//const recipientPrivateKey = fs.readFileSync('recipient_private.pem');

// Read the encrypted key from file or receive it from the sending machine
//const encryptedKey = fs.readFileSync('encrypted_key.txt');

// Decrypt the encrypted key using the recipient's private key
//const encryptionKey = crypto.privateDecrypt(recipientPrivateKey, encryptedKey);
//console.log('Decrypted Key:', encryptionKey.toString('hex'));

// Use the decrypted key for encryption and decryption

let decryptedKey;
const privateKey = fs.readFileSync('recipient_private.pem');


// Connect to the server
const client = net.createConnection({ port: 3000 }, () => {

  console.log('Connected to the server');
  
  // Read the encrypted key from file
  const encryptedKey = fs.readFileSync('encrypted_key.txt');
  
  // Decrypt the key using the recipient's private key
  decryptedKey = crypto.privateDecrypt(privateKey, encryptedKey);
  
  // Use the decrypted key for further operations (e.g., encryption/decryption)
  console.log('Decrypted Key:', decryptedKey.toString('hex'));


  console.log('Connected to the server');
  
  // Send a message to the server
  client.write('Hello from client 1!');
});

// Receive data from the server
client.on('data', (data) => {
  console.log('Received from server:',decrypt( data.toString('hex')));

  //console.log('Received from server:', decrypt(data.toString()));
});

// Handle connection termination
client.on('end', () => {
  console.log('Connection closed');
});



// Create the server
const server = net.createServer();

// Start listening on port 3000
server.listen(3001, () => {
  console.log('Client listening on port 3001');
});

function decrypt(ciphertext) {
  const decipher = crypto.createDecipher('aes-256-cbc', decryptedKey);
  let decrypted = decipher.update(ciphertext, 'hex', 'utf8');
  console.log('here')
  console.log(decrypted)
  console.log(decipher.final('utf8'));
  decrypted += decipher.final('utf8');
  return decrypted;
}