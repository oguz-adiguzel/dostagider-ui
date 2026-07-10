import BlogSection from "./Home/BlogSection";
import BodySection from "./Home/BodySection";
import BrandSection from "./Home/BrandSection";
import ElectricSection from "./Home/ElectricSection";
import HeroSearch from "./Home/HeroSearch";
import InfoColorSection from "./Home/InfoColorSection";
import InfoSection from "./Home/InfoSection";
import InstitutionalSection from "./Home/InstitutionalSection";
import NewProductSection from "./Home/NewProductSection";
import ShowCase from "./Home/ShowCase";
import ShowCaseShop from "./Home/ShowCaseShop";

export default function Home() {
  return (
    <div className="w-full">
      <HeroSearch />
      <BrandSection />
      <BodySection />
      <ShowCase />
      <InfoSection />
      <ShowCaseShop />
      <InstitutionalSection />
      <NewProductSection />
      <InfoColorSection />
      <ElectricSection />
      <BlogSection />
    </div>
  );
}
