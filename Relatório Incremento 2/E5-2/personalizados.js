document.addEventListener('DOMContentLoaded', function () {
    const pesoSelector = document.getElementById('peso');
    const velasCheckbox = document.querySelectorAll('input[name="velas"]');
    const extrasCheckbox = document.querySelectorAll('input[name="elementos"]');
    const foguetesRadio = document.querySelectorAll('input[name="foguetes"]');
    const candleImages = document.querySelectorAll('.candle-images img');
    const priceBox = document.querySelector('.price-box');

    // Preços correspondentes às escolhas
    const pesoPreco = {
        '1kg': 28.99,
        '1,5kg': 35.99,
        '2kg': 44.99,
        '2,5kg': 57.99,
        '3kg': 68.99,
        '3,5kg': 79.90,
        '4kg': 87.99,
        '4,5kg': 99.99,
        '5kg': 112.99,
    };

    // Velas com preços iniciais
    let velasPreco = {
        '0': 0.00,
    };

    const extrasPreco = {
        'Elemento 1': 1.90,
        'Elemento 2': 1.90,
        'Elemento 3': 1.90,
        'Elemento 4': 1.90,
        'Elemento 5': 1.90,
        'Elemento 6': 1.90,
        'Elemento 7': 1.90,
        'Elemento 8': 1.90,
        'Elemento 9': 1.90,
        'Elemento 10': 1.90,
    };

    const foguetesPreco = {
        'Sim': 4.50,
        'Não': 0.00,
    };

    // Função para calcular o preço total
    function calcularPrecoTotal() {
        let precoTotal = 0;

        // Adicionar preço do peso selecionado
        const pesoSelecionado = pesoSelector.value;
        if (pesoPreco[pesoSelecionado]) {
            precoTotal += pesoPreco[pesoSelecionado];
        }

        // Adicionar preço das velas selecionadas
        velasCheckbox.forEach(checkbox => {
            if (checkbox.checked && velasPreco[checkbox.value]) {
                precoTotal += velasPreco[checkbox.value];
            }
        });

        // Adicionar preço dos extras selecionados
        extrasCheckbox.forEach(checkbox => {
            if (checkbox.checked && extrasPreco[checkbox.value]) {
                precoTotal += extrasPreco[checkbox.value];
            }
        });

        // Adicionar preço dos foguetes selecionados
        foguetesRadio.forEach(radio => {
            if (radio.checked && foguetesPreco[radio.value]) {
                precoTotal += foguetesPreco[radio.value];
            }
        });

        return precoTotal.toFixed(2);
    }

    // Função para atualizar a caixa de preço
    function atualizarPrecoBox() {
        const precoTotal = calcularPrecoTotal();
        priceBox.textContent = precoTotal + '€';
    }

    // Atualizar preços das velas com base na imagem selecionada
    function atualizarPrecosVelas(precoNovo) {
        velasCheckbox.forEach((checkbox, index) => {
            checkbox.value = Object.keys(precoNovo)[index];
        });
        velasPreco = precoNovo;
    }

    // Event listeners para atualizar o preço total
    pesoSelector.addEventListener('change', atualizarPrecoBox);
    velasCheckbox.forEach(checkbox => {
        checkbox.addEventListener('change', atualizarPrecoBox);
    });
    extrasCheckbox.forEach(checkbox => {
        checkbox.addEventListener('change', atualizarPrecoBox);
    });
    foguetesRadio.forEach(radio => {
        radio.addEventListener('change', atualizarPrecoBox);
    });

    // Event listener para mudar os preços das velas conforme a imagem selecionada
    candleImages.forEach(img => {
        img.addEventListener('click', function () {
            const selectedImage = this.getAttribute('src');
            let velasPrecoAtualizado = {};

            if (selectedImage.includes('velas_normais')) {
                velasPrecoAtualizado = {
                    '0': 0.00,
                    '1': 0.00, // Novo preço para velas normais
                    '2': 0.00, // Novo preço para velas normais
                    '3': 0.00, // Novo preço para velas normais
                    '4': 0.00,
                    '5': 0.00,
                    '6': 0.00,
                    '7': 0.00,
                    '8': 0.00,
                    '9': 0.00,
                };
            } else if (selectedImage.includes('velas_prateadas')) {
                velasPrecoAtualizado = {
                    '0': 3.90,
                    '1': 3.90,
                    '2': 3.90,
                    '3': 3.90,
                    '4': 3.90,
                    '5': 3.90,
                    '6': 3.90,
                    '7': 3.90,
                    '8': 3.90,
                    '9': 3.90,
                };
            } else if (selectedImage.includes('velas_douradas')) {
                velasPrecoAtualizado = {
                    '0': 3.90,
                    '1': 3.90, // Novo preço para velas douradas
                    '2': 3.90, // Novo preço para velas douradas
                    '3': 3.90, // Novo preço para velas douradas
                    '4': 3.90,
                    '5': 3.90,
                    '6': 3.90,
                    '7': 3.90,
                    '8': 3.90,
                    '9': 3.90,
                };
            }

            // Atualiza os valores dos preços das velas
            atualizarPrecosVelas(velasPrecoAtualizado);

            // Atualiza o preço total ao mudar a imagem das velas
            atualizarPrecoBox();
        });
    });

    const quantityInput = document.getElementById('quantity');
    quantityInput.addEventListener('input', function () {
        const precoTotal = calcularPrecoTotal(); // Obtém o preço total
        const quantidade = parseInt(this.value); // Obtém o valor da quantidade

        // Verifica se a quantidade é um número válido
        if (!isNaN(quantidade)) {
            const precoFinal = (precoTotal * quantidade).toFixed(2); // Calcula o preço final
            priceBox.textContent = precoFinal + '€'; // Atualiza a caixa de preço com o preço final multiplicado pela quantidade
        }
    });
});
