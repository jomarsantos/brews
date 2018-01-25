export const UPDATE_USER_FAVORITES = 'UPDATE_USER_FAVORITES';

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
