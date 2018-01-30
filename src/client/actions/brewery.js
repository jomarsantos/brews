export const RECEIVE_BREWERY = 'RECEIVE_BREWERY';

export function fetchBrewery(breweryCode) {
  return function (dispatch) {
    return fetch('/api/brewery?code=' + breweryCode)
      .then(
        response => response.json(),
        error => console.log('An error occured.', error)
      )
      .then(json =>
				// TODO: handle errors
        dispatch(receiveBrewery(json))
      )
  }
}

export function receiveBrewery(brewery) {
  return {
    type: RECEIVE_BREWERY,
		status: 'received',
		details: brewery.details,
		brews: brewery.brews
  };
}
