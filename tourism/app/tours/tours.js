class Tura{
    constructor( naziv, duzina,opis,tagovi){
       
        this.naziv = naziv;
        this.duzina = duzina;
        this.opis = opis;
        this.tagovi = tagovi;
        
    }
}
let ture = [];
function inicijalizacijaTure(){
    ture=[
        new Tura("Avalski toranj", "8", "Izlet do Avalskog tornja uz šetnju kroz prirodu.", ["priroda", "izlet", "vidikovac"]),
        new Tura("Istorijski Beograd", "6", "Obilazak najznačajnijih istorijskih znamenitosti Beograda.", ["istorija", "kultura", "grad"]),
        new Tura("Šetnja Kalemegdanom", "3", "Opuštena gradska šetnja kroz Kalemegdan i Beogradsku tvrđavu.", ["tvrdjava", "istorijska", "park"])
    ];
    prikaziTure();
}

function prikaziTure() {
    let table=document.querySelector("#tours-body");
    table.innerHTML="";
    console.log("Funkcija radi!");
    console.log("Tabela:", table);
    console.log("Ture:", ture);
    for(let i=0; i<ture.length; i++){
        let tr=document.createElement("tr");
        let naziv =document.createElement("td");
        let duzina =document.createElement("td");

        naziv.textContent=ture[i].naziv;
        duzina.textContent=ture[i].duzina;
        tr.appendChild(naziv);
        tr.appendChild(duzina);
        tr.addEventListener("click", function(){
            prikaziDetalje(ture[i]);
            
        });
        table.appendChild(tr);
    }

}
function prikaziDetalje(tura){
    let p=document.createElement("p");
    p.innerHTML= "<strong>Naziv:</strong> " + tura.naziv + "<br>" +
              "<strong>Duzina:</strong> " + tura.duzina + "<br>" +
              "<strong>Opis:</strong> " + tura.opis + "<br>" +
              "<strong>Tagovi:</strong> " + tura.tagovi.join(", ");
    let detalji= document.querySelector(".tour-details");
    if(detalji.firstChild){
        detalji.firstChild.remove();
    }
    detalji.appendChild(p);
}

document.addEventListener("DOMContentLoaded", inicijalizacijaTure)