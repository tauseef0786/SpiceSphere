import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-orange-100 text-gray-800 py-10 mt-10 ">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-3 gap-6 items-start">
        {/* Brand Info */}
        <div>
          <h2 className="text-2xl font-bold text-orange-600 mb-2">SpiceSphere</h2>
          <p className="text-sm italic">
            "Cooking is love made visible. Share your flavor with the world!"
          </p>
        </div>

        {/* Links */}
        <div>
          <h3 className="text-lg font-semibold mb-2 text-orange-500">Quick Links</h3>
          <ul className="space-y-1">
            <li><a href="#" className="hover:text-orange-600">About Us</a></li>
            <li><a href="#" className="hover:text-orange-600">Contact</a></li>
            <li><a href="#" className="hover:text-orange-600">Privacy Policy</a></li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-lg font-semibold mb-2 text-orange-500">Follow Us</h3>
          <div className="flex space-x-4">
            <a href="#" className="text-orange-600 hover:text-orange-800 text-xl"><FaFacebookF /></a>
            <a href="#" className="text-orange-600 hover:text-orange-800 text-xl"><FaInstagram /></a>
            <a href="#" className="text-orange-600 hover:text-orange-800 text-xl"><FaTwitter /></a>
          </div>
        </div>
      </div>

      {/* Bottom note */}
      <div className="text-center text-sm mt-10 text-gray-500">
        &copy; {new Date().getFullYear()} SpiceSphere. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
