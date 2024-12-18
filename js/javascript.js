const topranked = document.querySelector("#topranked");
const popular = document.querySelector("#mostpopular");
const form = document.querySelector("form");

// topranked.addEventListener("click");

popular.addEventListener("click", (event) => {
  event.preventDefault();
  const PopularUrl =
    "https://api.themoviedb.org/3/movie/popular?api_key=d9e93600543beb7f1849ef7c24d7179f";

  fetch(PopularUrl)
    .then((response) => response.json())
    .then(GetpopularMovies);
});

function GetpopularMovies(PopularAPIObjekt) {
  console.log(PopularAPIObjekt);
  const Moviecontainer = document.querySelector("#Popularresults");
  Moviecontainer.innerHTML = "";

  for (let i = 0; i < 10; i++) {
    const Getmovie = PopularAPIObjekt.results[i];

    const img = document.createElement("img");
    img.src = `https://image.tmdb.org/t/p/w200${Getmovie.poster_path}`;
    const titleOfMovie = document.createElement("h4");
    titleOfMovie.textContent = Getmovie.title;

    const Thedate = document.createElement("p");
    Thedate.textContent = Getmovie.release_date;

    Moviecontainer.appendChild(img);
    Moviecontainer.appendChild(titleOfMovie);
    Moviecontainer.appendChild(Thedate);
  }
}
