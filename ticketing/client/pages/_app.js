import 'bootstrap/dist/css/bootstrap.css';

const AppComponent = ({ Component, pageProps }) => {
    return <Component {...pageProps} />;
};
// component is the actual page we are trying to show
// pageProps are the initial props that get passed to the actual page
// this is essentially a wrapper around every single page
// we can only import global CSS in this file
export default AppComponent;
