import { Link, NavLink } from "react-router";
import { TiTick } from "react-icons/ti";
import Button from "../ui/Button";
import { useContract } from "../../context/ContractContext";
import AddressTag from "../ui/AddressTag";

const Navbar = () => {
  const menu = [
    { title: "Home", link: "/" },
    { title: "Register", link: "/register" },
    { title: "Vote", link: "/vote" },
    { title: "How to vote", link: "/how-to-vote" },
  ];

  const { connectWallet, loading, account } = useContract();
  return (
    <nav className="bg-white dark:bg-gray-900 sticky w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link to="/" className="flex items-center rtl:space-x-reverse">
          <TiTick className="size-10 text-blue-700" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            Electra
          </span>
        </Link>
        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          {account ? (
            <AddressTag />
          ) : (
            <Button
              content="Connect Wallet"
              eventName={connectWallet}
              loading={loading}
            />
          )}
          <button
            data-collapse-toggle="navbar-sticky"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-sticky"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>
        <div
          className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
          id="navbar-sticky"
        >
          <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            {menu.map((nav, index) => (
              <li key={index}>
                <NavLink
                  to={nav.link}
                  className={({ isActive }: { isActive: boolean }) =>
                    `${
                      isActive ? " text-blue-700" : "text-gray-900"
                    } block py-2 px-3 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700`
                  }
                >
                  {nav.title}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
