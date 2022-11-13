const homeView = document.getElementById('home-page');
const addMovieView = document.getElementById('add-movie');
const movieExample = document.getElementById('movie-example');
const editMovieView = document.getElementById('edit-movie');
const loginView = document.getElementById('form-login');
const registerView = document.getElementById('form-sign-up');

const viewsContext = {
    homeView,
    addMovieView,
    movieExample,
    editMovieView,
    loginView,
    registerView
}

showHome(viewsContext);


function showHome(context){
    //Object.values(context).map(elm => elm.remove());
    
}