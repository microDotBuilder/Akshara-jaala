import type { MetaFunction } from "@remix-run/node";

import { motion } from "framer-motion";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

import { MOCK_CARD_INFO } from "~/lib/MOCK/mock-card-info";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <div>
      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8 relative z-10 mt-24 md:mt-32"
      >
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
          AKSHARA JAALA
        </h1>
        <p className="text-xl md:text-2xl text-gray-400 mb-8">
          Embark on a mind-bending adventure through words!
        </p>
      </motion.div>

      {/* Feature Cards */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 relative z-10"
      >
        {MOCK_CARD_INFO.map((feature, index) => (
          <Card
            key={index}
            className="bg-gray-900 border-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            <CardHeader>
              <CardTitle className="flex items-center text-white">
                <feature.icon
                  className="mr-2"
                  style={{ color: feature.color }}
                />
                {feature.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-gray-400">
                {feature.description}
              </CardDescription>
            </CardContent>
          </Card>
        ))}
      </motion.div>
    </div>
  );
}
