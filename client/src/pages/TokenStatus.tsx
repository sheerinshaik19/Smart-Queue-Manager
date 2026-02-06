import { useLocation } from "wouter";
import { Link } from "wouter";
import { Home, ArrowRight, Clock } from "lucide-react";
import { motion } from "framer-motion";

export default function TokenStatus() {
  const [location] = useLocation();
  const searchParams = new URLSearchParams(window.location.search);
  const token = searchParams.get("token");
  const name = searchParams.get("name");

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-bold mb-4">Invalid Token</h2>
          <Link href="/join" className="text-blue-600 hover:underline">Go back to join page</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6 relative overflow-hidden">
      
      {/* Background decoration */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-blue-100 rounded-full blur-[120px] opacity-60" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-indigo-100 rounded-full blur-[120px] opacity-60" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 100 }}
        className="w-full max-w-lg bg-white rounded-3xl shadow-2xl shadow-blue-900/10 border border-white/50 relative z-10 overflow-hidden"
      >
        <div className="bg-blue-600 p-8 text-center text-white relative overflow-hidden">
           <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
           <p className="relative z-10 text-blue-100 font-medium mb-1">Hello, {name}</p>
           <h1 className="relative z-10 text-3xl font-display font-bold">You're in the Queue!</h1>
        </div>

        <div className="p-10 flex flex-col items-center text-center">
          <div className="mb-8 relative">
            <div className="absolute inset-0 bg-blue-100 rounded-full animate-ping opacity-25"></div>
            <div className="w-40 h-40 bg-white border-4 border-blue-100 rounded-full flex flex-col items-center justify-center shadow-inner relative z-10">
              <span className="text-gray-400 text-xs uppercase tracking-wider font-semibold mb-1">Token No</span>
              <span className="text-6xl font-display font-bold text-blue-600 tracking-tighter">
                #{token}
              </span>
            </div>
          </div>

          <div className="w-full bg-blue-50 rounded-xl p-4 mb-8 flex items-center justify-center text-blue-800 border border-blue-100">
            <Clock className="w-5 h-5 mr-3 text-blue-600" />
            <span className="font-medium">Estimated wait: ~15 mins</span>
          </div>

          <p className="text-gray-500 mb-8 max-w-xs mx-auto">
            Please wait for your number to be called. Keep this screen open or screenshot your token.
          </p>

          <Link href="/" className="w-full">
            <button className="w-full py-3 px-6 rounded-xl border-2 border-gray-100 hover:border-gray-200 hover:bg-gray-50 text-gray-700 font-semibold transition-all flex items-center justify-center group">
              <Home className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
              Back to Dashboard
            </button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
