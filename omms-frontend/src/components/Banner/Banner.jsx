import { Button } from "../ui/button";
import bannerImage from "./../../assets/mealImage.jpg";

const Banner = () => {
      return (
            <div
                  style={{ backgroundImage: `url(${bannerImage})` }}
                  className="w-full h-screen bg-no-repeat bg-cover relative"
            >
                  <div className="absolute w-full h-full backdrop-brightness-50 flex flex-col items-center justify-center gap-3">
                        <h2 className="text-white text-5xl italic">Welcome OMMS</h2>
                        <Button>Explore Now</Button>
                  </div>
            </div>
      )
}

export default Banner