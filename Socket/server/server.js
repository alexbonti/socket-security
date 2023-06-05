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
        let message='Secret message: '+randNumber;
        socket.write(message);
    },1000)
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