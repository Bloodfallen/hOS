// h.me server

const net = require('net');

var port = 9817;

const server = net.createServer((socket) => {
    socket.on('data', (data) => {
        console.log(data.toString());
    });
    socket.write('Connection to hOS network successful.');
    socket.write('Please log in.');
}).on('error', (err) => {
    console.error(err);
});

server.listen(port, () => {
    console.log('hOS server started successfully. listening on port', server.address().port);
});