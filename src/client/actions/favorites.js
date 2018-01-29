export const UPDATE_USER_FAVORITES = 'UPDATE_USER_FAVORITES';
export const RECEIVE_USER_FAVORITES = 'RECEIVE_USER_FAVORITES';

export function toggleFavorite(user, brewId) {
  return function (dispatch) {
		// TODO: abstract endpoint out to config file
    return fetch('/api/user/favorites', {
        method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
          userId: user.id,
          brewId: brewId
        })
      })
      .then(
        response => response.json(),
        error => console.log('An error occured.', error)
      )
      .then(json => {
				// TODO: handle errors and initialize session / deactivate login button
				dispatch(updateUserFavorites(json.favorites));
				}
      )
  }
}

export function updateUserFavorites(favorites) {
  return {
    type: UPDATE_USER_FAVORITES,
		favorites: favorites
  };
}

export function fetchUserFavorites(user) {
	return function (dispatch) {
    return fetch('/api/user/favorites?userId=' + user.id)
      .then(
        response => response.json(),
        error => console.log('An error occured.', error)
      )
      .then(json =>
				// TODO: handle errors
        dispatch(receiveUserFavorites(json))
      )
  }
}

export function receiveUserFavorites(favorites) {
  return {
    type: RECEIVE_USER_FAVORITES,
		status: 'received',
		favorites: favorites.favorites
  };
}
