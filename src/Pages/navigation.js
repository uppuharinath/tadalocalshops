
import "../../src/custome.css";

const navItems = [
  { id: 5, name: "Clothing", path: "/clothing", hasIcon: true, submenu: ["Shirts", "Pants", "Accessories"] },
  { id: 6, name: "Kids", path: "/kids", hasIcon: false, submenu: ["Toys", "Clothing", "Books"] },
  { id: 7, name: "Child", path: "/child", hasIcon: false, submenu: ["Toys", "Games", "Books"] },
  { id: 8, name: "Watches", path: "/watches", hasIcon: false, submenu: ["Men's Watches", "Women's Watches", "Smartwatches"] }
];

const Navigation = () => {
  return (
    <ul className=" flex flex-row col-12-ld cyan text-ld jcsa aic "?>>>>
      {navItems.map((item) => (
        <li key={item.id} className="alkdfj ">
          <a href={item.path} className="">
            {item.name}
           
          </a>

          {/* Render submenu if it exists */}
          {item.submenu.length > 0 && (
            <ul className="submenu hidden">
              {item.submenu.map((subItem, index) => (
                <li key={index} className="">
                  <a href={`/${subItem.toLowerCase().replace(/\s+/g, '-')}`} className="">
                    {subItem}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </li>
      ))}
    </ul>
  );
};

export default Navigation;
