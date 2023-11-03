import axios from 'axios';

window.addEventListener('beforeunload', async (ev) => {
  const token = document.querySelector('#token').value;
  try {
    axios.post(
      `https://call-the-closeapi.com/api/game-close`, {
      'request_token': token,
    });
  } catch (err) {
    // STUB: Can't do anything because browser is already closing at this point.
    // Just make sure this is logged in the backend.
  } finally {

  }
  // STUB: remove popup if it is not needed to ensure that axios post makes the call.
  // ev.preventDefault();
  // ev.returnValue = '';
});
