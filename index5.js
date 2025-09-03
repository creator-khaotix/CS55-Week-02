// CS55-Week-02

const myhttp = require('http');
const fs = require("fs").promises;

const requestListener = function(myrequest, myresponse) {
    console.log(myrequest.url);

    let filePath;
    let contentType;

    if (myrequest.url === "/") {
        filePath = (__dirname + "/newpage2.html");
        contentType = "text/html";
    } else {
        filePath = (__dirname + "/test.json");
        contentType = "application/json";
    } 
    fs.readFile(filePath)
        .then(contents => {
            myresponse.setHeader("Content-Type", `${contentType}; charset=UTF-8`);
            myresponse.writeHead(200);
            myresponse.end(contents);
        })
};

let myserver = myhttp.createServer(requestListener);

myserver.listen(8080, "127.0.0.1", () => {
    console.log("Server has started at http://127.0.0.1:8080");
});