import { useState } from 'react';
import axios from 'axios';

export const LoginForm = ({ errors }) => {
  const [ username, setUsername ] = useState('');  
  const [ password, setPassword ] = useState('');
  const [ isLoading, setIsLoading ] = useState(false);

  const language = 'EN';
 
  const onSubmit = async (ev) => {
    ev.preventDefault();
    setIsLoading(true);
    try {
      window.iapiSetClientType('casino'); 
      window.iapiSetClientPlatform('web');
      window.iapiLogin(username, password, 1, language);
    } catch (err) {
      console.log('err', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-heading logo-color text-center">
      <img src="/images/horizon88-logo.svg" className="img-fluid" />
      <h6 className="mt-2 mb-3">
        We are glad to see you back with us
      </h6>

      <form onSubmit={(ev) => onSubmit(ev)} className="mt-5">
        { errors.general &&
          <div className="alert alert-danger">
            {errors.general}
          </div>
        }
        <div className="mb-3">
          <div className="input-group mb-3">
            <span className="input-group-text bg-white border-white text-dark">
              <i className="bi bi-person-circle"></i>
            </span>
            <input 
              value={username}
              onChange={(ev) => setUsername(ev.target.value)} 
              type="text" 
              className="form-control bg-white border-white text-dark placeholder-dark" 
              name="username"
              placeholder="Username" 
            />
          </div>
          <div className="input-group mb-3 b">
            <span className="input-group-text bg-white border-white text-dark">
              <i className="bi bi-lock"></i>
            </span>
            <input 
              value={password}
              onChange={(ev) => setPassword(ev.target.value)} 
              type="password" 
              name="password"
              className="form-control bg-white border-white text-dark placeholder-dark" 
              placeholder="Password" 
            />
          </div>
          { isLoading &&
            <div className="input-group mb-3 b">
              <button className="btn btn-light form-control fw-bold" type="button" disabled>
                <span 
                  className="spinner-border spinner-border-sm" 
                  role="status" 
                  aria-hidden="true"
                ></span>
                Loading...
              </button>
            </div>
          }
          { !isLoading &&
            <div className="input-group mb-3 b">
              <button 
                type="submit" 
                className="btn btn-light form-control fw-bold"
              >
                Login
              </button>
            </div>
          }
        </div>
      </form>

      <div className="container">
        <img src="/images/playtech-logo.png" className="img-fluid mt-4" />
      </div>
      <div className="container">
        <img src="/images/softmetrix.png" className="img-fluid mt-4" />
      </div>
    </div>
  );
};
