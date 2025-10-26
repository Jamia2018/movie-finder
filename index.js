let first_movie_input = document.getElementById('first_movie_input');
let second_movie_input = document.getElementById('second_movie_input');

let movie_first = document.getElementById('movie_first');
let movie_second = document.getElementById('movie_second');

let first_search_btn = document.getElementById('first_search');
let second_search_btn = document.getElementById('second_search');

let first_box_office = 0;
let second_box_office = 0;

let first_rating = 0;
let second_rating = 0;


//Get DOM element
let first_poster_ele = document.getElementById('first_movie_poster');
let first_title_ele = document.getElementById('first_movie_name');
let first_box_office_ele = document.getElementById('first_movie_box_office');
let first_rating_ele = document.getElementById('first_movie_rating')

let second_poster_ele = document.getElementById('second_movie_poster');
let second_title_ele = document.getElementById('second_movie_name');
let second_box_office_ele = document.getElementById('second_movie_box_office');
let second_rating_ele = document.getElementById('second_movie_rating')

//Output Div
let first_output_div = document.getElementById('first_output');
let second_output_div = document.getElementById('second_output');

function getData(input, movie_dropdown) {

    axios.get('https://www.omdbapi.com/', {
        params: {
            apikey: '430c370a',
            s: input.value
        }
    }).then((response) => {

        if (response.data.Response) {
            if (typeof (response.data.Search.length) === "number") {

                for (let i = 0; i < response.data.Search.length; i++) {
                    let child = document.createElement('option');
                    child.value = response.data.Search[i].Title;
                    movie_dropdown.appendChild(child);
                }

                first_search_btn.addEventListener('click', function (e) {
                    // if(e.key==="Enter"){
                    // }

                    axios.get('https://www.omdbapi.com/', {
                        params: {
                            apikey: '430c370a',
                            t: input.value
                        }
                    }).then((response) => {
                        // console.log(response);
                        first_output_div.style.display = "block";
                        first_poster_ele.src = response.data.Poster;
                        first_title_ele.innerHTML = response.data.Title;
                        first_box_office_ele.innerHTML = response.data.BoxOffice+"<br/> Box Office ";
                        first_rating_ele.innerHTML = response.data.imdbRating+"<br/> Rating ";

                        first_box_office = response.data.BoxOffice;
                        first_rating = response.data.imdbRating;


                        let temp = response.data.BoxOffice.replace(/[\W]/g, "");

                        first_box_office = Number(temp);
                        first_rating = Number(response.data.imdbRating);

                        if (first_box_office < second_box_office) {
                            first_box_office_ele.style.backgroundColor = "#ff9763";
                            second_box_office_ele.style.backgroundColor = "#47ff85";
                        } else if (first_box_office > second_box_office) {
                            first_box_office_ele.style.backgroundColor = "#47ff85";
                            second_box_office_ele.style.backgroundColor = "#ff9763";
                        } else{
                            first_box_office_ele.style.backgroundColor = "white";
                            second_box_office_ele.style.backgroundColor = "wihte";
                        }

                        if (first_rating < second_rating){
                            first_rating_ele.style.backgroundColor = "#ff9763";
                            second_rating_ele.style.backgroundColor = "#47ff85";
                        } else if (first_rating > second_rating){
                            first_rating_ele.style.backgroundColor = "#47ff85";
                            second_rating_ele.style.backgroundColor = "#ff9763";
                        } else{
                            first_rating_ele.style.backgroundColor = "white";
                            second_rating_ele.style.backgroundColor = "white";
                        }

                    }), (err) => {
                        console.log(err);
                    }
                })

                second_search_btn.addEventListener('click', function (e) {
                    // if(e.key==="Enter"){
                    

                    axios.get('https://www.omdbapi.com/', {
                        params: {
                            apikey: '430c370a',
                            t: input.value
                        }
                    }).then((response) => {
                        // console.log(response);
                        second_output_div.style.display = "block";
                        second_poster_ele.src = response.data.Poster;
                        second_title_ele.innerHTML = response.data.Title;
                        second_box_office_ele.innerHTML = response.data.BoxOffice+"<br/> Box Office ";
                        second_rating_ele.innerHTML = response.data.imdbRating+"<br/> Rating ";

                        second_box_office = response.data.BoxOffice;
                        second_rating = response.data.imdbRating;


                        let temp = response.data.BoxOffice.replace(/[\W]/g, "");

                        second_box_office = Number(temp);
                        second_rating = Number(response.data.imdbRating);

                        if (second_box_office < first_box_office) {
                            second_box_office_ele.style.backgroundColor = "#ff9763";
                            first_box_office_ele.style.backgroundColor = "#47ff85";
                        } else if (second_box_office > first_box_office){
                            second_box_office_ele.style.backgroundColor = "#47ff85";
                            first_box_office_ele.style.backgroundColor = "#ff9763";
                        } else{
                            second_box_office_ele.style.backgroundColor = "white";
                            first_box_office_ele.style.backgroundColor = "white";
                        }

                        if (second_rating < first_rating) {
                            second_rating_ele.style.backgroundColor = "#ff9763";
                            first_rating_ele.style.backgroundColor = "#47ff85";
                        } else if (second_rating > first_rating){
                            second_rating_ele.style.backgroundColor = "#47ff85";
                            first_rating_ele.style.backgroundColor = "#ff9763";
                        } else{
                            second_rating_ele.style.backgroundColor = "white";
                            first_rating_ele.style.backgroundColor = "white";
                        }

                    }), (err) => {
                        console.log(err);
                    }
                    // }
                })

            }
            window.addEventListener
        }
        if (input.value == "") {
            movie_dropdown.remove();
        }
    },
        (error) => {
            console.log(error);
        }
    );
}

first_movie_input.addEventListener('keypress', () => {
    getData(first_movie_input, movie_first);
})
second_movie_input.addEventListener('keypress', () => {
    getData(second_movie_input, movie_second);
})
