const elTitle = document.getElementById("name")
const elTrim = document.getElementById("trim")
const elGeneration = document.getElementById("generation")
const elYear = document.getElementById("year")
const elColor = document.getElementById("color")
const elColorName = document.getElementById("colorName")
const elCategory = document.getElementById("category")
const elDoorCount = document.getElementById("doorCount")
const elSeatCount = document.getElementById("seatCount")
const elMaxSpeed = document.getElementById("maxSpeed")
const elAcceleration = document.getElementById("acceleration")
const elEngine = document.getElementById("engine")
const elHorsePower = document.getElementById("horsepower")
const elFuelType = document.getElementById("fuelType")
const elCity = document.getElementById("city")
const elHighway = document.getElementById("highway")
const elCombined = document.getElementById("combined")
const elCountry = document.getElementById("country")
const elDescription = document.getElementById("description")
const elID = document.getElementById("id")
const elAslDet = document.getElementById("asldet")
const elSkeletonDet = document.getElementById("skeletoon")
let elIDD = null;

async function getById(id) {
    elIDD = id;
    document.title = "Yuklanmoqda..."
    try {
        const req = await fetch(`https://json-api.uz/api/project/fn44/cars/${id}`)
        const res = await req.json()
        return res
    } catch {
        throw new Error("Ma'lumotni olishda xatolik bo'ldi")
    }
}

function set(el, value) {
  // qiymat bo‘sh bo‘lsa yoki yo‘q bo‘lsa
  if (value === undefined || value === null || String(value).trim() === "") {
    el.innerText = "no-data";
    return;
  }

  // agar raqam bo‘lishi shart bo‘lsa va raqam bo‘lmasa
  if (el.dataset.type === "number" && isNaN(Number(value))) {
    el.innerText = "no-data";
    return;
  }

  // normal holatda qiymatni qo‘yamiz
  el.innerText = value;
}


function ui(data) {
  document.title = data.name;

  set(elTitle, data.name);
  set(elDescription, data.description);
  set(elTrim, data.trim);
  set(elGeneration, data.generation);
  set(elYear, data.year);
  set(elColorName, data.colorName);
  set(elCategory, data.category);
  set(elDoorCount, data.doorCount);
  set(elSeatCount, data.seatCount);
  set(elMaxSpeed, data.maxSpeed);
  set(elAcceleration, data.acceleration);
  set(elEngine, data.engine);
  set(elHorsePower, data.horsepower);
  set(elFuelType, data.fuelType);
  set(elCountry, data.country);
  set(elID, elIDD);

  // fuel consumption → 3 field
  set(elCity, data?.fuelConsumption?.city);
  set(elHighway, data?.fuelConsumption?.highway);
  set(elCombined, data?.fuelConsumption?.combined);

  // color style
  elColor.style.background = data.color || "no-data";
}


window.addEventListener("DOMContentLoaded", () => {
    const data = new URLSearchParams(location.search);
    const id = data.get("id");
    
    getById(id)
    .then((res) => {
        ui(res);
    })
    .catch(() => {})
    .finally(() => {
        elSkeletonDet.classList.add("hidden")
        elAslDet.classList.remove("hidden")
    })


})