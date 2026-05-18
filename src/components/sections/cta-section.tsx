import { Button } from "@/components/ui/button";

export function CTASection() {
  return (
    <section className="px-5 pb-16 sm:px-8 sm:pb-20 lg:px-20">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 overflow-hidden rounded-wealth-xl bg-[linear-gradient(135deg,var(--wealth-text-primary)_0%,#0f1e36_100%)] p-8 shadow-wealth-lg sm:p-12 lg:flex-row lg:items-center lg:justify-between lg:p-20">
        <div>
          <h2 className="font-display text-3xl font-extrabold tracking-normal text-white sm:text-4xl">
            Start growing your wealth today
          </h2>
          <p className="mt-3 text-[15px] text-wealth-muted">
            Join 14 million investors who trust LuxeFinance with their
            financial future.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button size="lg" variant="white">
            Create Free Account
          </Button>
          <Button size="lg" variant="outline-white">
            Schedule a Demo
          </Button>
        </div>
      </div>
    </section>
  );
}
