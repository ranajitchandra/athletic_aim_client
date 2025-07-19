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
    <section className="text-center px-4 py-12 bg-white overflow-hidden">
      <h2 className="text-3xl font-bold text-blue-900 my-10">
        Sports Clubs That Joined Our Arena
      </h2>

      <div className="relative w-full">
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
            <div
              key={idx}
              className="w-28 h-28 flex-shrink-0"
            >
              <img
                src={club.img}
                alt={club.name}
                className="w-full h-full object-contain"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
