import buildClient from "../api/build-client";

const Index = ({ currentUser }) => {
    return currentUser ? <h1>You are signed in</h1> : <h1>You are not signed in</h1>;
};
//  nextjs will call this function when the page is loaded called on the server side
//  we can use this to fetch data and pass it as props to the component
//  we cant use hooks in this function because its not a react component its just a function so we cant use our custom hook thats why we use axios directly
Index.getInitialProps = async (context) => {
    console.log('LANDING PAGE');
    try{
        const { data } = await buildClient(context).get("/api/users/currentuser");
        return data;
    } catch (error) {
        return { currentUser: null };
    }
};

export default Index;
