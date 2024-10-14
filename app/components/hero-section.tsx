import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden text-white">
      <div className="absolute inset-0 bg-gradient-to-br from-[#7A73FF] via-[#6E66FF] to-[#635AFF] bg-size-400 animate-gradient-flow"></div>
      <div className="container relative mx-auto px-4 py-12 sm:py-24">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <Badge className="mb-4 bg-[#00D4FF] text-[#635AFF] hover:bg-[#00D4FF]/90">
              New Weekly Theme: Space Exploration
            </Badge>
            <h1 className="text-4xl sm:text-5xl font-bold leading-tight">
              Unravel the Web of Words with Akshara-jaala
            </h1>
            <p className="text-xl sm:text-2xl font-medium">
              Guess, Connect, and Conquer New Words Every Day
            </p>
            <p className="text-lg opacity-90">
              Akshara-jaala is an engaging daily word game where words intersect
              in exciting puzzles. Each week brings a new theme, challenging you
              to guess words before time runs out. Compete with friends, use
              hints, and climb the leaderboards!
            </p>
            <Button
              size="lg"
              className="bg-white text-[#635AFF] hover:bg-white/90"
            >
              Play Now
            </Button>
            <p className="text-sm opacity-75">
              Join thousands of players worldwide in the ultimate word
              challenge!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
