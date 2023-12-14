export const Footer = () => {
  const links = [
    'Games', 'Promotions', 'Banking', 'Support', 'Terms and Conditions', 'Privacy Policy'
  ];

  return (
    <div className="container-xxl pt-5 mt-5 mb-5 pb-5">
      <div className="row">
        <div className="col text-start">
          <img className="img-fluid" src="/images/playtech_logo_footer.png" /> 
        </div>
        <div className="col text-end">
          <img className="img-fluid" src="/images/softmetrix_logo_white.svg" />
        </div>
      </div>
      <div className="text-center pt-5 mt-5">
        {
          links.map(link => {
            return (
              <span className="fs-3">
                <a className="text-white text-decoration-none" href="#">{link}</a> |&nbsp;
              </span>
            )
          })
        }
      </div>
      <div className="text-center white-text fs-3 mt-3">
        Contact us: support@asiapro.io
      </div>
      <div className="text-center mt-5 mb-5 d-sm-block d-lg-none">
        <img className="img-fluid" width="40%" src="/images/horizon_logo_footer.png" />
      </div>
      <div className="text-center white-text fs-3 mt-3">
        &copy; {new Date().getFullYear()} All rights reserved. horizon88.com
      </div>
    </div>
  );
};
