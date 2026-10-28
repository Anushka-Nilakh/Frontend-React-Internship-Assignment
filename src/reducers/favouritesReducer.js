/**
 * Action Types
 */
export const FAVOURITES_ACTIONS = {
  TOGGLE_FAVOURITE: 'TOGGLE_FAVOURITE',
};

/**
 * Favourites Reducer
 * 
 * Why useReducer instead of useState here?
 * 1. Separation of Concerns: The business logic for toggling a favourite (checking existence,
 *    adding/removing elements immutably) is extracted from the UI component into a pure function.
 * 2. Predictability & Testability: A reducer is a pure function with no side effects, making it
 *    easy to test independently with predictable inputs and outputs.
 * 3. Scalability: As the application grows, adding complex actions (such as 'CLEAR_ALL',
 *    'SELECT_MULTIPLE', or 'REORDER') can be done centrally without touching component logic.
 * 4. Declarative State Updates: Components dispatch an action expressing "what happened"
 *    rather than imperatively calculating "how state should change".
 * 
 * Handled Actions:
 * - 'TOGGLE_FAVOURITE' (payload: photoId): Adds photoId if absent, removes it if present.
 * - Unknown actions: Returns current state unchanged.
 * 
 * @param {Array<string|number>} state - Array of favourite photo IDs.
 * @param {{ type: string, payload: string|number }} action - Dispatched action.
 * @returns {Array<string|number>} - New state array.
 */
export function favouritesReducer(state, action) {
  switch (action.type) {
    case FAVOURITES_ACTIONS.TOGGLE_FAVOURITE: {
      const photoId = action.payload;
      const isAlreadyFavourite = state.includes(photoId);

      if (isAlreadyFavourite) {
        return state.filter((id) => id !== photoId);
      } else {
        return [...state, photoId];
      }
    }

    default:
      return state;
  }
}

export default favouritesReducer;
