// 1. Model jednog restorana
class Restaurant {
    constructor(naziv, opis, tipoviKuhinje) {
        this.naziv = naziv;
        this.opis = opis;
        this.tipoviKuhinje = tipoviKuhinje;
    }
}

// 2. Početni podaci
let restorani = [
    new Restaurant(
        "Italijanski kutak",
        "Autentični ukusi Italije u centru grada",
        ["italijanska"]
    ),
    new Restaurant(
        "Azijski raj",
        "Specijaliteti azijske i indonežanske kuhinje",
        ["azijska", "indonezanska"]
    ),
    new Restaurant(
        "Gurmanova oaza",
        "Tradicionalna domaća jela i specijaliteti sa roštilja",
        ["srpska", "balkanska"]
    )
];

// 3. Učitavanje prethodno sačuvanih restorana
const sacuvaniRestorani = localStorage.getItem("tourapp-restorani");

if (sacuvaniRestorani !== null) {
    restorani = JSON.parse(sacuvaniRestorani);
}

// 4. Pronalaženje HTML elemenata
const listaRestorana = document.getElementById("restaurant-list");
const detaljiRestorana = document.getElementById("restaurant-details");
const form = document.getElementById("forma");
const cuisineContainer = document.getElementById("cuisineContainer");

// 5. Prikaz detalja izabranog restorana
function prikaziDetalje(restoran) {
    detaljiRestorana.replaceChildren();

    const naziv = document.createElement("h3");
    naziv.textContent = restoran.naziv;

    const kuhinje = document.createElement("p");
    kuhinje.textContent =
        "Tip kuhinje: " + restoran.tipoviKuhinje.join(", ");

    const opis = document.createElement("p");
    opis.textContent = "Opis: " + restoran.opis;

    detaljiRestorana.append(naziv, kuhinje, opis);
    detaljiRestorana.hidden = false;
}

// 6. Pravljenje jednog reda tabele
function createRestaurantRow(restoran) {
    const red = document.createElement("tr");

    const naziv = document.createElement("td");
    naziv.textContent = restoran.naziv;

    const kuhinje = document.createElement("td");
    kuhinje.textContent = restoran.tipoviKuhinje.join(", ");

    red.append(naziv, kuhinje);
    listaRestorana.append(red);

    red.addEventListener("click", function () {
        prikaziDetalje(restoran);
    });
}

// 7. Prikaz svih restorana pri otvaranju stranice
for (let i = 0; i < restorani.length; i++) {
    createRestaurantRow(restorani[i]);
}

// 8. Dodavanje novog polja za kuhinju
function addCuisineField() {
    const polje = document.createElement("div");
    polje.className = "cuisine-input";

    const unos = document.createElement("input");
    unos.type = "text";
    unos.name = "cuisines";
    unos.placeholder = "Unesite kuhinju";
    unos.required = true;
    unos.setAttribute("aria-label", "Tip kuhinje");

    const dugmeUkloni = document.createElement("button");
    dugmeUkloni.type = "button";
    dugmeUkloni.textContent = "-";

    dugmeUkloni.addEventListener("click", function () {
        polje.remove();
    });

    polje.append(unos, dugmeUkloni);
    cuisineContainer.append(polje);

    unos.focus();
}

// 9. Čuvanje celog niza restorana
function sacuvajRestorane() {
    localStorage.setItem(
        "tourapp-restorani",
        JSON.stringify(restorani)
    );
}

// 10. Obrada slanja forme
function handleFormSubmission() {
    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const formData = new FormData(form);

        const naziv = formData.get("naziv").trim();
        const opis = formData.get("opis").trim();
        const kuhinje = formData.getAll("cuisines");

        if (naziv === "" || opis === "") {
            alert("Unesite naziv i opis restorana.");
            return;
        }

        for (let i = 0; i < kuhinje.length; i++) {
            kuhinje[i] = kuhinje[i].trim();

            if (kuhinje[i] === "") {
                alert("Popunite ili uklonite prazno polje za kuhinju.");
                return;
            }
        }

        const noviRestoran = new Restaurant(naziv, opis, kuhinje);

        restorani.push(noviRestoran);
        sacuvajRestorane();
        createRestaurantRow(noviRestoran);

        form.reset();

        // Ostaje samo prvo polje sa dugmetom "+".
        while (cuisineContainer.children.length > 1) {
            cuisineContainer.lastElementChild.remove();
        }
    });
}

// 11. Aktiviranje obrade forme
handleFormSubmission();