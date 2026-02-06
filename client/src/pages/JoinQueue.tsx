import { useState } from "react";
import { useLocation } from "wouter";
import { useJoinQueue } from "@/hooks/use-queue";
import { ArrowLeft, Loader2, Ticket } from "lucide-react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";

export default function JoinQueue() {
  const [name, setName] = useState("");
  const [, setLocation] = useLocation();
  const { mutate, isPending } = useJoinQueue();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    mutate({ name }, {
      onSuccess: (data) => {
        setLocation(`/status?token=${data.tokenNumber}&name=${encodeURIComponent(data.name)}`);
      },
      onError: (error) => {
        toast({
          title: "Error joining queue",
          description: error.message,
          variant: "destructive",
        });
      }
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="p-6">
        <Link href="/" className="inline-flex items-center text-gray-500 hover:text-gray-900 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
        </Link>
      </div>

      <div className="flex-1 flex items-center justify-center p-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md bg-white rounded-2xl shadow-xl shadow-blue-900/5 border border-gray-100 overflow-hidden"
        >
          <div className="h-2 bg-gradient-to-r from-blue-500 to-indigo-600 w-full" />
          
          <div className="p-8">
            <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 mb-6 mx-auto">
              <Ticket className="w-8 h-8" />
            </div>

            <h1 className="text-3xl font-display font-bold text-center text-gray-900 mb-2">
              Join the Queue
            </h1>
            <p className="text-center text-gray-500 mb-8">
              Enter your name to generate a ticket number.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Alex Johnson"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none text-gray-900 placeholder:text-gray-400"
                  autoFocus
                />
              </div>

              <button
                type="button"
                onClick={handleSubmit}
                disabled={!name.trim() || isPending}
                className="w-full py-4 px-6 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-lg shadow-blue-600/20 hover:shadow-xl hover:shadow-blue-600/30 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none transition-all duration-200 flex items-center justify-center"
              >
                {isPending ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Generating Token...
                  </>
                ) : (
                  "Generate Token"
                )}
              </button>
            </form>
          </div>
          
          <div className="bg-gray-50 p-4 text-center text-xs text-gray-500 border-t border-gray-100">
            By joining, you agree to our queue management terms.
          </div>
        </motion.div>
      </div>
    </div>
  );
}
