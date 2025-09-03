// CS55-Week-02

const myhttp = require('http');
const fs = require("fs").promises;

const requestListener = function(myrequest, myresponse) {
    console.log(myrequest.url);

    let filePath;
    let contentType;

    if (myrequest.url === "/") {
        filePath = (__dirname + "/page.html");
        contentType = "text/html";
    } else if (myrequest.url === "/data.json") {
        filePath = (__dirname + "/data.json");
        contentType = "application/json";
    } else {
        // Handle other file requests
        filePath = (__dirname + myrequest.url);
        // Add logic to determine content type if needed
        contentType = "text/plain"; 
    }

    fs.readFile(filePath)
        .then(contents => {
            myresponse.setHeader("Content-Type", `${contentType}; charset=UTF-8`);
            myresponse.writeHead(200);
            myresponse.end(contents);
        })
        .catch(err => {
            myresponse.writeHead(404);
            myresponse.end("File not found!");
            console.error(err);
        });
};

let myserver = myhttp.createServer(requestListener);

myserver.listen(8080, "127.0.0.1", () => {
    console.log("Server has started at http://127.0.0.1:8080");
});