
export function Service1({ title, content, image }){
    return (
      
      <section className="py-3 py-md-5 bg-white mt-5">
      <div className="container-fluid">
        <div className="row gy-md-4 gy-lg-0 ">
        <div className="col-12 col-lg-6">
            <img className="rounded w-100" loading="lazy" src={image} alt=""/>
          </div>
          <div className="col-12 col-lg-6">
            <div className="row justify-content-xl-center">
              <div className="col-12 col-xl-10 align-items-lg-center">
                <h2 className="h1 mb-3 mt-3">{title}</h2>
                <p className="lead fs-4 mb-3 mb-xl-5">{content}</p>
                <button type="button" className="btn bsb-btn-2xl btn-outline-success rounded-pill btns text-white ">Know More</button>
              </div>
            </div>
          </div>
         
        </div>
      </div>
    </section>

      );
}


export function Service2({ title, content, image }){
  return (
      <section className="py-0 py-md-5 bg-white mt-5">
        <div className="container-fluid">
          <div className="row gy-md-4 gy-lg-0 ">
            
            <div className="col-12 col-lg-6">
              <div className="row justify-content-xl-center">
                <div className="col-12 col-xl-10 align-items-lg-center">
                  <h2 className="h1 mb-3 mt-3">{title}</h2>
                  <p className="lead fs-4 mb-3 mb-xl-5 ">{content}</p>
                  <button type="button" className="btn bsb-btn-2xl btn-outline-success rounded-pill btns text-white ">Know More</button>
                </div>
              </div>
            </div>
            <div className="col-12 col-lg-6">
              <img className="rounded w-100" loading="lazy" src={image} alt=""/>
            </div>
          </div>
        </div>
      </section>
    );
}


