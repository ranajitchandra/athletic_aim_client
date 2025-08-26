import { motion } from "framer-motion";

const clubs = [
  {
    name: "Football",
    img: "https://i.ibb.co/WNJ7kgq3/American-Football-Player-Sports-Logo-1-1.png",
  },
  {
    name: "Volleyball",
    img: "https://i.ibb.co/35c8F21J/L-5-1-1.png",
  },
  {
    name: "Lion Club",
    img: "https://i.ibb.co/1tr2WGS6/L-1-1-1.png",
  },
  {
    name: "Sports",
    img: "https://i.ibb.co/fYxcFwv3/L-4-1-1.png",
  },
  {
    name: "Warrior",
    img: "https://i.ibb.co/rRBYRdVQ/L-3-1-1.png",
  },
];

export default function SportsClubs() {
  return (
    <section className="text-center px-6 py-16 bg-base-200 overflow-hidden">
      <h2 className="text-3xl md:text-4xl font-bold text-primary mb-8 relative inline-block">
        Sports Clubs That Joined Our Arena
        <span className="block w-20 h-1 bg-secondary mx-auto mt-2 rounded-full"></span>
      </h2>

      <div className="relative w-full overflow-hidden">
        <motion.div
          className="flex gap-12 w-max"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            repeat: Infinity,
            repeatType: "loop",
            ease: "linear",
            duration: 20,
          }}
        >
          {[...clubs, ...clubs, ...clubs].map((club, idx) => (
            <motion.div
              key={idx}
              className="w-28 h-28 flex-shrink-0 bg-white rounded-2xl shadow-md flex items-center justify-center p-4"
              whileHover={{ scale: 1.1, boxShadow: "0 10px 20px rgba(0,0,0,0.2)" }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <img
                src={club.img}
                alt={club.name}
                className="w-full h-full object-contain"
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
