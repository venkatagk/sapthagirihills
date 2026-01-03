// ------------------------------
// Elements
// ------------------------------
const body = document.body;
const sidebar = document.getElementById("sidebar");
const menuBtn = document.getElementById("menuBtn");
const themeBtn = document.getElementById("themeBtn");
const content = document.getElementById("content");

// ------------------------------
// THEME (Dark / Light)
// ------------------------------
function applyTheme(theme) {
    if (theme === "dark") {
        body.classList.add("dark");
        themeBtn.textContent = "☀️";
    } else {
        body.classList.remove("dark");
        themeBtn.textContent = "🌙";
    }
}

// Load saved theme
const savedTheme = localStorage.getItem("theme") || "light";
applyTheme(savedTheme);

// Toggle theme
themeBtn.addEventListener("click", () => {
    const isDark = body.classList.contains("dark");
    const newTheme = isDark ? "light" : "dark";

    localStorage.setItem("theme", newTheme);
    applyTheme(newTheme);
});

// ------------------------------
// MOBILE MENU (Sidebar Toggle)
// ------------------------------
menuBtn.addEventListener("click", () => {
    sidebar.classList.toggle("open");
});

// Close sidebar when clicking outside (mobile)
document.addEventListener("click", (e) => {
    if (
        window.innerWidth <= 768 &&
        !sidebar.contains(e.target) &&
        !menuBtn.contains(e.target)
    ) {
        sidebar.classList.remove("open");
    }
});

// ------------------------------
// PAGE LOADING (Static HTML)
// ------------------------------
async function loadPage(page) {
    try {
        const res = await fetch(`pages/${page}`);
        content.innerHTML = await res.text();

        // Close sidebar on mobile after navigation
        sidebar.classList.remove("open");

        // Highlight active menu
        document.querySelectorAll("aside nav a").forEach(a =>
            a.classList.remove("active")
        );
        document
            .querySelector(`aside nav a[data-page="${page}"]`)
            ?.classList.add("active");

    } catch (err) {
        content.innerHTML = "<p>⚠️ పేజీ లోడ్ కాలేదు</p>";
    }
}

// Menu click handler
document.querySelectorAll("aside nav a").forEach(link => {
    link.addEventListener("click", () => {
        loadPage(link.dataset.page);
    });
});

// ------------------------------
// INITIAL LOAD
// ------------------------------
loadPage("welcome.html");
