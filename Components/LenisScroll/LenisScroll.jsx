"use client";

import { useEffect } from "react";
import Lenis from "lenis";

export default function LenisScroll() {
  useEffect(() => {
    const lenis = new Lenis();

    const handleScroll = (e) => {};

    lenis.on("scroll", handleScroll);

    const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);

    return () => {
      lenis.off("scroll", handleScroll);
      lenis.destroy();
    };
  }, []);

  return null;
}
