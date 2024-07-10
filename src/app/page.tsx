import { FrontendLayout, FamilyTree } from "./components/components";
import { familyData } from "./data/data";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-2 gap-2">
      <FrontendLayout>
        <div className="w-11/12 flex-auto bg-offWhite rounded-lg overflow-clip">
          <FamilyTree data={familyData} />
        </div>
      </FrontendLayout>
    </main>
  );
}
