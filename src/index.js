document.addEventListener("DOMContentLoaded", ()=>{
    const PUPS_URL = 'http://localhost:3000/pups/'

    const renderDog = (dog) => {
        const div = document.getElementById('dog-bar')
        const span = document.createElement('span')
        span.dataset.dogId = dog.id
        span.dataset.dogName = dog.name
        span.dataset.dogGoodness = dog.isGoodDog
        span.dataset.dogImage = dog.image
        span.innerText = dog.name
        div.append(span)
    }

    const renderDogs = (dogs) => {
        const div = document.getElementById('dog-bar')
        const info = document.getElementById('dog-info')
        div.innerHTML = ''
        info.innerHTML = ''
        dogs.forEach(dog => renderDog(dog))
    }

    const getAllDogs = () => {
        fetch(PUPS_URL)
            .then(response => response.json())
            .then(dogs => renderDogs(dogs))
    }

    const getGoodDogs = () => {
        fetch(PUPS_URL)
            .then(response => response.json())
            .then(dogs => {
                const goodDogs = dogs.filter(dog => (dog.isGoodDog === true))
                renderDogs(goodDogs)
            })
    }

    const toggleFilter = () => {
        const filter = document.getElementById('good-dog-filter')
        const position = filter.dataset.toggle
        if (position === 'off'){
            filter.dataset.toggle = 'on'
            filter.innerText = 'Filter good dogs: ON'
            getGoodDogs()
        } else if(position === 'on') {
            filter.dataset.toggle = 'off'
            filter.innerText = 'Filter good dogs: OFF'
            getAllDogs()
        }
    }

    const renderInfo = (dog) => {
        const div = document.getElementById('dog-info')
        div.innerHTML = ''
        const img = document.createElement('img')
        img.src = dog.image
        const h2 = document.createElement('h2')
        h2.innerText = dog.name
        const button = document.createElement('button')
        button.className = 'dog-goodness'
        button.dataset.dogId = dog.id
        button.dataset.dogName = dog.name
        button.dataset.dogGoodness = dog.isGoodDog
        button.dataset.dogImg = dog.image

        if(button.dataset.dogGoodness === 'true'){
            button.innerText = 'Good Dog!'
        } else if(button.dataset.dogGoodness === 'false') {
            button.innerText = 'Bad Dog!'
        }

        div.append(img)
        div.append(h2)
        div.append(button)

        // debugger
        
    }

    const changeGoodness = (dogArg) => {
        const dogObj = {
            id: dogArg.id,
            name: dogArg.name,
            isGoodDog: dogArg.isGoodDog,
            image: dogArg.image
        }
        const configObj = {
            method: "PATCH",
            headers: {
                'content-type': 'application/json',
                'accept': 'application/json'
            },
            body: JSON.stringify(dogObj)
        }

        fetch(`${PUPS_URL}${dogArg.id}`, configObj)
            .then(response => response.json())
            .then(dog => renderInfo(dog))
    }

    const makeDogObject = (dogId, dogName, dogGoodness, dogImage) => {
        const dog = {
            id: dogId,
            name: dogName,
            isGoodDog: dogGoodness,
            image: dogImage
        }
        return dog
    }

    const clickHandler = () => {
        document.addEventListener("click", (e)=>{
            const button = e.target

            if(button.closest('span')){
                const dogSpan = button.dataset
                const dog = makeDogObject(dogSpan.dogId, dogSpan.dogName, dogSpan.dogGoodness, dogSpan.dogImage)
                renderInfo(dog)
            } else if(button.matches('.dog-goodness')){

                console.log('change the goodness')
                const goody = button.dataset
                const dog = makeDogObject(goody.dogId, goody.dogName, goody.dogGoodness, goody.dogImage)
                
                if(goody.dogGoodness === 'true'){
                    dog.isGoodDog = false
                    changeGoodness(dog)
                    // debugger
                } else if(goody.dogGoodness === 'false') {
                    dog.isGoodDog = true
                    changeGoodness(dog)
                    // debugger
                }

            } else if (button.matches('#good-dog-filter')){
                toggleFilter()
            }
        })
    }

    clickHandler()
    getAllDogs()




})

/*

make global constant PUPS_URL with api endpoint 'http://localhost:3000/pups'

See a horizontal menu of dogs

- make function called renderDog that takes dog object as argument
        - select div with id #dog-bar
        - create span element and set its innerText to dog.name
        - set span.dataset.dogId equal to dog.id
        - set span.dataset.dogName equal to dog.name
        - set span.dataset.dogGoodness equal to dog.isGoodDog
        - set span.dataset.dogImage equal to dog.image
        - set span.innerText equal to dog.name
        - append span to div

- make function called renderDogs that takes dogs response array
        - select div with id 'dog-bar'
        - clear the div.innerHTML by setting it to a blank array
        - foreach dog of dogs, call renderDog and pass the dog object as argument


- make function called getAllDogs 
        - make fetch statement
        - on 2nd then, pass dogs array response to a call to renderDogs function

See a long button that says 'Filter good dogs: ON' or off

make function called moreInfo that takes a dog object as its argument
        - select div with id #dog-info
        - clear div#dog-info.innerHTML
        - create img element
        - set img.src equal to dog.image
        - create h2 element
        - set h2 innerText equal to dog.name
        - create button element
        - set button.className equal to 'dog-goodness'
        - set button.dataset.dogId equal to dog.id
        - set button.dataset.dogGoodness equal to dog.isGoodDog
        - set button.innerText to equal 'Good Dog!' if dog.isGoodDog else 'Bad Dog!'
        - append to div#dog-info: 
            * img
            * h2
            * button

make function called changeGoodness that takes dogId and dogGoodness as arguments
    - declare const dogObj
        - set dogObj.id = dogId
        - set dogObj.isGoodDog = dogGoodness
    - declare const configObj
        - method: "PATCH"
        - headers
        - body: JSON.stringify(dogObj)
    - make fetch statement and interpolate PUPS_URL and dogId for the url
        - call moreInfo function and pass the dog response object as an argument


make a function called getGoodDogs
    - fetch statement to get dogs array response
        - in 2nd .then
            - receive dogs response array
            - declare a const goodDogs equal to dogs.filter where dog.isGoodDog is equal to true
            - call renderDogs and pass goodDogs as its argument

make clickHandler with addEventListener

    - Click on dog spans in the dog bar and see more info
        - if button.closest 'span' -- if the closest element to button is span 
            - declare a const dog and set its attributes
                - id: button.dataset.dogId
                - name: button.dataset.dogName
                - isGoodDog: button.dataset.dogGoodness
                - image: button.dataset.dogImage
            - call moreInfo function and pass the dog object as its argument
    
    - Click on the button to toggle the button's value between 'good dog' or 'bad dog'
        - if button.matches '.dog-goodness'
            - call changeGoodness function and pass button.dataset.dogId and button.dataset.dogGoodness as its arguments


    - Click the filter button to toggle and sort the horizontal menu between good and bad
        - if button.matches '#good-dog-filter'
            - if button.dataset.toggle is equal to 'off'
                - call getGoodDogs function
                - set button.dataset.toggle equal to 'on'
                - set button.innerText equal to 'Filter good dogs: ON'
            - else 
                - call getAllDogs function
                - set button.dataset.toggle equal to 'off'
                - set button.innerText equal to 'Filter good dogs: OFF'




*/