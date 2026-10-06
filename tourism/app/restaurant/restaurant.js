const restorani = [
    {
        naziv: "Italijanski kutak",
        opis: "Autenticni ukusi Italije u centru grada",
        tipoviKuhinje: ["italijanska"]
    },
    {
        naziv: "Azijski raj",
        opis: "Azijska, Indonezanska",
        tipoviKuhinje: ["azijska", "indonezanska"]
    },
    {
        naziv: "Gurmanova oaza",
        opis: "Srpska, Balkanska",
        tipoviKuhinje: ["srpska", "balkanska"]
    }
];

const listaRestorana = document.getElementById("restaurant-list");
const detaljiRestorana = document.getElementById("restaurant-details");

for (let i = 0; i < restorani.length; i++) {
    const restoran = restorani[i];

    const red = document.createElement("tr");

    const naziv = document.createElement("td");
    naziv.textContent = restoran.naziv;

    const kuhinje = document.createElement("td");
    kuhinje.textContent = restoran.tipoviKuhinje.join(", ");

    red.append(naziv, kuhinje);
    listaRestorana.append(red);
    red.addEventListener("click", function () {
    detaljiRestorana.replaceChildren();

    const nazivDetalja = document.createElement("h3");
    nazivDetalja.textContent = restoran.naziv;

    const kuhinjeDetalja = document.createElement("p");
    kuhinjeDetalja.textContent =
        "Tip kuhinje: " + restoran.tipoviKuhinje.join(", ");

    const opisDetalja = document.createElement("p");
    opisDetalja.textContent = "Opis: " + restoran.opis;

    detaljiRestorana.append(nazivDetalja, kuhinjeDetalja, opisDetalja);
    detaljiRestorana.hidden = false;
});
}