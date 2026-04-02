import React, { useState } from 'react';

function ContactForm({ onAdd }) {
  const [user, setUser] = useState({ name: '', phone: '', email: '' });
  const [errors, setErrors] = useState({});

  const validate = () => {
    let err = {};
    if (user.name.length > 30) err.name = "Tên không quá 30 ký tự";
    if (!/^0\d{9}$/.test(user.phone)) err.phone = "SĐT phải 10 số, bắt đầu bằng số 0";
    if (!/\S+@\S+\.\S+/.test(user.email)) err.email = "Email không đúng định dạng";
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onAdd(user);
      setUser({ name: '', phone: '', email: '' });
    }
  };

  return (
    <div className="card shadow-sm border-0">
      <div className="card-header bg-primary text-white fw-bold py-2">
        Thêm Danh Bạ Mới
      </div>
      <form onSubmit={handleSubmit} className="card-body bg-light">
        <div className="mb-3">
          <label className="text-secondary small fw-bold">Họ và Tên</label>
          <input type="text" className={`form-control ${errors.name ? 'is-invalid' : ''}`}
            placeholder="Nhập họ và tên" value={user.name}
            onChange={e => setUser({...user, name: e.target.value})} />
        </div>
        <div className="mb-3">
          <label className="text-secondary small fw-bold">Số Điện Thoại</label>
          <input type="text" className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
            placeholder="Nhập số điện thoại" value={user.phone}
            onChange={e => setUser({...user, phone: e.target.value})} />
        </div>
        <div className="mb-3">
          <label className="text-secondary small fw-bold">Email</label>
          <input type="text" className={`form-control ${errors.email ? 'is-invalid' : ''}`}
            placeholder="Nhập email" value={user.email}
            onChange={e => setUser({...user, email: e.target.value})} />
        </div>
        <button type="submit" className="btn btn-primary w-100 fw-bold">Thêm Danh Bạ</button>
      </form>
    </div>
  );
}

export default ContactForm;