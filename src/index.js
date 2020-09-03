document.addEventListener('DOMContentLoaded', function(){
    //grab element from DOM to place all dog objects in
    const dogBar = document.querySelector('#dog-bar')
    const dogInfo = document.querySelector('#dog-info')
    const filter = document.querySelector('#good-dog-filter')
    let allPups = []
    
    //grab data from API
    function grabData(){
    fetch('http://localhost:3000/pups')
    .then(resp => resp.json())
    .then(renderPups)
    }

    grabData();

    //create a function that iterates through the returned api data
    function renderPups(pups){
        console.log(pups)
        for(let pup of pups){
            const id = pup.id
            const name = pup.name
            const isGoodDog = pup.isGoodDog
            const image = pup.image
            const puppy = {
                name: name,
                isGoodDog: isGoodDog,
                image: image,
                id: id
            }
            renderPup(puppy)
            allPups.push(puppy)
        }

    }

    //add pup name to the DOM 
    function renderPup(dog){
        const span = document.createElement('span')
        span.innerText = `${dog.name}`
        dogBar.append(span)
    }

    function dispayPup(pup){
        dogInfo.innerHTML = `<img src='${pup.image}'><h2>${pup.name}</h2><button>${pup.isGoodDog == true ? "Good Dog" : "Bad Dog"}</button>`
    }

    //add pup info to the dog-info class when name is clicked
    dogBar.addEventListener('click', function(e){
        for(pup of allPups){
            if(pup.name == e.target.innerText){
                dogInfo.classList = `${pup.id}`
                dispayPup(pup)
            }
        }
    })

    //good/bad dog button click
    dogInfo.addEventListener('click', function(e){
        if(e.target.matches('button')){
            const dog = e.target.parentNode.className
            fetch(`http://localhost:3000/pups/${dog}`, {
                method: 'PATCH', headers: {
                   'Content-type': "application/json",
                    Accept: "applicatiopn/json"
                },
                body: JSON.stringify({
                    isGoodDog: e.target.innerText == "Bad Dog" ? true : false
                })    
            })
            .then(resp => resp.json())
            .then(data => dispayPup(data))
            .catch(function(){
                console.log("Error")
            })
        }
        if(filter.innerText.includes("ON")){
            renderPups(goodDogs()
        }
    })

    function goodDogs(allDogs){
        let goodDogs = []
        for(let dog of allDogs){
            if(dog.isGoodDog == true){
                goodDogs.push(dog)
            }
        }
        return goodDogs
    }


    filter.addEventListener('click', function(e){
        if(filter.innerText.includes('OFF')){
            filter.innerText = 'Filter good dogs: ON'
            dogBar.innerHTML = ""  
            renderPups(goodDogs(allPups))   
        } else {
            filter.innerText = 'Filter good dogs: OFF'
            dogBar.innerHTML = ""  
            allPups = []
            grabData();
        }
    })


})

