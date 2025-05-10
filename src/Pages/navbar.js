import { FaAngleDown } from "react-icons/fa";

const Navbar = () => {
  const navItems = [
    { id: 1, name: "Home", path: "/", hasIcon: true },
    // { id: 2, name: "Shop", path: "/shop", hasIcon: true },
    // { id: 3, name: "About", path: "/about", hasIcon: false },
    // { id: 4, name: "Contact", path: "/contact", hasIcon: false }
  ];

  return (
    <ul className="flex">
      {navItems.map((item) => (
        <li key={item.id} className="flex items-center">
          <a href={item.path} className="flex cyan items-center">
            {item.name}
            {item.hasIcon && <FaAngleDown className="black" />}
          </a>
        </li>
      ))}
    </ul>
  );
};

export default Navbar;