export const RECEIVE_CURRENT_BREWS = 'RECEIVE_CURRENT_BREWS';

export function receiveCurrentBrews(json) {
  return {
    type: RECEIVE_CURRENT_BREWS,
		status: 'received',
		brews: json,
    receivedAt: Date.now()
  };
}

export function fetchCurrentBrews() {
  return function (dispatch) {
		// TODO: abstract endpoint out to config file
    return fetch('http://localhost:3000/api/currentBrews')
      .then(
        response => response.json(),
        error => console.log('An error occured.', error)
      )
      .then(json =>
				// TODO: handle errors
        dispatch(receiveCurrentBrews(json))
      )
  }
}
