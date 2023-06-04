const net = require('net');

// Connect to the server
const client = net.createConnection({ port: 3000 }, () => {
  console.log('Connected to the server');
  
  // Send a message to the server
  client.write('Hello from client 1!');
});

// Receive data from the server
client.on('data', (data) => {
  console.log('Received from server:', data.toString());
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