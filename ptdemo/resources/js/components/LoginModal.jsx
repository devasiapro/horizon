import { LoginForm } from './LoginForm';
import { LoginBanner } from './LoginBanner';
import Modal from 'react-bootstrap/Modal';

export const LoginModal = ({ show, errors }) => {
  return (
    <Modal
      keyboard={true}
      backdrop={true}
      show={show}
      size={"xl"}
      centered
    >
      <Modal.Body>
        <div className="row">
          <div className="col p-4">
            <LoginForm errors={errors} />
          </div>
          <div className="col">
            <LoginBanner />
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};
