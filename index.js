// CS55-Week-02

/* define a variable and place
   into it the http package (shared code) from node.js */

const myhttp = require('http');

// load the core node filesystem (fs) module, using js promises instead of callbacks
const fs = require("fs").promises;

// create a function to respond to http requests
const requestListener = function( therequest, theresponse ) {
    console.log( therequest.url );

    if ( therequest.url === "/" ) {
        // check request url, if root, return html files
        // special variable ___dirname has absolute path of where node code is running
        fs.readFile(__dirname + "/newpage.html")
            .then(
                newname => {
                    //set http response header entry
                    theresponse.setHeader("Content-Type", "text/html; charset=UTF-8");
                    // return 200 OK http status code
                    theresponse.writeHead(200);
                    // send back files contents + close response
                    theresponse.end(newname);
                }

            );
    } else {
        // if request url not root, return json file
        fs.readFile(__dirname + "/test.json")
            .then(
                newname => {
                    //set http response header entry
                    theresponse.setHeader("Content-Type", "application/json; charset=UTF-8");
                    // return 200 OK http status code
                    theresponse.writeHead(200);
                    // send back files contents + close response
                    theresponse.end(newname);
                }

            );

    }
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

let theserver = myhttp.createServer(
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
theserver.listen(8080, "127.0.0.1");

// console.log("server has started");