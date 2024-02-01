async function getMostPopular() {

    let mostPopularContainer = document.getElementsByClassName("mostPopularContainer");
    mostPopularContainer[0].classList.remove("hideContent");

    let searchContainer = document.getElementsByClassName("searchContainer");
    searchContainer[0].classList.add("hideContent");

    let booksContainer = document.getElementsByClassName("bestSellerContainer");
    booksContainer[0].classList.add("hideContent");

    let topStoriesContainer = document.getElementsByClassName("topStoriesContainer");
    topStoriesContainer[0].classList.add("hideContent");

    let searchId = document.getElementById("searchId");
    searchId.classList.remove("active");

    let booksId = document.getElementById("booksId");
    booksId.classList.remove("active");

    let homeId = document.getElementById("homeId");
    homeId.classList.add("active");

    let topStoriesId = document.getElementById("topStoriesId");
    topStoriesId.classList.remove("active");

    try {
        let response = await fetch("https://api.nytimes.com/svc/mostpopular/v2/shared/1/facebook.json?api-key=RRFQKCV8r5vhnv1OCOAsSPueA0IjWArh");
        let mostPopular = await response.json();
        // console.log(mostPopular);

        let results = mostPopular.results;

        for (i = 0; i < results.length; i++) {
            let url = "";
            if (results[i].media.length > 0) {
                url = results[i].media[0]["media-metadata"][2].url;
            } else {
                url = "images/thumbnail.jpeg"
            }
            createPopularCard(results[i].title, results[i].abstract, url);
        }
    }
    catch (err) {
        console.log(err.message);
    }
}
getMostPopular();

function createPopularCard(articleTitle, abstract, url) {

    let card = document.createElement("div");
    card.setAttribute("class", "card");

    let image = document.createElement("img");
    image.setAttribute("card", "card-img-top");
    image.setAttribute("src", url);

    card.appendChild(image);

    let cardBody = document.createElement("div");
    cardBody.setAttribute("class", "card-body");

    let title = document.createElement("h5");
    title.innerHTML = articleTitle;

    let paragraph = document.createElement("p");
    paragraph.innerHTML = abstract;


    cardBody.appendChild(title);
    cardBody.appendChild(paragraph);

    card.appendChild(cardBody);

    let containerColumn = document.createElement("div");
    containerColumn.setAttribute("class", "col-sm-12 col-lg-4");

    containerColumn.appendChild(card);

    let cardContainer = document.getElementsByClassName("cardContainer");
    cardContainer[0].appendChild(containerColumn);

}

function searchArticle() {

    let clearSearch = document.getElementsByClassName("searchCardContainer");
    clearSearch[0].innerHTML = "";

    document.getElementById("searchInput1").value = ""

    let mostPopularContainer = document.getElementsByClassName("mostPopularContainer");
    mostPopularContainer[0].classList.add("hideContent");

    let searchContainer = document.getElementsByClassName("searchContainer");
    searchContainer[0].classList.remove("hideContent");

    let booksContainer = document.getElementsByClassName("bestSellerContainer");
    booksContainer[0].classList.add("hideContent");

    let topStoriesContainer = document.getElementsByClassName("topStoriesContainer");
    topStoriesContainer[0].classList.add("hideContent");


    let searchId = document.getElementById("searchId");
    searchId.classList.add("active");

    let homeId = document.getElementById("homeId");
    homeId.classList.remove("active");

    let booksId = document.getElementById("booksId");
    booksId.classList.remove("active");

    let topStoriesId = document.getElementById("topStoriesId");
    topStoriesId.classList.remove("active");


}

