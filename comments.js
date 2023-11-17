import http from 'http';

const server = http.createServer((_req, res) => {
    res.statusCode;

    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello, world!');
});

server.listen(3000, () => {
    console.log('Server running on port 3000');
});
