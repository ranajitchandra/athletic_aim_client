import { FaTwitter, FaFacebookF, FaMapMarkerAlt, FaInstagram } from 'react-icons/fa';
import athletLogo from '../../assets/logo.png';

const Footer = () => {
    return (
        <footer className="bg-primary text-white py-10 px-6 md:px-16">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
                <div>
                    <p className="text-sm mb-4">
                        We are committed to empowering athletes of all levels to reach their full potential. From personalized training programs to expert coaching, we help you improve your skills, build confidence, and achieve your goals — on and off the field.
                    </p>

                    <h2 className="text-xl font-bold mb-2 flex items-center gap-2">
                        <img src={athletLogo} className="hidden lg:block w-24 bg-white p-0.5 rounded" alt="Logo" />
                    </h2>
                    <div className="flex space-x-4 mt-4 text-lg">
                        <FaTwitter />
                        <FaFacebookF />
                        <FaMapMarkerAlt />
                        <FaInstagram />
                    </div>
                </div>

                <div>
                    <h3 className="text-lg font-semibold mb-4">Programs</h3>
                    <ul className="space-y-2 text-sm">
                        <li>Strength Training</li>
                        <li>Speed & Agility</li>
                        <li>Team Sports Coaching</li>
                        <li>Individual Skill Clinics</li>
                        <li>Injury Prevention</li>
                        <li>Fitness & Conditioning</li>
                    </ul>
                </div>

                <div>
                    <h3 className="text-lg font-semibold mb-4">Support</h3>
                    <ul className="space-y-2 text-sm">
                        <li>Get a Quote</li>
                        <li>Terms and Conditions</li>
                        <li>FAQ</li>
                        <li>Contact Us</li>
                        <li>Customer Support</li>
                    </ul>
                </div>

                <div>
                    <h3 className="text-lg font-semibold mb-4">Company</h3>
                    <ul className="space-y-2 text-sm">
                        <li>About Us</li>
                        <li>Our Trainers</li>
                        <li>Careers</li>
                        <li>News & Articles</li>
                        <li>Legal Notice</li>
                    </ul>
                </div>
            </div>

            <div className="flex items-center justify-center py-2 mt-5 text-md">
                <span>© {new Date().getFullYear()} Athletic Aim. All Rights Reserved.</span>
            </div>
        </footer>
    );
};

export default Footer;
