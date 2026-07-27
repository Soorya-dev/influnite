import { BackgroundBeams } from "../../../components/ui/background-beams";
import { Link } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";

export default function InfluencerLoginPage() {
  return (
    <BackgroundBeams className="min-h-screen bg-black">
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="w-full max-w-md bg-black/70 backdrop-blur-lg border border-purple-500/30 rounded-2xl shadow-xl p-8">
          {/* Heading */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-purple-400">
              Influencer Login
            </h1>
            <p className="text-gray-400 text-sm mt-2">
              Access your influencer dashboard
            </p>
          </div>

          {/* Form */}
          <form className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-sm text-gray-300 mb-2">Email</label>
              <input
                type="email"
                placeholder="influencer@email.com"
                className="w-full px-4 py-3 rounded-lg bg-black border border-purple-500/30 text-white focus:outline-none focus:border-purple-500"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm text-gray-300 mb-2">
                Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-lg bg-black border border-purple-500/30 text-white focus:outline-none focus:border-purple-500"
              />
            </div>

            {/* Forgot password */}
            <div className="flex justify-end">
              <Link
                to="/influencer/forgot-password"
                className="text-sm text-purple-400 hover:text-purple-300"
              >
                Forgot Password?
              </Link>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full py-3 rounded-lg bg-purple-600 hover:bg-purple-700 transition text-white font-semibold"
            >
              Login
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-grow h-px bg-gray-700"></div>
            <span className="px-3 text-gray-400 text-sm">OR</span>
            <div className="flex-grow h-px bg-gray-700"></div>
          </div>

          {/* Google Login */}
         <div className="flex justify-center">
  <GoogleLogin
    theme="filled_black"
    shape="pill"
    size="large"
    text="signin_with"
    onSuccess={(credentialResponse) => {
      console.log("Google Login Success");
      console.log(credentialResponse);
    }}
    onError={() => {
      console.log("Google Login Failed");
    }}
  />
</div>

          {/* Signup */}
          <p className="text-center text-gray-400 text-sm mt-6">
            Don’t have an account?{" "}
            <span className="text-purple-400 hover:text-purple-300 cursor-pointer">
              Sign Up
            </span>
          </p>
        </div>
      </div>
    </BackgroundBeams>
  );
}
