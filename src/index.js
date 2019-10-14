const http = require('http');
import { render } from "./templating.js"

// Create an instance of the http server to handle HTTP requests
let app = http.createServer((req, res) => {
    // Set a response type of plain text for the response
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.write(render("Bonjour {{ nom }} {{ prenom}} ! Vous avez {{ age }} ans et êtes {{ profession }}",{nom : "Ducasse", prenom : "Sébastien", age : 22, profession : "apprenti"}));
    // Send back a response and end the connection
    res.end('');
});

// Start the server on port 3000
app.listen(3000, '127.0.0.1');
console.log('Node server running on port 3000');