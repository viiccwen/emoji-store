import { NavLink } from "react-router-dom";

const links = [
  {
    name: "首頁",
    logo: "🏠",
    href: "/",
  },
  {
    name: "關於",
    logo: "🎉",
    href: "/about",
  },
  {
    name: "發送",
    logo: "🚀",
    href: "/launch",
  },
  {
    name: "購買",
    logo: "🛒",
    href: "/purchase",
  },
];

export const NavBar = () => {
  return (
    <nav className="flex justify-center items-center py-4">
      <div className="flex gap-4">
        {links.map((link) => (
          <NavLink
            className="hover:underline font-bold flex gap-1"
            to={link.href}
          >
            {link.name} {link.logo}
          </NavLink>
        ))}
      </div>
    </nav>
  );
};
