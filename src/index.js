document.addEventListener('DOMContentLoaded', () => {
  const dogBar = document.querySelector('#dog-bar')
  const dogInfo = document.querySelector('#dog-info')
  const dogImage = document.createElement('img')
  const dogName = document.createElement('h2')
  const dogButton = document.createElement('button')
  dogButton.id = 'good-dog'
  const filterButton = document.querySelector('#good-dog-filter')
  filterButton.dataset.status = 'off'
  
  const clickHandler = () => {
    document.addEventListener('click', e => {
      if (e.target.matches('.dog-selector')) {
        showDog(e.target.dataset.id)
      } else if (e.target.matches('#good-dog')) {
        toggleGoodDog(e.target)
      } else if (e.target.matches('#good-dog-filter')) {
        toggleBadDogs()
      }
    })
  }
  
  const addDog = (dog) => {
    const dogSelector = document.createElement('span')
    dogSelector.className = 'dog-selector'
    dogSelector.dataset.id = dog.id
    dogSelector.dataset.goodDog = dog.isGoodDog
    dogSelector.textContent = dog.name
    dogBar.append(dogSelector)
  }
  
  const getDogs = () => {
    fetch('http://localhost:3000/pups')
    .then(response => response.json())
    .then(dogs => {
      for(const dog of dogs) {
        addDog(dog)
      }
    })
  }
  
  const showDog = (id) => {
    fetch(`http://localhost:3000/pups/${id}`)
    .then(response => response.json())
    .then(dog => {
      dogImage.src = dog.image
      dogName.textContent = dog.name
      dogButton.dataset.goodDog = dog.isGoodDog
      dogButton.textContent = dog.isGoodDog? 'Good Dog!' : 'Bad Dog!'
    })
    
    dogInfo.dataset.dogId = id
    dogInfo.append(dogImage)
    dogInfo.append(dogName)
    dogInfo.append(dogButton)
  }

  const toggleGoodDog = (button) => {
    const id = button.parentElement.dataset.dogId
    let isGoodDog
    const dogSelector = document.querySelector(`[data-id='${id}']`)

    if (button.dataset.goodDog === 'true') {
      button.dataset.goodDog = 'false'
      button.textContent = 'Bad Dog!'
      isGoodDog = false
      dogSelector.dataset.goodDog = 'false'
      dogSelector.style.display = 'none'
    } else {
      button.dataset.goodDog = 'true'
      button.textContent = 'Good Dog!'
      isGoodDog = true
      dogSelector.dataset.goodDog = 'true'
      dogSelector.style.display = ''
    }

    const options = {
      method: 'PATCH',
      headers: {
        'acceot': "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({isGoodDog: isGoodDog})
    }

    fetch(`http://localhost:3000/pups/${id}`, options)
  }

  const toggleBadDogs = () => {
    const badDogs = document.querySelectorAll('.dog-selector')

    if (filterButton.dataset.status === 'off') {
      for(let dog of badDogs) {
        if (dog.dataset.goodDog === 'false') {
          dog.style.display = 'none'
        }
        filterButton.textContent = 'Filter good dogs: ON'
        filterButton.dataset.status = 'on'
      }
    } else {
      for(let dog of badDogs) {
        dog.style.display = ''
      }
      filterButton.textContent = 'Filter good dogs: OFF'
      filterButton.dataset.status = 'off'
    }
  }
  
  getDogs()
  clickHandler()
})
