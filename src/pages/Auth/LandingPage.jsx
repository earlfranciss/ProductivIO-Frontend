import Header from "../../components/ui/LandingPage/Header";
import Features from "../../components/ui/LandingPage/Features";
import Highlights from "../../components/ui/LandingPage/Highlights";
import Newsletter from "../../components/ui/LandingPage/Newsletter";

export default function LandingPage() {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-950 text-white overflow-hidden">
      <Header />
      <Features id="features"/>
      {/* <Highlights id="highlights" /> */}
      <Newsletter id="newsletter"/>
    </div>
  );
}