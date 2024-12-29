import { useState, useEffect } from "react";
import { CheckCircle, Circle, Calendar, User } from "lucide-react";
import Navbar from "../components/Navbar";

const MyGoals = () => {
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch user's goals from the backend
  useEffect(() => {
  const fetchGoals = async () => {
    const token = localStorage.getItem("token");
    console.log("Current token:", token); // Add this to debug
    
    if (!token) {
      console.error("No token found");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("https://step-closer-api.vercel.app/goals/myGoals", {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        console.error("Server response:", errorData);
        throw new Error(`Failed to fetch goals: ${response.status}`);
      }
      
      const data = await response.json();
      setGoals(data);
    } catch (error) {
      console.error("Error fetching goals:", error);
    } finally {
      setLoading(false);
    }
  };
  fetchGoals();
}, []);

  // Toggle completed status
  const handleToggleCompleted = async (goalId) => {
    const goalToUpdate = goals.find(goal => goal._id === goalId);
    if (!goalToUpdate) return;

    const updatedGoalData = {
      ...goalToUpdate,
      completed: !goalToUpdate.completed
    };

    try {
      const response = await fetch(`https://step-closer-api.vercel.app/goals/${goalId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify(updatedGoalData)
      });

      if (!response.ok) throw new Error("Failed to update goal completion status");
      const updatedGoal = await response.json();

      setGoals(goals.map(goal => goal._id === goalId ? updatedGoal : goal));
    } catch (error) {
      console.error("Error updating goal completion:", error);
    }
  };

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
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Your Goals</h1>
            <div className="h-1 w-20 bg-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Track and celebrate your achievements</p>
          </div>

          {goals.length > 0 ? (
            <div className="grid gap-6">
              {goals.map((goal) => (
                <div
                  key={goal._id}
                  className={`bg-white rounded-xl shadow-md transition-all duration-300 overflow-hidden
                    ${goal.completed ? 'border-l-4 border-green-500' : 'border-l-4 border-yellow-500'}`}
                >
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className={`text-xl font-semibold ${goal.completed ? 'text-green-700' : 'text-gray-900'}`}>
                        {goal.task}
                      </h3>
                      <button
                        onClick={() => handleToggleCompleted(goal._id)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-all duration-200
                          ${goal.completed 
                            ? 'bg-green-100 text-green-700 hover:bg-green-200' 
                            : 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'}`}
                      >
                        {goal.completed ? (
                          <>
                            <CheckCircle className="w-5 h-5" />
                            <span>Completed</span>
                          </>
                        ) : (
                          <>
                            <Circle className="w-5 h-5" />
                            <span>Mark Complete</span>
                          </>
                        )}
                      </button>
                    </div>

                    <p className={`mb-6 ${goal.completed ? 'text-gray-500' : 'text-gray-600'}`}>
                      {goal.desc}
                    </p>

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

export default MyGoals;