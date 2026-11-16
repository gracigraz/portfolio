import { PhotoTile } from "@/components/PhotoTile";
import { SocialLinks } from "@/components/SocialLinks";

export function Hero() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="mx-auto grid w-full max-w-6xl gap-12 px-4 pt-10 pb-20 sm:px-8 md:grid-cols-2 md:items-center md:gap-16 md:pt-16"
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
          <p>
            At Rivio AI I worked across the product: the Next.js frontend
            customers used, the Python services on AWS behind it, the
            integrations with the systems they already ran, and the internal
            tools my non-engineering colleagues used instead of filing tickets.
          </p>
          <p className="text-ink-muted">
            Before software I spent seven years building tooling and production
            processes for autonomous aircraft, vehicle sensors, and satellites.
            I still work the way the factory floor taught me: trace a problem to
            its root cause, fix it, and write it down so anyone can repeat it.
          </p>
        </div>
        <SocialLinks className="mt-8" />
      </div>

      <div className="relative">
        <div
          aria-hidden="true"
          className="absolute -bottom-2 -left-2 h-[72%] w-[68%] rounded-3xl bg-accent-soft lg:-bottom-5 lg:-left-5"
        />
        <div className="relative grid auto-rows-[110px] grid-cols-3 gap-3 lg:auto-rows-[130px] lg:grid-cols-4">
          <PhotoTile
            src="/images/headshot-bamboo.jpg"
            alt="Grace smiling among bamboo"
            sizes="(min-width: 1024px) 260px, 66vw"
            color
            eager
            className="col-span-2 row-span-2"
          />
          <PhotoTile
            src="/images/golden-gate.jpg"
            alt="Grace on the Golden Gate Bridge"
            sizes="(min-width: 1024px) 130px, 33vw"
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
            sizes="(min-width: 1024px) 130px, 33vw"
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
            sizes="(min-width: 1024px) 260px, 66vw"
            className="col-span-2"
          />
        </div>
      </div>
    </section>
  );
}
