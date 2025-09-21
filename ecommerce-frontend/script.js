document.addEventListener('DOMContentLoaded', () => {

    // Inicializa a biblioteca de animações
    AOS.init({
        duration: 800,
        once: true,
    });

    // Variáveis globais do nosso script
    const productContainer = document.querySelector('.pro-container');
    const filterButtons = document.querySelectorAll('.filter-btn');
    let allProducts = []; // Array para guardar TODOS os produtos originais

    /**
     * Função para exibir produtos na tela.
     * Ela recebe uma lista de produtos e os renderiza no container.
     * @param {Array} products - A lista de produtos a ser exibida.
     */
    function displayProducts(products) {
        // 1. Limpa o container antes de adicionar novos produtos
        productContainer.innerHTML = '';

        // 2. Se a lista de produtos estiver vazia, mostra uma mensagem
        if (products.length === 0) {
            productContainer.innerHTML = '<p class="no-products-message">Nenhum produto encontrado para esta marca.</p>';
            return;
        }

        // 3. Para cada produto na lista, cria o card HTML
        products.forEach((product, index) => {
            const productDiv = document.createElement('div');
            productDiv.className = 'pro';
            productDiv.setAttribute('data-aos', 'fade-up');
            productDiv.setAttribute('data-aos-delay', (index % 4) * 100);

            productDiv.innerHTML = `
                <img src="${product.thumbnail}" alt="${product.title}">
                <div class="desc">
                    <span>${product.brand}</span>
                    <h5>${product.title}</h5>
                    <div class="star">
                        <i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i>
                    </div>
                    <h4>R$ ${parseFloat(product.price).toFixed(2).replace('.', ',')}</h4>
                </div>
                <a href="#"><i class="fal fa-shopping-cart cart"></i></a>
            `;
            productContainer.appendChild(productDiv);
        });
    }

    /**
     * Função que configura os event listeners para os botões de filtro.
     */
    function setupFilters() {
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove a classe 'active' de todos os botões
                filterButtons.forEach(btn => btn.classList.remove('active'));
                // Adiciona a classe 'active' apenas ao botão clicado
                button.classList.add('active');

                // Pega o valor do atributo 'data-brand' do botão
                const brand = button.dataset.brand;
                let filteredProducts;

                // Filtra a lista de produtos
                if (brand === 'all') {
                    filteredProducts = allProducts;
                } else {
                    filteredProducts = allProducts.filter(product => 
                        product.brand.toLowerCase() === brand.toLowerCase()
                    );
                }
                
                // Exibe os produtos filtrados
                displayProducts(filteredProducts);
            });
        });
    }

    /**
     * Função principal que inicia a aplicação.
     */
    async function init() {
        try {
            const response = await fetch('http://localhost:3000/api/products');
            allProducts = await response.json();
            
            displayProducts(allProducts); // Exibe todos os produtos inicialmente
            setupFilters(); // Configura os filtros

        } catch (error) {
            console.error('Falha ao buscar ou processar os produtos:', error);
            productContainer.innerHTML = '<p>Erro ao carregar os produtos. Tente novamente mais tarde.</p>';
        }
    }

    // Inicia tudo
    init();
});