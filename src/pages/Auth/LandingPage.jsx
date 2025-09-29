import Header from "../../components/Header";
import Features from "../../components/Features";
import Highlights from "../../components/Highlights";
import Newsletter from "../../components/Newsletter";

export default function LandingPage() {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-950 text-white overflow-hidden">
      <Header />
      <Features id="features"/>
      <Highlights id="highlights" />
      <Newsletter id="newsletter"/>
    </div>
  );
}