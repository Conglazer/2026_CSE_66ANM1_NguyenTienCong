const form = document.getElementById('registerForm');

// Hàm hiển thị lỗi
function showError(id, message) {
    const errorSpan = document.getElementById(id + 'Error');
    const input = document.getElementById(id);
    errorSpan.textContent = message;
    if (input && input.type !== 'radio') input.style.borderColor = 'red';
}

// Hàm xóa lỗi
function clearError(id) {
    const errorSpan = document.getElementById(id + 'Error');
    const input = document.getElementById(id);
    errorSpan.textContent = '';
    if (input && input.type !== 'radio') input.style.borderColor = '';
}

// 1. Validate Họ tên
function validateFullname() {
    const val = document.getElementById('fullname').value.trim();
    const regex = /^[a-zA-ZÀ-ỹ\s]+$/;
    if (val === "") { showError('fullname', 'Không được để trống'); return false; }
    if (val.length < 3) { showError('fullname', 'Phải ít nhất 3 ký tự'); return false; }
    if (!regex.test(val)) { showError('fullname', 'Chỉ chứa chữ cái và khoảng trắng'); return false; }
    clearError('fullname'); return true;
}

// 2. Validate Email
function validateEmail() {
    const val = document.getElementById('email').value.trim();
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(val)) { showError('email', 'Email không đúng định dạng'); return false; }
    clearError('email'); return true;
}

// 3. Validate Password
function validatePassword() {
    const val = document.getElementById('password').value;
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!regex.test(val)) {
        showError('password', 'Ít nhất 8 ký tự, gồm chữ hoa, chữ thường và số');
        return false;
    }
    clearError('password'); return true;
}

// 4. Validate Xác nhận mật khẩu
function validateConfirm() {
    const pass = document.getElementById('password').value;
    const confirm = document.getElementById('confirmPassword').value;
    if (confirm !== pass || confirm === "") {
        showError('confirmPassword', 'Mật khẩu xác nhận không khớp');
        return false;
    }
    clearError('confirmPassword'); return true;
}

// Gắn sự kiện BLUR và INPUT cho tất cả các ô
['fullname', 'email', 'password', 'confirmPassword'].forEach(id => {
    const element = document.getElementById(id);
    element.addEventListener('blur', () => {
        if (id === 'fullname') validateFullname();
        if (id === 'email') validateEmail();
        if (id === 'password') validatePassword();
        if (id === 'confirmPassword') validateConfirm();
    });
    element.addEventListener('input', () => clearError(id));
});

// Xử lý SUBMIT
form.addEventListener('submit', function(e) {
    e.preventDefault();

    // Dùng toán tử & để chạy tất cả các hàm (không dừng sớm khi gặp lỗi đầu tiên)
    const isValid = validateFullname() & validateEmail() & validatePassword() & validateConfirm();

    // Kiểm tra Radio & Checkbox riêng (đơn giản)
    const gender = document.querySelector('input[name="gender"]:checked');
    const terms = document.getElementById('terms').checked;

    if (!gender) { showError('gender', 'Vui lòng chọn giới tính'); } else { clearError('gender'); }
    if (!terms) { showError('terms', 'Bạn phải đồng ý điều khoản'); } else { clearError('terms'); }

    if (isValid && gender && terms) {
        form.style.display = 'none';
        document.getElementById('displayUser').textContent = document.getElementById('fullname').value;
        document.getElementById('successMsg').style.display = 'block';
    }
});
