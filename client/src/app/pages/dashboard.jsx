import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import Filters from "../components/Filters";
import Navbar from "../components/Navbar";

const Dashboard = () => {
  return (
    <div className="bg-white text-black font-sans transition-colors duration-200 min-h-screen">
      <Navbar />
      <header className="px-4 sm:px-12 lg:px-16 py-6 w-full max-w-2xl mx-auto text-center">
        <h1 className="font-bold text-2xl sm:text-2xl">Task management system</h1>
      </header>
      <div className="flex min-h-[calc(100vh-72px)] items-center justify-center">
        <main className="px-4 sm:px-12 lg:px-16 py-10 w-full max-w-2xl">
          <Filters />
          <TaskForm />
          <TaskList />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;