//Doggies are a Treat. Throw Poop at everything!
document.addEventListener('DOMContentLoaded', (event) => {
    console.log('DOM fully loaded and parsed');
    let good = false
    get(good)
    let btn= document.getElementById("good-dog-filter")
    btn.addEventListener('click',(e)=>{
        // console.log("This is the toggle for filter")
        if(e.target.innerHTML=="Filter good dogs: OFF")
        {
            e.target.innerHTML="Filter good dogs: ON"
            good=true
            // console.log(`Good is ${good} = Filter is on`)
        }
        else
        {
            e.target.innerHTML="Filter good dogs: OFF"
            good=false
            // console.log(`Good is ${good} = Filter is off`)
        }
        console.log(good)
        const bar = document.getElementById('dog-bar')
        while (bar.firstChild){bar.removeChild(bar.firstChild)}
        get(good)
    })
});



function get (good){
    fetch('http://localhost:3000/pups')
    .then(res=>res.json())
    .then(string=>{
        // console.log(`filter is ${good}`)
        if (good===false){objectify(string,good)}
        if (good===true){filter(string,good)}
    })
    
}

function objectify(string,good){
    // console.log(string)
    // console.log(typeof string)
    // dogs=Object.keys(string)
    // dog =string[dogs[0]]
    // console.log(dog)
    console.log(good)
    for (dog of string){
        render(dog,good)
    }
}

function filter(string,good){
    console.log(good)
    // console.log(string)
    for (dog of string){
        if (dog.isGoodDog===true){
        render(dog,good)
        }
    }
}

function render (dog,good){
    // console.log(dog)
    const faker = {
        name: dog.name,
        id: dog.id,
        good: dog.isGoodDog,
        image: dog.image
    }
    // console.log(faker)
    // console.log(`${good} is all the way at the render level`)
    makeDog(dog,good)
}

function makeDog(dog,good){
    // console.log(`${good} is the value of good and it is at the make dog level`)
    const bar = document.getElementById('dog-bar')
    const container = document.getElementById("dog-summary-container")

    //Creating for dog bar
    const span = document.createElement("span")
    span.style.display='hidden'
    span.id = "dog-span"
    span.innerHTML=dog.name
    span.dataset.id=dog.id
    bar.appendChild(span)
    span.addEventListener('click',(e)=>{
        if (e.target){
            while (container.firstChild){container.removeChild(container.firstChild)}
            //Creating for container - img, h2/name, button
            const div= document.createElement('div')
            // div.style.display='none'
            div.classList.add('dog-div')
            div.dataset.id=dog.id
            const img = document.createElement('img')
            img.src = dog.image
            img.style.width='300px'
            const name = document.createElement('h2')
            name.innerText=`${dog.name}`
            const button= document.createElement('button')
            let status= dog.isGoodDog
            button.id= `${dog.isGoodDog}`
            div.appendChild(img)
            div.appendChild(name)
            div.appendChild(button)
            container.appendChild(div)
            if (dog.isGoodDog){button.innerText='Good Dog!'}else{button.innerText='Bad Dog!'}
            button.addEventListener('click',(e)=>{
                console.log("good dog and bad dog works")
                if (e.target.id==="true"){
                    e.target.id="false"
                    button.innerText='Bad Dog!'
                    status=false
                }else{
                    e.target.id="true"
                    button.innerText='Good Dog!'
                    status=true
                }
                console.log(`what is ${status}`)
                const options = {
                    method: "PATCH",
                    headers: {
                    "content-type": "application/json", // mime-types
                    "accept": "application/json"
                    },
                    body: JSON.stringify({isGoodDog: status})
                }
                fetch("http://localhost:3000/pups/"+dog.id,options)
                //This should refresh the bar with good and bad dogs after the button is push
                while (bar.firstChild){bar.removeChild(bar.firstChild)}
                get(good)
            })
        }
    })
}