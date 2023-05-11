import { ADD_TODO, TOGGLE_TODO, REMOVE_TODO } from "./actions";

const initialState = {
  incomplete: [],
  complete: [],
};

export default function todosReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_TODO:
      return {
        ...state,
        incomplete: [...state.incomplete, action.payload],
      };
    case TOGGLE_TODO: {
      const { id } = action.payload;
      const taskIndex = state.incomplete.findIndex((task) => task.id === id);
      if (taskIndex >= 0) {
        const task = state.incomplete[taskIndex];
        return {
          ...state,
          incomplete: [
            ...state.incomplete.slice(0, taskIndex),
            ...state.incomplete.slice(taskIndex + 1),
          ],
          complete: [...state.complete, task],
        };
      } else {
        const taskIndex = state.complete.findIndex((task) => task.id === id);
        const task = state.complete[taskIndex];
        return {
          ...state,
          complete: [
            ...state.complete.slice(0, taskIndex),
            ...state.complete.slice(taskIndex + 1),
          ],
          incomplete: [...state.incomplete, task],
        };
      }
    }
    case REMOVE_TODO: {
      const { id } = action.payload;
      const taskIndex = state.incomplete.findIndex((task) => task.id === id);
      if (taskIndex >= 0) {
        return {
          ...state,
          incomplete: [
            ...state.incomplete.slice(0, taskIndex),
            ...state.incomplete.slice(taskIndex + 1),
          ],
          complete: [...state.complete],
        };
      } else {
        const taskIndex = state.complete.findIndex((task) => task.id === id);
        return {
          ...state,
          complete: [
            ...state.complete.slice(0, taskIndex),
            ...state.complete.slice(taskIndex + 1),
          ],
          incomplete: [...state.incomplete],
        };
      }
    }
    default:
      return state;
  }
}
