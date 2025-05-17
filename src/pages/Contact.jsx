import { FaEnvelope, FaPhone, FaMapMarkedAlt } from 'react-icons/fa';

const Contact = () => {
    return (
        <section id="contact" className="bg-black text-white py-20">
            <div className="container mx-auto px-8 md:px-16 lg:px-24">
                <h2 className="text-4xl font-bold text-center mb-12">Contacts</h2>
                <div className="flex flex-col md:flex-row items-center md:space-x-12">
                    {/* Contact Info */}
                    <div className="flex-1">
                        <h3 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-200 mb-4">
                            Stay Connected with Us!
                        </h3>
                        <p className="mb-4 text-gray-300">
                            Have a question, feedback, or just want to say hello? We're here to help! Reach out to us through any of the following channels, and we'll get back to you as soon as possible. Your inquiries are important to us, and we look forward to hearing from you!
                        </p>

                        <div className="mb-4">
                            <FaEnvelope className="inline-block text-[#5220B7] mr-2" />
                            <a
                                href="mailto:customer.service@taravel.com"
                                className="hover:underline"
                            >
                                customer.service@taravel.com
                            </a>
                        </div>
                        <div className="mb-4">
                            <FaPhone className="inline-block text-[#5220B7] mr-2" />
                            <span>(042) 000 0000</span>
                        </div>
                        <div className="mb-4">
                            <FaMapMarkedAlt className="inline-block text-[#5220B7] mr-2" />
                            <span>Brgy. Isabang, Lucena City, Quezon, Philippines</span>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="flex-1 w-full mt-10 md:mt-0">
                        <form className="space-y-4">
                            <div>
                                <label htmlFor="name" className="block mb-2">
                                    Your Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    className="w-full p-2 rounded bg-gray-800 border border-gray-600 focus:outline-none focus:border-green-400"
                                    placeholder="Enter Your Name"
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="block mb-2">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    className="w-full p-2 rounded bg-gray-800 border border-gray-600 focus:outline-none focus:border-green-400"
                                    placeholder="Enter Your Email"
                                />
                            </div>
                            <div>
                                <label htmlFor="message" className="block mb-2">
                                    Message
                                </label>
                                <textarea
                                    id="message"
                                    rows="5"
                                    className="w-full p-2 rounded bg-gray-800 border border-gray-600 focus:outline-none focus:border-green-400"
                                    placeholder="Enter Your Message"
                                ></textarea>
                            </div>
                            <button
                                type="submit"
                                className="bg-[#5220B7] text-white transform transition-transform duration-300 hover:scale-105 px-8 py-2 rounded-full"
                            >
                                Send
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;