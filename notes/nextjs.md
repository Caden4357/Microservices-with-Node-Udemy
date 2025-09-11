# when to know whether to make a request from the browser or from the server 
- request from a componet - always issued from the browser. How do we know if a request is coming from a component? 

- request from getInitialProps - this is slightly more compicated. getInitialProps can run on the server or the client. hard refresh, clicking a link from a different domain, type URL into address bar - request is from server. clicking a link from the same domain (navigating from one page to another while in the app) - request is from client.
