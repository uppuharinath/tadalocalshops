import records from "../json/services.json";
import { useState } from "react";
import CardOut from "../../src/cardout";
import { FaHotel } from "react-icons/fa";
import { TbAirConditioning } from "react-icons/tb";
import { GiAutoRepair, GiNoodles } from "react-icons/gi";
import { PiBuildingApartmentDuotone } from "react-icons/pi";
import { SlBasket } from "react-icons/sl";
import Heading from "./heading";

const Body = ({ searchInput }) => {
  const [selectedRecord, setSelectedRecord] = useState(null);

  const handleCardOut = (record) => setSelectedRecord(record);
  const handleBack = () => setSelectedRecord(null);

  const highlightSearchTerm = (text, term) => {
    if (!term) return text;
    const regex = new RegExp(`(${term})`, "gi");
    return text.split(regex).map((part, index) =>
      part.toLowerCase() === term.toLowerCase() ? (
        <span key={index} style={{ backgroundColor: "skyblue" }}>{part}</span>
      ) : (
        part
      )
    );
  };

  const filteredRecords = records.filter((record) =>
    searchInput?.trim()
      ? [record.name, record.type, record.description]
          .some(field => field.toLowerCase().includes(searchInput.toLowerCase()))
      : true
  );

  const iconMap = {
    FaHotel: <FaHotel />,
    TbAirConditioning: <TbAirConditioning />,
    PiBuildingApartmentDuotone: <PiBuildingApartmentDuotone />,
    GiAutoRepair: <GiAutoRepair />,
    SlBasket: <SlBasket />,
    GiNoodles: <GiNoodles />,
  };

  const uniqueCategories = [...new Set(records.map((r) => r.category))];

  return (
    <div className=" container main">
      
      
      <Heading />
      {selectedRecord ? (
        <CardOut record={selectedRecord} onBack={handleBack} />
                        ) 
                        : 
      
                      (
        <div className="category-container">
          {uniqueCategories.map((category) => (
            <div key={category} className="category-block">
              <h2 className="bg-blue">{category}s 
               &nbsp; <span className="text-black">({filteredRecords.filter((record) => record.category === category).length}) </span></h2>
              <div className="row jcsa asasas allcards">
                {filteredRecords
                  .filter((record) => record.category === category)
                  .map((record) => (
                    <div
                      key={record.id}
                      className="col-3-ld col-12-md col-12-sd mb-1r relative cards flex jcc box-shadow1 mt-1r"
                    >
                      <div className="icon flex jcc aic pink white">
                        <div className="items flex flex-column jcsa white p-0">
                          <div className="text-center w-100">
                            <span className="white">
                              {highlightSearchTerm(record.type, searchInput)}
                            </span>
                          </div>
                          <div className="text-center item w-100">
                            <div>{iconMap[record.icon] || null}</div>
                            <span className="gold">{record.rating}</span>
                          </div>
                        </div>
                      </div>

                      <div className="content w-100 text-center font-mont">
                        <h1 className="black text-md blue">
                          {highlightSearchTerm(record.name, searchInput)}
                        </h1>

                        <div className="container phoneandaddress">
                          <div className="row">
                            <div className="col-12-ld flex jcc jcsa location black font-sofia">
                              {record.location && (
                                <div className="col-3-ld">
                                  <a href={record.location} target="_blank" rel="noopener noreferrer">
                                    Locate
                                  </a>
                                </div>
                              )}
                              {record.website && record.website !== "NA" && (
                                <div className="col-3-ld">
                                  <a href={record.website} target="_blank" rel="noopener noreferrer">
                                    Website
                                  </a>
                                </div>
                              )}
                              {record.phone && <div className="col-3-ld">{record.phone}</div>}
                            </div>
                          </div>

                          <div className="address col-12-ld black">
                            <span className="red strong">Towards </span>: {record.address}
                            {record.towards && <> ( {record.towards} )</>}
                          </div>
                        </div>

                        <div className="container desc flex jcc aic">
                          <div className="row jcc black">
                            {record.description && (
                              <div className="description col-11-ld">
                                {highlightSearchTerm(record.description, searchInput)}
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="container more relative overflow-hidden">
                          <div className="row jcc black">
                            <div className="col-6-ld">
                              <button className="btn" onClick={() => handleCardOut(record)}>
                                More Info !
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Body;
