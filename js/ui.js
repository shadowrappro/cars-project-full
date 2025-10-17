export function ui(data) {
    const elContainer = document.getElementById("carContainer")
    elContainer.innerHTML = null;
    data.forEach(element => {
        const clone = document.getElementById("cardTemplate")
            .cloneNode(true).content;

        const elTitle = clone.querySelector(".name");
        const elTrim = clone.querySelector(".trim");
        const elGeneration = clone.querySelector(".generation");
        const elYear = clone.querySelector(".year");
        const elColor = clone.querySelector(".color");
        const elColorName = clone.querySelector(".colorName");
        const elCategory = clone.querySelector(".category");
        const elDoorCount = clone.querySelector(".doorCount");
        const elSeatCount = clone.querySelector(".seatCount");
        const elMaxSpeed = clone.querySelector(".maxSpeed");
        const elAcceleration = clone.querySelector(".acceleration");
        const elEngine = clone.querySelector(".engine");
        const elHorsePower = clone.querySelector(".horsepower");
        const elFuelType = clone.querySelector(".fuelType");
        const elCity = clone.querySelector(".city");
        const elHighway = clone.querySelector(".highway");
        const elCombined = clone.querySelector(".combined");
        const elCountry = clone.querySelector(".country");
        const elDescription = clone.querySelector(".description");

        // Buttons
        const elDeleteBtn = clone.querySelector(".js-delete");
        const elEditBtn = clone.querySelector(".js-edit");
        const elInfoBtn = clone.querySelector(".js-info");

        elTitle.innerText = element.name;
        elTrim.innerText = element.trim;
        elGeneration.innerText = element.generation;
        elYear.innerText = element.year;
        elColor.style.background = element.color;
        elColorName.innerText = element.colorName;
        elCategory.innerText = element.category;
        elDoorCount.innerText = element.doorCount;
        elSeatCount.innerText = element.seatCount;
        elMaxSpeed.innerText = element.maxSpeed;
        elAcceleration.innerText = element.acceleration;
        elEngine.innerText = element.engine;
        elHorsePower.innerText = element.horsepower;
        elFuelType.innerText = element.fuelType;
        
        //  ID
        elDeleteBtn.id = element.id;
        elEditBtn.id = element.id;
        elInfoBtn.id = element.id;

        if (element.fuelConsumption) {
            const { city, highway, combined } = element.fuelConsumption;
            elCity.innerText = city;
            elHighway.innerText = highway;
            elCombined.innerText = combined;
        }
        elCountry.innerText = element.country;
        elDescription.innerText = element.description;
        
        elContainer.appendChild(clone);
    });
}