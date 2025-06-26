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

  document.getElementById('registerForm').addEventListener('submit', async (e) => {
    e.preventDefault(); 

    const form = e.target;
    const data = {
      name: form.name.value,
      email: form.email.value,
      password: form.password.value
    };

    try {
      const res = await fetch('/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      const result = await res.json();

      if (res.ok) {
        alert('Registro exitoso ✔️');
        form.reset();
      } else {
        alert(`Error: ${result.error}`);
      }
    } catch (err) {
      console.error('Error en el registro:', err);
      alert('Ocurrió un error al registrarte.');
    }
  });

  document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault(); 

    const form = e.target;
    const data = {
      email: form.email.value,
      password: form.password.value
    };

    try {
      const res = await fetch('/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      const result = await res.json();
      console.log(result);
      if (res.ok) {
        // Guardamos el token en localStorage
        localStorage.setItem('token', result.token);
        alert('Inicio de sesión exitoso ✔️');
        // Puedes redirigir a otra página si quieres
        window.location.href = "/index.html";
      } else {
        alert(`Error: ${result.error}`);
      }
    } catch (error) {
      console.error('Error en el login:', error);
      alert('No se pudo iniciar sesión');
    }
  });