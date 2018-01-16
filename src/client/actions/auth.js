export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

export function login(fbUserId, fbAccessToken) {
  return function (dispatch) {
		// TODO: abstract endpoint out to config file
    return fetch('/api/login', {
        method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
          fbUserId: fbUserId,
          fbAccessToken: fbAccessToken
        })
      })
      .then(
        response => response.json(),
        error => console.log('An error occured.', error)
      )
      .then(json => {
				// TODO: handle errors and initialize session / deactivate login button
        dispatch(loggedIn(json.user))
				}
      )
  }
}

export function loggedIn(user) {
  return {
    type: LOGIN,
		user: user
  };
}

export function logout() {
	return (dispatch, getState) => {
		dispatch({
			type: LOGOUT,
			user: {}
		});
	}
}
