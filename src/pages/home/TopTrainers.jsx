import { motion } from "framer-motion";

const trainers = [
    {
        name: "Ben Nebert",
        role: "Baseball Trainer",
        image: "https://i.ibb.co/JFsCk63L/team-1-1.jpg",
    },
    {
        name: "Pieter Noël",
        role: "Professional Rugby Coach",
        image: "https://i.ibb.co/V76qr33/team-3-1.jpg",
    },
    {
        name: "Thomas Stanley",
        role: "Hockey Trainer",
        image: "https://i.ibb.co/5xxk30Gn/team-2-1.jpg",
    },
    {
        name: "Raymond Little",
        role: "Tennis Coach",
        image: "https://i.ibb.co/zV6bYfLG/team-4-1.jpg",
    },
];

export default function TopTrainers() {
    return (
        <section className="p-12 bg-base-200">
            <div className="max-w-7xl mx-auto px-4 text-center">
                <h2 className="text-4xl font-extrabold text-primary mb-3 relative inline-block">
                    Our Top Trainers
                    <span className="block w-20 h-1 bg-secondary mx-auto mt-2 rounded-full"></span>
                </h2>
                <p className="text-gray-600 mb-12 max-w-3xl mx-auto">
                    At our training center, we take pride in our team of highly skilled and passionate trainers who are dedicated to helping you achieve your athletic goals. Each of our trainers brings years of experience and inspires you every step of the way.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                    {trainers.map((trainer, index) => (
                        <motion.div
                            key={trainer.name}
                            className="bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer hover:shadow-2xl hover:-translate-y-2 transition-transform duration-300"
                            initial={{ opacity: 0, scale: 0.9, y: 40 }}
                            whileInView={{ opacity: 1, scale: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            viewport={{ once: false, amount: 0.3 }}
                        >
                            <img
                                src={trainer.image}
                                alt={trainer.name}
                                className="w-full h-72 object-cover rounded-t-2xl"
                            />
                            <div className="p-4">
                                <h3 className="text-xl font-bold text-primary">{trainer.name}</h3>
                                <p className="text-gray-600">{trainer.role}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
