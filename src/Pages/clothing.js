const Clothing = ()=>{

  const items = [
    { img: "https://images.pexels.com/photos/1502216/pexels-photo-1502216.jpeg" },
    { img: "https://images.pexels.com/photos/914668/pexels-photo-914668.jpeg" },
    { img: "https://images.pexels.com/photos/3772506/pexels-photo-3772506.jpeg" },
    { img: "https://images.pexels.com/photos/794062/pexels-photo-794062.jpeg" },
    { img: "https://images.pexels.com/photos/1642228/pexels-photo-1642228.jpeg" },
  ];


return (
  <>
  <div className="container clothing">
    <div className="row this">
     
        <div className="col-8-ld">
        <div className="grid2 gap1">
      {items.map((item, index) => (
        <div key={index}>
          <img
            src={item.img}
            className="fluid"
            id={`item${index}`}
            alt={`item-${index}`}
           />
        </div>
      ))}
    </div>
        </div>

        <div className="col-4-ld">
          <h1 className="text-center">Clothing</h1>
          <p className="p flex jcc aic gray">jdfha df lafl ldjflk jldfjljal fjldaf jlfdkaljad lkfjd</p>
       </div>
      </div>
 
  </div>

  <div className="container clothing">
    <div className="row this">
     
        <div className="col-8-ld">
        <div className="grid2 gap1">
      {items.map((item, index) => (
        <div key={index}>
          <img
            src={item.img}
            className="fluid"
            id={`item${index}`}
            alt={`item-${index}`}
           />
        </div>
      ))}
    </div>
        </div>

        <div className="col-4-ld">
          <h1 className="text-center">Clothing</h1>
          <p className="p flex jcc aic gray">jdfha df lafl ldjflk jldfjljal fjldaf jlfdkaljad lkfjd</p>
         </div>
      </div>
 
  </div>
  </>
  );
}

export default Clothing