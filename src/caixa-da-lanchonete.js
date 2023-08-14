class Menu {
    constructor() {
        // Definindo os itens do menu e seus preços
        this.items = {
            cafe: 3.00,
            chantily: 1.50,
            suco: 6.20,
            sanduiche: 6.50,
            queijo: 2.00,
            salgado: 7.25,
            combo1: 9.50,
            combo2: 7.50
        };

        // Definindo quais extras estão associados a quais itens principais
        this.adittions = {
            chantily: "cafe",
            queijo: "sanduiche"
        };
    }

    // Função para obter o preço de um item a partir do código
    getItemPrice(codigo) {
        return this.items[codigo] || null; // Retorna o preço do item ou null se não existir
    }

    // Verifica se o item é um extra
    isAdittion(codigo) {
        return !!this.adittions[codigo]; // Retorna true se o item for um extra, caso contrário, false
    }

    // Obtém o item principal associado a um extra
    getPrincipalForAdittion(codigo) {
        return this.adittions[codigo]; // Retorna o item principal associado ao extra
    }
}

class CaixaDaLanchonete {
    constructor() {
        this.menu = new Menu(); // Cria uma instância da classe Menu para gerenciar o menu da lanchonete
    }

    // Função para calcular o valor da compra com base nos itens e forma de pagamento
    calcularValorDaCompra(formaDePagamento, itens) {
        const formasDePagamentoValidas = ['debito', 'credito', 'dinheiro'];

        // Função para formatar um valor em moeda brasileira
        const formataValor = valor => `R$ ${valor.toFixed(2).replace('.', ',')}`;

        // Verificações iniciais
        if (itens.length === 0) return "Não há itens no carrinho de compra!";
        if (!formasDePagamentoValidas.includes(formaDePagamento)) return "Forma de pagamento inválida!";

        let total = 0;

        // Itera sobre os itens da compra
        for (let item of itens) {
            const [codigo, quantidade] = item.split(',');

            // Obtém o preço do item a partir do menu
            const itemPrice = this.menu.getItemPrice(codigo);

            // Verificações de validade
            if (!itemPrice) return "Item inválido!";
            if (Number(quantidade) <= 0) return "Quantidade inválida!";
            
            // Verifica se um extra está sendo pedido sem o item principal associado
            if (this.menu.isAdittion(codigo) && !itens.some(i => i.startsWith(this.menu.getPrincipalForAdittion(codigo)))) {
                return "Item extra não pode ser pedido sem o principal";
            }

            total += itemPrice * Number(quantidade); // Calcula o subtotal do item
        }

        // Aplica desconto ou acréscimo com base na forma de pagamento
        if (formaDePagamento === 'dinheiro') {
            total *= 0.95; // Aplica um desconto de 5% para pagamentos em dinheiro
        } else if (formaDePagamento === 'credito') {
            total *= 1.03; // Aplica um acréscimo de 3% para pagamentos com cartão de crédito
        }

        return formataValor(total);
    }
}

export { CaixaDaLanchonete };
