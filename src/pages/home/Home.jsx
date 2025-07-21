import { Suspense } from "react";
import Hero from "./Hero";
import Slider from "./Slider";
import SportsClubs from "./SportsClub";
import TopTrainers from "./TopTrainers";
import Testimonials from "./Testimonials";
import FeaturedEvents from "./FeaturedEvents";

export default function Home() {

    return (
        <>
            {/* <Hero></Hero> */}
            <Slider></Slider>
            <FeaturedEvents></FeaturedEvents>
            <SportsClubs></SportsClubs>
            <TopTrainers></TopTrainers>
            <Testimonials></Testimonials>
        </>
    );
}
