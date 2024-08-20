const http = require('http');

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hola desde el servidor de prueba');
});

server.listen(8000, '127.0.0.1', () => {
  console.log('Servidor de prueba corriendo en http://127.0.0.1:8000/');
});
