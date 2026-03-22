import Link from "next/link";
import { ArrowRight, BarChart3, Shield, Zap, Users } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { BlurFade } from "@/components/magicui/blur-fade";
import { NumberTicker } from "@/components/magicui/number-ticker";
import { Marquee } from "@/components/magicui/marquee";

const features = [
  {
    icon: BarChart3,
    title: "Real-time Analytics",
    description:
      "Track every metric that matters. See user behavior, conversions, and revenue as they happen.",
  },
  {
    icon: Shield,
    title: "Privacy-first Tracking",
    description:
      "No cookies, no fingerprinting. Get accurate data while respecting your users' privacy.",
  },
  {
    icon: Zap,
    title: "Sub-second Queries",
    description:
      "Built on a columnar database that handles billions of events. Every dashboard loads instantly.",
  },
  {
    icon: Users,
    title: "Team Collaboration",
    description:
      "Shared dashboards, scheduled reports, and role-based access. Keep everyone aligned on metrics.",
  },
];

const testimonials = [
  {
    name: "Sarah Chen",
    role: "VP of Growth, Raycast",
    body: "We switched from Google Analytics and saw a 40% improvement in page load times. The real-time dashboards are a game changer for our growth team.",
  },
  {
    name: "Marcus Webb",
    role: "CTO, Draftbit",
    body: "Finally, an analytics tool that doesn't require a PhD to set up. We had it running in production within an hour.",
  },
  {
    name: "Priya Sharma",
    role: "Head of Product, Resend",
    body: "The funnel analysis alone saved us three engineering sprints. We found our biggest conversion drop-off in the first week.",
  },
  {
    name: "James O'Brien",
    role: "Founder, Campsite",
    body: "We tried every analytics platform out there. Acme is the only one our entire team actually uses daily.",
  },
  {
    name: "Elena Rodriguez",
    role: "Data Lead, Cal.com",
    body: "The SQL editor is incredible. I can answer any product question in minutes instead of filing a ticket with engineering.",
  },
  {
    name: "Tom Nguyen",
    role: "Engineering Manager, Vercel",
    body: "Privacy-compliant analytics that actually gives you useful data. We no longer have to choose between insights and user trust.",
  },
];

function TestimonialCard({
  name,
  role,
  body,
}: {
  name: string;
  role: string;
  body: string;
}) {
  return (
    <figure className="relative w-64 shrink-0 rounded-xl border bg-card p-4">
      <blockquote className="text-sm leading-relaxed">{body}</blockquote>
      <figcaption className="mt-3 flex items-center gap-2">
        <div className="size-8 rounded-full bg-muted" />
        <div>
          <p className="text-sm font-medium">{name}</p>
          <p className="text-xs text-muted-foreground">{role}</p>
        </div>
      </figcaption>
    </figure>
  );
}

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="flex flex-col items-center justify-center gap-6 px-4 pb-16 pt-24 text-center md:pt-32">
        <BlurFade delay={0}>
          <h1 className="max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            Understand your users without compromising their privacy
          </h1>
        </BlurFade>
        <BlurFade delay={0.1}>
          <p className="max-w-xl text-lg text-muted-foreground">
            Acme Analytics gives you real-time product insights, funnel
            analysis, and revenue tracking. No cookies required, no complex
            setup, no slow dashboards.
          </p>
        </BlurFade>
        <BlurFade delay={0.2}>
          <div className="flex gap-3">
            <Button size="lg" asChild>
              <Link href="/dashboard">
                Start for free <ArrowRight className="ml-2 size-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="#features">See how it works</Link>
            </Button>
          </div>
        </BlurFade>
      </section>

      {/* Stats */}
      <section className="border-y bg-muted/40 py-12">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-8 px-4 sm:gap-16">
          {[
            { value: 12000, label: "Companies", suffix: "+" },
            { value: 4.2, label: "Events tracked", suffix: "B", decimals: 1 },
            { value: 99.9, label: "Uptime SLA", suffix: "%", decimals: 1 },
            { value: 50, label: "Avg. query time", suffix: "ms" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-3xl font-bold">
                <NumberTicker
                  value={stat.value}
                  decimalPlaces={stat.decimals ?? 0}
                />
                {stat.suffix}
              </p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section id="features" className="mx-auto max-w-5xl px-4 py-20">
        <BlurFade delay={0} inView>
          <h2 className="mb-2 text-center text-3xl font-bold tracking-tight">
            Everything you need to grow
          </h2>
          <p className="mb-12 text-center text-muted-foreground">
            From first pageview to enterprise scale, Acme covers the full
            analytics lifecycle.
          </p>
        </BlurFade>
        <div className="grid gap-6 sm:grid-cols-2">
          {features.map((feature, i) => (
            <BlurFade key={feature.title} delay={i * 0.1} inView>
              <Card>
                <CardHeader>
                  <feature.icon className="mb-2 size-8 text-primary" />
                  <CardTitle>{feature.title}</CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
              </Card>
            </BlurFade>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="overflow-hidden border-y bg-muted/40 py-20">
        <BlurFade delay={0} inView>
          <h2 className="mb-2 text-center text-3xl font-bold tracking-tight">
            Trusted by fast-moving teams
          </h2>
          <p className="mb-12 text-center text-muted-foreground">
            Hear from the companies that rely on Acme every day.
          </p>
        </BlurFade>
        <Marquee pauseOnHover className="[--duration:30s]">
          {testimonials.map((t) => (
            <TestimonialCard key={t.name} {...t} />
          ))}
        </Marquee>
        <Marquee pauseOnHover reverse className="mt-4 [--duration:30s]">
          {testimonials.map((t) => (
            <TestimonialCard key={t.name} {...t} />
          ))}
        </Marquee>
      </section>

      {/* CTA */}
      <section className="px-4 py-20">
        <BlurFade delay={0} inView>
          <div className="mx-auto max-w-2xl rounded-2xl border bg-card p-8 text-center shadow-sm md:p-12">
            <h2 className="mb-3 text-3xl font-bold tracking-tight">
              Ready to see your data clearly?
            </h2>
            <p className="mb-6 text-muted-foreground">
              Free for up to 10,000 events per month. No credit card required.
            </p>
            <Button size="lg" asChild>
              <Link href="/dashboard">
                Get started <ArrowRight className="ml-2 size-4" />
              </Link>
            </Button>
          </div>
        </BlurFade>
      </section>
    </>
  );
}
