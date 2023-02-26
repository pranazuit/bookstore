const express = require('express');
const path = require('path');


const app = express();


app.use('/robots.txt', function (req, res, next) {
    res.type('text/plain')
    res.send("User-agent: *\nDisallow: /");
});

// Serve the static files from the React app

// app.use('/manifest.json',express.static(path.join(__dirname, '/build/manifest.json')));
// app.use('/favicon.ico',express.static(path.join(__dirname, '/build/favicon.ico')));
app.use('/static',express.static(path.join(__dirname, '/build/static')));
app.use('',express.static(path.join(__dirname, '/build')));

app.get('/manifest.json', (req,res) =>{
    res.sendFile(path.join(__dirname+'/build/manifest.json'));
});
app.get('/favicon.ico', (req,res) =>{
    res.sendFile(path.join(__dirname+'/build/favicon.ico'));
});
app.get('/service-worker.js', (req,res) =>{
    res.sendFile(path.join(__dirname+'/build/service-worker.js'));
});
//Handles any requests that don't match the ones above
app.get('*', (req,res) =>{
    res.sendFile(path.join(__dirname+'/build/index.html'));
});

const port = 3000;
app.listen(port);

console.log('App is listening on port ' + port);