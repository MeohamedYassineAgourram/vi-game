"use client";

import HeroText from "./HeroText";

export default function Hero() {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

  return (
    <section
      className="relative isolate min-h-[680px] h-[100svh] overflow-hidden bg-[#87cde1] bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url('${basePath}/images/hidden-horizon.png')` }}
    >
      <div aria-hidden className="absolute inset-0 bg-[linear-gradient(180deg,rgba(22,74,99,.12)_0%,transparent_42%,rgba(29,34,32,.14)_100%)]" />
      <HeroText />
    </section>
  );
}
