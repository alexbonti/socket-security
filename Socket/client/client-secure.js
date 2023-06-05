const net = require('net');
const crypto = require('crypto');
const fs = require('fs');

// Read the private key passphrase
// const clientPrivateKeyPassphrase = 'client';

// Load client's private key
const clientPrivateKey = fs.readFileSync('client_private.pem');

const client = net.createConnection({ port: 3000 }, () => {
  console.log('=====Connected to the server=====');

  client.write('Hello from client!');

  // Receive data from the server
  client.on('data', (data) => {
    // Decrypt the received message using the client's private key
    const decryptedMessage = crypto.privateDecrypt(clientPrivateKey, data);

    console.log('-------------------');
    console.log('Received from server:', data.toString());
    console.log('Decrypted message:', decryptedMessage.toString());
  });

  // Handle connection termination
  client.on('end', () => {
    console.log('Connection closed');
  });
});
