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

