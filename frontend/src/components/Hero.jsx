import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="h-full w-full p-4 flex flex-col lg:flex-row justify-center items-center text-zinc-900">
      {/* Left Text Content */}
      <div className="text-center lg:text-left max-w-lg p-6">
        <h1 className="text-4xl lg:text-5xl font-bold leading-tight mb-4">
          Take One Step Closer <br /> to Fulfilling Your Goals
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          Share your aspirations, track your progress, and inspire others. 
          Let’s build a community of goal-setters and achievers!
        </p>
        <button className="bg-zinc-900 text-white text-lg py-3 px-6 rounded-lg hover:bg-zinc-700 transition">
          <Link to="/goals">Get Started</Link>
        </button>
      </div>

      {/* Right Image/Illustration */}
      <div className="max-w-md lg:max-w-xl p-6">
        <img
          src="/OGoals.jpg"
          alt="Achieve your goals"
          className="w-full rounded-lg"
        />
      </div>
    </section>
  );
};

export default Hero;
