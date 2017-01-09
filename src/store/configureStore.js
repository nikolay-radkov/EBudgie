// import { createStore } from 'redux';



// function todoStore(state = defaultState, action) {
//   switch (action.type) {
//     case 'ADD_TODO':
//       const allTodos = state.allTodos.concat([{
//         task: action.task,
//         state: 'pending'
//       }]);
//       return Object.assign({}, state, {
//         allTodos,
//         todos: allTodos.filter(todo => todo.state === state.filter)
//       });
//     case 'DONE_TODO':
//       const doneTodo =  Object.assign({}, action.todo,{
//         state: 'done'
//       });

//       const updatedAllTodos = state.allTodos.map(todo => {
//         return todo === action.todo ? doneTodo : todo;
//       });

//       return Object.assign({}, state, {
//         allTodos: updatedAllTodos,
//         todos: updatedAllTodos.filter(todo => todo.state === state.filter)
//       });
//     case 'TOGGLE_STATE':
//       const filter = state.filter === 'pending' ? 'done' : 'pending';
//       return Object.assign({}, state, {
//         filter,
//         todos: state.allTodos.filter(todo => todo.state === filter)
//       });
//     default:
//       return state;
//   }
// }
// const store = createStore(todoStore);

// export default store;


import { createStore } from 'redux';
import rootReducer from '../reducers';

export default function configureStore(initialState) {
 const store = createStore(rootReducer, initialState);

  if (module.hot) {
    module.hot.accept(() => {
      const nextRootReducer = require('../reducers/index').default;
      store.replaceReducer(nextRootReducer);
    });
  }
  return store;
};
