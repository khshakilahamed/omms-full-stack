import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import bannerImage from "./../../assets/mealImage.jpg";

const Banner = () => {
      return (
            <div
                  style={{ backgroundImage: `url(${bannerImage})` }}
                  className="w-full h-screen bg-no-repeat bg-cover relative"
            >
                  <div className="absolute w-full h-full backdrop-brightness-50 flex flex-col items-center justify-center gap-3">
                        <h2 className="text-white text-3xl italic">Welcome to</h2>
                        <h2 className="text-white text-5xl italic">Office Mea Management System</h2>
                        <Link to="/dashboard">
                              <Button>Explore Now</Button>
                        </Link>
                  </div>
            </div>
      )
}

export default Banner