import Navbar from "../../Pages/navbar";
import { MdSavedSearch } from "react-icons/md";
import Navsidebar from "../../Pages/navsidebar";
import LoginHome from "../../loginhome";
// import Navigation from "../../Pages/navigation";
// import CountryDropdown from "../CountryDropdown";
// import { CiUser } from "react-icons/ci";
// import { BsCart4 } from "react-icons/bs";
// import { FcMenu } from "react-icons/fc";
// import { FaAngleDown } from "react-icons/fa";
// import Body from "../../Pages/body";
// import { useState } from 'react';

const Header = ({ searchInput, setSearchInput }) => {
  const handleInputChange = (e) => {
    setSearchInput(e.target.value);
    console.log("Search term:", e.target.value);
  };

  const handleSearch = () => {
    console.log("Search term HANDLING:", searchInput);
    // Apply your search logic here
  };

  return (
    <div className="header-wrapper">
      <div className="container header">
        <div className="text-center branding flex flex-column black jcsa jcc aic">
          <div>
            <strong>TADA :</strong> List your business card for ₹ 100/-
          </div>
          <div>Contact : 9032163736</div>
          <div>
            <LoginHome />
          </div>
        </div>
      </div>


      <div className="container">
        <div className="row flex jcc box-shadow1">
          <div className="col-4">
            <Navbar />
          </div>

          <div className="flex jcc aic col-6 search">
            <input
              type="text"
              placeholder="Search..."
              className="input"
              value={searchInput}
              onChange={handleInputChange}
              onKeyUp={(e) => e.key === "Enter" && handleSearch()}
            />
            <button className="icon-btn" onClick={handleSearch}>
              <MdSavedSearch />
            </button>
          </div>
        </div>
      </div>
      <Navsidebar />

      {/* Future layout code can be uncommented and used here */}
    </div>
  );
};
export default Header;


