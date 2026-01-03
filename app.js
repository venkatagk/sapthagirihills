//const sidebar = document.getElementById("sidebar");
//const menuBtn = document.getElementById("menuBtn");
//const themeBtn = document.getElementById("themeBtn");
//const content = document.getElementById("content");

//// Sidebar toggle (mobile)
//menuBtn?.addEventListener("click", () => {
//  sidebar.classList.toggle("open");
//});

//// Theme toggle
//themeBtn.addEventListener("click", () => {
//  document.body.classList.toggle("dark");
//  localStorage.setItem(
//    "theme",
//    document.body.classList.contains("dark") ? "dark" : "light"
//  );
//});

//// Load saved theme
//if (localStorage.getItem("theme") === "dark") {
//  document.body.classList.add("dark");
//}

//// Devotional content
//const data = {
//  gita: `
//    <h2>📜 భగవద్గీత</h2>
//    <p>
//      కర్మణ్యేవాధికారస్తే మా ఫలేషు కదాచన |
//      మా కర్మఫలహేతుర్భూర్మా తే సంగోఽస్త్వకర్మణి ||
//    </p>
//  `,
//  sloka: `
//    <h2>🔔 రోజువారీ శ్లోకం</h2>
//    <p>
//      శుభం కరోతి కళ్యాణం ఆరోగ్యం ధనసంపదా |
//      శత్రుబుద్ధి వినాశాయ దీపజ్యోతి నమోఽస్తుతే ||
//    </p>
//  `,
//  vishnu: `
//    <h2>🕉️ విష్ణు సహస్రనామం</h2>
//    <p>ఓం విశ్వం విష్ణుర్వషట్కారో భూతభవ్యభవత్ప్రభుః...</p>
//  `,
//  lalitha: `
//    <h2>🌺 లలిత సహస్రనామం</h2>
//    <p>శ్రీమాతా శ్రీమహారాజ్ఞీ శ్రీమత్సింహాసనేశ్వరీ...</p>
//  `,
//  aarti: `
//    <h2>🙏 ఆరతి</h2>
//    <p>ఓం జై జగదీశ హరే...</p>
//  `
//};

//function loadContent(key) {
//  content.innerHTML = data[key];
//  sidebar.classList.remove("open");
//}


const content = document.getElementById("content");
const sidebar = document.getElementById("sidebar");

// Load page
async function loadPage(page) {
    const res = await fetch(`pages/${page}`);
    content.innerHTML = await res.text();
    sidebar.classList.remove("open");
}

// Menu click
document.querySelectorAll("aside nav a").forEach(link => {
    link.addEventListener("click", () => {
        loadPage(link.dataset.page);
    });
});

// Load default page
loadPage("welcome.html");

