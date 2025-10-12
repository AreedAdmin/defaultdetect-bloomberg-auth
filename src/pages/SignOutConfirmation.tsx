import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { LogIn, Sparkles } from "lucide-react";

const SignOutConfirmation = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0b1220] via-[#0a1222] to-[#0b1528] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-sky-500/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative max-w-md w-full"
      >
        <div className="bg-gradient-to-br from-blue-600/20 to-blue-800/5 backdrop-blur-xl rounded-2xl border border-blue-400/20 p-8 shadow-2xl">
          {/* Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="mx-auto w-20 h-20 bg-gradient-to-br from-sky-500/20 to-blue-600/20 rounded-full flex items-center justify-center mb-6"
          >
            <Sparkles className="w-10 h-10 text-sky-400" />
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-3xl font-bold text-center mb-3 bg-gradient-to-r from-sky-400 to-blue-400 bg-clip-text text-transparent"
          >
            Goodbye!
          </motion.h1>

          {/* Message */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="space-y-4 mb-8"
          >
            <p className="text-center text-blue-100/90 text-lg">
              We hope to see you soon!
            </p>
            <p className="text-center text-blue-200/70 text-sm">
              Thank you for using DefaultDetect. Your financial intelligence platform is always ready when you return.
            </p>
          </motion.div>

          {/* Action Button */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Link to="/auth" className="block">
              <Button
                className="w-full bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white font-semibold py-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-sky-500/25"
              >
                <LogIn className="mr-2 h-5 w-5" />
                Return to Sign In
              </Button>
            </Link>
          </motion.div>

          {/* Decorative border */}
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 rounded-t-2xl" />
        </div>

        {/* Bottom text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center text-blue-200/50 text-sm mt-6"
        >
          Stay secure, stay informed.
        </motion.p>
      </motion.div>
    </div>
  );
};

export default SignOutConfirmation;