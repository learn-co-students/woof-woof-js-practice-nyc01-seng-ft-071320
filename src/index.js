document.addEventListener('DOMContentLoaded', e => {
  const dogBar = document.getElementById('dog-bar')
  const dogInfo = document.getElementById('dog-info')
  const dogFilter = document.getElementById('good-dog-filter')

  function createDogSpan(dogObj){
    const newSpan = document.createElement('span')
    newSpan.innerText = `${dogObj.name}`
    newSpan.dataset.dogId = dogObj.id
    newSpan.dataset.goodBad = dogObj.isGoodDog
    dogBar.append(newSpan)
  }

  function addDogsToBar(){
    fetch('http://localhost:3000/pups')
      .then(resp => resp.json())
      .then(function(obj){
        for (const pup of obj){
          createDogSpan(pup)
      }
    })
  }

  addDogsToBar()
  

  function createDogShow(dogObj){
    const button = document.createElement('button')
    button.classList.add('good-bad')
    button.dataset.dogId = dogObj.id
    const newDiv = document.createElement('div')
    newDiv.innerHTML = `
      <img src="${dogObj.image}">
      <h2>${dogObj.name}</h2>
    `
    if (dogObj.isGoodDog){
      button.innerText = "Good Dog!"
      newDiv.append(button)
    } else {
      button.innerText = "Bad Dog!"
      newDiv.append(button)
    }
    dogInfo.append(newDiv)
  }

  dogBar.addEventListener('click', e => {
    if (e.target.matches('span')){
      dogInfo.innerHTML = ""
      fetch(`http://localhost:3000/pups/${e.target.dataset.dogId}`)
      .then(resp => resp.json())
      .then(obj => createDogShow(obj))
    }
  })

  function dogPatch(dogButton){
    let goodBad = dogButton.innerText === "Good Dog!" ? false : true
    const configObj = {
      method: "PATCH", 
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
    }, 
      body: JSON.stringify({isGoodDog: goodBad})
    }
    fetch(`http://localhost:3000/pups/${dogButton.dataset.dogId}`, configObj)
    .then(resp => resp.json())
    .then( function(obj){
      return obj
    })
  }

  dogInfo.addEventListener('click', e => {
    
    if (e.target.matches('button.good-bad')){
      const array = Array.from(dogBar.children)
      if (e.target.innerText.includes('Good')){
        dogPatch(e.target)
        e.target.innerText = "Bad Dog!"
        if (dogFilter.innerText.includes('ON') ){
          const found = array.find(span => span.dataset.dogId === e.target.dataset.dogId)
          found.style.display = "none"
        }
      } else {
        dogPatch(e.target)
        e.target.innerText = "Good Dog!"
        const found = array.find(span => span.dataset.dogId === e.target.dataset.dogId)
        found.style.display = "flex"

      }
    }
  })

  function removeBadDogs(){
    const array = Array.from(dogBar.children)
    const filtered = array.filter(span => span.dataset.goodBad === "false")
    for (const span of filtered){
      span.style.display = "none"
    }
  }

  dogFilter.addEventListener('click', e => {
    if (e.target.innerText.includes('OFF')){
      removeBadDogs()
      e.target.innerText = "Filter good dogs: ON"
    } else {
      const array = Array.from(dogBar.children)
      for (const span of array){
        span.style.display = "flex"
      }
      e.target.innerText = "Filter good dogs: OFF"
    }
  })

})