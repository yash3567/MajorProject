import Header from "./Header";
import Footer from './Footer';

const Layout = ({ children }) => { // lowercase 'children'
    return (
        <>
            <Header />
            <div>{children}</div>
            <Footer />
        </>
    );
};

export default Layout;
