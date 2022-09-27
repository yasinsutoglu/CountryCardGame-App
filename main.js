const btn = document.querySelector("#button")
const container = document.querySelector(".container")

let rand1, rand2, rand3, rand4;

let randomNums = []

let randomCountryNum;

let gamePoint= 0
let gameCounter =0

let timeCounter;

let bestScore= 0



btn.addEventListener("click", ()=> {
    container.style.display = "none"
    timeCounter = 60

    let bestCurrentScore = localStorage.getItem("bestScore") || 0

     
    const contDiv = document.createElement("div");
    contDiv.classList.add("container-fluid");
    
     

    contDiv.innerHTML = `
    <div><span class="score">Best Score: <span></span></span> </div>
    <div class="time">${timeCounter}</div>
    <div class="title">Choose the Country ✌ </div>
    <div class="games"> <span class="gamePoint">${gamePoint}</span> / <span class="gameCounter">${gameCounter}</span></div>
    <div class="card-div mt-2"></div>
     `;
    
    document.querySelector("body").appendChild(contDiv);

    document.querySelector(".score span").innerText = `${bestCurrentScore}`

     fetchCountry();


    const intervalId = setInterval(() => {
        timeCounter--;
        document.querySelector(".time").innerText = timeCounter
        if(timeCounter<1) {
            clearInterval(intervalId)
           contDiv.style.display = "none";
           console.log(gamePoint)

            if(gamePoint>bestCurrentScore) {
                bestScore = gamePoint
                localStorage.setItem("bestScore", bestScore);
            }

        document.querySelector(".finalDiv").classList.toggle("d-none")
        document.querySelector("#newscore").innerText = `${bestCurrentScore}`
        document.querySelector("#scoreid").innerText = `${gamePoint}`
        
        }
      
     }, 1000);
})

    const fetchCountry = ()=> {
        const url = "https://restcountries.com/v3.1/all";

        fetch(url).then((res)=> {
            if(!res.ok){
                throw new Error(`something went wrong ${res.status}`)
            }
            return res.json() 
    }).then((data)=> renderCountry(data)).catch((err)=> console.log(err))
}

        const renderCountry = (countries) => {
        console.log(countries)
        rand1 = Math.trunc(Math.random()*countries.length);
        rand2 = Math.trunc(Math.random()*countries.length);
        rand3 = Math.trunc(Math.random()*countries.length);
        rand4 = Math.trunc(Math.random()*countries.length);
        
        randomNums =[rand1,rand2,rand3,rand4]
            console.log(randomNums)
        let random = Math.floor((Math.random() * 4))
        console.log(randomNums[random])


        if(randomNums[random] ==randomNums[0]) {
            randomCountryNum= randomNums[0]
        }else if(randomNums[random] ==randomNums[1]) {
            randomCountryNum = randomNums[1];

        }else if(randomNums[random] ==randomNums[2]) {
            randomCountryNum = randomNums[2];

        }else if(randomNums[random] ==randomNums[3]) {
            randomCountryNum = randomNums[3];

        }
        
        const {name:{common}, flags:{svg}} =countries[randomCountryNum];
        
       
        



        const cardDiv = document.querySelector(".card-div")
        cardDiv.innerHTML = `<div class="card mx-auto h-75" style="width: 15rem;">
            <img src="${svg}" class="card-img-top" alt="...">
            <ul class="list-group list-group-flush">
             <li class="list-group-item"> <button class="btn btn-danger w-100">${
               countries[randomNums[0]].name.common
             }</button></li>
             <li class="list-group-item"> <button class="btn btn-danger w-100">${
               countries[randomNums[1]].name.common
             }</button></li>
             <li class="list-group-item"> <button class="btn btn-danger w-100">${
               countries[randomNums[2]].name.common
             }</button></li>
             <li class="list-group-item"> <button class="btn btn-danger w-100">${
               countries[randomNums[3]].name.common
             }</button></li>
            
             </ul>
        </div>`;

           document.querySelector(".list-group").addEventListener("click", (e) => {
               if(e.target.classList.contains("btn-danger")){
                  if(  e.target.innerText == countries[randomCountryNum].name.common){
                        console.log(e.target.innerText)
                        
                        gamePoint++;
                        gameCounter++;

                        document.querySelector(".gamePoint").innerText = gamePoint
                        document.querySelector(".gameCounter").innerText = gameCounter
                        fetchCountry()
                        
                  }else {
                        gameCounter++
                        document.querySelector(".gameCounter").innerText =gameCounter
                        fetchCountry();
                }
               }
             });

    }

    document.querySelector("#try-again").addEventListener("click", ()=> {

        window.location.reload();
    })







