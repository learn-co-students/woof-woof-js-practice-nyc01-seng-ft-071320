document.addEventListener("DOMContentLoaded", (e) => {
    const BASEURL = "http://localhost:3000/pups";
    const dogBar = document.getElementById('dog-bar');
    const dogCont = document.getElementById('dog-summary-container');
    const dogInfo = document.getElementById('dog-info');

    const getDogs = () => {
        fetch(BASEURL)
        .then(resp => resp.json())
        .then(dogData => renderDogs(dogData))
    }

    const renderDogs = (dogData) => {
        for (dog of dogData) {
            renderDog(dog);
        }
    }

    const renderDog = (dog) => {
        const dogSpan = document.createElement('span');
        dogSpan.className='dogClass';
        dogSpan.innerText = dog.name;
        dogBar.append(dogSpan)

        dogSpan.addEventListener('click', (e) => {
            if (e.target.className === "dogClass") {
                renderSingleDog(dog)
            }
        })
    }

    const renderSingleDog = (dog) => {
        dogInfo.innerHTML = ""
        dogInfo.innerHTML = ""
        const dogImg = document.createElement("img")
        dogImg.src = dog.image

        const dogTitle = document.createElement("h2")
        dogTitle.innerText = dog.name

        const dogButton = document.createElement("button")
        dogButton.innerText = dog.isGoodDog ? "Good Dog!" : "Bad Dog!"
        dogButton.dataset.id = dog.id
        dogButton.addEventListener("click", onGoodDogButtonClick)

        dogInfo.append(dogImg, dogTitle, dogButton)
    }

    const onGoodDogButtonClick = (e) => {
        let newValue;
         if (e.target.innerText.includes("Good")){
            e.target.innerText = "Bad Dog"
            newValue = false
        } else {
            e.target.innerText = "Good Dog"
            newValue = true
        }
        toggleGoodDog(e.target.dataset.id, newValue)
    }


    const toggleGoodDog = (id, newValue) => {
        const options = {
            method: "PATCH",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify({
              isGoodDog: newValue
            })
          }
          return fetch(BASEURL + `/${id}`, options)
            .then(resp => resp.json())
    }

    getDogs();
})