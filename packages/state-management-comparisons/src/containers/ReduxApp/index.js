import React from 'react';
import { connect, Provider } from 'react-redux';
import { createSelector } from 'reselect';
import ContactList from '../../components/ContactList';
import sort from '../../lib/sort';
import { contactGenerator } from '../../lib/dataGenerators';


const contactSelector = createSelector(
  state => state.contacts,
  (contacts) => {
    console.time('reduxSort');
    const result = sort(contacts);
    console.timeEnd('reduxSort');
    return result;
  },
);

import {
  store,
  ADD_CONTACT,
  LOAD_CONTACTS,
  REMOVE_CONTACT,
  UPDATE_CONTACT
} from '../../stores/reduxStore';

const mapStateToProps = (state) => ({
  contacts: contactSelector(state),
});


const ContactListContainer = connect(
  mapStateToProps,
  (dispatch, {
    add,
    load,
    remove,
    update,
  }) => ({
    add: add || (() => dispatch({
      type: ADD_CONTACT,
      contact: contactGenerator.next().value[0],
    })),
    load: load || (() => dispatch({
      type: LOAD_CONTACTS,
      contacts: contactGenerator.next(1000).value,
    })),
    remove: remove || (contact => dispatch({
      type: REMOVE_CONTACT,
      contact,
    })),
    update: update || (contact => dispatch({
      type: UPDATE_CONTACT,
      contact,
    })),
  }),
)(ContactList);


export default function ReduxApp({
  add,
  load,
  remove,
  update,
  virtual
}) {
  return (
    <Provider store={store}>
      <ContactListContainer
        title="Redux"
        add={add}
        load={load}
        remove={remove}
        update={update}
        virtual={virtual}
      />
    </Provider>
  );
}
