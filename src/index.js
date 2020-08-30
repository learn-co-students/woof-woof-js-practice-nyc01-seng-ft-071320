document.addEventListener("DOMContentLoaded", function() {
    
    const dogBar = document.getElementById("dog-bar")
    const dogInfo = document.getElementById("dog-info")
    const url = "http://localhost:3000/pups/"

    function fetchDogs() {
        fetch(url)
        .then(resp => resp.json())
        .then(data => renderSpan(data))
    }

    function renderSpan(dogs){
        console.log(dogs)
        console.log(typeof(dogs))
        for(let dog of dogs){
            const span = document.createElement("span")
            span.innerText = dog.name
            dogBar.append(span)
        }
    }

    function clickHandler(){
        document.addEventListener("click", (e) => {
            const button = e.target
            console.log(e)
            if(button.tagName == "SPAN"){
                console.log(e)
                console.log("Inside a span")
                const selectedDog = button.innerText
                dogLookup(selectedDog)
            } else if (button.matches(".filter-good-dogs")){
                console.log("made it inside filter good dogs")
                button.innerText = "Bad Dog!"
                button.className = "filter-bad-dogs"
                let dogId = button.dataset.userid
                
                console.log(`This is the curr dog's ID + ${dogId}`)
                
                let options = {
                    method: "PATCH",
                    headers: {
                        "content-type": "application/json",
                        "accept": "application/json"
                    },
                    body: JSON.stringify({ isGoodDog: false })
                }
                fetch(url + dogId, options)
                .then(resp => resp.json())
                .then(console.log)
                

            } else if (button.matches(".filter-bad-dogs")){
                console.log("made it inside filter bad dogs")
                button.innerText = "Good Dog!"
                button.className = "filter-good-dogs"

                let dogId = button.dataset.userid

                let options = {
                    method: "PATCH",
                    headers: {
                        "content-type": "application/json",
                        "accept": "application/json"
                    },
                    body: JSON.stringify({ isGoodDog: true })
                }
                fetch(url + dogId, options)
                .then(resp => resp.json())
                .then(console.log)
                
            } 
            // else if (button.matches("#good-dog-filter")){
            //     if(button.innerText.includes("OFF")){
            //         console.log(`Inside the good dog filter`)
            //         button.innerText = "Filter good dogs: ON"
            //         dogInfo.innerHTML = "";
            //         renderGoodDogsSpan()
            //     }
            // }
        })
    }



    function dogLookup(dog){
        fetch("http://localhost:3000/pups")
        .then(resp => resp.json())
        .then(data => {
            let dogObj = data.find(el => el.name === dog)
            console.log(`inside doglookup ${dogObj.image}`)
            renderDog(dogObj)
        })
    }



    function renderDog(dogObj){
        console.log(`Greetings from renderDog ${dogObj.name}`)
        let dogInfoChildren = {}
        if(dogObj.isGoodDog){
            dogInfoChildren = `
            <img src=${dogObj.image}>
            <h2>${dogObj.name}</h2>
            <button data-userID="${dogObj.id}" class="filter-good-dogs">Good Dog!</button>
        `
        console.log(`Getting the dogobj.id ${dogObj.id}`)
        dogInfo.innerHTML = "";
        dogInfo.innerHTML = dogInfoChildren
        } else
            dogInfoChildren = `
            <img src=${dogObj.image}>
            <h2>${dogObj.name}</h2>
            <button data-userID="${dogObj.id}" class="filter-bad-dogs">Bad Dog!</button>
        `
        dogInfo.innerHTML = "";
        dogInfo.innerHTML = dogInfoChildren
    }

    // function renderGoodDogsSpan(){
    //     //Filter good dogs and create object and pass to renderspan
    //     // dogBar.innerHTML = ""
    //     fetch(url)
    //     .then(resp => resp.json())
    //     .then(data => 
    //     {
    //         let newDogObj = {}   
    //         {
    //             let dogObj = data.find(el => el.isGoodDog === true)
    //             newDogObj.push(dogObj)
    //         }
    //     renderSpan(dogObj)})

    // }


fetchDogs()
clickHandler()
})