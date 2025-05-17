import React from 'react';
import { FaFacebook, FaGithub, FaInstagram, FaTwitter } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-black text-white py-8">
            <div className="container mx-auto px-8 md:px-16 lg:px-24">
                <div className="flex flex-col md:flex-row md:space-x-12 items-center mb-4">
                    <div className="flex-1 mb-4 md:mb-0">
                        <h3 className="text-2xl font-bold mb-2">Taravel</h3>
                        <p className="text-gray-400">
                            Based in Lucena City, Philippines — guiding you to explore Lucena’s best spots with ease.
                        </p>
                    </div>
                </div>

                <div className="border-t border-gray-600 pt-4 flex flex-col md:flex-row justify-between items-center">
                    <p className="text-gray-400">&copy; {new Date().getFullYear()} Taravel. All rights reserved.</p>
                    <div className="flex space-x-4 my-4 md:my-0">
                        <a href="https://www.facebook.com/taravel" target="_blank" rel="noreferrer" className="hover:text-white">
                            <FaFacebook />
                        </a>
                        <a href="https://github.com/taravel" target="_blank" rel="noreferrer" className="hover:text-white">
                            <FaGithub />
                        </a>
                        <a href="https://twitter.com/taravel" target="_blank" rel="noreferrer" className="hover:text-white">
                            <FaTwitter />
                        </a>
                        <a href="https://www.instagram.com/taravel" target="_blank" rel="noreferrer" className="hover:text-white">
                            <FaInstagram />
                        </a>
                    </div>
                    <div className="flex space-x-4">
                        <a href="#" className="text-gray-400 hover:text-white">
                            Privacy
                        </a>
                        <a href="#" className="text-gray-400 hover:text-white">
                            Terms of Agreements
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
