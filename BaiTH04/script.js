// --- 1. KHAI BÁO BIẾN TOÀN CỤC ---
let students = []; // Mảng gốc lưu trữ dữ liệu
let nextId = 1;    // ID tự tăng để định danh duy nhất mỗi SV
let sortDirection = 0; // 0: không sắp xếp, 1: tăng, -1: giảm

// Lấy các phần tử DOM
const nameInput = document.getElementById('txtName');
const scoreInput = document.getElementById('txtScore');
const btnAdd = document.getElementById('btnAdd');
const tbody = document.getElementById('studentBody');
const summaryArea = document.getElementById('summaryArea');
const txtSearch = document.getElementById('txtSearch');
const selRank = document.getElementById('selRank');
const sortScoreBtn = document.getElementById('sortScore');
const sortIcon = document.getElementById('sortIcon');

// --- 2. LOGIC NGHIỆP VỤ ---

// Tính xếp loại dựa trên điểm
function getRank(score) {
    if (score >= 8.5) return "Giỏi";
    if (score >= 7.0) return "Khá";
    if (score >= 5.0) return "Trung bình";
    return "Yếu";
}

// Hàm lọc, sắp xếp và kích hoạt hiển thị
function applyFilters() {
    const keyword = txtSearch.value.toLowerCase();
    const rankFilter = selRank.value;

    // Lọc theo tên và xếp loại
    let filtered = students.filter(s => {
        const matchesName = s.name.toLowerCase().includes(keyword);
        const matchesRank = (rankFilter === "Tất cả") || (getRank(s.score) === rankFilter);
        return matchesName && matchesRank;
    });

    // Sắp xếp theo điểm nếu có yêu cầu
    if (sortDirection !== 0) {
        filtered.sort((a, b) => {
            return sortDirection === 1 ? a.score - b.score : b.score - a.score;
        });
    }

    renderTable(filtered); 
}

// Vẽ bảng lên giao diện
function renderTable(dataToDisplay = students) {
    tbody.innerHTML = ""; 
    
    if (dataToDisplay.length === 0) {
        tbody.innerHTML = `<tr><td colspan="5">Không có kết quả</td></tr>`;
        updateSummary(0, 0);
        return;
    }

    let totalScore = 0;
    dataToDisplay.forEach((student, index) => {
        totalScore += student.score;
        const row = document.createElement('tr');
        
        // Tô màu vàng nếu điểm < 5
        if (student.score < 5) row.classList.add('bg-warning');

        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${student.name}</td>
            <td>${student.score.toFixed(1)}</td>
            <td>${getRank(student.score)}</td>
            <td><button class="btn-delete" data-id="${student.id}">Xóa</button></td>
        `;
        tbody.appendChild(row);
    });

    const avg = (totalScore / dataToDisplay.length).toFixed(2);
    updateSummary(dataToDisplay.length, avg);
}

function updateSummary(count, avg) {
    summaryArea.textContent = `Tổng số SV: ${count} | Điểm trung bình: ${avg}`;
}

// --- 3. XỬ LÝ SỰ KIỆN ---

// Thêm sinh viên mới
function addStudent() {
    const name = nameInput.value.trim();
    const score = parseFloat(scoreInput.value);

    if (name === "" || isNaN(score) || score < 0 || score > 10) {
        alert("Vui lòng nhập họ tên và điểm hợp lệ (0-10)!");
        return;
    }

    // Thêm đối tượng vào mảng
    students.push({ id: nextId++, name: name, score: score });
    
    // Reset form
    nameInput.value = "";
    scoreInput.value = "";
    nameInput.focus();
    
    applyFilters(); 
}

// Sự kiện Click nút Thêm
btnAdd.addEventListener('click', addStudent);

// Sự kiện nhấn phím Enter
scoreInput.addEventListener('keyup', (e) => {
    if (e.key === "Enter") addStudent();
});

// Sự kiện Tìm kiếm & Lọc (Real-time)
txtSearch.addEventListener('input', applyFilters);
selRank.addEventListener('change', applyFilters);

// Sự kiện Sắp xếp điểm
sortScoreBtn.addEventListener('click', () => {
    if (sortDirection === 0 || sortDirection === -1) {
        sortDirection = 1; // Tăng dần
        sortIcon.textContent = "▲";
    } else {
        sortDirection = -1; // Giảm dần
        sortIcon.textContent = "▼";
    }
    applyFilters();
});

// Sự kiện Xóa (Event Delegation)
tbody.addEventListener('click', (e) => {
    if (e.target.classList.contains('btn-delete')) {
        const id = parseInt(e.target.getAttribute('data-id'));
        // Cập nhật lại mảng gốc bằng cách lọc bỏ ID đã chọn
        students = students.filter(s => s.id !== id);
        applyFilters();
    }
});