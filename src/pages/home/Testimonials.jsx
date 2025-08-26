import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/autoplay';

const testimonials = [
    {
        name: 'Ellen Smets',
        role: 'Founder',
        image: 'https://i.ibb.co/q3W1mVYQ/review-1-1.jpg',
        text: 'The coaches here truly care about your progress. Their personalized approach helped me improve my strength.',
    },
    {
        name: 'Dennis Perez',
        role: 'CEO',
        image: 'https://i.ibb.co/VYcCXkHZ/review-1-1-1.jpg',
        text: 'An incredible experience! The training programs are challenging yet rewarding, and the team motivates you every step of the way.',
    },
    {
        name: 'Anna Clarke',
        role: 'Coach',
        image: 'https://i.ibb.co/fYBXSxn5/premium-photo-1663040326392-f752798e7394-w-600-auto-format-fit-crop-q-60-ixlib-rb-4-1.jpg',
        text: 'I’ve seen firsthand how these sessions transform athletes. The focus on fundamentals and mindset makes all the difference.',
    },
    {
        name: 'John Doe',
        role: 'Athlete',
        image: 'https://i.ibb.co/bqkNp3c/photo-1681007110680-b220fe8dd5ed-q-80-w-1026-auto-format-fit-crop-ixlib-rb-4-1.jpg',
        text: 'Joining this program was the best decision I made for my athletic career. The skills I gained here helped me compete at a higher level.',
    },
];

export default function Testimonials() {
    return (
        <section className="py-16 bg-base-200">
            <div className="text-center mb-12">
                <h2 className="text-4xl font-extrabold text-primary relative inline-block">
                    Testimonials
                    <span className="block w-24 h-1 bg-secondary mx-auto mt-2 rounded-full"></span>
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto mt-4">
                    Hear what our clients and partners have to say about working with us.
                </p>
            </div>

            <div className="max-w-6xl mx-auto px-4">
                <Swiper
                    modules={[Autoplay]}
                    autoplay={{ delay: 3500, disableOnInteraction: false }}
                    loop
                    spaceBetween={30}
                    slidesPerView={2}
                    breakpoints={{
                        0: { slidesPerView: 1 },
                        768: { slidesPerView: 2 },
                    }}
                >
                    {testimonials.map((testimonial, idx) => (
                        <SwiperSlide key={idx}>
                            <div className="bg-white shadow-lg rounded-2xl p-6 text-left my-6 hover:shadow-xl hover:-translate-y-1 transition-transform duration-300">
                                <div className="flex mb-4 gap-1">
                                    {[...Array(5)].map((_, i) => (
                                        <span key={i} className="text-yellow-400 text-xl">★</span>
                                    ))}
                                </div>
                                <p className="text-gray-700 mb-6">{testimonial.text}</p>
                                <div className="flex items-center gap-4">
                                    <img
                                        src={testimonial.image}
                                        alt={testimonial.name}
                                        className="w-14 h-14 rounded-full object-cover"
                                    />
                                    <div>
                                        <h4 className="text-primary font-bold">{testimonial.name}</h4>
                                        <p className="text-gray-600">{testimonial.role}</p>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
}
