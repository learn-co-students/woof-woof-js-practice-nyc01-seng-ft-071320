document.addEventListener('DOMContentLoaded', e => {
    const url = 'http://localhost:3000/pups/'
    const bar = document.getElementById('dog-bar')
    let dogInfo = document.getElementById('dog-info')
    let infoShow = document.getElementById('dog-info')
    let filterButton = document.getElementById('good-dog-filter')
    let doggosList
    
    function getDoggos() {
        fetch(url)
        .then(resp => resp.json())
        .then(doggos => showDoggos(doggos))
    }
    
    function showDoggos(doggos) {
        doggosList = doggos
        for (const doggo of doggos) {
            showDoggo(doggo)
        }
    }
    
    function showDoggo(doggo) {
        const span = document.createElement('span')
        span.innerText = doggo.name
        span.dataset.doggoId = doggo.id
        bar.append(span)
    }

    function getDoggoByName(name) {
        for (let doggoData of doggosList) {
            if (name == doggoData.name) {
                return doggoData
            }
        }
    }
    
    
    function barClickHandler() {
        bar.addEventListener('click', e => {
            if (e.target.matches('span')) {
                let name = e.target.textContent 
                let doggo = getDoggoByName(name)
                let button = document.createElement('button')
                let nameNode = document.createElement('h2')
                nameNode.innerText = doggo.name
                if (doggo.isGoodDog == true) {
                    button.innerText = 'Good Dog!'
                } else {button.innerText = 'Bad Dog!'}
                infoShow.innerHTML = `<img src=${doggo.image}>`
                infoShow.append(nameNode)
                infoShow.append(button)
            }
        }
        )}
    
    function makeDoggoGoodOrBad(target, doggo) {
        console.dir(target)
        if (target.innerText == "Good Dog!") {
            target.innerText = "Bad Dog!"
        } else if (target.innerText == "Bad Dog!") {
            target.innerText = "Good Dog!"
        }
        doggo.isGoodDog = !doggo.isGoodDog
        console.log(doggo.isGoodDog)
        doggoFromList = doggosList.find(d => {return d.name === doggo.name})
    }
    
    
    function dogInfoClickHandler() {
        dogInfo.addEventListener('click', e => {
            if (e.target.matches('button')) {
                let name = e.target.previousSibling.textContent
                let doggo = getDoggoByName(name)
                let config = {
                    method: 'PATCH',
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application.json"
                    },
                    body: JSON.stringify({
                        "isGoodDog": !doggo.isGoodDog
                    })
                }
                fetch(url + doggo.id, config)
                .then(resp => resp.json())
                .then(makeDoggoGoodOrBad(e.target, doggo))
            }
        })
    }
    
    function showGoodDogs() {
        console.log(doggosList)
        let badBoys = doggosList.filter(d => {return d.isGoodDog === false})
        console.log(badBoys)
        badBoys.forEach(b => {
            let badSpan = document.querySelector(`span[data-doggo-id='${b.id}']`)
            badSpan.remove()
        })
    }

    function hideGoodDogs() {
        console.log(doggosList)
        let goodBoys = doggosList.filter(d => {return d.isGoodDog === true})
        goodBoys.forEach(d => {
            let goodSpan = document.querySelector(`span[data-doggo-id='${d.id}']`)
            goodSpan.remove()
        })
    }

    
    function filter() {
        filterButton.addEventListener('click', e => {
            if (filterButton.innerText == 'Filter good dogs: OFF') {
                showGoodDogs()
                filterButton.innerText = 'Filter good dogs: ON'
            } else 
            if (filterButton.innerText == 'Filter good dogs: ON') {
                hideGoodDogs()
                filterButton.innerText = 'Filter good dogs: OFF'
                getDoggos()
                console.log('hey')
            }
        })
    }
    
    filter()
    dogInfoClickHandler()
    barClickHandler()
    getDoggos()
})