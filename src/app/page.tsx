import "./styles/globals.css";
import Header from "./components/header";
import FamilyTree from "./components/familytree";
import { familyData } from "./data/data";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-2 gap-2">
      <Header />
      <div className='w-11/12 flex-auto bg-offWhite rounded-lg overflow-clip'>
        <FamilyTree data={familyData} />    
      </div>
    </main>
  );
}