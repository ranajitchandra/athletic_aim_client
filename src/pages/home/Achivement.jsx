import CountUp from "react-countup";
import { motion } from "framer-motion";

const stats = [
    { label: "Athletes Trained", value: 120 },
    { label: "Events Hosted", value: 55 },
    { label: "Certified Trainers", value: 12 },
    { label: "Awards Won", value: 8 },
];

export default function Achievements() {
    return (
        <section
            className="py-16 bg-base-200"
        >
            <div className="max-w-6xl mx-auto text-center px-4">
                <h2 className="text-4xl font-extrabold mb-12 text-primary">
                    Our Achievements
                </h2>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {stats.map((stat, idx) => (
                        <motion.div
                            key={stat.label}
                            className="bg-white rounded-3xl shadow-xl p-8 flex flex-col items-center justify-center hover:scale-105 transition-transform duration-300"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: false, amount: 0.3 }}
                            transition={{ duration: 0.6, delay: idx * 0.2 }}
                        >
                            <span className="text-5xl font-extrabold text-secondary mb-2">
                                <CountUp end={stat.value} duration={3} />
                            </span>
                            <span className="text-gray-700 font-medium">{stat.label}</span>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
