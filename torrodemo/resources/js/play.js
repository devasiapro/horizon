import axios from 'axios';

window.addEventListener('beforeunload', async (ev) => {
  ev.preventDefault();
  const token = document.querySelector('#token').value;
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_APP_URL}/api/game-close`, {
      'request_token': token,
    });
  } catch (err) {
    // STUB: Can't do anything because browser is already closing at this point.
    // Just make sure this is logged in the backend.
  } finally {

  }
});
