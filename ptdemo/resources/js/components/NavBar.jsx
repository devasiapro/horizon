import React from 'react';
import Cookies from 'js-cookie';

export const NavBar = ({ setIsShowModal, setIsLogin, setUser, isLogin }) => {
  const logout = () => {
    setUser({
      username: '',
      password: ''
    });
    setIsLogin(false);
    Cookies.remove('password');
    window.iapiLogout(1, 1);
  };

  return (
    <React.Fragment>
      <nav className="py-2 navbar navbar-expand-lg bg-body-tertiary">
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
                onClick={() => logout()}
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
