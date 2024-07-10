import { FrontendLayout } from "../components/components";

const AboutPage = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-2 gap-2">
      <FrontendLayout>
        <div className="min-h-screen flex items-center justify-center">
          <h1 className="text-3xl font-bold">About Page</h1>
        </div>
      </FrontendLayout>
    </main>
  );
};

export default AboutPage;
