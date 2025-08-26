import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

export default function NewsletterSubscription() {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email) {
            toast.error("Please enter your email");
            return;
        }
        try {
            setLoading(true);
            await axios.post("https://athletic-server.vercel.app/newsletter/subscribe", { email });
            toast.success("Subscribed successfully!");
            setEmail("");
        } catch (error) {
            toast.error(error.response?.data?.message || "Subscription failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-base-200 py-12">
            <motion.section
                className="max-w-xl mx-auto p-8 rounded-2xl shadow-xl text-center text-white bg-gradient-to-r from-primary to-secondary"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <h3 className="text-3xl font-extrabold mb-3">
                    Subscribe to our Newsletter
                </h3>
                <p className="text-white/90 mb-6">
                    Get updates on upcoming athletic events, news, and special offers.
                </p>
                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 justify-center items-center">
                    <input
                        type="email"
                        placeholder="Your email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="input input-bordered input-white w-full sm:max-w-xs rounded-lg focus:ring-2 focus:ring-white text-primary transition"
                        required
                    />
                    <button
                        type="submit"
                        className={`btn btn-white text-primary rounded-lg w-full sm:w-auto ${loading ? "loading" : ""}`}
                        disabled={loading}
                    >
                        {loading ? "Submitting..." : "Subscribe"}
                    </button>
                </form>
            </motion.section>
        </div>
    );
}
