const maindiv = document.getElementById("main-div");
const inputField = document.getElementById("inputField");

const fetchAPI = async () => {
  maindiv.innerHTML =
    '<div class="spinner-border text-primary" role="status"><span class="visually-hidden">Loading...</span></div>';
  const url =
    "https://newsapi.org/v2/everything?" +
    `q=${inputField.value}&` +
    "from=2024-12-06&" +
    "sortBy=popularity&" +
    "apiKey=8f583a08ac594127b72210caca824172";

  try {
    const req = new Request(url);
    const data = await fetch(req);
    const response = await data.json();
    const articles = response.articles;

    if (articles.length === 0) {
      maindiv.innerHTML = '<p class="text-danger">No results found!</p>';
      return;
    }

    maindiv.innerHTML = "";

    articles.map((article) => {
      maindiv.innerHTML += `
                        <div class="card">
                           <img src="${
                             article.urlToImage ||
                             "https://via.placeholder.com/300"
                           }" class="card-img-top" alt="News Image">
                            <div class="card-body">
                                <h5 class="card-title">${
                                  article.title || "No Title"
                                }</h5>
                                <p class="card-text">${
                                  article.description ||
                                  "No Description Available"
                                }</p>
                                <a href="${
                                  article.url
                                }" target="_blank" class="btn btn-primary">Read More</a>
                            </div>
                        </div>`;
    });
  } catch (error) {
    maindiv.innerHTML =
      '<p class="text-danger text-center">Something went wrong. Please try again later.</p>';
    console.error("Error fetching data:", error);
  }
};

const search = () => {
  fetchAPI();
};
