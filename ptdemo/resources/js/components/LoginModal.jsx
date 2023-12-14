import { LoginForm } from './LoginForm';
import { LoginBanner } from './LoginBanner';
import Modal from 'react-bootstrap/Modal';

export const LoginModal = ({ setUser, user, isShow, setIsShow, errors }) => {
  return (
    <Modal
      onEscapeKeyDown={() => setIsShow(false)}
      keyboard={true}
      backdrop={true}
      onHide={() => setIsShow(false)}
      show={isShow}
      size={"xl"}
      dialogClassName={"modal-90w"}
      centered
    >
      <Modal.Header closeButon>
        <Modal.Title> </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="row">
          <div className="col p-4">
            <LoginForm user={user} setUser={setUser} errors={errors} />
          </div>
          <div className="d-none d-lg-block col">
            <LoginBanner />
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};
