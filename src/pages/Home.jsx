import { Link } from "react-router-dom";

const Home = () => {
  return (
    <section
      id="home"
      className="h-screen bg-cover bg-center flex items-center justify-center relative"
      style={{ backgroundImage: `url(/HomeBG.png)` }}
    >
      <main className="relative z-10 flex flex-col items-center justify-center text-center px-6 sm:px-10 max-w-4xl mx-auto min-h-screen">
        <h1 className="text-white font-extrabold text-[2.5rem] sm:text-[4.5rem] leading-[1.2] max-w-3xl">
          “Life’s too short to
          <br />
          stay in one place.”
        </h1>
        <p className="text-white text-sm sm:text-base mt-4 max-w-md font-light">
          Taravel is an online platform that guides you
        </p>
        <Link to="/main">
          <button
            href="/app"
            className="mt-8 bg-[#4B22B6] border-2 border-white rounded-full px-8 py-3 text-white font-bold text-sm sm:text-base hover:bg-[#3a1a8a] transition-colors inline-block"
          >
            GET STARTED
          </button>
        </Link>
      </main>
    </section>
  );
};

export default Home;
