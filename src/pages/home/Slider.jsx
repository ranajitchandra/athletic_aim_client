import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function Slider() {
    const slides = [
        {
            image: "https://i.ibb.co/0pZwwVyd/photo-1517838277536-f5f99be501cd-q-80-w-1170-auto-format-fit-crop-ixlib-rb-4-1.jpg",
            title: "Achieve Your Peak Performance",
            description:
                "Train smarter with expert tips, personalized plans, and motivation to reach your fitness goals.",
        },
        {
            image: "https://i.ibb.co/r22DPX0n/photo-1599058917212-d750089bc07e-q-80-w-1169-auto-format-fit-crop-ixlib-rb-4-1.jpg",
            title: "Your Journey to Strength Starts Here",
            description:
                "Whether you lift, run, or stretch — find the tools and guidance you need to become your best self.",
        },
        {
            image: "https://i.ibb.co/93yrRLVx/photo-1605296867304-46d5465a13f1-q-80-w-1170-auto-format-fit-crop-ixlib-rb-4-1.jpg",
            title: "Train Like an Athlete, Feel Like a Champion",
            description:
                "Unleash your inner athlete with performance-driven workouts and recovery advice tailored to you.",
        },
        {
            image: "https://i.ibb.co/4Zf61bVS/photo-1519505907962-0a6cb0167c73-q-80-w-1170-auto-format-fit-crop-ixlib-rb-4-1.jpg",
            title: "Fitness Made Simple & Effective",
            description:
                "Stay on track with workout routines, progress tracking, and expert insights — all in one place.",
        }
    ];


    return (
        <div className="max-w-full mx-auto">
            <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                spaceBetween={20}
                slidesPerView={1}
                navigation
                pagination={{ clickable: true }}
                autoplay={{ delay: 5000 }}
                loop
                className="shadow-lg"
            >
                {slides.map((slide, index) => (
                    <SwiperSlide key={index}>
                        <div className="relative w-full h-120">
                            <img
                                src={slide.image}
                                alt={slide.title}
                                className="w-full h-120 object-cover"
                            />
                            <div className="max-w-7/12 absolute inset-0 bg-opacity-40 ml-8 flex flex-col justify-center items-start text-left text-white p-8 rounded-xl">
                                <h2 className="text-4xl font-extrabold mb-4">{slide.title}</h2>
                                <p className="text-base">{slide.description}</p>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>

    );
}
