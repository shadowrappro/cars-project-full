import { getAll } from "./request.js";
import { ui } from "./ui.js";


const elOfflinePage = document.getElementById("networkError")
const elFilterTypeSelect = document.getElementById("filterTypeSelect")
const elFilterValueSelect = document.getElementById("filterValueSelect")
const elSearchInput = document.getElementById("searchInput")
const elLoader = document.getElementById("loader")

let backendData = null;
let worker = new Worker("./worker.js");
let filterKey = null;
let filterValue = null;

window.addEventListener("DOMContentLoaded", () => {
    if (window.navigator.onLine === false) {
        elOfflinePage.classList.remove("hidden")
        elOfflinePage.classList.add("flex");
    } else {
        elOfflinePage.classList.add("hidden")
        elOfflinePage.classList.remove("flex");
    }


    elLoader.classList.remove("hidden")
    elLoader.classList.add("grid")
    getAll()
    .then((res) => {
        backendData = res;
        ui(backendData.data)
    })
    .catch((error) => {
        alert(error.message)
    })
    .finally(() => {
        elLoader.classList.add("hidden")
        elLoader.classList.remove("grid")
    })
})

elFilterTypeSelect.addEventListener("change", (evt) => {
    const value = evt.target[evt.target.selectedIndex].value;
    filterKey = value
    worker.postMessage({
        functionName: "filterByType",
        params: [backendData.data, value],
    })
})

elFilterValueSelect.addEventListener("change", (evt) => {
    const value = evt.target[evt.target.selectedIndex].value;
    filterValue = value;

    const elContainer = document.getElementById("carContainer")
    elContainer.innerHTML = ""

    if (filterKey && filterValue) {
        elLoader.classList.remove("hidden")
        elLoader.classList.add("grid")
        getAll(`?${filterKey}=${filterValue}`)
        .then((res) => {
            ui(res.data)
        })
        .catch((error) => {
            alert(error.message)
        })
        .finally(() => {
            elLoader.classList.add("hidden")
            elLoader.classList.remove("grid")
        })
    }
})

elSearchInput.addEventListener("input", (evt) => {
    const key = evt.target.value;

    worker.postMessage({
        functionName: "search",
        params: [backendData.data, key],
    })
})

worker.addEventListener("message", (evt) => {
    
    // Select
    const response = evt.data;
    const result = response.result;

    if (response.target === "filterByType") {
        elFilterValueSelect.classList.remove("hidden")
        
        const option = document.createElement("option")
        option.selected = true;
        option.disabled = true;
        option.textContent = "Hammasi"
        elFilterValueSelect.appendChild(option)

        elFilterValueSelect.innerHTML = "";
        result.forEach(element => {
            const option = document.createElement("option")
            option.textContent = element;
            option.value = element;
            elFilterValueSelect.appendChild(option)
        });   
    } else if(response.target === "search"){
        const elContainer = document.getElementById("carContainer")
        elContainer.innerHTML = null;
        if (response.result.length > 0) {
            ui(response.result)
        } else {
            elContainer.innerHTML = "";
            alert("No data")
        }
        
    }
})

window.addEventListener("online", () => {
    elOfflinePage.classList.add("hidden");
    elOfflinePage.classList.remove("flex");
})

window.addEventListener("offline", () => {
    elOfflinePage.classList.remove("hidden");
    elOfflinePage.classList.add("flex");
})