import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Viviane's Journey",
  description: "Five worlds, five challenges, and a hidden final surprise.",
};

export default function PlayPage() {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

  return (
    <iframe
      title="Viviane's journey"
      src={`${basePath}/journey/index.html?start=journey`}
      className="block h-[100dvh] w-screen border-0"
      allow="autoplay"
    />
  );
}
