"use client"

import FrontendLayout from "../components/frontendLayout";
import { FamilyTree } from '../familytree/familyTreeExports';
import familyData from "../data/familyData";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-2 gap-2">
      <FrontendLayout>
        <div className="w-11/12 flex-auto rounded-lg overflow-clip GlassBG">
          <FamilyTree data={familyData}/>
        </div>
      </FrontendLayout>
    </main>
  );
}