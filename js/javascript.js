const popular = document.querySelector("#mostpopular");
const API_KEY = "d9e93600543beb7f1849ef7c24d7179f";

popular.addEventListener("click", () => {
  event.preventDefault();

  const PopularUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`;

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

    anime({
      targets: img,
      opacity: [0, 1],  
      duration: 1000,    
      easing: 'easeInOutQuad'
    });
    anime({
      targets: titleOfMovie,
      opacity: [0, 1],  
      duration: 1000,    
      easing: 'easeInOutQuad'
    });
    anime({
      targets: Thedate,
      opacity: [0, 1],  
      duration: 1000,    
      easing: 'easeInOutQuad'
    });
  }
}
const topranked = document.querySelector("#topranked");

topranked.addEventListener("click", () => {
  event.preventDefault();
  const Rankedurl = `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}`;

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
    
    anime({
      targets: imgg,
      opacity: [0, 1],  
      duration: 1000,    
      easing: 'easeInOutQuad'
    });
    anime({
      targets: titleOfMovie1,
      opacity: [0, 1],  
      duration: 1000,    
      easing: 'easeInOutQuad'
    });
    anime({
      targets: Thedate1,
      opacity: [0, 1],  
      duration: 1000,    
      easing: 'easeInOutQuad'
    });
  }
}


const form = document.querySelector("form");

form.addEventListener("submit", (event) => {
  event.preventDefault(); 

  const searchPerson = form.querySelector("input").value;


  const url = `https://api.themoviedb.org/3/search/multi?query=${searchPerson}&include_adult=false&language=en-US&page=1&api_key=${API_KEY}`;
  console.log(url);

  fetch(url)
    .then((response) => {
      if (response.status >= 200 && response.status < 300)  { 
        return response.json();
      } else if (response.status == 404) { 
        throw error
      } 
    })
    .then((data) => {
      
      if (data.results.length == 0) {
        throw "Incorrect typing."; 
      }
      getmultiInfo(data);  
    })
    .catch(errorMessage); 

  form.reset(); 
});

function errorMessage(error) {
  if (error == "Incorrect typing.") {
    alert("Incorrect typing, please try again.");
  } else {
    alert("Failed to get result, Check ur internet connection.");
  }
}




function getmultiInfo(searchAPIObjekt) {
  const multiSearch = searchAPIObjekt.results;

  const personContainer = document.querySelector("#Actorresults");
  const movieContainer = document.querySelector("#Movieresults");

  personContainer.innerHTML = "";
  movieContainer.innerHTML = "";

  multiSearch.forEach((result) => {

    if (result.media_type === "person") {
      const iimg = document.createElement("img");

      if (result.profile_path) {
        iimg.src = `https://image.tmdb.org/t/p/w200${result.profile_path}`;
      } else {
        iimg.src = 'https://via.placeholder.com/200'; 
      }

      const department = document.createElement("h4");
      department.textContent = result.known_for_department;

      const nameActor = document.createElement("h1");
      nameActor.textContent = result.name;

      const famousdiv = document.createElement("div");

      result.known_for.forEach((movie) => {
        const actorInfo = document.createElement("p");

        if (movie.media_type == "movie") {
          actorInfo.textContent = `Movie: ${movie.title}`;
        } else if (movie.media_type == "tv") {
          actorInfo.textContent = `TV: ${movie.name}`;
        }

        famousdiv.appendChild(actorInfo);
      });

      personContainer.appendChild(iimg);
      personContainer.appendChild(nameActor);
      personContainer.appendChild(department);
      personContainer.appendChild(famousdiv);

      
      anime({
        targets: iimg,
        opacity: [0, 1],  
        duration: 1000,    
        easing: 'easeInOutQuad'
      });

      anime({
        targets: nameActor,
        opacity: [0, 1],  
        duration: 1000,    
        easing: 'easeInOutQuad',
        delay: 200         
      });
      anime({
        targets: department,
        opacity: [0, 1],  
        duration: 1000,    
        easing: 'easeInOutQuad',
        delay: 200         
      });
      anime({
        targets: famousdiv,
        opacity: [0, 1],  
        duration: 1000,    
        easing: 'easeInOutQuad',
        delay: 200         
      });
      
      

    }

    if (result.media_type === "movie") {
      const img = document.createElement("img");

      if (result.poster_path) {
        img.src = `https://image.tmdb.org/t/p/w200${result.poster_path}`;
      } else {
        img.src = 'https://via.placeholder.com/200';
      }

      const movieTitle = document.createElement("h2");
      movieTitle.textContent = result.title;

      const dateOfMovie = document.createElement("p");
      dateOfMovie.textContent = result.release_date;

      const overviewMovie = document.createElement("p");
      overviewMovie.textContent = result.overview;

      movieContainer.appendChild(img);
      movieContainer.appendChild(movieTitle);
      movieContainer.appendChild(dateOfMovie);
      movieContainer.appendChild(overviewMovie);

      
      anime({
        targets: img,
        opacity: [0, 1],  
        duration: 1000,    
        easing: 'easeInOutQuad'
      });

      anime({
        targets: movieTitle,
        opacity: [0, 1],  
        duration: 1000,   
        easing: 'easeInOutQuad',
        delay: 200         
      });
      anime({
        targets: dateOfMovie,
        opacity: [0, 1],  
        duration: 1000,   
        easing: 'easeInOutQuad',
        delay: 200         
      });
      anime({
        targets: overviewMovie,
        opacity: [0, 1],  
        duration: 1000,   
        easing: 'easeInOutQuad',
        delay: 200         
      });
    }
  });
}
