"use client";
import { motion } from "framer-motion";
import { Button } from "../ui/button";
import Link from "next/link";

const Hero = () => {
  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="container mx-auto px-6 py-32 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <img src="/logo.svg" alt="Lumetra Logo" className="mx-auto h-16 w-auto mb-4" />
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white md:text-6xl">
            Helping Startups Grow.
          </h1>
          <p className="mt-6 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            We are a modern creative agency that partners with ambitious startups to build stunning digital experiences that drive results.
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-8"
        >
          <Link href="/contact">
            <Button size="lg" className="bg-brand-blue hover:bg-brand-blue/90 text-white">
              Start a Project
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;