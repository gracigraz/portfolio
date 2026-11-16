import { PhotoTile } from "@/components/PhotoTile";
import { SocialLinks } from "@/components/SocialLinks";

export function Hero() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="mx-auto grid w-full max-w-6xl gap-12 px-4 pt-4 pb-16 sm:px-8 lg:grid-cols-2 lg:items-end lg:gap-16 md:pt-6"
    >
      <div>
        <p className="text-xs tracking-[0.2em] text-ink-muted uppercase">
          Software engineer
        </p>
        <h1
          id="hero-heading"
          className="mt-6 font-serif text-6xl leading-none sm:text-7xl"
        >
          Hi, I&apos;m Grace.
        </h1>
        <div className="mt-8 max-w-xl space-y-5 text-lg leading-relaxed">
          <p className="font-serif text-2xl leading-snug italic">
            I like building things, understanding how they work, and finding
            ways to make them better.
          </p>
          <p className="text-ink-muted">
            Before software, I spent seven years working on aircraft, autonomous
            vehicles, and satellites, where precision and reliability were
            essential. I loved solving complex engineering problems, but wanted
            to work in an environment where I could experiment, iterate faster,
            and have more ownership over what I built.
          </p>
          <p className="text-ink-muted">
            That’s what brought me to software. Since making the switch, I’ve
            worked across the stack, from customer-facing interfaces to backend
            services, integrations, and AI-powered workflows. I still bring the
            same attention to detail from hardware, along with the curiosity to
            challenge how things have always been done.
          </p>
        </div>
        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
          <a
            href="#work"
            className="group inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-bg transition-colors hover:bg-ink/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
          >
            See my work
            <span
              aria-hidden="true"
              className="transition-transform group-hover:translate-y-0.5 motion-reduce:transition-none"
            >
              ↓
            </span>
          </a>
          <a
            href="#contact"
            className="text-sm font-medium text-ink underline decoration-highlight decoration-2 underline-offset-4 hover:decoration-ink"
          >
            Get in touch
          </a>
          <span
            aria-hidden="true"
            className="hidden h-5 w-px bg-line sm:block lg:hidden xl:block"
          />
          <SocialLinks />
        </div>
      </div>

      <div className="relative max-w-xl lg:mb-5 lg:max-w-none">
        <div
          aria-hidden="true"
          className="absolute -bottom-5 -left-5 hidden h-[72%] w-[68%] rounded-3xl bg-surface lg:block"
        />
        <div className="relative grid auto-rows-27.5 grid-cols-3 gap-3 sm:auto-rows-40 lg:auto-rows-42 lg:grid-cols-4">
          <PhotoTile
            src="/images/headshot-bamboo.jpg"
            alt="Grace smiling among bamboo"
            sizes="(min-width: 1024px) 260px, (min-width: 640px) 384px, 66vw"
            color
            eager
            className="col-span-2 row-span-2"
          />
          <PhotoTile
            src="/images/golden-gate.jpg"
            alt="Grace on the Golden Gate Bridge"
            sizes="(min-width: 1024px) 130px, (min-width: 640px) 192px, 33vw"
            focus="40% 80%"
            className="row-span-2"
          />
          <PhotoTile
            src="/images/drone-fpv.jpg"
            alt="Grace flying a drone with FPV goggles at dusk"
            sizes="130px"
            className="hidden row-span-2 lg:block"
          />
          <PhotoTile
            src="/images/grace-salvage-yard.jpg"
            alt="Grace working under the hood of a truck at a salvage yard"
            sizes="(min-width: 1024px) 130px, (min-width: 640px) 192px, 33vw"
            focus="70% center"
          />
          <PhotoTile
            src="/images/welding-lab.jpg"
            alt="Grace and classmates in welding helmets in an engineering workshop"
            sizes="130px"
            focus="center 25%"
            className="hidden lg:block"
          />
          <PhotoTile
            src="/images/wind-tunnel-sjsu.jpg"
            alt="Grace and her professor at her San José State graduation, in front of the aerodynamics lab's wind tunnel"
            sizes="(min-width: 1024px) 260px, (min-width: 640px) 384px, 66vw"
            className="col-span-2"
          />
        </div>
      </div>
    </section>
  );
}
