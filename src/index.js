document.addEventListener('DOMContentLoaded', () => {
  const dogBar = document.querySelector('#dog-bar')

  const showDog = (dog) => {
    const dogName = document.createElement('span')
    dogName.textContent = dog.name
    dogBar.append(dogName)
  }

  const getDogs = () => {
    fetch('http://localhost:3000/pups')
    .then(response => response.json())
    .then(dogs => {
      for(const dog of dogs) {
        showDog(dog)
      }
    })
  }



  getDogs()
})
