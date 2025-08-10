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
        <section className="p-10 bg-white">
            <div className="max-w-full mx-auto px-4 text-center">
                <h2 className="text-4xl font-bold text-primary mb-4">
                    Our Top Trainers
                </h2>
                <p className="text-gray-600 mb-10 max-w-2xl mx-auto">
                    At our training center, we take pride in our team of highly skilled and passionate trainers who are dedicated to helping you achieve your athletic goals. Each of our trainers brings years of experience, and inspire you every step of the way.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                    {trainers.map((trainer, index) => (
                        <motion.div
                            key={trainer.name}
                            className="text-center"
                            initial={{ opacity: 0, scale: 0.8, y: 50 }}
                            whileInView={{ opacity: 1, scale: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            viewport={{ once: false, amount: 0.3 }}
                        >
                            <img
                                src={trainer.image}
                                alt={trainer.name}
                                className="w-full h-72 object-cover rounded"
                            />
                            <h3 className="text-xl font-bold text-indigo-900 mt-4">
                                {trainer.name}
                            </h3>
                            <p className="text-gray-600">{trainer.role}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
