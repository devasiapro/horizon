import React from 'react';

export const NavBar = ({ setIsShowModal, isLogin }) => {
  return (
    <React.Fragment>
      <nav className="py-4 navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            <img 
              src="/images/horizon88-logo.svg" 
              width="100%"
              height="45px"
              className="d-block w-100 align-top" 
              alt=""
            />
          </a>
          <form className="d-flex">
            { !isLogin &&
              <button 
                type="button" 
                onClick={() =>setIsShowModal(true)}
                className="btn btn-lg fst-italic"
              >
                LOG IN
              </button>
            }
            { isLogin &&
              <button 
                type="button" 
                className="btn btn-lg fst-italic"
                onClick={() => {}}
              >
                LOG OUT
              </button>
            }
          </form>
        </div>
      </nav>
    </React.Fragment>
  );
};
