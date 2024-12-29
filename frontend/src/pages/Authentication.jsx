import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';

const Authentication = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const navigate = useNavigate(); // Hook to handle navigation

  const toggleSignUp = () => {
    setIsSignUp((prev) => !prev);
    setFormData({ username: '', email: '', password: '' });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const url = isSignUp
        ? 'https://step-closer-api.vercel.app/createUser'
        : 'https://step-closer-api.vercel.app/login';
      const response = await axios.post(url, formData);

      if (response.data.token) {
        localStorage.setItem('token', response.data.token); // Save token to localStorage
        alert('Authentication successful!');
        console.log('Token:', response.data.token);
        navigate('/'); // Redirect to the home page
      } else {
        alert(response.data.message || 'Authentication failed!');
      }
    } catch (error) {
      console.error(error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <section>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="max-w-md w-full mx-4">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome</h1>
              <div className="h-1 w-16 bg-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">
                {isSignUp ? 'Create an account to get started' : 'Sign in to continue'}
              </p>
            </div>

            {/* Input Fields */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {isSignUp && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Username
                  </label>
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                    placeholder="Enter your username"
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                  placeholder="Enter your password"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-zinc-700 hover:bg-zinc-800 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 mt-2"
              >
                {isSignUp ? 'Sign up' : 'Sign in'}
              </button>
            </form>

            {/* Footer */}
            <p className="mt-6 text-center text-sm text-gray-600">
              {isSignUp ? 'Already have an account? ' : "Don't have an account? "}
              <button
                onClick={toggleSignUp}
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                {isSignUp ? 'Sign in' : 'Sign up'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Authentication;
