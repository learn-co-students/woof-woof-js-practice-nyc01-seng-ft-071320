document.addEventListener("DOMContentLoaded", e => {
    const baseUrl = "http://localhost:3000/pups/"
    const fetchDoggos = () => {
        fetch(baseUrl)
            .then(resp => resp.json())
            .then(renderDogSpans)
    }

    const dogBar = document.getElementById('dog-bar')
    const renderDogSpans = (doggos) => {
        for (const dog of doggos) {
            let dogSpan = document.createElement('span');
            dogSpan.innerText = dog.name;
            dogSpan.dataset.num = dog.id
            dogSpan.dataset.goodDog = dog.isGoodDog
            dogBar.append(dogSpan)


        }
    }

    const clickHandler = () => {
        document.addEventListener('click', e => {
            if (e.target.matches('span')) {
                const span = e.target
                let dogId = span.dataset.num
                fetchDog(dogId)
            }
            if (e.target.matches('#dog-info > button')) {
                let button = e.target
                let dogId = button.previousElementSibling.dataset.num
                if (button.innerText === "Good Dog!") {
                    patchDog(dogId, "false")
                } else {
                    patchDog(dogId, "true")
                }
            }
            if (e.target.matches('#good-dog-filter')) {
                let filterButton = e.target;
                if (filterButton.textContent === "Filter good dogs: OFF") {
                    filterButton.textContent = "Filter good dogs: ON"
                    filterDogs("on")
                } else if (filterButton.textContent === "Filter good dogs: ON") {
                    filterButton.textContent = "Filter good dogs: OFF"
                    console.log("off")
                    filterDogs("off")
                }
            }
        });
    }

    const filterDogs = (value) => {
        let dogSpans = document.querySelectorAll("#dog-bar > span")
        if (value === "on") {
            dogSpans = Array.from(dogSpans)
            dogSpans = dogSpans.filter((d) => {
                if (d.dataset.goodDog === "true") {
                    return d
                }
            })
            dogBar.innerHTML = ""
            for (const span of dogSpans) {
                dogBar.append(span)
            }
        } else if (value === "off") {
            dogBar.innerHTML = ""
            fetchDoggos()
        }
    }

    const fetchDog = (dogId) => {
        fetch(baseUrl + dogId)
            .then(resp => resp.json())
            .then(renderDogInfo)
    }

    const renderDogInfo = (dog) => {
        let dogInfoDiv = document.getElementById('dog-info')
        let dogStatus = dog.isGoodDog
        if (dogStatus == "true" || dogStatus == true) {
            dogStatus = "Good Dog!"
        } else if (dogStatus == "false" || dogStatus == false) {
            dogStatus = "Bad Dog!"
        }
        dogInfoDiv.innerHTML = `
        <img src="${dog.image}">
        <h2 data-num="${dog.id}">${dog.name}</h2>
        <button>${dogStatus}</button>
        `
    }

    const patchDog = (dogId, value) => {
        const options = {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({ isGoodDog: value })
        }
        fetch((baseUrl + dogId), options)
            .then(resp => resp.json())
            .then(renderDogInfo)
    }




    clickHandler()
    fetchDoggos()
})