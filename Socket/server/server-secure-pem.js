const net = require('net');
const crypto = require('crypto');
const fs = require('fs');

// Read the private key passphrase
// const privateKeyPassphrase = 'server';

// Load server's private key
// const serverPrivateKey = fs.readFileSync('server_private.pem', { encoding: 'utf8', passphrase: privateKeyPassphrase });

// const encryptionAlgorithm = 'aes-512-cbc';

// Create the server
const server = net.createServer((socket) => {
  console.log('=====Client connected=====');

  // Handle data from the client
  socket.on('data', (data) => {
    console.log('Received from client:', data.toString());
  });
  
  // Handle client connection termination
  socket.on('end', () => {
    console.log('Client disconnected');
  });

  // Read the public key of the client
  const clientPublicKey = fs.readFileSync('../client_public.pem');

  // Encrypt the message
  const plaintext = 'Hello from server!';
  const encryptedMessage = crypto.publicEncrypt(clientPublicKey, plaintext);

  console.log('Encrypted message:', encryptedMessage);

  // Send the encrypted message to the client
  socket.write(encryptedMessage);

  setInterval(()=>{
    let randNumber = Math.floor(Math.random() * 10);
    let msg = 'Secret message: '+randNumber;
    let message = crypto.publicEncrypt(clientPublicKey, msg);
    socket.write(message);
  },1000)

  // Close the connection
  // socket.end();
});

// Start the server
server.listen(3000, () => {
  console.log('Server listening on port 3000');
});
