# when to know whether to make a request from the browser or from the server 
- request from a componet - always issued from the browser. How do we know if a request is coming from a component? 

- request from getInitialProps - this is slightly more compicated. getInitialProps can run on the server or the client. hard refresh, clicking a link from a different domain, type URL into address bar - request is from server. clicking a link from the same domain (navigating from one page to another while in the app) - request is from client.

# The arguments provided to getInitialProps are different depending on whether the getInitialProps is on a page or a custom app component.
- on a page - context object with properties: context -> pathname, query, asPath, req, res, err
- on a custom app component - context object with properties: AppTree Component, router, ctx (ctx is the same context object as a page)
- When we put getInitialProps on a custom app component other getInitialProps methods on pages do not run automatically. We have to call them manually.