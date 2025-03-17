let listCartHTML = document.querySelector('.listCart');
let listFavoritesHTML = document.querySelector('.listFavorites');
let totalPrice = document.getElementById('total_price');
let totalQuantity = document.getElementById('total_quantity');
let favorites = [];
let cart = [];

document.querySelectorAll('.btn-custom').forEach(button => {
    button.onclick = function (e) {
        var elm = e.target;
        if (elm.nodeName.toLowerCase() === 'span') {
            var div = elm.parentNode.parentNode.parentNode.parentNode;
            var image = div.childNodes[1].src;
            var name = div.childNodes[3].innerText;
            var description = div.childNodes[5].innerText;
            var url = window.location.href;
            var price = elm.innerText.replace('€', '')
            var bolo_id = image.substring(image.lastIndexOf('imagem') + 6, image.lastIndexOf('.jpeg'));
            addToCart(bolo_id, image, name, description, url, price);
            mheader.innerText = '"' + name + '" adicionado ao carrinho!'
            mbody.innerText = description
            mfooter.innerText = price + '€'
            modal.style.display = 'block';

        } else if (elm.nodeName.toLowerCase() === 'i') {
            if (elm.classList.contains('fa-heart-o')) {
                var div = elm.parentNode.parentNode.parentNode.parentNode;
                var image = div.childNodes[1].src;
                var name = div.childNodes[3].innerText;
                var description = div.childNodes[5].innerText;
                var url = window.location.href;
                var price = elm.innerText.replace('€', '')
                var bolo_id = image.substring(image.lastIndexOf('imagem') + 6, image.lastIndexOf('.jpeg'));
                addToFavorites(bolo_id, image, name, description, url, price);
                mheader.innerText = '"' + name + '" adicionado aos favoritos!'
                mbody.innerText = description
                mfooter.innerText = ''
                modal.style.display = 'block';
            }
        }
    }
});

const addToCart = (bolo_id, image, name, description, url, price) => {
    let position = cart.findIndex((value) => value.bolo_id == bolo_id);

    if (cart.length <= 0) {
        if (bolo_id === undefined) {
            const priceboxElement = document.getElementById('pricebox');
            const priceboxValue = priceboxElement.textContent.replace('€','');
            console.log(priceboxValue);

            cart = [{
                bolo_id: 100,
                image: 'Imagens/imagem-bolo.jpeg',
                name: 'Bolo Personalizado',
                description: 'Bolo personalizado feito com as orientações do cliente',
                url: 'http://localhost:5135/MAS/personalizados.html',
                price: priceboxValue,
                quantity: parseInt(document.getElementById('quantity').value),
            }];
        } else {
            cart = [{
                bolo_id: bolo_id,
                image: image,
                name: name,
                description: description,
                url: url,
                price: price,
                quantity: 1
            }];
        }
    } else {
        if (position < 0) {
            if (bolo_id === undefined) {
                const priceboxElement = document.getElementById('pricebox');
                const priceboxValue = priceboxElement.textContent.replace('€', '');
                console.log(priceboxValue);

                cart.push ({
                    bolo_id: 100,
                    image: 'Imagens/imagem-bolo.jpeg',
                    name: 'Bolo Personalizado',
                    description: 'Bolo personalizado feito com as orientações do cliente',
                    url: 'http://localhost:5135/MAS/personalizados.html',
                    price: priceboxValue,
                    quantity: parseInt(document.getElementById('quantity').value),
                });
            }else{
                cart.push({
                    bolo_id: bolo_id,
                    image: image,
                    name: name,
                    description: description,
                    url: url,
                    price: price,
                    quantity: 1
                });
            }
        } else {
            cart[position].quantity = cart[position].quantity + 1;
        }
    }
    addCartToStorage();
}

const addCartToStorage = () => {
    localStorage.setItem('cart', JSON.stringify(cart));
    console.log(cart);
}

const addToFavorites = (bolo_id, image, name, description, url, price) => {
    let position = favorites.findIndex((value) => value.bolo_id == bolo_id);
    if (favorites.length <= 0) {
        favorites = [{
            bolo_id: bolo_id,
            image: image,
            name: name,
            description: description,
            url: url,
            price: price,
        }];
    } else if (position < 0) {
        favorites.push({
            bolo_id: bolo_id,
            image: image,
            name: name,
            description: description,
            url: url,
            price: price,
        });
    }
    addFavoritesToStorage();
}

