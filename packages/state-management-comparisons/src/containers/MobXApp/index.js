import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { contactGenerator } from '../../lib/dataGenerators';
import store from '../../stores/mobxStore';
import ContactList from '../../components/ContactList';

@observer
class ContactListContainer extends Component {
  render() {
    const { store, add, remove, update, load } = this.props;
    return (
      <ContactList
        title="MobX"
        contacts={store.sortedContacts}
        add={add}
        remove={remove}
        update={update}
        load={load}
      />
    );
  }
}

export default function MobXApp({
  add = () => store.addContact(contactGenerator.next().value[0]),
  load = () => store.loadContacts(contactGenerator.next(1000).value),
  remove = contact => store.removeContact(contact),
  update = contact => store.updateContact(contact),
}) {
  return (
    <ContactListContainer
      store={store}
      add={add}
      load={load}
      remove={remove}
      update={update}
    />
  );
}
