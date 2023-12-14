export const Carousel = () => {
  return (
    <div  className="carousel slide" data-bs-ride="carousel">
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img src="/images/banner-01.png" className="d-block w-100" alt="..." />
        </div>
        <div className="carousel-item">
          <img src="/images/banner-02.png" className="d-block w-100" alt="..." />
        </div>
        <div className="carousel-item">
          <img src="/images/banner-03.png" className="d-block w-100" alt="..." />
        </div>
        <div className="carousel-item">
          <img src="/images/banner-04.png" className="d-block w-100" alt="..." />
        </div>
        <div className="carousel-item">
          <img src="/images/banner-05.png" className="d-block w-100" alt="..." />
        </div>
        <div className="carousel-item">
          <img src="/images/banner-06.png" className="d-block w-100" alt="..." />
        </div>
      </div>
    </div>  
  );
};
