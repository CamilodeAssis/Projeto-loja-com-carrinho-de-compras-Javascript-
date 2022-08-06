let cart = [];
let modalQT = 1;
let modalKey = 0;

//variavel para seleciionar os elementos html
const c = (el) => document.querySelector(el);
const cs = (el) => document.querySelectorAll(el);

// mapeando o "banco de dados", clonando o modelo html e adicionando os itens 
prodJson.map((item, index) => {
    let productItem = c('.models .prod-item').cloneNode(true);

    productItem.setAttribute('data-key', index);
    productItem.querySelector('.prod-item--img img').src = item.img;
    productItem.querySelector('.prod-item--price').innerHTML = `R$ ${item.price.toFixed(2)}`;
    productItem.querySelector('.prod-item--name').innerHTML = item.name;
    productItem.querySelector('.prod-item--desc').innerHTML = item.description;


    //MODAL
    productItem.querySelector('a').addEventListener('click', (e) => {
        e.preventDefault();
        let key = e.target.closest('.prod-item').getAttribute('data-key');
        modalQT = 1;
        modalKey = key;

        productItem.addEventListener('keyup', (e) => {
            console.log(e.keyCode);
            if (e.keyCode === 27) {
                closeMOdal();
            }
        });


        c('.prodBig img').src = prodJson[key].img;
        c('.prodInfo h1').innerHTML = prodJson[key].name;
        c('.prodInfo--desc').innerHTML = prodJson[key].description;
        c('.prodInfo--size.selected').classList.remove('selected');
        c('.prodInfo--actualPrice').innerHTML = `R$ ${prodJson[key].price.toFixed(2)}`;
        cs('.prodInfo--size').forEach((size, index) => {
            if (index === 2) {
                size.classList.add('selected');
            }
        });

        c('.prodInfo--qt').innerHTML = modalQT;


        c('.prodWindowArea').style.opacity = 0;
        c('.prodWindowArea').style.display = 'flex';
        setTimeout(() => {
            c('.prodWindowArea').style.opacity = 1;
        }, 200)
    });



    c('.prod-area').append(productItem);
});



//eventos de clique, quantidade, ir para o carrinho e etc...

function closeMOdal() {
    c('.prodWindowArea').style.opacity = 0;

    setTimeout(() => {
        c('.prodWindowArea').style.display = 'none';
    }, 300);

}

c('.prodInfo--cancelButton').addEventListener('click', closeMOdal);
c('.prodInfo--cancelMobileButton').addEventListener('click', closeMOdal);

c('.prodInfo--qtmais').addEventListener('click', () => {
    modalQT++;
    c('.prodInfo--qt').innerHTML = modalQT;
});

c('.prodInfo--qtmenos').addEventListener('click', () => {
    if (modalQT > 1) {
        modalQT--;
        c('.prodInfo--qt').innerHTML = modalQT;
    }
});

cs('.prodInfo--size').forEach((size, index) => {
    size.addEventListener('click', (e) => {
        c('.prodInfo--size.selected').classList.remove('selected');
        size.classList.add('selected');
    });
});

c('.prodInfo--addButton').addEventListener('click', () => {
    let size = parseInt(c('.prodInfo--size.selected').getAttribute('data-key'));
    let identifier = prodJson[modalKey].id + '@' + size;
    let key = cart.findIndex((item) => item.identifier == identifier);
    if (key > -1) {
        cart[key].qt += modalQT;
    } else {
        cart.push({
            identifier: identifier,
            id: prodJson[modalKey].id,
            size: size,
            qt: modalQT,
        });
    }
    updateCart();
    closeMOdal();
});


function updateCart() {
    if (cart.length > 0) {
        c('aside').classList.add('show');
        c('.cart').innerHTML='';
        for (let i in cart) {
            let productItem = prodJson.find((item) => item.id == cart[i].id);
            let cartItem = c('.models .cart--item').cloneNode(true);
            let prodSizeName;
            switch (cart[i].size){
                case 0:
                    prodSizeName = 'S';
                    break;
                case 1:
                    prodSizeName = 'M';
                    break;
                case 2:
                    prodSizeName = 'L';
                    break;
            }
            let prodName = `${productItem.name} (${prodSizeName})`;

            cartItem.querySelector('img').scr = productItem.img;
            cartItem.querySelector('.cart--item-nome').innerHTML = prodName;
            cartItem.querySelector('.cart--item--qt').innerHTML = cart[i].qt;
            c('.cart').append(cartItem);
        }



    } else {
        c('aside').classList.remove('show');
    }
}