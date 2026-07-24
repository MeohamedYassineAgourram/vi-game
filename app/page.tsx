import Hero from "@/components/Hero";
import JourneyPreview from "@/components/JourneyPreview";

export default function Home() {
  return (
    <main className="overflow-clip bg-[#fbfaf6] text-ink">
      <Hero />
      <JourneyPreview />
    </main>
  );
}
