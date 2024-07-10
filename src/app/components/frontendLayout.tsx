import { Header } from "./components";

const FrontendLayout = ({ children }: any) => {
    return (
        <>
            <Header />
            {children}
        </>
    );
};

export default FrontendLayout;