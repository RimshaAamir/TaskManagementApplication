import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Link from "next/link";

const Home: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <Header />

      {/* Main Section */}
      <main className="flex-grow">
        <div className="container mx-auto px-6 py-20 text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-6">
            Welcome to TaskManager
          </h2>
          <p className="text-gray-600 text-lg max-w-xl mx-auto mb-8">
            Manage your tasks effectively and increase your productivity with TaskManager. A simple, intuitive tool for everyone.
          </p>
          <div className="space-x-4">
            <Link href="/tasks">
            <button  className="bg-green-500 text-white px-6 py-3 rounded-md shadow-lg hover:bg-green-600">
              Get Started
            </button>
            </Link>
            <button className="bg-gray-200 text-gray-700 px-6 py-3 rounded-md shadow-lg hover:bg-gray-300">
              Learn More
            </button>
          </div>
        </div>
        <div className="container mx-auto px-6 mt-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Feature Cards */}
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <h3 className="text-xl font-semibold text-green-600 mb-4">
                Simplified Design
              </h3>
              <p className="text-gray-600">
                Focus on what matters with a clear and simple interface.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <h3 className="text-xl font-semibold text-green-600 mb-4">
                Customizable Tasks
              </h3>
              <p className="text-gray-600">
                Tailor your tasks to suit your needs and priorities.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <h3 className="text-xl font-semibold text-green-600 mb-4">
                Track Progress
              </h3>
              <p className="text-gray-600">
                Stay on top of your tasks and never miss a deadline.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;
