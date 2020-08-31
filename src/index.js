document.addEventListener("DOMContentLoaded", e => {

    const baseUrl = "http://localhost:3000/pups/"

   function getDataHandler(goodBoys = 0) {

    fetch(baseUrl)
        .then(response => response.json())
        .then(checkRender)

    function checkRender(dogs){
        if (goodBoys === 0){
            renderAllDogs(dogs)
        }else{
            renderGoodDogs(dogs)
        }
    }
    }

    function renderGoodDogs(dogs) {
        for (dogObj of dogs) {
            if (dogObj.isGoodDog === true){
                renderDog(dogObj)
            }
        }
    }

    function renderAllDogs(dogs) {
        for (dogObj of dogs) {
            renderDog(dogObj)
        }
    }

    function renderDog(dogObj) {
        const dogDiv = document.querySelector("#dog-bar")
        const dogSpan = document.createElement("span")
        dogSpan.innerText = dogObj.name
        dogSpan.dataset.id = dogObj.id
        dogDiv.append(dogSpan)
            
        }

    function editStatus(id, newStatus){
        console.log(newStatus)
      const options = {
            method: "PATCH",
            headers:{
                "content-type": "application/json",
                "accept": "application/json"
            },
            body: JSON.stringify({isGoodDog: newStatus})
        }
        fetch(baseUrl+ id, options)
    }

    function clickHandler() {
        document.addEventListener("click", function(e){
            if(e.target.matches("span")){
            const span = e.target
            const name = e.target.innerText
            console.log(span.dataset.id)
            fetchDog(span.dataset.id)
            }
            if(e.target.matches("#statusButton")){
                const button = e.target
                    if(button.innerText === "Good Boy!"){
                        button.innerText = "Bad Dog!"
                        editStatus(button.dataset.id, false)
                    }
                    else{
                        button.innerText = "Good Boy!"
                        editStatus(button.dataset.id, true)
                    }
                }
            if (e.target.matches("#good-dog-filter")){
                const button = e.target
                const dogDiv = document.querySelector("#dog-bar")

                if (button.innerText === "Filter good dogs: OFF"){
                    button.innerText = "Filter good dogs: ON"
                    dogDiv.innerHTML = ""
                    getDataHandler(1)
                }else{
                    button.innerText = "Filter good dogs: OFF"
                    dogDiv.innerHTML = ""
                    getDataHandler()
                }
            }
        })

    function renderSpecDog(dog){
        function status(dog){
            if (dog.isGoodDog === true){
                return "Good Boy!"
            }else{
                return "Bad Dog!"
            }
         }

        const dogLi = document.createElement("li")
        const container = document.querySelector("#dog-info")
        container.innerHTML = `
        <img src=${dog.image}
        <h2>Name: ${dog.name}</h2>
        <button id = "statusButton" data-id=${dog.id}>${status(dog)}</button>
        `
    }
    function fetchDog(id){
        fetch(baseUrl + id)
        .then(response => response.json())
        .then(renderSpecDog)
    }
}
    clickHandler()
    getDataHandler()
})