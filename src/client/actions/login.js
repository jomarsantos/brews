export const LOGIN = 'LOGIN';

export function login(fbUserId, fbAccessToken) {
  return function (dispatch) {
		// TODO: abstract endpoint out to config file
    return fetch('http://localhost:3000/api/login', {
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
				console.log(json);
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
