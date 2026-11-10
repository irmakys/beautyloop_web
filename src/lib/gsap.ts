"use client";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Plugin kaydı tek yerde yapılır; her bileşen buradan import eder.
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
  gsap.defaults({ ease: "expo.out", duration: 1.1 });
}

export { gsap, ScrollTrigger };
