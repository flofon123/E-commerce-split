import { getProducts, getProduct } from "./firebase.js";

const cart = []

let total = 0;

const checkout = document.querySelector('.checkout');

const emptyCard = () => {
    total = 0;
    document.querySelector('.visualTotal').textContent = total;
    cart.length = 0;
    document.querySelector('.innerCart').innerHTML = '';
} 

checkout.addEventListener('click',emptyCard);

const renderCart = () => {


    const innerCart = document.querySelector('.innerCart');

    innerCart.innerHTML = '';

    cart.forEach(product => {

        const card= document.createElement('div');

        card.className = 'card nb-4 p-2';

        card.innerHTML = `

        <div class="row g-0 p-2">
        <div class="col-md-4">
          <img src="${product.data().img}" class="img-fluid rounded-start" alt="...">
        </div>
        
        <div class="col-md-8">
          <div class="card-body">
            <h5 class="card-title">${product.data().name}</h5>
            <p class="card-text">Precio:  $${product.data().price}</p>
          </div>
        </div>
      </div>

        `;

     innerCart.append(card);

    });

}

const checkCart = (id) => cart.some(product => product.id === id);

const updateTotal = (price) => {

    const visualTotal = document.querySelector('.visualTotal');

    total += price; 

    visualTotal.textContent = total;

}

const addToCart = async (e) => {

    const productId = e.target.id;

    if (checkCart(productId)) {
        return false;
    }
    else {

    const productToCart = await getProduct(productId);

    updateTotal(productToCart.data().price);

    cart.push(productToCart); 

    renderCart();

    }

    

}


const addEvent = ()=>{

    const buyBtn = document.querySelectorAll('.buyBtn');
    
    buyBtn.forEach(btn => btn.addEventListener('click', addToCart));
    
}


const renderCards = async (productsArr) => {

    const products = await productsArr;

    const cards = document.querySelector('.cards');

    products.forEach(product => {

        const card = document.createElement('div');

        card.className = 'card col-12 col-xl-6 col-md-6';

        card.innerHTML = `


        <img src="${product.data().img}" class="card-img-top productImg" alt="...">
        <div class="card-body">
          <h5 class="card-title">${product.data().name}</h5>
          <p class="card-text">Precio:  $${product.data().price}</p>
          <a href="#" class="btn btn-dark buyBtn" id=${product.id}>Comprar</a>
        </div>

    
        `;

        cards.append(card);
        
    });

    addEvent();
}

renderCards(getProducts());

const { value: email } = await Swal.fire({
    title: 'Input email address',
    input: 'email',
    inputLabel: 'Your email address',
    inputPlaceholder: 'Enter your email address'
  })
  
  if (email) {
    Swal.fire(`Entered email: ${email}`)
  }

