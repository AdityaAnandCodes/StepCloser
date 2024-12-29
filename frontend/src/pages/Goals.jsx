import { useState, useEffect } from "react";
import { CheckCircle, Circle, Calendar, User } from "lucide-react";
import Navbar from "../components/Navbar";

const Goals = () => {
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleData = async () => {
      try {
        const response = await fetch("https://step-closer-api.vercel.app/goals");
        if (!response.ok) throw new Error("Failed to fetch goals");
        const data = await response.json();
        setGoals(data);
      } catch (error) {
        console.error("Error fetching goals:", error);
      } finally {
        setLoading(false);
      }
    };
    handleData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
        <Navbar />
        <div className="container mx-auto px-4 py-12 text-center">
          <div className="animate-pulse text-gray-500">Loading goals...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <Navbar />
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="mb-12 text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Get Inspired</h1>
            <div className="h-1 w-20 bg-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">See what others strive for</p>
          </div>

          {goals.length > 0 ? (
            <div className="grid gap-6">
              {goals.map((goal, index) => (
                <div 
                  key={index} 
                  className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden"
                >
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-semibold text-gray-900">{goal.task}</h3>
                      <div 
                        className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium
                          ${goal.completed 
                            ? "bg-green-100 text-green-800" 
                            : "bg-yellow-100 text-yellow-800"}`}
                      >
                        {goal.completed ? (
                          <CheckCircle className="w-4 h-4" />
                        ) : (
                          <Circle className="w-4 h-4" />
                        )}
                        {goal.completed ? "Completed" : "In Progress"}
                      </div>
                    </div>

                    <p className="text-gray-600 mb-6">{goal.desc}</p>

                    <div className="grid grid-cols-2 gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(goal.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4" />
                        <span>{goal.createdBy}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center bg-white rounded-xl shadow-md p-12">
              <p className="text-gray-500 text-lg">No goals available</p>
              <p className="text-gray-400 mt-2">Start by creating your first goal</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Goals;