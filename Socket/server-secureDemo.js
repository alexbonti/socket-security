const net = require('net');

// Create the server
const server = net.createServer((socket) => {
  console.log('Client connected');

  // Handle data from the client
  socket.on('data', (data) => {
    console.log('Received from client:', data.toString());
    
    // Send a response back to the client
    socket.write('Server received your message!');
    setInterval(()=>{
        let randNumber=Math.floor(Math.random() * 10);
        let message=encrypt('Secret message :'+randNumber);
        socket.write(message);
    },500)
    // Close the connection
    //socket.end();
  });
  
  // Handle client connection termination
  socket.on('end', () => {
    console.log('Client disconnected');
  });
});

// Start listening on port 3000
server.listen(3000, () => {
  console.log('Server listening on port 3000');
});


// SECURITY
const crypto = require('crypto');

// Generate a random encryption key
const encryptionKey = crypto.randomBytes(32); // 32 bytes = 256 bits

// Encrypt the plaintext
function encrypt(plaintext) {
  const cipher = crypto.createCipher('aes-256-cbc', encryptionKey);
  let encrypted = cipher.update(plaintext, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return encrypted;
}

// Decrypt the ciphertext
function decrypt(ciphertext) {
  const decipher = crypto.createDecipher('aes-256-cbc', encryptionKey);
  let decrypted = decipher.update(ciphertext, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}

// Example usage
const plaintext = 'Hello, world!';
const encryptedText = encrypt(plaintext);
console.log('Encrypted:', encryptedText);

const decryptedText = decrypt(encryptedText);
console.log('Decrypted:', decryptedText);
