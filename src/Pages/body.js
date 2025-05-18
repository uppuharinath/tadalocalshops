import records from "../json/services.json";
import { useState } from "react";
import CardOut from "../../src/cardout";
import { FaHotel } from "react-icons/fa";
import { TbAirConditioning } from "react-icons/tb";
import { GiAutoRepair, GiNoodles } from "react-icons/gi";
import { PiBuildingApartmentDuotone } from "react-icons/pi";
import { SlBasket } from "react-icons/sl";
import Heading from "./heading";
import { useAuth } from "../contexts/auth";

const Body = ({ searchInput }) => {
  const { userLoggedIn, currentUser } = useAuth();
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [files, setFiles] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

   const handleCardOut = (record) => setSelectedRecord(record);
  const handleBack = () => setSelectedRecord(null);

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files).slice(0, 5);
    setFiles(selectedFiles);
  };

 const handleUpload = () => {
    if (files.length === 0) return;
    
      setIsUploading(true);
    setUploadProgress(0);
    
     // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          setFiles([]);
          return 100;
        }
          return prev + 10;
      });
    }, 200);
  };

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
    <div className="container main">
      <Heading />
      
      {/* Upload Section for logged-in users */}
      {userLoggedIn && (
        <div className="upload-section container b-1px black">
          <h3>Upload Your Business Photos</h3>
          <p>Showcase your business with up to 5 photos</p>
          
          <div className="upload-area black">
            <input 
              type="file" 
              id="business-photos"
              accept="image/*" 
              multiple 
              onChange={handleFileChange}
              disabled={isUploading}
              style={{ display: 'none' }}
            />
            
            <label htmlFor="business-photos" className="upload-label">
              {files.length > 0 ? (
                <div className="file-list ">
                  <p>Selected {files.length} file(s):</p>
                  <ul className="black">
                    {files.map((file, index) => (
                      <li key={index}>
                        <span className="file-name">{file.name}</span>
                        <span className="file-size">
                          {(file.size / 1024).toFixed(1)} KB
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <div className="upload-prompt">
                  <svg className="upload-icon" viewBox="0 0 24 24">
                    <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
                  </svg>
                  <p>Click to select photos or drag and drop</p>
                </div>
              )}
            </label>
            
            {files.length > 0 && (
              <div className="upload-controls">
                <button 
                  onClick={handleUpload}
                  disabled={isUploading}
                  className="upload-button"
                >
                  {isUploading ? 'Uploading...' : 'Upload Photos'}
                </button>
                {!isUploading && (
                  <button 
                    onClick={() => setFiles([])}
                    className="cancel-button"
                  >
                    Clear Selection
                  </button>
                )}
              </div>
            )}
            
            {isUploading && (
              <div className="progress-container">
                <div className="progress-bar" style={{ width: `${uploadProgress}%` }}></div>
                <span className="progress-text">{uploadProgress}%</span>
              </div>
            )}
          </div>
        </div>
      )}

      {selectedRecord ? (
        <CardOut record={selectedRecord} onBack={handleBack} />
      ) : (
        <div className="category-container">
          {uniqueCategories.map((category) => (
            <div key={category} className="category-block">
              <h2 className="bg-blue">{category}s 
                &nbsp; <span className="text-black">({filteredRecords.filter((record) => record.category === category).length}) </span>
              </h2>
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