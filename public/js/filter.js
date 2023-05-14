function shop() {
  let currentPage = 1;
  fetchCategory();
  fetchOrigin();
}

function fetchCategory() {
  fetch(`../src/controllers/rateRouter.php?fetchCategory="ok"`)

    .then((response) => {
      return response.json()
    })
    .then((category) => {
      const categoryDiv = document.getElementById('categoryDiv');
      category.forEach(cat => {
        const label = document.createElement('label');
        label.setAttribute('for', cat.category_pro);
        label.textContent = cat.category_pro;

        const input = createCheckbox(cat.category_pro);

        categoryDiv.appendChild(input);
        categoryDiv.appendChild(label);


        input.addEventListener('change', () => {
          currentPage = 1;
          postFilter();

        });
      });
    });
}

function fetchOrigin() {
  fetch(`../src/controllers/rateRouter.php?fetchOrigin="ok"`)

    .then((response) => {
      return response.json()
    })
    .then((origin) => {
      const originDiv = document.getElementById('originDiv');
      origin.forEach(ori => {
        const label = document.createElement('label');
        label.setAttribute('for', ori.origin_pro);
        label.textContent = ori.origin_pro;

        const input = createCheckbox(ori.origin_pro);

        originDiv.appendChild(input);
        originDiv.appendChild(label);


        input.addEventListener('change', (event) => {
          currentPage = 1;
          postFilter();
        });
      });
    });
}

function postFilter() {
  const checkboxesCategory = document.querySelectorAll('#categoryDiv input[type="checkbox"]');
  const checkboxesOrigin = document.querySelectorAll('#originDiv input[type="checkbox"]');

  let allCategories = [];
  let allOrigins = [];

  let checkedCategories = [];
  checkboxesCategory.forEach(category => {
    if (category.checked) {
      checkedCategories.push(category.getAttribute('name'));
    }
    allCategories.push(category.getAttribute('name'));
  })

  let checkedOrigins = [];
  checkboxesOrigin.forEach(origin => {
    if (origin.checked) {
      checkedOrigins.push(origin.getAttribute('name'));
    }
    allOrigins.push(origin.getAttribute('name'));
  })

  categoriesToDisplay = checkedCategories.length === 0 ? allCategories : checkedCategories;
  originsToDisplay = checkedOrigins.length === 0 ? allOrigins : checkedOrigins;

  let data = new FormData();
  data.append("filterCategory", categoriesToDisplay);
  data.append("filterOrigin", originsToDisplay);
  data.append("page", currentPage)
  fetch('../src/controllers/rateRouter.php', {
    method: 'POST',
    body: data,

  })
    .then((response) => {
      return response.json();
    })
    .then((products) => {
      let shop = document.querySelector("#shop")
      let html = "";
      products.forEach((item) => {

        const rating = item.avg_rating;
        const starRating = getStarRating(rating);

        html += `
        <div class="displayShop">
        <a href="./product.php?idProduct=${item.id_pro}"><img src="../uploads/${item.image_pro}" alt="${item.name_pro}"></a>
        <div class ="productDisplay">
            <a href="./product.php?idProduct=${item.id_pro}"><h3>${item.name_pro}</h3></a>
                <p>${item.category_pro}</p>
                <p>${item.origin_pro}</p>
                <p class="starRating">${starRating}</p>
                <p>${(item.price_pro / 100).toFixed(2)}  $ </p>
            </div>
        </div>
                `;
      });
      shop.innerHTML = html;
      isEnd = (products.length < 8);
      changeButton(isEnd);
    });
}

function changeButton(isEnd) {
  if (typeof (nextBtns) === 'undefined') {
    nextBtns = document.querySelectorAll('.next_button');
    nextBtns.forEach(button => {
      button.addEventListener("click", e => {
        e.preventDefault();
        currentPage += 1;
        if (currentPage === 1) {
          button.style.display = "none";
        } else {
          button.style.display = "inlineBlock";
        }
        postFilter(currentPage);
      })
    })
  } else {
    nextBtns.forEach(button => {
      button.style.display = isEnd ? 'none' : 'block';
    })
  }
  if (typeof (prevBtns) === 'undefined') {
    prevBtns = document.querySelectorAll('.prev_button');
    prevBtns.forEach(button => {
      button.addEventListener("click", e => {
        e.preventDefault();
        currentPage -= 1;
        postFilter(currentPage);
      })
    })
  } else {
    prevBtns.forEach(button => {
      button.style.display = currentPage === 1 ? 'none' : 'block';
    })
  }
}

function createCheckbox(value, type) {
  const input = document.createElement('input');
  input.setAttribute('type', 'checkbox');
  input.setAttribute('id', value);
  input.setAttribute('name', value);

  input.addEventListener('click', () => {
    const checkboxes = document.querySelectorAll(`#${type}Div input[type="checkbox"]`);
    checkboxes.forEach((checkbox) => {
      if (checkbox !== input) {
        checkbox.checked = false;
      }
    });
    if (type === 'category') {
      postCategory();
    } else if (type === 'origin') {
      postOrigin();
    }
  });

  return input;
}

function getStarRating(rating) {
  const maxRating = 5;
  const fullStarCount = Math.floor(rating);
  const halfStarCount = Math.round(rating - fullStarCount);
  const emptyStarCount = maxRating - fullStarCount - halfStarCount;
  let starRating = '';

  if (fullStarCount >= 1) {
      for (let i = 0; i < fullStarCount; i++) {
          starRating += '<i class="fas fa-star"></i>';
      }

      for (let i = 0; i < halfStarCount; i++) {
          starRating += '<i class="fas fa-star-half-alt"></i>';
      }

      for (let i = 0; i < emptyStarCount; i++) {
          starRating += '<i class="far fa-star"></i>';
      }
  }

  return starRating;
}