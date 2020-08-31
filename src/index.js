document.addEventListener("DOMContentLoaded", function () {
  getPups();
});

const baseUrl = "http://localhost:3000/pups/";
const getPups = () => {
  fetch(baseUrl)
    .then((resp) => resp.json())
    .then((pups) => renderPups(pups));
};
const renderAPup = (pup) => {
  const dogBox = document.querySelector("#dog-summary-container");
  const dogBar = document.querySelector("#dog-bar");
  const span = document.createElement("span");

  span.innerText = pup.name;

  const dogSwitch = () => {
    const div = document.createElement("div");
    div.setAttribute("data-id", pup.id);

    div.classList.add("dog-info");
    div.innerHTML = `<img src=${pup.image} class="image"> <h2>${pup.name}</h2>`;

    const button = document.createElement("button");
    if (pup.isGoodDog) {
      button.innerText = "bad puppy";
    } else if (!pup.isGoodDog) {
      button.innerText = "Is a good puppiee";
    }

    const goodBadSwitcheroo = () => {
      //   console.log(pup.isGoodDog);
      putDoge(pup.id, !pup.isGoodDog);
      button.removeEventListener("click", goodBadSwitcheroo);
    };

    button.addEventListener("click", goodBadSwitcheroo);
    dogBox.innerHTML = "";
    div.append(button);
    dogBox.append(div);
  };

  span.addEventListener("click", dogSwitch);
  dogBar.append(span);
};
const renderPups = (pups) => {
  for (const pup of pups) {
    renderAPup(pup);
  }
};

const putDoge = (id, isGoodDog) => {
  let formData = {
    isGoodDog: isGoodDog,
  };

  let configObj = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(formData),
  };
  fetch(`${baseUrl}${id}`, configObj)
    .then((resp) => resp.json())
    .then((pup) => {
      const button = document.querySelector(`[data-id="${pup.id}"] button`);
      if (pup.isGoodDog) {
        button.innerText = "bad puppy";
      } else if (!pup.isGoodDog) {
        button.innerText = "Is a good puppiee";
      }
      const goodBadSwitcheroo = () => {
        //   console.log(pup.isGoodDog);
        putDoge(pup.id, !pup.isGoodDog);
        button.removeEventListener("click", goodBadSwitcheroo);
      };

      button.addEventListener("click", goodBadSwitcheroo);
    });
};
