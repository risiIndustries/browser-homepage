const settingsWindow = document.getElementById("settingswindow");
const dateTime = document.getElementById("datetime");
const searchBar = document.getElementById("searchbar");
const searchEngineSelect = document.getElementById("seselect");
const clockSelect = document.getElementById("clockselect");

const wallpapers = ["Birb", "Jellyfish", "Mountains", "Space-Needle"];

const wallpaper = wallpapers[~~(Math.random() * wallpapers.length)] + ".jpg";

document.body.style.backgroundImage = `url(./images/${wallpaper})`;
document.body.style.backgroundSize = "cover";

if (getCookie("defaultengine") === "" || getCookie("defaultengine") === null) {
    console.log("No default search engine set, setting to Brave");
    setCookie("defaultengine", "Brave");
    setEngine(getCookie("defaultengine"));
}

if (getCookie("timeformat") === "" || getCookie("timeformat") === null) {
    console.log("No time format set, setting to 12 hour");
    setCookie("timeformat", 12);
    setTime(getCookie("timeformat"));
}

setEngine(getCookie("defaultengine"));
setTime(getCookie("timeformat"));

const searchEngines = {
    "risiSearx": "https://searx.risi.io/",
    "DuckDuckGo": "https://duckduckgo.com/?q=",
    "Google": "https://www.google.com/search?q=",
    "Bing": "https://www.bing.com/search?q=",
    "Yahoo": "https://search.yahoo.com/search?p=",
    "Baidu": "https://www.baidu.com/s?wd=",
    "Yandex": "https://yandex.com/search/?text=",
    "Brave": "https://search.brave.com/search?q=",
    "StartPage": "https://www.startpage.com/sp/search?q="
}

let selectStr = "";
for (i in searchEngines) {
    selectStr += `<option>${i}</option>`;
}
searchEngineSelect.innerHTML = selectStr;
searchEngineSelect.value = getCookie("defaultengine")

function setEngine(engine) {
    setCookie("defaultengine", engine);
    searchBar.placeholder = `Search with ${engine}`;
}

function setTime(format) {
    setCookie("timeformat", format);
}

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
}

function setCookie(cname, cvalue) {
    let d = new Date();
    d.setTime(d.getTime() + (365*24*60*60*1000));
    let expires = "expires="+ d.toUTCString();
    document.cookie = `${cname}=${cvalue};${expires};path=/`;
}

function search() {
    window.location.href = searchEngines[getCookie("defaultengine")] + searchBar.value
}

function toggleSettings() {
    if (settingsWindow.style.visibility === "visible") {
        settingsWindow.style.visibility = "hidden";
    } else {
        settingsWindow.style.visibility = "visible";
    }
}

function formatAMPM(date) {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? '0'+minutes : minutes;
    let strTime = hours+':'+minutes+ampm;
    return strTime;
}

function updateTime() {
    let dt = new Date();
    let today = (("0"+dt.getDate()).slice(-2))+"/"+(("0"+(dt.getMonth()+1)).slice(-2))+"/"+(dt.getFullYear())+" ";
    let hour24 = ((today+("0"+dt.getHours()).slice(-2))+":"+(("0"+dt.getMinutes()).slice(-2))+":"+(("0"+dt.getSeconds()).slice(-2)));
    let hour12 = today+formatAMPM(dt);
    if (getCookie("timeformat") === "12") {
        dateTime.innerHTML = hour12;
    } else {
        dateTime.innerHTML = hour24;
    }
}
setInterval(updateTime, 100)

searchBar.addEventListener("keyup", (event) => {
    event.preventDefault();
    let key = event.key, keycode = event.keyCode;
    if (key === "Enter" || keycode === 13) {
        document.getElementById("searchbutton").click();
    }
});

searchEngineSelect.addEventListener("change", () => {
    setEngine(searchEngineSelect.value);
})

clockSelect.addEventListener("change", () => {
    setTime(clockSelect.value);
})
