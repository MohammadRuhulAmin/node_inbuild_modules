# Node.js

# Module: "node:http"

## HTTP: Hypertext transfer protocol ##
HTTP stands for Hyper Text Transfer Protocol for transmitting hypermedia documents such as HTML, videos, audios, interactive contents etc. HTTP is designed to be stateless meaning each request from a client to server is independent. It was designed for communication between web browsers and web servers, but it can also be used for other purposes, such as machine-to-machine communication, programmatic access to APIs, and more. Client and servers communicate by exchanging individual messages (as opposed to a stream of data) The messages sent by the client are called requests and the messeges sent by the server as an answers are called responses. 

- HTTP is STATELESS: there are no link between two requests being successively carried out on the same connection. 
- HTTP is not SESSIONLESS:
    Suppose a user is logged in and accessing multiple pages on an e-commerce website:
        Request #1: User logs in. The server creates a session, sets a session token in a cookie, and sends it to the browser.
        Request #2: User navigates to the "Products" page. The browser sends the session cookie, allowing the server to recognize the user without re-authentication.
        Request #3: User adds an item to the cart. The session cookie is again included, allowing the server to update the cart for that specific user.

    In each of these requests, HTTP does not inherently "remember" the user. It’s the session token sent in the cookies that provides continuity across the stateless HTTP protocol, allowing a session to persist.

- HTTP flow:
    - step1: open a TCP connection: The TCP connection is used to send a request, or several, and receive an answer.
    - step2: Send an HTTP message: HTTP messages (before HTTP/2) are human-readable. With HTTP/2, these simple messages are encapsulated in frames, making them impossible to read directly, but the principle remains the same. 
    For example: 
    ```python
            GET / HTTP/1.1   
            Host: developer.mozilla.org
            Accept-Language: fr
    ```
    Lets breakdown request.  
    
    
    Request Line: `GET / HTTP/1.1` 
        GET: This is the HTTP method used in the request. In this case, "GET" indicates that the client is requesting data from the server. The GET method is used to retrieve resources (like HTML documents, images, etc.) without affecting the state of the resource on the server.

        /: This is the requested resource's path. The "/" indicates that the client is requesting the root of the server, which is usually the homepage or the main entry point of the website.

        HTTP/1.1: This indicates the HTTP version being used for the request. In this case, it is HTTP/1.1, which is a widely used version of the protocol that includes features such as persistent connections and chunked transfer encoding.
    Headers `Host: developer.mozilla.org`
        This header specifies the domain name of the server to which the request is being sent. In this example, the request is directed to developer.mozilla.org, which is the host for the Mozilla Developer Network website. The Host header is mandatory in HTTP/1.1 requests and is crucial for virtual hosting, where multiple domains are served from a single IP address.
    
    `Accept-Language: fr`
        Accept-Language: This header indicates the preferred language for the response. In this case, "fr" specifies that the client prefers the response to be in French. This allows the server to provide localized content if available, enhancing the user experience.

    - step3: Read the response sent by the server, such as:
    ```javascript
    HTTP/1.1 200 OK
    Date: Sat, 09 Oct 2010 14:28:02 GMT
    Server: Apache
    Last-Modified: Tue, 01 Dec 2009 20:18:22 GMT
    ETag: "51142bc1-7449-479b075b2891b"
    Accept-Ranges: bytes
    Content-Length: 29769
    Content-Type: text/html

    <!doctype html>… (here come the 29769 bytes of the requested web page)
    ```

    - step4: Close or reuse the connection for further requests.


# HTTP Headers:
HTTP headers let the client and the server pass additional information with an HTTP request or response. An HTTP header consists of its case-insensitive name followed by a colon (:), then by its value.Headers can be grouped according to their contexts:
1. Request Headers:Request headers are sent by the client to the server as part of an HTTP request. They provide additional information about the request being made, including client preferences and capabilities.
```javascript
    GET /path/resource HTTP/1.1
    Host: www.example.com
    User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.45 Safari/537.36
    Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8
    Accept-Language: en-US,en;q=0.5
    Accept-Encoding: gzip, deflate, br
    Connection: keep-alive

    /** lets build this header request using node.js */
    import http from "node:http"
    const options = {
        hostname:'www.example.com', 
        port:80,
        path:'/path/resource',
        method:'GET',
        headers:{
            'User-Agent': 'Node.js/12.18.3',
            'Accept': 'text/html',
            'Accept-Language':'en-US,en;q=0.5'
        }
    }
    const req = http.request(options, (res) => {
    console.log(`STATUS: ${res.statusCode}`);

    // Print the response headers
    console.log('Response Headers:', res.headers);

    // Handle the response data
    res.on('data', (chunk) => {
        console.log(`BODY: ${chunk}`);
    });
    });

    // Handle errors
    req.on('error', (error) => {
    console.error(`Problem with request: ${error.message}`);
    });

    // End the request
    req.end();


```
Breakdown of the Request Headers

