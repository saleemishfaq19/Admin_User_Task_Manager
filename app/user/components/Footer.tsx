export default function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-slate-800 mt-10">
      {" "}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {" "}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          {" "}
          <div>
            {" "}
            <h2 className="text-xl font-bold text-white">
              {" "}
              Saleem<span className="text-blue-500">Dev</span>{" "}
            </h2>{" "}
            <p className="text-sm text-slate-400 mt-1">
              {" "}
              Web Developer Management System{" "}
            </p>{" "}
          </div>{" "}
          <div className="flex gap-6 text-sm text-slate-400">
            {" "}
            <a href="#" className="hover:text-blue-400 transition">
              {" "}
              Dashboard{" "}
            </a>{" "}
            <a href="#" className="hover:text-blue-400 transition">
              {" "}
              Developers{" "}
            </a>{" "}
            <a href="#" className="hover:text-blue-400 transition">
              {" "}
              Projects{" "}
            </a>{" "}
            <a href="#" className="hover:text-blue-400 transition">
              {" "}
              Tasks{" "}
            </a>{" "}
          </div>{" "}
        </div>{" "}
        <div className="border-t border-slate-800 mt-6 pt-5 text-center">
          {" "}
          <p className="text-sm text-slate-500">
            {" "}
            © 2026 SaleemDev. All rights reserved.{" "}
          </p>{" "}
        </div>{" "}
      </div>{" "}
    </footer>
  );
}
