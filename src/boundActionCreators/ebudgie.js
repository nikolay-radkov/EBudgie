import { loadLinkCode } from '../actionCreators/ebudgie';
import config from '../config/config.prod';

export const getLinkCode = (ebudgie_id, email, phone) => async (dispatch) => {
  const response = await fetch(`${config.apiUrl}/api/users`, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify({
      email,
      phone,
      ebudgie_id
    })
  });

  const user = await response.json();

  dispatch(loadLinkCode(user.link_code));
};
