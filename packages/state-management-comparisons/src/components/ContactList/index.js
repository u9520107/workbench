import React, { Component, PureComponent } from "react";
import { observer } from "mobx-react";
import { List, AutoSizer } from "react-virtualized";
import styles from "./styles.css";

@observer
class ContactItem extends Component {
  render() {
    const {
      contact: {
        id,
        lastName,
        firstName,
        phoneNumber,
        country,
        company,
        counter
      },
      remove,
      update
    } = this.props;
    return (
      <div className={styles.item}>
        <div>ID: {id}</div>
        <div>Name: {`${firstName} ${lastName}`}</div>
        <div>Phone Number: {phoneNumber}</div>
        <div>Copmpany: {company}</div>
        <div>Country: {country}</div>
        <div>Counter: {counter}</div>
        <button onClick={() => update({ id, counter: counter + 1 })}>
          Like
        </button>
        <button onClick={() => remove({ id })}>Remove Contact</button>
      </div>
    );
  }
}

function BasicList({ title = "", contacts = [], add, remove, update, load }) {
  const content = contacts.length ? (
    contacts.map(item => (
      <ContactItem
        key={item.id}
        contact={item}
        remove={remove}
        update={update}
      />
    ))
  ) : (
    <button onClick={load}>Load Contacts</button>
  );

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

class VirtualList extends React.Component {
  constructor(props) {
    super(props);
    this.renderRow = ({ index, key, style }) => {
      return (
        <div key={key} style={style}>
          <ContactItem
            contact={this.props.contacts[index]}
            remove={this.props.remove}
            update={this.props.update}
          />
        </div>
      );
    };
  }
  render() {
    const { title = "", contacts = [], add, load } = this.props;
    const content = contacts.length ? (
      <AutoSizer>
        {({ width, height }) => (
          <List
            contacts={contacts}
            width={width}
            height={height}
            rowCount={contacts.length}
            rowHeight={150}
            rowRenderer={this.renderRow}
          />
        )}
      </AutoSizer>
    ) : (
      <button onClick={load}>Load Contacts</button>
    );

    return (
      <div className={styles.root}>
        <div className={styles.header}>{title}</div>
        <div className={styles.content} ref={this._content}>
          {content}
        </div>
        <div className={styles.footer}>
          <span>Count: {contacts.length}</span>
          <button onClick={add}>Add A Contact</button>
        </div>
      </div>
    );
  }
}

export default function ContactList({ virtual = true, ...props }) {
  return virtual ? <VirtualList {...props} /> : <BasicList {...props} />;
}
