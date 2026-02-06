import { Link } from "wouter";
import { UserPlus, LayoutDashboard, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-br from-blue-50 to-indigo-50/50">
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-2xl mx-auto mb-12"
      >
        <div className="inline-flex items-center justify-center p-2 px-4 rounded-full bg-blue-100 text-blue-700 font-medium text-sm mb-6 border border-blue-200 shadow-sm">
          <span className="relative flex h-2 w-2 mr-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
          </span>
          Smart Queue System v1.0
        </div>
        
        <h1 className="text-5xl md:text-6xl font-display font-bold text-gray-900 leading-tight mb-4 tracking-tight">
          Wait smarter, <br className="hidden md:block"/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">not harder.</span>
        </h1>
        
        <p className="text-xl text-gray-500 max-w-lg mx-auto leading-relaxed">
          Join the digital queue instantly or manage customer flow from our powerful dashboard.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
        <Link href="/join" className="group">
          <motion.div 
            whileHover={{ y: -4 }}
            className="h-full bg-white rounded-2xl p-8 border border-gray-100 shadow-xl shadow-blue-900/5 hover:shadow-2xl hover:shadow-blue-900/10 hover:border-blue-200 transition-all cursor-pointer relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-3 opacity-5 group-hover:opacity-10 transition-opacity">
              <UserPlus size={120} />
            </div>
            
            <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 mb-6 group-hover:scale-110 transition-transform duration-300">
              <UserPlus className="w-7 h-7" />
            </div>
            
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Join Queue</h3>
            <p className="text-gray-500 mb-6">Get your digital token number and track your status in real-time.</p>
            
            <div className="flex items-center text-blue-600 font-semibold group-hover:translate-x-1 transition-transform">
              Get Token <ArrowRight className="ml-2 w-4 h-4" />
            </div>
          </motion.div>
        </Link>

        <Link href="/admin" className="group">
          <motion.div 
            whileHover={{ y: -4 }}
            className="h-full bg-white rounded-2xl p-8 border border-gray-100 shadow-xl shadow-blue-900/5 hover:shadow-2xl hover:shadow-blue-900/10 hover:border-indigo-200 transition-all cursor-pointer relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-3 opacity-5 group-hover:opacity-10 transition-opacity">
              <LayoutDashboard size={120} />
            </div>

            <div className="w-14 h-14 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600 mb-6 group-hover:scale-110 transition-transform duration-300">
              <LayoutDashboard className="w-7 h-7" />
            </div>
            
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Admin Dashboard</h3>
            <p className="text-gray-500 mb-6">View active queues, call next numbers, and manage waiting lists.</p>
            
            <div className="flex items-center text-indigo-600 font-semibold group-hover:translate-x-1 transition-transform">
              Open Dashboard <ArrowRight className="ml-2 w-4 h-4" />
            </div>
          </motion.div>
        </Link>
      </div>

      <footer className="mt-20 text-gray-400 text-sm">
        &copy; {new Date().getFullYear()} Smart Queue Management System
      </footer>
    </div>
  );
}
