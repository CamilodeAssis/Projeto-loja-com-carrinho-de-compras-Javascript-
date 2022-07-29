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

    productItem.querySelector('a').addEventListener('click', (e) => {
        e.preventDefault();
        let key = e.target.closest('.prod-item').getAttribute('data-key');

        c('.prodBig img').src = prodJson[key].img;
        c('.prodInfo h1').innerHTML = prodJson[key].name;
        c('.prodInfo--desc').innerHTML = prodJson[key].description;
        
        c('.prodInfo--price').innerHTML = `R$ ${prodJson[key].price.toFixed(2)}`;

        c('.prodWindowArea').style.opacity = 0;
        c('.prodWindowArea').style.display = 'flex';
        setTimeout(() => {
            c('.prodWindowArea').style.opacity = 1;
        }, 200)
    });

    c('.prod-area').append(productItem);
});