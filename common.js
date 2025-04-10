
function getStoredRequests() {
    try {
        return JSON.parse(localStorage.getItem("requests")) || [];
    } catch (e) {
        console.error("Ошибка чтения из localStorage:", e);
        return [];
    }
}
function saveRequests(requests) {
    try {
        localStorage.setItem("requests", JSON.stringify(requests));
    } catch (e) {
        console.error("Ошибка записи в localStorage:", e);
    }
}
function renderRequests(containerId) {
    const requestList = document.getElementById(containerId);
    if (!requestList) {
        console.error("Элемент с ID", containerId, "не найден");
        return;
    }
    const storedRequests = getStoredRequests();
    requestList.innerHTML = "";
    if (storedRequests.length === 0) {
        requestList.innerHTML = "<p>Заявок пока нет.</p>";
        return;
    }
    storedRequests.forEach((request, index) => {
        const newRequest = document.createElement("div");
        newRequest.className = "request-item";
        newRequest.innerHTML = `
            <p><strong>Дата создания:</strong> ${request.createdAt || 'Не указана'}</p>
            <p><strong>Контакт:</strong> ${request.contact || 'Не указан'}</p>
            <p><strong>Дата услуги:</strong> ${request.date || 'Не указана'} в ${request.time || 'Не указано'}</p>
            <p><strong>Услуга:</strong> ${request.service || 'Не указана'}</p>
            <p><strong>Оплата:</strong> ${request.payment || 'Не указана'}</p>
            <button class="delete-btn" data-index="${index}">Удалить</button>
            <hr>
        `;
        requestList.appendChild(newRequest);
    });
    document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const index = parseInt(this.getAttribute('data-index'));
            if (!isNaN(index)) {
                deleteRequest(index);
            }
        });
    });
}
function deleteRequest(index) {
    const storedRequests = getStoredRequests();
    if (index >= 0 && index < storedRequests.length) {
        storedRequests.splice(index, 1);
        saveRequests(storedRequests);
        ['requests', 'admin-requests'].forEach(id => {
            if (document.getElementById(id)) {
                renderRequests(id);
            }
        });
    }
}
window.getStoredRequests = getStoredRequests;
window.saveRequests = saveRequests;
window.renderRequests = renderRequests;
window.deleteRequest = deleteRequest;
