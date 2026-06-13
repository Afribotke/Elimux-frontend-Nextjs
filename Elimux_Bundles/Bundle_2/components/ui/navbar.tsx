export const Navbar = () => {
  return (
    <nav className="w-full bg-blue-600 text-white px-6 py-3 flex justify-between items-center">
      <h1 className="font-bold text-xl">ElimuX</h1>
      <div className="space-x-4">
        <a href="#" className="hover:underline">Home</a>
        <a href="#" className="hover:underline">Dashboard</a>
        <a href="#" className="hover:underline">Login</a>
      </div>
    </nav>
  );
};
