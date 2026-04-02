import React, { useState, useEffect } from 'react';
import ContactForm from './ContactForm';
import ContactList from './ContactList';

function App() {
  const [contacts, setContacts] = useState([]);

  // Load dữ liệu khi khởi động
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('contacts')) || [];
    setContacts(data);
  }, []);

  const addContact = (newContact) => {
    const updated = [...contacts, { ...newContact, id: Date.now() }];
    setContacts(updated);
    localStorage.setItem('contacts', JSON.stringify(updated));
  };

  const deleteContact = (id) => {
    const updated = contacts.filter(c => c.id !== id);
    setContacts(updated);
    localStorage.setItem('contacts', JSON.stringify(updated));
  };

  return (
    <div className="container py-5" style={{ maxWidth: '800px' }}>
      {/* Khu vực hiển thị danh sách */}
      <div className="card shadow-sm mb-5">
        <div className="card-header bg-secondary text-white py-2">
          <small>Danh Sách Danh Bạ</small>
        </div>
        <div className="card-body p-0">
          <ContactList contacts={contacts} onDelete={deleteContact} />
        </div>
      </div>

      {/* Khu vực Form thêm mới */}
      <h2 className="text-center fw-bold mb-4">Quản Lý Danh Bạ</h2>
      <ContactForm onAdd={addContact} />
    </div>
  );
}

export default App;