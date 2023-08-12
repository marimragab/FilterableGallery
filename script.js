document.addEventListener("DOMContentLoaded", () => {
  const filterButtons = document.querySelectorAll(".filter_buttons button");
  const filterableCards = document.querySelector(".filterable_cards");

  fetch("https://fakestoreapi.com/products")
    .then((response) => response.json())
    .then((data) => {
      const filterCardsByCategory = (category) => {
        filterableCards.innerHTML = "";

        data.forEach((product) => {
          if (category === "all" || product.category === category) {
            const card = document.createElement("div");
            card.classList.add("card");
            card.dataset.name = product.category;

            const image = document.createElement("img");
            image.src = product.image;
            image.alt = product.title;

            const cardBody = document.createElement("div");
            cardBody.classList.add("card_body");

            const cardTitle = document.createElement("h6");
            cardTitle.classList.add("card_title");
            cardTitle.textContent = product.title;

            cardBody.appendChild(cardTitle);
            card.appendChild(image);
            card.appendChild(cardBody);

            filterableCards.appendChild(card);
          }
        });
      };

      filterCardsByCategory("all");

      filterButtons.forEach((button) => {
        button.addEventListener("click", () => {
          filterButtons.forEach((btn) => btn.classList.remove("active"));
          button.classList.add("active");
          const category = button.dataset.name;
          filterCardsByCategory(category);
        });
      });
    })
    .catch((error) => console.error("Error fetching data:", error));
});
