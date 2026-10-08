import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Projects } from "@/components/Projects";
import { Stack } from "@/components/Stack";
import { Philosophy } from "@/components/Philosophy";
import { Contact } from "@/components/Contact";

export default function Home() {
  return (
    <>
      <div id="hero">
        <Hero />
      </div>
      <div id="about">
        <About />
      </div>
      <div id="work">
        <Projects />
      </div>
      <div id="stack">
        <Stack />
      </div>
      <div id="philosophy">
        <Philosophy />
      </div>
      <div id="contact">
        <Contact />
      </div>
    </>
  );
}
