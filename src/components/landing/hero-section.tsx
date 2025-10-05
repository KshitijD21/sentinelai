"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Shield, Brain, Lock, Zap, ArrowRight } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black dark:bg-black">
      {/* Enhanced Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-800 opacity-95" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/30" />

      {/* Subtle Grid Pattern */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-10" />

      {/* Radial gradient for depth */}
      <div className="absolute inset-0 bg-radial-gradient from-white/5 via-transparent to-transparent" />

      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* AI Icons */}
          <motion.div
            className="flex justify-center gap-8 mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="p-3 rounded-full bg-gradient-to-br from-white/10 to-white/5 backdrop-blur border border-white/10">
              <Brain className="w-8 h-8 text-white" />
            </div>
            <div className="p-3 rounded-full bg-gradient-to-br from-white/10 to-white/5 backdrop-blur border border-white/10">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <div className="p-3 rounded-full bg-gradient-to-br from-white/10 to-white/5 backdrop-blur border border-white/10">
              <Lock className="w-8 h-8 text-white" />
            </div>
            <div className="p-3 rounded-full bg-gradient-to-br from-white/10 to-white/5 backdrop-blur border border-white/10">
              <Zap className="w-8 h-8 text-white" />
            </div>
          </motion.div>

          {/* Main Heading with Enhanced Gradient */}
          <motion.div
            className="relative mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Multiple gradient layers for depth */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent blur-2xl" />
            <div className="absolute inset-0 bg-gradient-to-b from-white/5 via-transparent to-white/5 blur-3xl" />

            <h1 className="relative text-6xl lg:text-8xl font-bold leading-tight">
              <span className="text-white">Secure Your</span>
              <br />
              <span className="bg-gradient-to-r from-gray-100 via-white to-gray-200 bg-clip-text text-transparent font-black">
                AI Systems
              </span>
            </h1>
          </motion.div>

          {/* Subtitle */}
          <motion.p
            className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Enterprise-grade AI security platform with multi-layer protection.
            Real-time monitoring and automated threat response.
          </motion.p>

          {/* Get Started Button */}
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Button
              size="lg"
              className="bg-white text-black hover:bg-gray-100 font-semibold px-8 py-4 text-lg shadow-2xl transition-all duration-300 transform hover:scale-105"
            >
              Get Started
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </motion.div>

          {/* Powered By Section */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <p className="text-sm text-gray-500 mb-6">Powered by</p>
            <div className="flex justify-center items-center gap-8">
              <div className="px-6 py-3 bg-white/5 rounded-lg border border-white/10">
                <span className="text-white font-medium">XYZ Technologies</span>
              </div>
              <div className="px-6 py-3 bg-white/5 rounded-lg border border-white/10">
                <span className="text-white font-medium">Meta AI</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
