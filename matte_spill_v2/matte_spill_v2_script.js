//definerer variabelnavn for de forskjellige knappene
let btn1El = document.querySelector('#primtall')
let btn2El = document.querySelector('#del3')
let btn3El = document.querySelector('#del5')
let btn4El = document.querySelector('#ingen')

//definerer variabel for poeng, poeng-div, høyeste poengsum og høyeste poengsum-div
let poeng = 0;
let poengEl = document.querySelector('#poeng')
let hoy_poeng = 0;
let hoy_poengEl = document.querySelector('#hoy_poeng')



function game(){ //funksjon som skjer om igjen hver gang neste-kanppen trykkes på
    
    // definerer variabel for det tilfedige tallet, tall-div, og setter det tilfeldige tallet som tekst i tall-div
    let tilfeldig_tall = (Math.floor(Math.random()*100) + 1)
    let tallEl = document.querySelector('#tall')
    tallEl.innerText = tilfeldig_tall

    aktiver_knapp() //sørger for at det er mulig å trykke på knappene når funksjonen game kjøres

    //bruker array for å finne ut om tallet er et primtall
    let array = [];
    function sjekk_primtall(){
        for (let i=2; i < tilfeldig_tall; i++){

            if (tilfeldig_tall % i != 0){
            array.push(i)
            }
        }
    }
    sjekk_primtall();

    if(tilfeldig_tall % 3 == 0 && tilfeldig_tall % 5 == 0){ //gir knapp 2 og 3 class riktig hvis det tilfeldige tallet er delelig med 3 og 5
        document.querySelector("#del3").classList.add("riktig")
        document.querySelector("#del5").classList.add("riktig")       
    }
    else if(tilfeldig_tall == 3){ //gir knapp 1 og 2 class riktig hvis det tilfeldige tallet er 3
        document.querySelector("#primtall").classList.add("riktig")
        document.querySelector("#del3").classList.add("riktig")
    }  
    else if(tilfeldig_tall == 5){ //gir knapp 1 og 3 class riktig hvis det tilfeldige tallet er 5
        document.querySelector("#primtall").classList.add("riktig")
        document.querySelector("#del5").classList.add("riktig")
    }
    else if(tilfeldig_tall % 3 == 0){ //gir knapp 2 class riktig hvis det tilfeldige tallet er delelig med 3 
        document.querySelector("#del3").classList.add("riktig")
    }
    else if(tilfeldig_tall % 5 == 0){ //gir knapp 3 class riktig hvis det tilfeldige tallet er delelig med 5
        document.querySelector("#del5").classList.add("riktig")
    }
    else if (array.length+2 == tilfeldig_tall){ //gir knapp 1 class riktig hvis det tilfeldige tallet er et primtall
        document.querySelector("#primtall").classList.add("riktig")
    }
    else { //gir knapp 4 class riktig hvis det tilfeldige tallet ikke stemmer med noen av de andre if-testene
        document.querySelector("#ingen").classList.add("riktig")
    }
    
    //funksjon sjekk_svar og lag_slett_knapp kjøres hver gang man tykker på en av knappene
    btn1El.addEventListener('click', sjekk_svar )
    btn1El.addEventListener('click', lag_slett_knapp )
    btn2El.addEventListener('click', sjekk_svar )
    btn2El.addEventListener('click', lag_slett_knapp )
    btn3El.addEventListener('click', sjekk_svar )
    btn3El.addEventListener('click', lag_slett_knapp )
    btn4El.addEventListener('click', sjekk_svar )
    btn4El.addEventListener('click', lag_slett_knapp )

}
game()


function deaktiver_knapp(){ //deaktiverer knappen som sier neste for at det ikke skal være mulig å svare flere ganger
    document.getElementById("primtall").disabled = true;
    document.getElementById("del3").disabled = true;
    document.getElementById("del5").disabled = true;
    document.getElementById("ingen").disabled = true;
}
function aktiver_knapp(){ //aktiverer knappen som sier neste for at det skal være mulig å trykke på dem
    document.getElementById("primtall").disabled = false;
    document.getElementById("del3").disabled = false;
    document.getElementById("del5").disabled = false;
    document.getElementById("ingen").disabled = false;
}


function sjekk_svar(e){
    if(e.target.classList.contains("riktig")){ // hvis knappen man trykker på har class riktig::
        e.target.style.backgroundColor = "rgba(0, 255, 0, 70%)" //bakgrunnsfarge endres til grønn

        poeng++ //setter poeng til å bli 1 større hver gang man tar riktig
        poengEl.innerHTML = `Poeng: ${poeng}`

        if (poeng > hoy_poeng) { //lager høyeste poengsum
            hoy_poeng = poeng
        }
        
        hoy_poengEl.innerHTML = `Høyeste poengsum: ${hoy_poeng}`

        deaktiver_knapp() //deaktiverer knapp
    }
    else{ //hvis knappen man trykker på ikke har class riktig
        e.target.style.backgroundColor = "rgba(255, 0, 0, 70%)" //bakgrunnsfarge endres til rød

        poeng = 0 //poeng settes tilbake til 0
        poengEl.innerHTML = `Poeng: ${poeng}`

        deaktiver_knapp() //deaktiverer knapp 
    }
}

function tilbakestill(){ //fjerner class riktig
    document.querySelector("#primtall").classList.remove("riktig")
    document.querySelector("#del3").classList.remove("riktig")
    document.querySelector("#del5").classList.remove("riktig")
    document.querySelector("#ingen").classList.remove("riktig")
}

function lag_slett_knapp(e){ //funksjon som lager og fjerner knappen som sier neste
    let btn = e.currentTarget;
    let btn_neste = document.createElement("button");
    btn_neste.innerHTML = "Neste";
    btn_neste.id = "neste"
    btn_neste.addEventListener('click', tilbakestill)
    btn_neste.onclick = function() {
        btn.style.backgroundColor = "rgb(210, 210, 210)"
        game()

        function fjernKnapp() {
            let fjern = document.getElementById('neste');
            fjern.parentNode.removeChild(fjern);
            return false;
        }
        fjernKnapp()
    };
    document.body.appendChild(btn_neste);
}






// Henter <h1>-elementet
let h5El = document.querySelector("h5");

// Undersøker om localStorage-variabelen er satt
if (localStorage.antallBesok) {
  localStorage.antallBesok = Number(localStorage.antallBesok) + 1;
} 
else {
  localStorage.antallBesok = 1;
}
h5El.innerHTML = "Det har vært " + localStorage.antallBesok + " besøk på denne nettsiden."; 