import {Link} from 'react-router-dom'
const About = () => {
  return (
    <section id="about" className="bg-black text-white py-20">
      <div className="container mx-auto px-8 md:px-16 lg:px-24">
        <h2 className="text-4xl font-bold text-center mb-12">About</h2>
        <div className="max-w-4xl mx-auto space-y-6">
          <h3 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-200 mb-4">
            Discover Lucena City Like Never Before
          </h3>
          <p className="text-gray-300">
            Lucena City is full of hidden gems — from scenic parks and historic
            landmarks to popular local dining spots. But finding the best places
            can be tough with information scattered across multiple sources.
            That’s why we created an easy-to-use web application with an
            interactive map that helps you explore Lucena based on your
            preferences.
          </p>
          <ul className="list-disc list-inside text-gray-300 space-y-2 mb-4">
            <li>
              <span className="text-[#5220B7] font-semibold">
                🗺️ Interactive Map:
              </span>{" "}
              Navigate Lucena with ease and discover recommended spots near you.
            </li>
            <li>
              <span className="text-[#5220B7] font-semibold">
                🍽️ Curated Categories:
              </span>{" "}
              Find food hubs, tourist attractions, parks, and more, all in one
              place.
            </li>
            <li>
              <span className="text-[#5220B7] font-semibold">
                🕒 Essential Info:
              </span>{" "}
              Get photos, descriptions, hours, and location details in a single
              click.
            </li>
          </ul>
          <p className="text-gray-300">
            Whether you're a visitor or a local, our platform helps you
            experience the best of Lucena City — conveniently and enjoyably.
          </p>
          <Link to="/main">
            <button className="mt-6 bg-[#5220B7] text-white px-6 py-2 rounded-full hover:scale-105 transition-transform">
              Start Exploring
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default About;