const addFavoritesToStorage = () => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
    console.log(favorites);
}
const addCartToHTML = () => {
    listCartHTML.innerHTML = '';
    var tPrice = 0;
    var tQuantity = 0;

    if (cart.length > 0) {
        cart.forEach(item => {
            let newItem = document.createElement('div');
            newItem.classList.add('item');
            newItem.dataset.id = item.bolo_id;
            let info = item;
            listCartHTML.appendChild(newItem);

            const itemName = info.name !== undefined ? info.name : "Bolo Personalizado";

            if (item.bolo_id !== 100) {
                console.log(`Entering if block for bolo_id: ${item.bolo_id}, quantity: ${item.quantity}`);

                newItem.innerHTML = `
                    <div id="cartItem_${item.bolo_id}" class="card cart mb-2 text-center">
                        <div class="image">
                            <a href="${info.url}"><img src="${info.image}" height="100"></a>
                        </div>
                        <div class="name">${itemName}</div>
                        <div class="totalPrice">${Number(info.price * item.quantity).toFixed(2)}€</div>
                        <div class="quantity">
                            <span><i class="fa fa-birthday-cake"></i> ${item.quantity}</span>
                        </div>
                        <div class="mt-1 mb-1 text-center">
                            <button type="button" class="btn btn-outline-danger" onclick="cartDeleteItem('${item.bolo_id}', ${item.quantity}, ${info.price})">
                                <i class="fa fa-trash-o"></i> Remover
                            </button>
                        </div>
                    </div>
                `;

                tQuantity += item.quantity;
                tPrice += parseFloat(info.price) * item.quantity;


            } else {
                console.log(`Entering else block for bolo_id: ${item.bolo_id}`);
                newItem.innerHTML = `
                    <div id="cartItem_${item.bolo_id}" class="card cart mb-2 text-center">
                        <div class="image">
                            <img src="Imagens/imagem-bolo.jpeg" style="width:100px;">
                        </div>
                        <div class="name">${itemName}</div>
                        <div class="totalPrice">${Number(info.price).toFixed(2)}€</div>
                        <div class="quantity">
                            <span><i class="fa fa-birthday-cake"></i> ${item.quantity}</span>
                        </div>
                        <div class="mt-1 mb-1 text-center">
                            <button type="button" class="btn btn-outline-danger" onclick="cartDeleteItem('${item.bolo_id}', ${item.quantity}, ${info.price})">
                                <i class="fa fa-trash-o"></i> Remover
                            </button>
                        </div>
                    </div>
                `;

                tQuantity += item.quantity;
                tPrice += parseFloat(info.price);
            }
        });
    }

    totalQuantity.innerText = tQuantity;
    totalPrice.innerText = tPrice.toFixed(2) + '€';
}



const addFavoritesToHTML = () => {
    listFavoritesHTML.innerHTML = '';
    if (favorites.length > 0) {
        favorites.forEach(item => {
            let newItem = document.createElement('div');
            newItem.classList.add('item');
            newItem.dataset.id = item.bolo_id;
            let info = item;
            listFavoritesHTML.appendChild(newItem);
            newItem.innerHTML = `<div id="${item.bolo_id}" class="card cart mb-2 text-center">
            <div class="image">
                    <a href="${info.url}"><img src="${info.image}" height="100"></a>
                </div>
                <div class="name">
                ${info.name}
                </div>
                <div class="mt-1 mb-1 text-center">
                    <button type="button" class="btn btn-outline-danger" onclick="favoritesDeleteItem(${item.bolo_id})">
                        <i class="fa fa-trash-o"></i> Remover
                    </button>
                </div>
            </div>
            `;
        })
    }
    totalQuantity.innerText = favorites.length;
}

function checkout() {
    if (cart.length > 0) {

        mheader.innerText = 'Encomenda efetuada!'
        mbody.innerText = totalQuantity.innerText + ' bolo(s) encomendado(s).'
        mfooter.innerText = 'Total a pagar: ' + totalPrice.innerText
        modal.style.display = 'block';

        clearLocalStorage();

    }
    totalQuantity.innerText = 0;
    totalPrice.innerText = '0.00€';
}

function cartDeleteItem(id, quantity, price) {
    const index = cart.findIndex(item => item.bolo_id == id);

    if (index !== -1) {
        cart.splice(index, 1);

        totalQuantity.innerText -= quantity;
        var tprice = parseFloat(totalPrice.innerText.replace('€', ''));
        totalPrice.innerText = (tprice - price*quantity).toFixed(2) + '€';

        if (totalQuantity <= 0) {
            totalPrice.innerText = '0.00€';

        } else if (totalPrice < 0) {
            totalPrice.innerText = '0.00€';

        } else {
            totalPrice.innerText = (tprice - price * quantity).toFixed(2) + '€';
        }



        localStorage.setItem('cart', JSON.stringify(cart));

        const elementToRemove = document.getElementById(`cartItem_${id}`);
        if (elementToRemove) {
            elementToRemove.remove();
        }
    }
}

function deleteFavorites() {
    if (favorites.length > 0) {
        favorites.forEach(item => {
            document.getElementById(item.bolo_id).remove();
        })
    }
    totalQuantity.innerText = 0;
    localStorage.removeItem('favorites');
}

function favoritesDeleteItem(id) {
    favorites = favorites.filter(item => item.bolo_id != id);
    totalQuantity.innerText -= 1;
    localStorage.setItem('favorites', JSON.stringify(favorites));
    document.getElementById(id).remove();
}


var modal = document.getElementById('myModal');
var mclose = document.getElementsByClassName('close')[0];
var mheader = document.getElementById('m-header');
var mbody = document.getElementById('m-body');
var mfooter = document.getElementById('m-footer');
mclose.onclick = function () {
    modal.style.display = 'none';

    if (window.location.href.includes('carrinho')) {

        window.location.href = 'pagamento.html';
    }
}

window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = 'none';
        if (window.location.href.includes('carrinho')) {

            window.location.href = 'pagamento.html';
        }
    }
}

const addToCartBtn = document.getElementById('addToCartBtn');

const initFavorites = () => {
    if (localStorage.getItem('favorites')) {
        addFavoritesToHTML();
    }
}

const initCart = () => {
    if (localStorage.getItem('cart')) {
        addCartToHTML();
    }
}

const initApp = () => {
    if (localStorage.getItem('cart')) {
        cart = JSON.parse(localStorage.getItem('cart'));
    }
    if (localStorage.getItem('favorites')) {
        favorites = JSON.parse(localStorage.getItem('favorites'));
    }
}

initApp();

function clearLocalStorage() {
    localStorage.removeItem('cart');
}

addToCartBtn.addEventListener('click', function () {
    modal.style.display = 'block';
});