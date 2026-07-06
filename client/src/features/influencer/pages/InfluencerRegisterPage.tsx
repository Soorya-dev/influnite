import { BackgroundBeams } from "../../../components/ui/background-beams";
import { Link } from "react-router-dom";

export default function InfluencerRegisterPage() {
  return (
    <BackgroundBeams className="relative min-h-screen bg-black overflow-hidden">
      
      <div className="relative flex justify-center px-4 py-12">

        <div className="w-full max-w-sm bg-black/70 backdrop-blur-lg border border-purple-500/30 rounded-xl shadow-xl p-6">

          {/* Heading */}
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-purple-400">
              Influencer Register
            </h1>
            <p className="text-gray-400 text-xs mt-1">
              Create your account
            </p>
          </div>

          {/* Form */}
          <form className="space-y-4">

            <input
              type="text"
              placeholder="Name"
              className="w-full px-3 py-2 rounded-lg bg-black border border-purple-500/30 text-white text-sm focus:outline-none focus:border-purple-500"
            />

            <input
              type="email"
              placeholder="Email"
              className="w-full px-3 py-2 rounded-lg bg-black border border-purple-500/30 text-white text-sm focus:outline-none focus:border-purple-500"
            />

            <input
              type="password"
              placeholder="Password"
              className="w-full px-3 py-2 rounded-lg bg-black border border-purple-500/30 text-white text-sm focus:outline-none focus:border-purple-500"
            />

            <input
              type="text"
              placeholder="Country"
              className="w-full px-3 py-2 rounded-lg bg-black border border-purple-500/30 text-white text-sm focus:outline-none focus:border-purple-500"
            />

            <button
              type="submit"
              className="w-full py-2 rounded-lg bg-purple-600 hover:bg-purple-700 transition text-white text-sm font-semibold"
            >
              Create Account
            </button>

          </form>

          {/* Divider */}
          <div className="flex items-center my-4">
            <div className="flex-grow h-px bg-gray-700"></div>
            <span className="px-2 text-gray-400 text-xs">OR</span>
            <div className="flex-grow h-px bg-gray-700"></div>
          </div>

          {/* Google Register */}
          <button
            className="w-full flex items-center justify-center gap-2 py-2 rounded-lg border border-gray-700 hover:border-purple-500 transition text-white text-sm"
          >
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              className="w-4 h-4"
            />
            Register with Google
          </button>

          {/* Login */}
          <p className="text-center text-gray-400 text-xs mt-4">
            Already have an account?{" "}
            <Link
              to="/influencer/login"
              className="text-purple-400 hover:text-purple-300"
            >
              Login
            </Link>
          </p>

        </div>

      </div>

    </BackgroundBeams>
  );
}