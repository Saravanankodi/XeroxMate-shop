import CounterQrCard from "./CounterQrCard";
import FeedbackProtectionCard from "./FeedbackProtectionCard";

export default function ReviewAuxiliaryRail() {
  return (
    <aside className="flex flex-col gap-4">
      <CounterQrCard />
      <FeedbackProtectionCard />
    </aside>
  );
}
