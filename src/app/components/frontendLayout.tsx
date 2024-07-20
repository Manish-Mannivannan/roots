import { ReactNode } from 'react';
import { Header } from "./components";

interface FrontendLayoutProps {
  children: ReactNode;
}

const FrontendLayout: React.FC<FrontendLayoutProps> = ({ children }) => {
  return (
    <>
      <Header />
      {children}
    </>
  );
};

export default FrontendLayout;
