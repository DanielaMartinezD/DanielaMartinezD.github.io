document.addEventListener("DOMContentLoaded", function () {
    const apiKey = "8e9c73ad414348bab531002f7e690cc1"; 
    const category = "sports"; 
    const url = `https://newsapi.org/v2/top-headlines?category=${category}&country=us&pageSize=10&apiKey=${apiKey}`;

    const newsContainer = document.getElementById("news-container");
    if (!newsContainer) {
        console.error("Error: News container not found :(.");
        return;
    }

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            if (data.articles && data.articles.length > 0) {
                displayNews(data.articles);
            } else {
                console.warn("News not found.");
                newsContainer.innerHTML = "<p>News not available at the moment.</p>";
            }
        })
        .catch(error => console.error("Error fetching news:", error));

    function displayNews(articles) {
        newsContainer.innerHTML = ""; // Limpia contenido previo

        articles.forEach(article => {
            const newsCard = document.createElement("div");
            newsCard.className = "col-md-6 col-lg-4";

            newsCard.innerHTML = `
                <div class="card news-card">
                    <div class="card-body">
                        <h4 class="card-tittle">${article.title}</h4>
                        <h5 class="text">${article.description || 'No description available.'}</h5>
                        <h6 class="text"><strong>Source:</strong> ${article.source.name}</h6>
                        <a href="${article.url}" target="_blank" class="button">Read more</a>
                    </div>
                </div>
            `;

            newsContainer.appendChild(newsCard);
        });
    }
});
