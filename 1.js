
document.addEventListener("DOMContentLoaded", function() {
    console.log("Скрипт 1.js загружен");
    const requestForm = document.getElementById("request-form");
    if (!requestForm) {
        console.error("Форма не найдена!");
        return;
    }
    requestForm.addEventListener("submit", function(event) {
        event.preventDefault();
        console.log("Форма отправлена");
        const contact = document.getElementById("contact").value;
        const date = document.getElementById("date").value;
        const time = document.getElementById("time").value;
        const service = document.getElementById("service").value;
        const payment = document.getElementById("payment").value;
        if (!contact || !date || !time || !service || !payment) {
            alert("Заполните все поля!");
            return;
        }
        const request = {
            contact: contact,
            date: date,
            time: time,
            service: service,
            payment: payment,
            createdAt: new Date().toLocaleString('ru-RU')
        };
        const storedRequests = JSON.parse(localStorage.getItem("requests")) || [];
        storedRequests.push(request);
        localStorage.setItem("requests", JSON.stringify(storedRequests));
        console.log("Заявка сохранена:", request);
        window.location.href = "2.html";
    });
});
