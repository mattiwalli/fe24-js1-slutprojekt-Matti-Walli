const popular = document.querySelector("#mostpopular");

popular.addEventListener("click", () => {
  event.preventDefault();
  const PopularUrl =
    "https://api.themoviedb.org/3/movie/popular?api_key=d9e93600543beb7f1849ef7c24d7179f";

  fetch(PopularUrl)
    .then((response) => response.json())
    .then(GetpopularMovies);
});

function GetpopularMovies(PopularAPIObjekt) {
  console.log(PopularAPIObjekt);
  const Popularcontainer = document.querySelector("#Popularresults");
  Popularcontainer.innerHTML = "";

  for (let i = 0; i < 10; i++) {
    const Getmovie = PopularAPIObjekt.results[i];

    const img = document.createElement("img");
    img.src = `https://image.tmdb.org/t/p/w200${Getmovie.poster_path}`;
    const titleOfMovie = document.createElement("h4");
    titleOfMovie.textContent = Getmovie.title;

    const Thedate = document.createElement("p");
    Thedate.textContent = Getmovie.release_date;

    Popularcontainer.appendChild(img);
    Popularcontainer.appendChild(titleOfMovie);
    Popularcontainer.appendChild(Thedate);
  }
}
const topranked = document.querySelector("#topranked");

topranked.addEventListener("click", () => {
  event.preventDefault();
  const Rankedurl =
    "https://api.themoviedb.org/3/movie/top_rated?api_key=d9e93600543beb7f1849ef7c24d7179f";

  fetch(Rankedurl)
    .then((response) => response.json())
    .then(GetrankedMovies);
});

function GetrankedMovies(RankedAPIObjekt) {
  const Rankedcontainer = document.querySelector("#Rankedresults");
  Rankedcontainer.innerHTML = "";

  for (y = 0; y < 10; y++) {
    const rankedMovie = RankedAPIObjekt.results[y];

    const imgg = document.createElement("img");

    imgg.src = `https://image.tmdb.org/t/p/w200${rankedMovie.poster_path}`;

    const titleOfMovie1 = document.createElement("h4");

    titleOfMovie1.textContent = rankedMovie.title;

    const Thedate1 = document.createElement("p");

    Thedate1.textContent = rankedMovie.release_date;

    Rankedcontainer.appendChild(imgg);
    Rankedcontainer.appendChild(titleOfMovie1);
    Rankedcontainer.appendChild(Thedate1);
  }
}

const form = document.querySelector("form");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const searchPerson = form.querySelector("input").value;

  const url = `https://api.themoviedb.org/3/person/${searchPerson}?api_key=d9e93600543beb7f1849ef7c24d7179f`;
  console.log(url);

  fetch(url)
    .then((response) => {
      if (response.status >= 200 && response.status < 300) {
        return response.json();
      } else if (response.status === 404) {
        throw "This person does not exist.";
      } else {
        throw "There was an error, Please try again later.";
      }
    })
    .then(getActorInfo)
    .catch(errorMessage);

  form.reset();
});

function errorMessage(error) {
  const pError = document.querySelector("#errorText");
  error.innertext = error;
}

function getActorInfo(searchAPIObjekt) {
  const Actor = searchAPIObjekt.results;

  const personContainer = document.querySelector("#Actorresults");

  personContainer.innerHTML = "";

  const iimg = document.createElement("img");
  iimg.src = `https://image.tmdb.org/t/p/w200${Actor.profile_path}`;

  const nameActor = document.createElement("h4");
  nameActor.textContent = Actor.name;

  const Department = document.createElement("h2");
  Department.textContent = Department.known_for_department;

  const famous = document.createElement("p");
  famous.textContent = famous.popularity;

  personContainer.appendChild(iimg);
  personContainer.appendChild(nameActor);
  personContainer.appendChild(Department);
  personContainer.appendChild(famous);
}
