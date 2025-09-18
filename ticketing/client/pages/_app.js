import 'bootstrap/dist/css/bootstrap.css';
import buildClient from '../api/build-client';
import Header from '../components/header';
const AppComponent = ({ Component, pageProps, currentUser }) => {
    return (
        <div>
            <Header currentUser={currentUser} />
            <Component {...pageProps} />
        </div>
    );
};
// component is the actual page we are trying to show
// pageProps are the initial props that get passed to the actual page
// this is essentially a wrapper around every single page
// we can only import global CSS in this file

AppComponent.getInitialProps = async (appContext) => {
    const { ctx } = appContext;
    try {
        const { data } = await buildClient(ctx).get("/api/users/currentuser");
        let pageProps = {};
        if (appContext.Component.getInitialProps) {
            pageProps = await appContext.Component.getInitialProps(ctx);
            console.log(pageProps);
        }
        return { pageProps, currentUser: data.currentUser };
    } catch (error) {
        return { currentUser: null };
    }
};
export default AppComponent;
