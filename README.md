# Node.js


## What is HTTP ? ##
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