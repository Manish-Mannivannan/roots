import { ReactNode } from 'react';
import { Header } from "./components";

interface FrontendLayoutProps {
  children: ReactNode;
  searchButtonClick: () => void;
}

const FrontendLayout: React.FC<FrontendLayoutProps> = ({ children, searchButtonClick }) => {
  return (
    <>
      <Header searchButtonClick={searchButtonClick} />
      {children}
    </>
  );
};

export default FrontendLayout;
