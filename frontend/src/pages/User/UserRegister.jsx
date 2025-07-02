import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const UserRegister = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Clear error when user starts typing
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: ''
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5100/api/users/register', {
        name: formData.name,
        email: formData.email,
        password: formData.password
      });
      
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      navigate('/login');
    } catch (error) {
      setErrors({
        submit: error.response?.data?.msg || 'Registration failed. Please try again.'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-5 bg-gradient-to-br from-blue-500 via-purple-500 to-purple-700">
      <div className="w-full max-w-md">
        <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8 transform transition-all duration-500 hover:scale-105">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
              Create Account
            </h1>
            <p className="text-gray-600 text-base">
              Join us to build your professional resume
            </p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label htmlFor="name" className="block text-sm font-semibold text-gray-700 tracking-wide">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-xl border-2 text-base transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 focus:-translate-y-0.5 ${
                  errors.name 
                    ? 'border-red-500 focus:border-red-500 focus:ring-red-500/30' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                placeholder="Enter your full name"
              />
              {errors.name && (
                <span className="text-red-500 text-sm font-medium block mt-1">
                  {errors.name}
                </span>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700 tracking-wide">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-xl border-2 text-base transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 focus:-translate-y-0.5 ${
                  errors.email 
                    ? 'border-red-500 focus:border-red-500 focus:ring-red-500/30' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                placeholder="Enter your email"
              />
              {errors.email && (
                <span className="text-red-500 text-sm font-medium block mt-1">
                  {errors.email}
                </span>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-semibold text-gray-700 tracking-wide">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-xl border-2 text-base transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 focus:-translate-y-0.5 ${
                  errors.password 
                    ? 'border-red-500 focus:border-red-500 focus:ring-red-500/30' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                placeholder="Create a password"
              />
              {errors.password && (
                <span className="text-red-500 text-sm font-medium block mt-1">
                  {errors.password}
                </span>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-700 tracking-wide">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-xl border-2 text-base transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 focus:-translate-y-0.5 ${
                  errors.confirmPassword 
                    ? 'border-red-500 focus:border-red-500 focus:ring-red-500/30' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                placeholder="Confirm your password"
              />
              {errors.confirmPassword && (
                <span className="text-red-500 text-sm font-medium block mt-1">
                  {errors.confirmPassword}
                </span>
              )}
            </div>

            {errors.submit && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-center text-sm font-medium">
                {errors.submit}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 px-6 rounded-xl text-base transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/25 focus:outline-none focus:ring-2 focus:ring-blue-500/50 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none mt-6 relative overflow-hidden group"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform -skew-x-12 translate-x-full group-hover:translate-x-0"></span>
              <span className="relative">
                {loading ? 'Creating Account...' : 'Create Account'}
              </span>
            </button>
          </form>

          <div className="text-center mt-8 pt-6 border-t border-gray-200">
            <p className="text-gray-600 text-sm">
              Already have an account?{' '}
              <Link 
                to="/login" 
                className="text-blue-600 font-semibold hover:text-purple-600 transition-colors duration-300 hover:underline"
              >
                Sign in here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserRegister;
