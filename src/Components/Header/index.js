import Navbar from "../../Pages/navbar";
import Navigation from "../../Pages/navigation";
import CountryDropdown from "../CountryDropdown";
import { MdSavedSearch } from "react-icons/md";
import { CiUser } from "react-icons/ci";
import { BsCart4 } from "react-icons/bs";
import { FcMenu } from "react-icons/fc";
import { FaAngleDown } from "react-icons/fa";
import Navsidebar from "../../Pages/navsidebar";
// import Body from "../../Pages/body";
import { useState } from 'react';



const Header= ({ searchInput, setSearchInput })=>{
  

  const handleInputChange = (e) => {
    setSearchInput(e.target.value);  // Update the search input on change
    console.log('Search term:', e.target.value);
  };
  
  const handleSearch = () => {
    console.log('Search term HANDLING:', searchInput);
    // Apply your search logic here
  };

  return(
    <div className="this1 header-wrapper">
        <div className="header">

        <p className="text-center branding  flex flex-column black jcsa jcc aic">
          
        <div><strong>TADA :</strong> List your business card for ₹ 100/-</div>
        <div className="">Contact : 9032163736</div>
        </p>
      
      </div>
      <div className="container ">
          <div className="row flex jcc box-shadow1">

          <div className="cyan col-6  ">
                <Navbar></Navbar>
              </div>

              <div className="flex jcc aic  col-6 search">
                <input 
                  type="text" 
                  placeholder="Search..." 
                  className="input "
                  value={searchInput}  // Controlled input
                  onChange={handleInputChange}
                  onKeyUp={(e) => e.key === 'Enter' && handleSearch()}  // Trigger search on Enter key press
                />



                
                <button className="icon-btn" onClick={handleSearch}>  {/* Trigger search on button click */}
                  <MdSavedSearch />
                </button>
                
              
              </div>

              {/* <div className="flex jcc aic logo box-shadow1 cyan">TADA - LOCAL SERVICES PORTAL
              </div> */}
              {/* <div className="col-2-ld col-12-md col-6-sm flex jcc aic ">
              <CountryDropdown/>
              </div> */}
              
            
              

              
           
              {/* <div className="col-1-ld col-12-md col-6-sm flex jcc aic user">
              <CiUser />
              </div> */}
              {/* <div className="col-1-ld col-12-md col-6-sm flex jcc aic price text-md">
                  $ 540
              </div> */}
              {/* <div className="col-1-ld col-12-md flex jcc aic cart text-md cart">
                <BsCart4 />
                <div className="count text-sm count">5</div>
              </div> */}
              
          </div>
      </div>
      <Navsidebar></Navsidebar>

      {/* <div className="container ">
        <div className="row  ">
            <div className="categories col-2-ld flex jcc aic">

                <button className="btn flex aic jcsb w-100  bg-skyblue sofia this">
                <FcMenu />
                  All categories
                  <FaAngleDown />
                </button>
            </div>
            <div className="col-10-ld  navigation col-12-md  flex jcc aic col-6-sm  navbar">
                <Navigation></Navigation>
                
              </div>
            <div className=""></div>
        </div>
      </div> */}
{/* 
      <hr/> */}

    </div>
  )
}
export default Header;


