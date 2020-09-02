# WOOF WOOF WELCOME TO DOGGO BARK BARK

THIS GOOD APPLICATION FOR LOOKING AT DOGS BOW WOW.

WHEN LOOKING AT PUP PUPS USER SHOULD BE ABLE TO:
 - CLICK ON DOGS IN THE DOG BAR TO SEE MORE INFO ABOUT THE GOOD PUPPER;
   - MORE INFO INCLUDES A DOG PIC, A DOG NAME, AND A DOG BUTTON THAT INDICATES
     WHETHER IT IS A GOOD DOG OR A BAD DOG;
 - CLICK ON GOOD DOG/BAD DOG BUTTON IN ORDER TO TOGGLE PUP GOODNESS;
 - CLICK ON "FILTER GOOD DOGS" BUTTON IN ORDER TO JUST SEE GOOD DOGS OR SEE
   ALL DOGS IN DOG BAR.

## EXAMPLE:
![Showcasing the full functionality](woof-woof-demo.gif)

### STEP 1: VIEW THE DATA

All of the dog data is stored in the `db.json` file. You'll want to access this data
using a json server. In order to do this, run `$ npm install -g json-server` and
then `$ json-server --watch db.json`.

This will setup the data on a server using restful routes at http://localhost:3000/pups.
Go ahead and head to that url in your browser to view the data.
Familiarize yourself with the attributes for each pup. Try going to `/pups/:id` to see an individual pup as well.

### STEP 2: ADD PUPS TO DOG BAR
On the page, there is a `div` with the id of `"dog-bar"`. On page load, make a fetch
to get all of the pup objects. When you have this information, you'll need to add
a `span` with the pup's name to the dog bar (ex: `<span>Mr. Bonkers</span>`).

### STEP 3: SHOW MORE INFO ABOUT EACH PUP
When a user clicks on a pup's `span` in the dog bar, that pup's info (`image`, `name`, and `isGoodDog` status) should show up in the `div` with the id of `"dog-info"`.
When you have the pup's information, the dog info `div` should have the following children:
 - an `img` tag with the pup's image url
 - an `h2` with the pup's name
 - a `button` that says `"Good Dog!"` or `"Bad Dog!"` based on whether `isGoodDog` is true or false.
 Ex:
 ```
  <img src=dog_image_url>
  <h2>Mr. Bonkers</h2>
  <button>Good Dog!</button>
 ```

### STEP 4: TOGGLE GOOD DOG
 When a user clicks the Good Dog/Bad Dog button, two things should happen:
  - The button's text should change from Good to Bad or Bad to Good
  - The corresponding pup object in the database should be updated to reflect the new isGoodDog value
    - Please note, you can update a dog by making a PATCH request to `/pups/:id`

### BONUS! STEP 5: FILTER GOOD DOGS 
When a user clicks on the Filter Good Dogs button, two things should happen:
 - The button's text should change from "Filter good dogs: OFF" to "Filter good dogs: ON", or vice versa.
 - If the button now says "ON" (meaning the filter is on), then the Dog Bar should only show pups whose isGoodDog attribute is true. If the filter is off, the Dog Bar should show all pups (like normal).



```
/*

make global constant PUPS_URL with api endpoint 'http://localhost:3000/pups'

See a horizontal menu of dogs

- make function called renderDog that takes dog object as argument
        - select div with id #dob-bar
        - create span element and set its innerText to dog.name
        - set span.dataset.dogId equal to dog.id
        - set span.dataset.dogName equal to dog.name
        - set span.dataset.dogGoodness equal to dog.isGoodDog
        - set span.dataset.dogImage equal to dog.image
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
        - if e.target.closest 'span' -- if the closest element to e.target is span 
            - declare a const dog and set its attributes
                - id: e.target.dataset.dogId
                - name: e.target.dataset.dogName
                - isGoodDog: e.target.dataset.dogGoodness
                - image: e.target.dataset.dogImage
            - call moreInfo function and pass the dog object as its argument
    
    - Click on the button to toggle the button's value between 'good dog' or 'bad dog'
        - if e.target.matches '.dog-goodness'
            - if e.target.dataset.dogGoodness
              - call changeGoodness function and pass e.target.dataset.dogId and false as its arguments
            - else
              - call changeGoodness function and pass e.target.dataset.dogId and true as its arguments


    - Click the filter button to toggle and sort the horizontal menu between good and bad
        - if e.target.matches '#good-dog-filter'
            - if e.target.dataset.toggle is equal to 'off'
                - call getGoodDogs function
                - set e.target.dataset.toggle equal to 'on'
                - set e.target.innerText equal to 'Filter good dogs: ON'
            - else 
                - call getAllDogs function
                - set e.target.dataset.toggle equal to 'off'
                - set e.target.innerText equal to 'Filter good dogs: OFF'




*/
```