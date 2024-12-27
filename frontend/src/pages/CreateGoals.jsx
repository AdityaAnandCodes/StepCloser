import { useState } from 'react';
import { CalendarIcon } from 'lucide-react';
import Navbar from '../components/Navbar';

const CreateGoals = () => {
  const [task, setTask] = useState('');
  const [date, setDate] = useState('');
  const [createdBy, setCreatedBy] = useState('');
  const [completed, setCompleted] = useState(false);
  const [desc, setDesc] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (task && date && createdBy && desc) {
      const response = await fetch('http://localhost:4000/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ task, date, createdBy, completed, desc }),
      });
      const result = await response.json();
      console.log('Goal created:', result);
    } else {
      alert('Please fill out all fields.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <Navbar />
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          <div className="mb-12 text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Create Your Goal
            </h1>
            <div className="h-1 w-20 bg-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">
              Set clear goals and track your progress
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Goal Title
                </label>
                <input
                  type="text"
                  placeholder="What do you want to achieve?"
                  name="task"
                  onChange={(e) => setTask(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  placeholder="Describe your goal in detail..."
                  name="desc"
                  onChange={(e) => setDesc(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors min-h-[120px] resize-y"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Your Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your name"
                    name="createdBy"
                    onChange={(e) => setCreatedBy(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Target Date
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      name="date"
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                    />
                    <CalendarIcon className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
                  </div>
                </div>
              </div>

              <button 
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg transition-colors duration-200 font-medium text-lg shadow-md hover:shadow-lg"
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