document.addEventListener("DOMContentLoaded", function () {
  getPups();
});

const baseUrl = "http://localhost:3000/pups/";
const getPups = () => {
  fetch(baseUrl)
    .then((resp) => resp.json())
    .then((pups) => renderP(pups));
};

const renderP = (pups) => {
  const dogBox = document.querySelector("#dog-summary-container");
  const dogBar = document.querySelector("#dog-bar");

  for (const pup of pups) {
    const div = document.createElement("div");
    const span = document.createElement("span");

    span.innerText = pup.name;

    div.classList.add("dog-info");
    div.innerHTML = `<img src=${pup.image}> <h2>${pup.name}</h2>`;
    dogBox.append(div);

    const dogSwitch = (e) => {
      const button = e.target;
      // putDoge()
    };

    span.addEventListener("click", dogSwitch);
    // span.innerHTML =
    dogBar.append(span);
  }
};

// const putDoge = () =>
