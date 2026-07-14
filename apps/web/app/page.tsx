import Header from "@/components/home/Header";
import Hero from "@/components/home/Hero";
import Features from "@/components/home/Features";
import ProductDemo from "@/components/home/ProductDemo";
import Stats from "@/components/home/Stats";
import HomeFooter from "@/components/home/HomeFooter";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Header />

      <div className="max-w-[1180px] mx-auto px-4 sm:px-6 lg:px-8">
        <Hero />

        <Features />

        <ProductDemo />

        <Stats />

        <HomeFooter />
      </div>
    </main>
  );
}
