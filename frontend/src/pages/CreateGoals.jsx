import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Eye, EyeOff, Target } from 'lucide-react';
import Navbar from '../components/Navbar';

const CreateGoals = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    task: '',
    date: '',
    desc: '',
    visibility: false,
    completed: false
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

 const handleSubmit = async (e) => {
  e.preventDefault();
  setError('');

  if (!formData.task || !formData.date || !formData.desc) {
    setError('Please fill out all required fields.');
    return;
  }

  try {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/authenticate');
      return;
    }

    // Log the token to verify it exists and is formatted correctly
    console.log('Token being sent:', token);

    const response = await fetch('https://step-closer-api.vercel.app/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(formData)
      // Remove mode: 'no-cors'
    });

    // Log the response status
    console.log('Response status:', response.status);

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Error data:', errorData);
      throw new Error(errorData.message || 'Failed to create goal');
    }

    const result = await response.json();
    console.log('Goal created:', result);
    navigate('/goals');
  } catch (err) {
    console.error('Error details:', err);
    if (err.message.includes('Token is not valid')) {
      localStorage.removeItem('token');
      navigate('/authenticate');
    } else {
      setError(err.message || 'Failed to create goal. Please try again.');
    }
  }
};
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <Navbar />
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          <div className="mb-12 text-center">
            <div className="inline-block p-2 bg-blue-50 rounded-lg mb-4">
              <Target className="w-8 h-8 text-zinc-600" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Create Your Goal
            </h1>
            <div className="h-1 w-20 bg-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">
              Define your ambitions and track your journey to success
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            {error && (
              <div className="mb-6 p-4 bg-red-50 rounded-xl border border-red-100 text-red-700 flex items-center space-x-2">
                <div className="shrink-0 w-1 h-8 bg-red-500 rounded-full"></div>
                <p>{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Goal Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="task"
                  value={formData.task}
                  onChange={handleChange}
                  placeholder="What do you want to achieve?"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 hover:border-gray-400"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="desc"
                  value={formData.desc}
                  onChange={handleChange}
                  placeholder="Break down your goal into specific, actionable details..."
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 hover:border-gray-400 min-h-[120px] resize-y"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700 flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-500" />
                    Target Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 hover:border-gray-400"
                  />
                </div>

                {/* Aligning the visibility checkbox properly */}
                <div className="space-y-2 flex items-center justify-start md:col-span-2">
                  <label className="group flex items-center space-x-3 cursor-pointer bg-gray-50 px-4 py-3 rounded-xl border border-gray-200 hover:border-gray-300 transition-all duration-200 w-full">
                    <input
                      type="checkbox"
                      name="visibility"
                      checked={formData.visibility}
                      onChange={handleChange}
                      className="form-checkbox h-5 w-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                    />
                    <span className="text-sm font-medium text-gray-700 flex items-center gap-2">
                      {formData.visibility ? (
                        <Eye className="w-4 h-4 text-gray-500" />
                      ) : (
                        <EyeOff className="w-4 h-4 text-gray-500" />
                      )}
                      {formData.visibility ? 'Public Goal' : 'Private Goal'}
                    </span>
                  </label>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-zinc-900 to-zinc-800 hover:from-zinc-800 hover:to-zinc-700 text-white py-4 px-6 rounded-xl transition-all duration-200 font-medium text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                Create Goal
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CreateGoals;
