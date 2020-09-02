document.addEventListener("DOMContentLoaded", function(e){
    const baseUrl = "http://localhost:3000/pups"
    const dogDiv = document.querySelector('#dog-bar')
    
    function fetchPups() {
        fetch(baseUrl)
        .then(resp => resp.json())
        .then(dogs => dogs.forEach(dog => {renderPup(dog)}))
    }
    
    function renderPup(pup){
        const dogSpan = document.createElement("span")
        dogDiv.append(dogSpan)
        dogSpan.innerHTML = `
        <span class="doggy" data-id="${pup.id}">${pup.name}</span>`
    }

    
    
    
    
    function clickHandler() {
        document.addEventListener('click', function(e){
            const spanClick = document.querySelector('.doggy')
            const dogInfoSpan = document.querySelector('#dog-info')
            if (e.target.matches('.doggy')){
                const id = e.target.dataset.id
                fetch(baseUrl + "/" + id)
                .then(resp => resp.json())
                .then(dog => renderSingleDog(dog))

                function renderSingleDog(dog){
                    dogInfoSpan.innerHTML = `
                    <img src=${dog.image}>
                    <h2>${dog.name}</h2>
                    <button class="good-bad-dog-button">Good Dog!</button>`
                }
            } else if (e.target.matches('.good-bad-dog-button')) {
                console.log("yo")
            }
            
            
            
            
        })
        
    }
    








    clickHandler()
    fetchPups()
})