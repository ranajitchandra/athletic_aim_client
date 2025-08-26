import { FaTwitter, FaFacebookF, FaMapMarkerAlt, FaInstagram } from 'react-icons/fa';
import athletLogo from '../../assets/logo.png';

const Footer = () => {
    return (
        <footer className="bg-primary text-white py-12 px-6 md:px-16">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
                {/* About Section */}
                <div className="space-y-4">
                    <img src={athletLogo} className="w-28 rounded bg-white p-1" alt="Logo" />
                    <p className="text-sm text-white/90">
                        Empowering athletes of all levels to reach their full potential. Personalized training, expert coaching, and skills development on and off the field.
                    </p>
                    <div className="flex items-center gap-4 text-lg mt-2">
                        <a href="#" className="hover:text-yellow-400 transition"><FaTwitter /></a>
                        <a href="#" className="hover:text-blue-500 transition"><FaFacebookF /></a>
                        <a href="#" className="hover:text-red-500 transition"><FaMapMarkerAlt /></a>
                        <a href="#" className="hover:text-pink-500 transition"><FaInstagram /></a>
                    </div>
                </div>

                {/* Programs Section */}
                <div className="space-y-3">
                    <h3 className="text-lg font-semibold mb-2">Programs</h3>
                    <ul className="space-y-2 text-sm text-white/90">
                        <li className="hover:text-white transition cursor-pointer">Strength Training</li>
                        <li className="hover:text-white transition cursor-pointer">Speed & Agility</li>
                        <li className="hover:text-white transition cursor-pointer">Team Sports Coaching</li>
                        <li className="hover:text-white transition cursor-pointer">Individual Skill Clinics</li>
                        <li className="hover:text-white transition cursor-pointer">Injury Prevention</li>
                        <li className="hover:text-white transition cursor-pointer">Fitness & Conditioning</li>
                    </ul>
                </div>

                {/* Support Section */}
                <div className="space-y-3">
                    <h3 className="text-lg font-semibold mb-2">Support</h3>
                    <ul className="space-y-2 text-sm text-white/90">
                        <li className="hover:text-white transition cursor-pointer">Get a Quote</li>
                        <li className="hover:text-white transition cursor-pointer">Terms & Conditions</li>
                        <li className="hover:text-white transition cursor-pointer">FAQ</li>
                        <li className="hover:text-white transition cursor-pointer">Contact Us</li>
                        <li className="hover:text-white transition cursor-pointer">Customer Support</li>
                    </ul>
                </div>

                {/* Company Section */}
                <div className="space-y-3">
                    <h3 className="text-lg font-semibold mb-2">Company</h3>
                    <ul className="space-y-2 text-sm text-white/90">
                        <li className="hover:text-white transition cursor-pointer">About Us</li>
                        <li className="hover:text-white transition cursor-pointer">Our Trainers</li>
                        <li className="hover:text-white transition cursor-pointer">Careers</li>
                        <li className="hover:text-white transition cursor-pointer">News & Articles</li>
                        <li className="hover:text-white transition cursor-pointer">Legal Notice</li>
                    </ul>
                </div>
            </div>

            {/* Bottom Copyright */}
            <div className="mt-10 border-t border-white/20 pt-4 text-center text-sm text-white/80">
                © {new Date().getFullYear()} Athletic Aim. All Rights Reserved.
            </div>
        </footer>
    );
};

export default Footer;
