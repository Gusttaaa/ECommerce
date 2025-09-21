document.addEventListener('DOMContentLoaded', () => {

    AOS.init({
        duration: 800, // Duração da animação em milissegundos
        once: true,    // Animação acontece apenas uma vez
    });
    const productContainer = document.querySelector('.pro-container');
    const apiUrl = 'produtos.json'; // <-- Buscando o arquivo local!

    async function fetchAndDisplayProducts() {
        try {
            const response = await fetch(apiUrl);
            const products = await response.json();

            productContainer.innerHTML = ''; 

            products.forEach(product => {
                const productDiv = document.createElement('div');
                productDiv.className = 'pro';

                // ADICIONA O ATRIBUTO DE ANIMAÇÃO AQUI
                productDiv.setAttribute('data-aos', 'fade-up');
                productDiv.setAttribute('data-aos-delay', (index % 4) * 100); // Atraso escalonado

                // Usando os dados do nosso arquivo JSON
                productDiv.innerHTML = `
                    <img src="${product.thumbnail}" alt="${product.title}">
                    <div class="desc">
                        <span>${product.brand}</span>
                        <h5>${product.title}</h5>
                        <div class="star">
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                        </div>
                        <h4>R$ ${product.price.toFixed(2).replace('.', ',')}</h4>
                    </div>
                    <a href="#"><i class="fal fa-shopping-cart cart"></i></a>
                `;
                productContainer.appendChild(productDiv);
            });

        } catch (error) {
            console.error('Falha ao buscar os produtos:', error);
            productContainer.innerHTML = '<p>Não foi possível carregar os produtos.</p>';
        }
    }

    fetchAndDisplayProducts();
});