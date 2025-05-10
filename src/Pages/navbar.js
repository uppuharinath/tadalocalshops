import { FaAngleDown } from "react-icons/fa";


const Navbar = () => {
  const navItems = [
    { id: 1, name: "Home", path: "/", hasIcon: true },
    // { id: 2, name: "Shop", path: "/shop", hasIcon: true },
    // { id: 3, name: "About", path: "/about", hasIcon: false },
    // { id: 4, name: "Contact", path: "/contact", hasIcon: false }
  ];

  return (
    <div className="container ">
          <div className="row">
          <ul className="flex  col-6">
            {navItems.map((item) => (
              <li key={item.id} className="flex items-center">
                <a href={item.path} className="flex  jcc aic items-center  font-mont white">
                  {item.name}
                  {item.hasIcon && <FaAngleDown className="white" />}
                </a>
              </li>
            ))}
           
           </ul>


          </div>
    </div>
  );
};

export default Navbar;