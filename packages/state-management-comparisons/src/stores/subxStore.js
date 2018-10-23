import SubX from 'subx';
import sort from '../lib/sort';

export default new SubX({
  contacts: [],
  get sortedContacts() {
    return sort(this.contacts);
  },
  loadContacts(contacts) {
    this.contacts = contacts;
  },
  addContact(contact) {
    if (contact) {
      this.contacts.push(contact);
    }
  },
  removeContact(contact) {
    if (contact) {
      const index = findIndex(
        item => item.id === contact.id,
        this.contacts,
      );
      if (index > -1) {
        this.contacts.splice(index, 1);
      }
    }
  },
  updateContact(contact) {
    if (contact) {
      const index = findIndex(
        item => item.id === contact.id,
        this.contacts,
      );
      if (index > -1) {
        for (const key in contact) {
          if (key !== 'id' && contact[key] !== undefined) {
            this.contacts[index][key] = contact[key];
          }
        }
      }
    }
  }
});
