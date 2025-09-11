import axios from "axios";

const Index = ({ currentUser }) => {
    console.log("Index currentUser:", currentUser);
    return <h1>Home Page</h1>;
};

//  nextjs will call this function when the page is loaded called on the server side
//  we can use this to fetch data and pass it as props to the component
//  we cant use hooks in this function because its not a react component its just a function so we cant use our custom hook thats why we use axios directly
Index.getInitialProps = async ({ req }) => {
    // we need to check if were running on the server or client
    // the window object is only available on the client
    if (typeof window === "undefined") {
        // we are on the server
        const { data } = await axios.get("http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/users/currentuser", {
            headers: req.headers,
        });
        return data;
    } else {
        // we are on the client
        const { data } = await axios.get("/api/users/currentuser");
        return data;
    }

};

export default Index;
