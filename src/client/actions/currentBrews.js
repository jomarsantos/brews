export const RECEIVE_CURRENT_BREWS = 'RECEIVE_CURRENT_BREWS';
export const UPDATE_FILTERED_BREWS = 'UPDATE_FILTERED_BREWS';
export const CLEAR_FILTERED_BREWS = 'CLEAR_FILTERED_BREWS';

export function fetchCurrentBrews() {
  return function (dispatch) {
    return fetch('/api/currentBrews')
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

export function receiveCurrentBrews(brews) {
  return {
    type: RECEIVE_CURRENT_BREWS,
		status: 'received',
		brews: brews,
    receivedAt: Date.now()
  };
}

export function filterCurrentBrews(breweryInput, brewInput) {
  return (dispatch, getState) => {
    const state = getState();

		// Make a deep copy of the current brews from state
		var filteredBrews = JSON.parse(JSON.stringify(state.currentBrews.brews));

		if (breweryInput) {
			filteredBrews = filteredBrews.filter(brewery => {
				return brewery.name.toLowerCase().indexOf(breweryInput) !== -1;
			})
		}

		if (brewInput) {
			filteredBrews.forEach((brewery, index) => {
				let filteredBrewsOfBrewery = brewery.currentTapLineup.brews.filter(brew => {
					return brew.name.toLowerCase().indexOf(brewInput) !== -1
						|| brew.subtitle.toLowerCase().indexOf(brewInput) !== -1;
				})
				filteredBrews[index].currentTapLineup.brews = filteredBrewsOfBrewery;
			})

			filteredBrews = filteredBrews.filter(brewery => {
				return brewery.currentTapLineup.brews.length !== 0;
			})
		}

		// No results, return error
		if (filteredBrews.length === 0) {
			filteredBrews = -1;
		}

		dispatch(updateFilteredBrews(filteredBrews));
  };
}

export function updateFilteredBrews(filteredBrews) {
  return {
    type: UPDATE_FILTERED_BREWS,
		filteredBrews: filteredBrews,
  };
}

export function clearFilteredBrews() {
	return {
		type: CLEAR_FILTERED_BREWS,
		filteredBrews: [],
	};
}
