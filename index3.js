// CS55-Week-02

/* define a variable and place
   into it the http package (shared code) from node.js */

const myhttp = require('http');

// load the core node filesystem (fs) module, using js promises instead of callbacks
const fs = require("fs").promises;

// create a function to respond to http requests
const requestListener = function( myrequest, myresponse ) {
    console.log( myrequest.url );


    let filePath;
    let contentType;

    if ( myrequest.url === "/" ) {
        filePath = (__dirname + "/page.html");
        contentType = "text/html";
    } else if (myrequest.url === "/data.json") {
        filePath = (__dirname + "/data.json");
        contentType = "application/json";
    } 

    fs.readFile(filePath)
        .then(contents => {
            myresponse.setHeader("Content-Type", "${contentType}; charset=UTF-8");
            myresponse.writeHead(200);
            myresponse.end(contents);
        })
        .catch(err => {
            // Handle file not found or other errors
            myresponse.writeHead(404);
            myresponse.end("File not found!");
            console.error(err);
        });
};

let myserver = myhttp.createServer(requestListener);

myserver.listen(8080, "127.0.0.1", () => {
    console.log("Server has started at http://127.0.0.1:8080");
});