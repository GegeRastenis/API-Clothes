//Muestra los productos obteniendolos de la api, esto se hace desde que carga la pagina principal
document.addEventListener('DOMContentLoaded', async() => {
  const productsContainer = document.getElementById('products-list');
  try{
    const res = await fetch('/api/clothes', {
      headers: {
        'Content-Type' : 'application/json',
      }
    })
    const products = await res.json();

    if(res.ok){
      productsContainer.innerHTML = ''; //Se limpia antes de agregar
      products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.className = 'product';
        productDiv.innerHTML = `
          <img src="${product.image || './images/default-product.png'}" alt="${product.name}">
          <h4>${product.name}</h4>
          <p>$${product.price.toFixed(2)}</p>
        `;
        productsContainer.appendChild(productDiv);
      })
    } else {
      productsContainer.innerHTML = `<p>Error al cargar productos: ${products.error}</p>`;
    }
  }catch(error){
    console.error('Error al cargar productos:', error);
    productsContainer.innerHTML = `<p>No se pudieron cargar los productos.</p>`;
  }
});