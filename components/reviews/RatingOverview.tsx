import RatingDistribution from "./RatingDistribution";
import RatingHero from "./RatingHero";

export default function RatingOverview() {
  return (
    <section className="grid grid-cols-1 gap-4 xl:grid-cols-[451px_minmax(0,1fr)]">
      <RatingHero />
      <RatingDistribution />
    </section>
  );
}
