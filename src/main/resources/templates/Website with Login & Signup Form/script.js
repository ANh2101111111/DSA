// Lấy các phần tử DOM
const navbarMenu = document.querySelector(".navbar .links");
const hamburgerBtn = document.querySelector(".hamburger-btn");
const hideMenuBtn = navbarMenu.querySelector(".close-btn");
const showPopupBtn = document.querySelector(".login-btn");
const formPopup = document.querySelector(".form-popup");
const hidePopupBtn = formPopup.querySelector(".close-btn");
const signupLoginLink = formPopup.querySelectorAll(".bottom-link a");
const loginForm = formPopup.querySelector(".login form");
const signupForm = formPopup.querySelector(".signup form");

// Hiển thị hoặc ẩn menu trên mobile
hamburgerBtn.addEventListener("click", () => {
    navbarMenu.classList.toggle("show-menu");
});

// Ẩn menu mobile khi nhấn nút đóng
hideMenuBtn.addEventListener("click", () => hamburgerBtn.click());

// Hiển thị popup đăng nhập
showPopupBtn.addEventListener("click", () => {
    document.body.classList.add("show-popup");
});

// Ẩn popup đăng nhập khi nhấn nút đóng
hidePopupBtn.addEventListener("click", () => {
    document.body.classList.remove("show-popup");
});

// Chuyển đổi giữa form đăng nhập và đăng ký
signupLoginLink.forEach(link => {
    link.addEventListener("click", (e) => {
        e.preventDefault();
        if (link.id === 'signup-link') {
            formPopup.classList.add("show-signup");
        } else {
            formPopup.classList.remove("show-signup");
        }
    });
});

// Xử lý đăng nhập
loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Lấy giá trị email và mật khẩu từ form đăng nhập
    const email = loginForm.querySelector("input[type='text']").value;
    const password = loginForm.querySelector("input[type='password']").value;

    try {
        const response = await fetch("http://localhost:8080/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
        });

        if (response.ok) {
            const result = await response.text(); // Lấy thông báo từ server
            alert(result); // Hiển thị thông báo thành công
            window.location.href = "student.html"; // Chuyển hướng sau khi đăng nhập thành công
        } else {
            // Hiển thị thông báo lỗi nếu đăng nhập thất bại
            const error = await response.text();
            alert(error);
        }
    } catch (error) {
        console.error("Lỗi khi gọi API login:", error);
        alert("Có lỗi xảy ra. Vui lòng thử lại.");
    }
});

// Xử lý đăng ký
signupForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Lấy giá trị email và mật khẩu từ form đăng ký
    const email = signupForm.querySelector("input[type='text']").value;
    const password = signupForm.querySelector("input[type='password']").value;

    try {
        const response = await fetch("http://localhost:8080/api/signup", {  // Đảm bảo URL đầy đủ
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
        });

        if (response.ok) {
            const result = await response.text(); // Lấy thông báo từ server
            alert(result); // Hiển thị thông báo đăng ký thành công
            formPopup.classList.remove("show-signup"); // Chuyển về form đăng nhập
        } else {
            // Hiển thị thông báo lỗi nếu đăng ký thất bại
            const error = await response.text();
            alert(error);
        }
    } catch (error) {
        console.error("Lỗi khi gọi API signup:", error);
        alert("Có lỗi xảy ra. Vui lòng thử lại.");
    }
});
