export default function Footer() {
    return (
      <footer className="bg-gray-900 text-gray-300 py-6">
        <div className="container mx-auto text-center">
          <p className="mb-4">
            &copy; 2024 TaskManager. All rights reserved.
          </p>
          <nav className="flex justify-center space-x-6">
            <a href="#" className="hover:text-green-400">Privacy Policy</a>
            <a href="#" className="hover:text-green-400">Terms of Service</a>
            <a href="#" className="hover:text-green-400">Contact Us</a>
          </nav>
        </div>
      </footer>
    );
  }
  