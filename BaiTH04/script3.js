// 1. Khai báo bảng giá
const prices = {
    "Laptop": 15000000,
    "Chuột": 500000,
    "Bàn phím": 1200000
};

const productEl = document.getElementById('product');
const quantityEl = document.getElementById('quantity');
const totalPriceEl = document.getElementById('totalPrice');
const noteEl = document.getElementById('note');
const charCountEl = document.getElementById('charCount');

// 2. Tính tổng tiền tự động
function updatePrice() {
    const product = productEl.value;
    const qty = parseInt(quantityEl.value) || 0;
    const price = prices[product] || 0;
    const total = price * qty;
    
    totalPriceEl.textContent = total.toLocaleString('vi-VN');
}

productEl.addEventListener('change', updatePrice);
quantityEl.addEventListener('input', updatePrice);

// 3. Đếm ký tự ghi chú
noteEl.addEventListener('input', function() {
    const len = this.value.length;
    charCountEl.textContent = `${len}/200`;
    
    if (len > 200) {
        charCountEl.style.color = 'red';
        document.getElementById('noteError').textContent = "Ghi chú không quá 200 ký tự!";
    } else {
        charCountEl.style.color = 'black';
        document.getElementById('noteError').textContent = "";
    }
});

// 4. Validate Ngày (Phức tạp nhất)
function validateDate() {
    const dateVal = document.getElementById('deliveryDate').value;
    if (!dateVal) return "Vui lòng chọn ngày giao";

    const selectedDate = new Date(dateVal);
    const today = new Date();
    today.setHours(0,0,0,0); // Reset giờ để so sánh chính xác ngày

    const maxDate = new Date();
    maxDate.setDate(today.getDate() + 30);

    if (selectedDate < today) return "Ngày giao không được ở quá khứ";
    if (selectedDate > maxDate) return "Ngày giao không quá 30 ngày kể từ hôm nay";
    
    return "";
}

// 5. Xử lý Submit & Xác nhận
const form = document.getElementById('orderForm');
const confirmDialog = document.getElementById('confirmDialog');

form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Validate các trường cơ bản (tương tự bài 2.1)
    const dateMsg = validateDate();
    const product = productEl.value;
    const qty = parseInt(quantityEl.value);

    if (product && qty > 0 && qty < 100 && dateMsg === "" && noteEl.value.length <= 200) {
        // Hiện tóm tắt
        confirmDialog.style.display = 'block';
        document.getElementById('orderSummary').innerHTML = `
            <p>Sản phẩm: ${product}</p>
            <p>Số lượng: ${qty}</p>
            <p>Tổng tiền: ${totalPriceEl.textContent} VNĐ</p>
            <p>Ngày giao: ${document.getElementById('deliveryDate').value}</p>
        `;
    } else {
        alert("Vui lòng kiểm tra lại thông tin!");
    }
});

// Nút xác nhận cuối cùng
document.getElementById('btnConfirm').addEventListener('click', function() {
    alert("Đặt hàng thành công! Cảm ơn bạn.");
    location.reload(); // Load lại trang
});

document.getElementById('btnCancel').addEventListener('click', function() {
    confirmDialog.style.display = 'none';
});