//Step 2 COMPLETE
//Add the pups to the dog bar div
//create a fetch get request for the pups
//create a span for each pup and put it into the dog-bar div

//Step 3 COMPLETE
//Create a click listener for the dog bar spans.
//When clicked the dogs image, name and isGoodDog status will show up in the div with an id of dog info
//An img tag will hold the image
//A h2 tag will hold the dog name
//a button will hold the text of Good Dog! if the status is good or Bad Dog! if the status is bad

//Step 4 COMPLETE
//Event listener for our good dog bad dog button
//When clicked the button should change from good to bad
//When this happens the dog db should be edited for that dog to change their isGoodDog status

//Step 5 Bonus
//Add click event for filter dogs button
//text chagnes from off to on or on to off
//DogBar should only show the good dogs if the filter is on

document.addEventListener('DOMContentLoaded', function(e) {

    const dogBar = document.querySelector('div#dog-bar')

    function getPups() {
        fetch("http://localhost:3000/pups")
        .then(response => response.json())
        .then(dogs => {
            renderDogs(dogs);
            window.theDogs = dogs;
        })
    }

    function renderDogs(dogs) {
        for(const dog of dogs){
            dogBar.insertAdjacentHTML('beforeend', `<span id="${dog.name}" class="dog-span">${dog.name}</span>`)
        }
    }

 
        document.addEventListener('click', function(e) {

            if(e.target.matches('span.dog-span')){
                let ourDog = window.theDogs.find(function(dog) {
                    return e.target.id === dog.name 
                })
                let dogInfo = document.querySelector(`div#dog-info`)
   
                dogInfo.insertAdjacentHTML('beforeend', `<img src="${ourDog.image}">
                <h2>${ourDog.name}</h2>
                <button id="${ourDog.name}" class="good-dog-button">${goodDogStatus(ourDog)}</button>`);
            }
            
            else if(e.target.matches('button.good-dog-button')){
                let ourDog = window.theDogs.find(function(dog) {
                    return e.target.id === dog.name 
                })
                if ( e.target.innerText === "Good Dog!"){
                    e.target.innerText = "Bad Dog!"
                    fetch(`http://localhost:3000/pups/${ourDog.id}`, { 
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/json',
                            Accept: "application/json"
                        },
                        body: JSON.stringify({
                            "isGoodDog": false
                        })
                    
                    }
                    )
                }
                else if (e.target.innerText === "Bad Dog!") {
                    e.target.innerText = "Good Dog!"
                    fetch(`http://localhost:3000/pups/${ourDog.id}`, { 
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/json',
                            Accept: "application/json"
                        },
                        body: JSON.stringify({
                            "isGoodDog": true
                        })
                    
                    }
                    )
                }
        
            }
            else if(e.target.matches("button#good-dog-filter")){
                let badDogs = window.theDogs.filter(function(dog) {
                    return dog.isGoodDog === false
                })
                if(e.target.innerText === "Filter good dogs: OFF") {
                    e.target.innerText = "Filter good dogs: ON"
                    for(const dog of badDogs){
                        dogBar.querySelector(`span#${dog.name}`).remove();
                    }
                }
                else if(e.target.innerText === "Filter good dogs: ON"){
                    e.target.innerText = "Filter good dogs: OFF"
                    renderDogs(badDogs)
                }
            }
        })

        function goodDogStatus(dog) {
            if(dog.isGoodDog){
                return "Good Dog!"
            }
            else {
                return "Bad Dog!";
            }
        }




    getPups();

})