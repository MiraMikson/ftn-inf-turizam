class Tura{
    constructor( naziv, duzina,opis,tagovi){
       
        this.naziv = naziv;
        this.duzina = duzina;
        this.opis = opis;
        this.tagovi = tagovi;
        
    }
}
let ture = [];
let tagovi = [];
function inicijalizacijaTure(){
    const sacuvaneTure=localStorage.getItem("ture");
    if(sacuvaneTure){
        ture=JSON.parse(sacuvaneTure);
    }else{
    ture=[
        new Tura("Avalski toranj", "8", "Izlet do Avalskog tornja uz šetnju kroz prirodu.", ["priroda", "izlet", "vidikovac"]),
        new Tura("Istorijski Beograd", "6", "Obilazak najznačajnijih istorijskih znamenitosti Beograda.", ["istorija", "kultura", "grad"]),
        new Tura("Šetnja Kalemegdanom", "3", "Opuštena gradska šetnja kroz Kalemegdan i Beogradsku tvrđavu.", ["tvrdjava", "istorijska", "park"])
    ];
     localStorage.setItem("ture", JSON.stringify(ture));
    }
    prikaziTure();
    dodajTuru();
    dodajTag();
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
function dodajTag(){
    document.querySelector("#dodajTag").addEventListener("click", function(){
      let input =document.querySelector("#tagovi");
      let tag=input.value;
      if(tag !== ""){
        tagovi.push(tag);
        let span=document.createElement("span");
        span.textContent= tag + " ";
        let  x = document.createElement("button");
        x.textContent="x";
        x.type="button";
        x.addEventListener("click", function(){
            let index=tagovi.indexOf(tag);
            tagovi.splice(index, 1);
            span.remove();
        });
        span.appendChild(x);
        document.querySelector("#listaTagova").appendChild(span);
        input.value="";

      }
    });
}
function dodajTuru(){
    let submitButton=document.querySelector("#submitBtn");
    submitButton.addEventListener("click", function(){
        const form=document.querySelector("#AddTourForm")
        const formData= new FormData(form);
        const naziv=formData.get("naziv");
        const duzina= formData.get("duzina");
        const opis=formData.get("opis");
        const novaTura =new Tura(naziv, duzina, opis, tagovi);
        ture.push(novaTura);
        localStorage.setItem("ture", JSON.stringify(ture));
        prikaziTure();
        form.reset();
        tagovi = [];
        document.querySelector("#listaTagova").innerHTML = "";
    })
}



document.addEventListener("DOMContentLoaded", inicijalizacijaTure)