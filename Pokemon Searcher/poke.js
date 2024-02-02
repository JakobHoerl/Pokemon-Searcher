const button = document.getElementById("search-button");
const input = document.getElementById("search-input");
const pkName = document.getElementById("pokemon-name");
const pkId = document.getElementById("pokemon-id");
const pkWeight = document.getElementById("weight");
const pkHeight = document.getElementById("height");
const pkType = document.getElementById("types");
const spriteContainer = document.getElementById("sprite-container");

button.addEventListener("click", (e) => {
  e.preventDefault();

  if (input.value !== "") {
    input.value = input.value.replace(/\s+/g, "-");
    console.log(input.value);
    fetch(
      `https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${input.value.toLowerCase()}`
    )
      .then((res) => res.json())
      .then((data) => {
        displayPokemon(data);
      })
      .catch((error) => {
        alert("Pokémon not found");
      });
  } else {
    alert("Please enter a name");
  }
});

const displayPokemon = (input) => {
  pkName.innerText = input.name.toUpperCase();
  pkId.innerText = `#${input.id}`;
  pkWeight.innerText = `Weight: ${input.weight}`;
  pkHeight.innerText = `Height: ${input.height}`;
  types(input);
  spriteContainer.innerHTML = `<img id="sprite" src ="${input.sprites["front_default"]}">`;
  attributes(input);
};
const types = (typee) => {
  pkType.innerHTML = "";
  typee.types.forEach((el) => {
    pkType.innerHTML += `<span class="type ${
      el.type.name
    }">${el.type.name.toUpperCase()}</span>`;
  });
};

const attributes = (el) => {
  el.stats.forEach(({ base_stat, stat }) => {
    document.getElementById(`${stat.name}`).innerText = `${base_stat}`;
  });
};

const resetInput = () => {
  pkName.innerText = "";
  pkId.innerText = "";
  pkWeight.innerText = "";
  pkHeight.innerText = "";
  spriteContainer.innerHTML = "";
  document.querySelectorAll(".td").forEach((el) => {
    el.innerText = "";
  });
};
