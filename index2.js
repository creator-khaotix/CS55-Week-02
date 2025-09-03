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
        // check request url, if root, return html files
        // special variable ___dirname has absolute path of where node code is running
        filePath = path.join(__dirname, "page.html");
        contentType = "text/html";
    } else if (myrequest.url === "/data.json") {
        filePath = path.join(__dirname, "data.json");
        contentType ="application/json";
    }

    fs.readFile(filePath)
        .then(contents => {
            myresponse.setHeader("Content-Type", `${contentType}; charset=UTF-8`);
            myresponse.writeHead(200);
            myresponse.end(contents);
        });







    //     fs.readFile(__dirname + "/page.html")
    //         .then(
    //             contents => {
    //                 //set http response header entry
    //                 myresponse.setHeader("Content-Type", "text/html; charset=UTF-8");
    //                 // return 200 OK http status code
    //                 myresponse.writeHead(200);
    //                 // send back files contents + close response
    //                 myresponse.end(contents);
    //             }

    //         );
    // } else {
    //     // if request url not root, return json file
    //     fs.readFile(__dirname + "/data.json")
    //         .then(
    //             contents => {
    //                 //set http response header entry
    //                 myresponse.setHeader("Content-Type", "application/json; charset=UTF-8");
    //                 // return 200 OK http status code
    //                 myresponse.writeHead(200);
    //                 // send back files contents + close response
    //                 myresponse.end(contents);
    //             }

    //         );

    //}
    //   mytext = "Well hello there folks...";
    // } else if ( myrequest.url === "/cheese" ) {
    //   mytext = "mouse";
    // } else if ( myrequest.url === "/pillow" ) {
    //   mytext = "blanket";
    // }
    // // writeHead() creates an http response header, including the status code (200 OK), the content type
    // myresponse.writeHead( 200, { "Content-Type": "text/plain" } );

    // myresponse.end( mytext );
  };
// use dot notation in javascript to access an object and its methods (commands) and properties
// createServer() takes some arguments to make it provide a useful http server
// 1: function (block of code) that will be run whenever the server receives an http request

let myserver = myhttp.createServer(
    // createServer() uses our funtion to run when a request comes in
    requestListener
    
//     function( myrequest, myresponse ) {
//     console.log( myrequest.url );

//     let mytext;
//     if ( myrequest.url === "/hey" ) {
//       mytext = "Well hello there folks...";
//     } else if ( myrequest.url === "/cheese" ) {
//       mytext = "mouse";
//     } else if ( myrequest.url === "/pillow" ) {
//       mytext = "blanket";
//     }
//     // writeHead() creates an http response header, including the status code (200 OK), the content type
//     myresponse.writeHead( 200, { "Content-Type": "text/plain" } );

//     myresponse.end( mytext );
//   }
);

// ask http to start listening on a tcp port for incoming http requests
// listen() takes 2 args: 1: tcp port #, 2: string of the ip address to listen (0.0.0.0)
// http://127.0.0.1:8080
myserver.listen(8080, "127.0.0.1");

// console.log("server has started");