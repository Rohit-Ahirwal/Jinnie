import Header from "@/components/home/Header";
import Hero from "@/components/home/Hero";
import Features from "@/components/home/Features";
import Stats from "@/components/home/Stats";
import HomeFooter from "@/components/home/HomeFooter";
import LivePreview from "@/components/home/live-preview";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Header />

      <div className="max-w-[1180px] mx-auto px-4 sm:px-6 lg:px-8">
        <Hero />

        <Features />

        <LivePreview />

        <Stats />

        <HomeFooter />
      </div>
    </main>
  );
}
