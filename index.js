const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

let produtos = [];
let idAtual = 1;

// Rotas
app.post('/products', (req, res) => {
    const produto = { id: idAtual++, ...req.body };
    produtos.push(produto);
    res.status(201).json(produto);
});

app.get('/products', (req, res) => {
    res.json(produtos);
});

app.get('/products/:id', (req, res) => {
    const produto = produtos.find(p => p.id === parseInt(req.params.id));
    if (produto) {
        res.json(produto);
    } else {
        res.status(404).send('Produto não encontrado');
    }
});

app.put('/products/:id', (req, res) => {
    const index = produtos.findIndex(p => p.id === parseInt(req.params.id));
    if (index !== -1) {
        produtos[index] = { id: produtos[index].id, ...req.body };
        res.json(produtos[index]);
    } else {
        res.status(404).send('Produto não encontrado');
    }
});

app.delete('/products/:id', (req, res) => {
    const index = produtos.findIndex(p => p.id === parseInt(req.params.id));
    if (index !== -1) {
        const produtoRemovido = produtos.splice(index, 1);
        res.json(produtoRemovido);
    } else {
        res.status(404).send('Produto não encontrado');
    }
});

// Exporta o aplicativo e o servidor
const server = app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});

module.exports = { app, server };
