import Banner from "@/components/Banner/Banner";
import Navbar from "@/components/Navbar/Navbar";

const HomePage = () => {
  return (
    <>
      <Navbar />
      <div className="mt-[70px]">
        <Banner />
      </div>
    </>
  );
};

export default HomePage;
