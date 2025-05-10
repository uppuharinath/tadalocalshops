import "../../src/App.css";
import HomeBanner from "../Components/HomeBanner";


const ImageSlider = ()=>{

  var settings = {
    dots: false,
    arrows:false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
  };

  return(
    <>
    <h1 className="text-center cyan">OUR TRENDING SERVICES</h1>
    <div className="container">
      <div className="row relative box-shadow1">
          <div className=" col-3-ld flex flex-column aic services jcc"> 
            <h1 className="text-center  font-rale text-gray brown">ALBUMs</h1> 
            <h1 className="text-center  font-rale text-gray purple">BIRTHDAYS</h1> 
            <h1 className="text-center  font-rale text-gray green">FUNCTIONS</h1> 
            <h1 className="text-center  font-rale text-gray pink">CEREMONIES</h1> 
            
          </div>
          <div className=" col-9-ld">  <HomeBanner></HomeBanner> </div>
      </div>
    </div>
    <h1 className="text-center red"></h1>

    </>
  )
}

export default ImageSlider