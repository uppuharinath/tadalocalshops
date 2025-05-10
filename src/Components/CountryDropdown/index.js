import React, { useState, forwardRef } from 'react';
import { FaAngleDown,  } from "react-icons/fa";
import Dialog from '@mui/material/Dialog';
import { MdSavedSearch } from "react-icons/md";
import { IoCloseSharp } from "react-icons/io5";
import "../../../src/App.css";
import data from "../../json/states.json";
import Slide from '@mui/material/Slide';




const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});


console.log(data)


const CountryDropdown=()=>{

const [open,setOpen] = useState(false);
const [selectedTab,setSelectedTab] =   useState(null);
const [stateList,setStateList] =   useState(data);
const [searchTerm, setSearchTerm] = useState('');
const [selectedLocation, setSelectedLocation] = useState('');




const selectState = (idx) => {
  setSelectedTab(idx);
  setSelectedLocation(stateList[idx].state); // Set selected name
  setOpen(false); // Close the dialog
};


const filterList = (e) => {
  const keyword = e.target.value.toLowerCase();
  setSearchTerm(keyword);
  const filtered = data.filter((elem) => {
    return (
      elem.state.toLowerCase().includes(keyword) ||
      elem.discount.toLowerCase().includes(keyword) ||
      elem.discount.replace('%', '').toLowerCase().includes(keyword) // optional: match "15" if they type just a number
    );
  });
  setStateList(filtered);
};


return(
            <>
            
            <button className="btn w-100"  onClick={()=>setOpen(true)}>
                  <div className=" flex jcsb">
                              <div className=" blue info" >
                                  <div><span className="lable red">Your location</span></div>
                                  <div><span className="w-100 name uppercase jcfs">{selectedLocation || "Select Location"}   </span></div>
                              </div>
                            
                              <span className=" angle flex jcc aic"><FaAngleDown /></span>
                  
                  </div>
          </button>


          <Dialog open={open} onClose={()=>setOpen(false)} TransitionComponent={Transition} keepMounted className="locationModal">
            <h3>Choose Your Delivery Location</h3>
            <p className="para">Enter Your Address and we will specify offer for your location</p>
                
                  <button className="btn close" onClick={()=>setOpen(false)}><IoCloseSharp />
                  </button>
                          <div className=" flex jcc aic  search w-80">
                            <input 
                            type="text"
                            placeholder="Search by state or offer"
                            className="input"
                            value={searchTerm}
                            onChange={filterList}
                            />

                              <button className="icon-btn">
                                <MdSavedSearch/>
                              </button>
                          </div>
          <div className="container">
                <div className="row stateList flex jcc">

                <ul className="w-70 this">
                  {stateList.map((elem, idx) => (
                      <li key={idx}>
                        <button
                          className={`w-100 btn flex aic ${selectedTab === idx ? 'active' : ''}`}
                          onClick={() => selectState(idx)}
                        >
                          {elem.state}
                          <span className="offer ml-auto">{elem.discount}</span>
                        </button>
                      </li>
                  ))}
                </ul>

                </div>
              </div>
                      

          </Dialog>



          </>
)
}

export default CountryDropdown


