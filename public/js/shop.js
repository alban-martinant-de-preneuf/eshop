let allCategories = [];
let allOrigins = [];

async function shop() {
    let currentPage = 1;
    await fetchCategory();
    await fetchOrigin();
    postFilter(currentPage);
}

async function fetchCategory() {
    const response = await fetch(`products/categories`);
    const categories = await response.json();

    const categoryDiv = document.getElementById('categoryDiv');
    categories.forEach(category => {
        allCategories.push(category);
        const label = document.createElement('label');
        label.setAttribute('for', category);
        label.textContent = category;

        const input = createCheckbox(category);

        categoryDiv.appendChild(input);
        categoryDiv.appendChild(label);


        input.addEventListener('change', () => {
            currentPage = 1;
            postFilter(currentPage);

        });
    });

}

async function fetchOrigin() {
    const response = await fetch(`products/origins`);
    const origins = await response.json();

    const originDiv = document.getElementById('originDiv');
    origins.forEach(origin => {
        allOrigins.push(origin)
        const label = document.createElement('label');
        label.setAttribute('for', origin);
        label.textContent = origin;

        const input = createCheckbox(origin);

        originDiv.appendChild(input);
        originDiv.appendChild(label);


        input.addEventListener('change', (event) => {
            currentPage = 1;
            postFilter(currentPage);
        });
    });

}

function postFilter(currentPage) {

    const checkboxesCheckedCategory = document.querySelectorAll('#categoryDiv input[type="checkbox"]:checked');
    const checkboxesCheckedOrigin = document.querySelectorAll('#originDiv input[type="checkbox"]:checked');

    let checkedCategories = [];
    checkboxesCheckedCategory.forEach(category => {
        checkedCategories.push(category.getAttribute('name'));
    })

    let checkedOrigins = [];
    checkboxesCheckedOrigin.forEach(origin => {
        checkedOrigins.push(origin.getAttribute('name'));
    })

    console.log(allCategories);

    categoriesToDisplay = checkedCategories.length === 0 ? allCategories : checkedCategories;
    originsToDisplay = checkedOrigins.length === 0 ? allOrigins : checkedOrigins;

    console.log(categoriesToDisplay, originsToDisplay);

    let data = new FormData();
    data.append("filterCategory", categoriesToDisplay);
    data.append("filterOrigin", originsToDisplay);
    data.append("page", currentPage)
    fetch('products/filter', {
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
        <a href="./product.php?idProduct=${item.id_pro}"><img src="public/img/products/${item.image_pro}" alt="${item.name_pro}"></a>
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