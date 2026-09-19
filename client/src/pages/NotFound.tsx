import { NavLink } from "react-router-dom";

const NotFound = () => {
  return (
    <>
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center gap-6 bg-[#415d43] text-white">
        <h1 className="text-6xl font-light tracking-widest animate-pulse">
          404
        </h1>

        <h2 className="text-xl tracking-widest font-light">
          THIS PAGE WALKED OFF THE RUNWAY
        </h2>

        <p className="text-gray-300 text-sm max-w-md">
          Looks like the page you're looking for doesn't exist. Let’s get you
          back to grocery items.
        </p>

        <div className="flex gap-4 mt-4">
          <NavLink
            to="/"
            className="border border-white px-8 py-2.5 tracking-wide
hover:bg-white hover:text-black hover:tracking-widest
transition-all duration-300
            "
          >
            GO HOME
          </NavLink>

          <NavLink
            to="/products"
            className="border border-white px-8 py-2.5 tracking-wide
hover:bg-white hover:text-black hover:tracking-widest
transition-all duration-300
           "
          >
            CONTINUE SHOPPING
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default NotFound;
