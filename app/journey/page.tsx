import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Viviane's Journey",
  description: "Five worlds, five challenges, and a hidden final surprise.",
};

export default function JourneyPage() {
  return (
    <iframe
      title="Viviane's journey"
      src="/journey/index.html?start=journey"
      className="block h-[100dvh] w-screen border-0"
      allow="autoplay"
    />
  );
}
