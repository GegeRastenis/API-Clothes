
  
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
          <p>${product.size}</p>
          <div class="product-actions"> 
            <button class="edit-btn" data-id="${product.id} title="Editar">✏️</button>
            <button class="delete-btn" data-id=${product.id} title="Eliminar">🗑️ </button>
          </div>
        `;
        productsContainer.appendChild(productDiv);
      })
      //Evento para editar producto
      document.querySelectorAll('.edit-btn').forEach(button => {
        button.addEventListener('click', async(e) => {
            const productId = e.target.dataset.id;

            try{
                const res = await fetch(`/api/clothes/${productId}`);
                if(!res.ok) alert('No se pudo obtener el producto');
                const product = await res.json();
                document.getElementById('edit-form').style.display = 'flex';
                document.getElementById('edit-id').value = product.id;
                document.getElementById('edit-name').value = product.name;
                document.getElementById('edit-price').value = product.price;
                document.getElementById('edit-size').value = product.size;
                document.getElementById('edit-image').value = product.image || '';

            } catch(error){
                alert('Error al cargar el producto');
                console.error(error);
            }
        })
      })

    document.getElementById('edit-form').addEventListener('submit', async(e) => {
        e.preventDefault();
        const productId = document.getElementById('edit-id').value;
        const updatedProduct = {
            name: document.getElementById('edit-name').value,
            price: parseFloat(document.getElementById('edit-price').value),
            size: document.getElementById('edit-size').value,
            image: document.getElementById('edit-image').value
        };

        try {
            const res = await fetch(`/api/clothes/${productId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedProduct)
            });

            if (res.ok) {
                location.reload();
            } else {
                alert('Error al actualizar el producto');
            }
        } catch (error) {
            console.error(error);
            alert('Error al conectar con el servidor');
        }
    });

          //Evento para editar producto
    document.querySelectorAll('.add-btn').forEach(button => {
      button.addEventListener('click', () => {
        const form = document.getElementById('add-form');
        form.style.display = 'flex'; // Mostrar el formulario
        form.reset(); // Limpiar campos del formulario (requiere <form id="add-form">)

        // También puedes limpiar los campos manualmente si no usas <form>
        document.getElementById('add-name').value = '';
        document.getElementById('add-description').value = '';
        document.getElementById('add-price').value = '';
        document.getElementById('add-size').value = '';
        document.getElementById('add-image').value = '';
      });
    });

        document.getElementById('add-form').addEventListener('submit', async(e) => {
        e.preventDefault();
        const productId = document.getElementById('edit-id').value;
        const createProduct = {
            name: document.getElementById('add-name').value,
            description: document.getElementById('add-description').value,
            price: parseFloat(document.getElementById('add-price').value),
            size: document.getElementById('add-size').value,
            image: document.getElementById('add-image').value
        };

        try {
            const res = await fetch(`/api/clothes/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(createProduct)
            });

            const result = await res.json();

            if (res.ok) {
                location.reload();
                alert('Producto registrado exitosamente ✔️');
                document.getElementById('add-form').reset();
                document.getElementById('add-form').style.display = 'none';
            } else {
                alert(`Error: ${result.error}`);
            }
        } catch (error) {
            console.error(error);
            alert('Error al registrar el producto');
        }
    });

    document.querySelectorAll('.delete-btn').forEach(button => {
        button.addEventListener('click', async(e) => {
            const idProduct = e.target.dataset.id;
            if(confirm("Seguro de eliminar el producto?")){
                try{
                    const res = await fetch(`/api/clothes/${idProduct}`, {
                        method: 'DELETE'
                    });
    
                    if(res.ok){
                        location.reload(); //Recarga los productos
                    } else {
                        alert('No se pudo eliminar el producto, hubo un error');
                    }
                } catch(error){
                    console.error(err);
                    alert('Error al conectar con el servidor');
                }
            }
        })
      })
    } else {
        productsContainer.innerHTML = `<p>Error al cargar productos: ${products.error}</p>`;
    }
  } catch(error){
    console.error('Error al cargar productos:', error);
    productsContainer.innerHTML = `<p>No se pudieron cargar los productos.</p>`;
  }
});

document.getElementById('cancel-edit').addEventListener('click', () => {
  const form = document.getElementById('edit-form');
  form.reset(); // Limpia los campos
  form.style.display = 'none'; // Oculta el formulario
});

document.getElementById('cancel-add').addEventListener('click', () => {
  const form = document.getElementById('add-form');
  form.reset(); // Limpia los campos
  form.style.display = 'none'; // Oculta el formulario
});


