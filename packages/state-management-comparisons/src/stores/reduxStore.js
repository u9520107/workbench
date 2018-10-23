import { combineReducers, createStore } from 'redux';
import { append, update, findIndex, remove } from 'ramda';

// actions
export const LOAD_CONTACTS = 'LOAD_CONTACTS';
export const ADD_CONTACT = 'ADD_CONTACT';
export const UPDATE_CONTACT = 'UPDATE_CONTACT';
export const REMOVE_CONTACT = 'REMOVE_CONTACT';

// reducers
export function contactsReducer(state = [], {
  type,
  contacts = [],
  contact,
}) {
  switch(type) {
    case LOAD_CONTACTS:
      return contacts.slice();
    case ADD_CONTACT:
      if (contact) {
        return append(contact, state);
      }
      return state;
    case UPDATE_CONTACT:
      if(contact) {
        const index = findIndex(
          item => item.id === contact.id,
          state,
        );
        if (index > -1) {
          return update(index, {
            ...state[index],
            ...contact,
          }, state);
        }
      }
      return state;
    case REMOVE_CONTACT:
      if (contact) {
        const index = findIndex(
          item => item.id === contact.id,
          state,
        );
        if (index > -1) {
          return remove(index, 1, state);
        }
      }
      return state;
    default:
      return state;
  }
}

export const store =  createStore(combineReducers({
  contacts: contactsReducer,
}));

