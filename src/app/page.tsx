import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Projects } from "@/components/Projects";
import { Skills } from "@/components/Skills";
import { Journey } from "@/components/Journey";
import { OpenToWork } from "@/components/OpenToWork";
import { Certifications } from "@/components/Certifications";
import { FAQ } from "@/components/FAQ";
import { Contact } from "@/components/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Projects />
      <Skills />
      <Journey />
      <OpenToWork />
      <Certifications />
      <FAQ />
      <Contact />
    </>
  );
}
