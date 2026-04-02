// ContactList.js
function ContactList({ contacts, onDelete }) {
    if (contacts.length === 0) return <p className="text-center p-4 m-0">Trống</p>;
    return (
      <div className="list-group list-group-flush">
        {contacts.map(contact => (
          <ContactItem key={contact.id} contact={contact} onDelete={onDelete} />
        ))}
      </div>
    );
  }
  
  // ContactItem.js
  function ContactItem({ contact, onDelete }) {
    return (
      <div className="list-group-item d-flex justify-content-between align-items-center py-3">
        <div>
          <h6 className="mb-1 fw-bold">{contact.name}</h6>
          <div className="text-secondary small">SĐT: {contact.phone}</div>
          <div className="text-secondary small">Email: {contact.email}</div>
        </div>
        <button className="btn btn-danger btn-sm px-3" onClick={() => onDelete(contact.id)}>
          Xóa
        </button>
      </div>
    );
  }