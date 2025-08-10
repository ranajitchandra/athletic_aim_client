import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

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
            // Send subscription request to your backend
            await axios.post("http://localhost:3000/newsletter/subscribe", { email });
            toast.success("Subscribed successfully!");
            setEmail("");
        } catch (error) {
            toast.error(error.response?.data?.message || "Subscription failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="max-w-md mx-auto bg-secondary bg-opacity-80 p-6 rounded-xl shadow-lg text-white text-center my-10">
            <h3 className="text-2xl font-bold mb-4">Subscribe to our Newsletter</h3>
            <p className="mb-6 opacity-80">
                Get updates on upcoming athletic events, news, and offers.
            </p>
            <form onSubmit={handleSubmit} className="flex gap-2 justify-center">
                <input
                    type="email"
                    placeholder="Your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="input input-bordered input-primary text-secondary w-full max-w-xs rounded-lg"
                    required
                />
                <button
                    type="submit"
                    className={`btn btn-primary rounded-lg ${loading ? "loading" : ""}`}
                    disabled={loading}
                >
                    {loading ? "Submitting..." : "Subscribe"}
                </button>
            </form>
        </section>
    );
}
