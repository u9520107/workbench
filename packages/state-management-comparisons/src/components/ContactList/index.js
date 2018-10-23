import React, { Component, PureComponent } from 'react';
import styles from './styles.css';

class ContactItem extends PureComponent {
  render() {
    const {
      contact: {
        id,
        lastName,
        firstName,
        phoneNumber,
        country,
        company,
      },
      remove,
      // update,
    } = this.props;
    return (
      <div className={styles.item}>
        <div>ID: {id}</div>
        <div>Name: {`${firstName} ${lastName}`}</div>
        <div>Phone Number: {phoneNumber}</div>
        <div>Copmpany: {company}</div>
        <div>Country: {country}</div>
        <button onClick={() => remove({ id })}>Remove Contact</button>
      </div>
    );
  }
}

export default function ContactList({
  title = '',
  contacts = [],
  add,
  remove,
  // update,
  load,
}) {
  const content = contacts.length ?
    (contacts.map(item => (
      <ContactItem
        key={item.id}
        contact={item}
        remove={remove}
      // update={update}
      />
    ))) :
    (<button onClick={load}>Load Contacts</button>);

  return (
    <div className={styles.root}>
      <div className={styles.header}>{title}</div>
      <div className={styles.content}>{content}</div>
      <div className={styles.footer}>
        <span>Count: {contacts.length}</span>
        <button onClick={add}>Add A Contact</button>
      </div>
    </div>
  );
}
