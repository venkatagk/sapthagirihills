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

document.addEventListener("click", (e) => {
    const target = e.target.closest("[data-page]");
    if (!target) return;

    e.preventDefault();

    const page = target.dataset.page;
    if (page) {
        loadPage(page);
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

        // ✅ IMPORTANT: initialize page-specific logic
        initAshtothram108();


    } catch (err) {
        content.innerHTML = "<p>⚠️ పేజీ లోడ్ కాలేదు</p>";
    }
}

// Menu click handler
//document.querySelectorAll("aside nav a").forEach(link => {
//    link.addEventListener("click", () => {
//        loadPage(link.dataset.page);
//    });
//});

function initAshtothram108() {
    const list = document.getElementById("ashto108");
    if (!list) return; // only run on that page

    const items = Array.from(list.querySelectorAll("li"));
    const countEl = document.getElementById("ashtoCount");
    const nextBtn = document.getElementById("ashtoNextBtn");
    const resetBtn = document.getElementById("ashtoResetBtn");
    const autoChk = document.getElementById("ashtoAutoChk");
    const autoSec = document.getElementById("ashtoAutoSec");

    let idx =1;
    let timer = null;

    function render() {
        items.forEach((li, i) => {
            li.classList.toggle("done", i < idx);
            li.classList.toggle("active", i === idx);
        });
        if (countEl) countEl.textContent = String(idx);
        items[idx]?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }

    function next() {
        if (idx >= items.length) return;
        idx++;
        if (idx > items.length) idx = items.length;
        render();
    }

    function reset() {
        idx = 1;
        stopAuto();
        render();
    }

    function startAuto() {
        stopAuto();
        const sec = Math.max(1, Math.min(30, parseInt(autoSec?.value || "3", 10)));
        timer = setInterval(() => {
            if (idx >= items.length) {
                stopAuto();
                return;
            }
            next();
        }, sec * 1000);
    }

    function stopAuto() {
        if (timer) clearInterval(timer);
        timer = null;
        if (autoChk) autoChk.checked = false;
    }

    // click any item = jump there
    list.addEventListener("click", (e) => {
        const li = e.target.closest("li");
        if (!li) return;
        const i = items.indexOf(li);
        if (i >= 0) {
            idx = i;
            render();
        }
    });

    nextBtn?.addEventListener("click", next);
    resetBtn?.addEventListener("click", reset);

    autoChk?.addEventListener("change", () => {
        if (autoChk.checked) startAuto();
        else stopAuto();
    });

    autoSec?.addEventListener("change", () => {
        if (autoChk?.checked) startAuto();
    });

    // Space key = Next (when not typing in input)
    document.addEventListener("keydown", (e) => {
        const tag = (e.target?.tagName || "").toLowerCase();
        if (tag === "input" || tag === "textarea") return;
        if (e.code === "Space") {
            e.preventDefault();
            next();
        }
    }, { once: true });

    // Landing page cards
    document.addEventListener("click", (e) => {
        const card = e.target.closest(".card[data-page]");
        if (!card) return;

        const page = card.dataset.page;
        loadPage(page);
    });

    render();
}

// ------------------------------
// INITIAL LOAD
// ------------------------------
loadPage("home.html");