- GET /path/resource HTTP/1.1
        This is the request line, indicating that the client wants to perform a GET request to the specified resource (/path/resource) using HTTP version 1.1.

- Host: www.example.com
        Specifies the domain name of the server (and potentially the port number) to which the request is being sent. This header is mandatory in HTTP/1.1 requests.

- User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.45 Safari/537.36
        Provides information about the client software (browser) making the request, including the operating system, browser name, and version. This helps servers tailor responses based on the client's capabilities.

- Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,/;q=0.8
        Indicates the media types that the client can accept in the response. The client prefers HTML and XML formats, with q values representing the relative preference for each type.

- Accept-Language: en-US,en;q=0.5
        Specifies the preferred language(s) for the response. In this example, the client prefers U.S. English, but it can accept general English as well.

- Accept-Encoding: gzip, deflate, br
        Indicates the encoding methods that the client supports for the response body. The client can handle responses compressed using gzip, deflate, or Brotli (br) compression.

- Connection: keep-alive
        Informs the server that the client wishes to keep the connection open after the request has been completed. This allows for additional requests to be sent over the same connection, improving performance.


Using Basic Authentication:
Basic Authentication sends the username and password encoded in base64 as part of the Authorization header.
```javascript
/* Authorization header using Basic Authentication */
POST /api/users HTTP/1.1
Host: www.example.com
User-Agent: MyApp/1.0.0 (Windows NT 10.0; Win64; x64)
Accept: application/json
Content-Type: application/json
Content-Length: 59
Accept-Language: en-US,en;q=0.5
Connection: keep-alive
Authorization: Basic dXNlcm5hbWU6cGFzc3dvcmQ=  // base64 encoded "username:password"

{
  "name": "John Doe",
  "email": "john.doe@example.com" // The request body is where you include the data that you want to send to the server, such as JSON objects, form data, or other types of payloads. 
}


/* Lets implement this using node.js */

```
Implement a Basic Authentication Post Request:

```javascript
const http = require('http');

// Data to send in the POST request
const postData = JSON.stringify({
  name: 'John Doe',
  email: 'john.doe@example.com',
});

// Basic Auth credentials
const username = 'username';
const password = 'password';
const auth = 'Basic ' + Buffer.from(`${username}:${password}`).toString('base64');
const options = {
  hostname: 'www.example.com',
  port: 80,
  path: '/api/users',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(postData),
    'Authorization': auth,
  },
};
const req = http.request(options, (res) => {
  console.log(`STATUS: ${res.statusCode}`);
  res.on('data', (chunk) => {
    console.log(`BODY: ${chunk}`);
  });
});

req.on('error', (error) => {
  console.error(`Problem with request: ${error.message}`);
});
req.write(postData);
req.end();
```


using  Bearer Token Authentication
```javascript
POST /api/users HTTP/1.1
Host: www.example.com
User-Agent: MyApp/1.0.0 (Windows NT 10.0; Win64; x64)
Accept: application/json
Content-Type: application/json
Content-Length: 59
Accept-Language: en-US,en;q=0.5
Connection: keep-alive
Authorization: Bearer your_access_token_here  // your_access_token_here is the actual token

{
  "name": "John Doe",
  "email": "john.doe@example.com"
}



```


```javascript
const http = require('http');

// Data to send in the POST request
const postData = JSON.stringify({
  name: 'John Doe',
  email: 'john.doe@example.com',
});

// Bearer Token : The request which can bear a token is called bearer token.

/*  */
const token = 'your_access_token_here';

// Options for the request
const options = {
  hostname: 'www.example.com',
  port: 80,
  path: '/api/users',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(postData),
    'Authorization': `Bearer ${token}`,
  },
};

// Making the POST request
const req = http.request(options, (res) => {
  console.log(`STATUS: ${res.statusCode}`);
  res.on('data', (chunk) => {
    console.log(`BODY: ${chunk}`);
  });
});

req.on('error', (error) => {
  console.error(`Problem with request: ${error.message}`);
});
req.write(postData);
req.end();


```




2. Response Headers:
3. Representation Headers:
4. Payload Headers:
5. End-to-end Headers:
6. Hop-by-hop Headers:



