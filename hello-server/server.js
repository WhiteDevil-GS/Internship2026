<<<<<<< HEAD
const http = require('http');

// Create server
const server = http.createServer((req, res) => {

    // Home route
    if (req.url === '/') {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('Welcome to Home Page');
    } 
    
    // About route
    else if (req.url === '/about') {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('This is About Page');
    } 
    
    // Contact route
    else if (req.url === '/contact') {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('Contact us at example@gmail.com');
    } 
    
    // 404 route
    else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Page Not Found');
    }
});

// Start server
server.listen(3000, () => {
    console.log('Server running at http://localhost:3000');
=======
const http = require('http');

// Create server
const server = http.createServer((req, res) => {

    // Home route
    if (req.url === '/') {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('Welcome to Home Page');
    } 
    
    // About route
    else if (req.url === '/about') {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('This is About Page');
    } 
    
    // Contact route
    else if (req.url === '/contact') {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('Contact us at example@gmail.com');
    } 
    
    // 404 route
    else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Page Not Found');
    }
});

// Start server
server.listen(3000, () => {
    console.log('Server running at http://localhost:3000');
>>>>>>> 2a70db7 (Added Assignment 26 - Route Master)
});