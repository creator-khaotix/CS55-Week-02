const myhttp = require('http');
const fs = require("fs").promises;
const path = require("path"); // Import the path module

const requestListener = function(myrequest, myresponse) {
    console.log(myrequest.url);

    let filePath;
    let contentType;

    if (myrequest.url === "/") {
        filePath = path.join(__dirname, "page.html");
        contentType = "text/html";
    } else if (myrequest.url === "/data.json") {
        filePath = path.join(__dirname, "data.json");
        contentType = "application/json";
    } else {
        myresponse.writeHead(404, { "Content-Type": "text/plain" });
        myresponse.end("Not Found");
        return;
    }

    fs.readFile(filePath)
        .then(contents => {
            myresponse.setHeader("Content-Type", `${contentType}; charset=UTF-8`);
            myresponse.writeHead(200);
            myresponse.end(contents);
        })
        .catch(err => {
            console.error(err);
            myresponse.writeHead(500, { "Content-Type": "text/plain" });
            myresponse.end("Internal Server Error");
        });
};

const myserver = myhttp.createServer(requestListener);
myserver.listen(8080, "127.0.0.1", () => {
    console.log("Server has started on http://127.0.0.1:8080");
});