async function articleSearch() {

    let clearSearch = document.getElementsByClassName("searchCardContainer");
    clearSearch[0].innerHTML = "";


    let searchInput1 = document.getElementById("searchInput1").value;

    let response = await fetch("https://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + searchInput1 + "&api-key=RRFQKCV8r5vhnv1OCOAsSPueA0IjWArh");
    let articleResponse = await response.json();
    let results = articleResponse.response.docs;

    for (i = 0; i < results.length; i++) {
        let url = "";
        if (results[i].multimedia[3].url != null) {
            url = "https://static01.nyt.com/" + results[i].multimedia[3].url;
        } else {
            url = "images/thumbnail.jpeg";
        }
        createArticleCard(results[i].lead_paragraph, url);

    }
}

function createArticleCard(lead_paragraph, url) {

    let card = document.createElement("div");
    card.setAttribute("class", "card");

    let cardBody = document.createElement("div");
    cardBody.setAttribute("class", "card-body");

    let paragraph = document.createElement("p");
    paragraph.setAttribute("class", "card-text");
    paragraph.innerHTML = lead_paragraph;

    let image = document.createElement("img");
    image.setAttribute("class", "card-img-bottom")
    image.setAttribute("src", url);

    let columnDiv = document.createElement("div");
    columnDiv.setAttribute("class", "col-sm-12 col-lg-4");

    cardBody.appendChild(paragraph);
    card.appendChild(cardBody);
    card.appendChild(image);
    columnDiv.appendChild(card);

    let searchCardContainer = document.getElementsByClassName("searchCardContainer");
    searchCardContainer[0].appendChild(columnDiv);
}


async function bestSeller() {

    let mostPopularContainer = document.getElementsByClassName("mostPopularContainer");
    mostPopularContainer[0].classList.add("hideContent");

    let searchContainer = document.getElementsByClassName("searchContainer");
    searchContainer[0].classList.add("hideContent");

    let booksContainer = document.getElementsByClassName("bestSellerContainer");
    booksContainer[0].classList.remove("hideContent");

    let topStoriesContainer = document.getElementsByClassName("topStoriesContainer");
    topStoriesContainer[0].classList.add("hideContent");

    let searchId = document.getElementById("searchId");
    searchId.classList.remove("active");

    let homeId = document.getElementById("homeId");
    homeId.classList.remove("active");

    let booksId = document.getElementById("booksId");
    booksId.classList.add("active");

    let topStoriesId = document.getElementById("topStoriesId");
    topStoriesId.classList.remove("active");


    let response = await fetch("https://api.nytimes.com/svc/books/v3/lists/names.json?api-key=RRFQKCV8r5vhnv1OCOAsSPueA0IjWArh")
    let parseResponse = await response.json();
    let results = parseResponse.results;

    console.log(parseResponse);

    for (i = 0; i < results.length; i++) {
        bestSellerCard(results[i].list_name, results[i].updated, results[i].oldest_published_date, results[i].newest_published_date);
    }

}

function bestSellerCard(title, updated, oldDate, newDate) {

    let card = document.createElement("div");
    card.setAttribute("class", "card border-dark mt-5 col-sm-12 col-lg-4");

    let cardHeader = document.createElement("div");
    cardHeader.setAttribute("class", "card-header text-bg-primary");
    cardHeader.innerHTML = title;

    let cardBody = document.createElement("div");
    cardBody.setAttribute("class", "card-body");

    let cardTitle = document.createElement("h5");
    cardTitle.innerHTML = "Updated: " + updated;

    let p1 = document.createElement("p");
    p1.innerHTML = "oldest_published_date: " + oldDate;

    let p2 = document.createElement("p");
    p2.innerHTML = "newest_published_date: " + newDate;

    cardBody.appendChild(cardTitle);
    cardBody.appendChild(p1);
    cardBody.appendChild(p2);

    card.appendChild(cardHeader);
    card.appendChild(cardBody);

    let sellerCard = document.getElementsByClassName("sellerCard");
    sellerCard[0].appendChild(card);
}

async function topStories(){

    let mostPopularContainer = document.getElementsByClassName("mostPopularContainer");
    mostPopularContainer[0].classList.add("hideContent");

    let searchContainer = document.getElementsByClassName("searchContainer");
    searchContainer[0].classList.add("hideContent");

    let booksContainer = document.getElementsByClassName("bestSellerContainer");
    booksContainer[0].classList.add("hideContent");

    let topStoriesContainer = document.getElementsByClassName("topStoriesContainer");
    topStoriesContainer[0].classList.remove("hideContent");

    let searchId = document.getElementById("searchId");
    searchId.classList.remove("active");

    let homeId = document.getElementById("homeId");
    homeId.classList.remove("active");

    let booksId = document.getElementById("booksId");
    booksId.classList.remove("active");

    let topStoriesId = document.getElementById("topStoriesId");
    topStoriesId.classList.add("active");

    let response = await fetch("https://api.nytimes.com/svc/topstories/v2/home.json?api-key=RRFQKCV8r5vhnv1OCOAsSPueA0IjWArh");
    let parseResponse = await response.json();
    console.log(parseResponse);
    let results = parseResponse.results;

    for(i=0;i<results.length;i++){

        topStoriesCard(results[i].section,results[i].subsection,results[i].title,results[i].abstract,results[i].multimedia[1].url);

    }

}

function topStoriesCard(section,subsection,title,abstract,url){

    let card = document.createElement("div");
    card.setAttribute("class","card col-sm-12 col-lg-4");

    let imageRow = document.createElement("div");
    imageRow.setAttribute("class","row g-0");

    let imageColumn = document.createElement("div");
    imageColumn.setAttribute("class","col-md-4");

    let image = document.createElement("img");
    image.setAttribute("class","img-fluid rounded-start");
    image.setAttribute("src",url);

    let bodyColumn = document.createElement("div");
    bodyColumn.setAttribute("class","col-md-8");

    let body = document.createElement("div");
    body.setAttribute("class","card-body");

    let  cardTitle1 = document.createElement("h4");
    cardTitle1.setAttribute("class","card-title");
    cardTitle1.innerHTML = section;

    let cardTitle2 = document.createElement("h5");
    cardTitle2.setAttribute("class","card-title");
    cardTitle2.innerHTML = subsection;

    let paragraph1 = document.createElement("p");
    paragraph1.setAttribute("class","card-text");
    paragraph1.innerHTML = title;

    let paragraph2 = document.createElement("p");
    paragraph2.setAttribute("class","card-text");
    paragraph2.innerHTML = abstract;

    body.appendChild(cardTitle1);
    body.appendChild(cardTitle2);
    body.appendChild(paragraph1);
    body.appendChild(paragraph2);

    bodyColumn.appendChild(body);

    imageColumn.appendChild(image);
    imageRow.appendChild(imageColumn);
    imageRow.appendChild(bodyColumn);

    card.appendChild(imageRow);

    let storiesCard = document.getElementsByClassName("topStoriesCard");
    storiesCard[0].appendChild(card);
}
