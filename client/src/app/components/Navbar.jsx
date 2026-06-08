"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTasks } from "../context/TaskContext";

const Navbar = () => {
  const { user, logout } = useTasks();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <header className="w-full bg-white border-b border-slate-200 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-4">
          <Link href="/dashboard" className="text-xl font-semibold text-slate-900">
            Task Management App
          </Link>
          <nav className="flex items-center gap-3 text-sm text-slate-600">
            
            {!user && (
              <>
                <Link href="/login" className="hover:text-slate-900">
                  Login
                </Link>
                <Link href="/register" className="hover:text-slate-900">
                  Register
                </Link>
              </>
            )}
          </nav>
        </div>

        {user ? (
          <div className="flex items-center gap-3">
            <span className="text-slate-700">Hi, {user.username}</span>
            <button
              type="button"
              onClick={handleLogout}
              className="rounded-lg bg-red-600 px-4 py-2 text-white transition hover:bg-red-700"
            >
              Logout
            </button>
          </div>
        ) : null}
      </div>
    </header>
  );
};
export default Navbar;
