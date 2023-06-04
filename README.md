# socket-security

I prepared a number of demos to showcase from concept to integration

Demo 1 - simple client 
This has 2 parts, they are both logically speaking, servers, but this is to simplify the development. 

Use server.js and client.js , run them together, server first (always) followed by the client . 
This will show the client and the server exchanging messages continously 

Demo 2 - secured one way communication
Use server-secureDemo and client , this time, server is encrypting the date before sending, on the client you will see the encrypted data. 

Demo 3 - secured encrytion and decryption 
Use server-secure-pem.js and client-secure.js , this time, the server will generate a file starting from the private and public keys present in the folder. It will generate an encryption and decryption key and wrap it through encryption with the client's public key. 
We assume the client has access to these files, and can use the private key to decrypt it. 
