const request = require('supertest');
const { app, server } = require('../index'); 

describe('API de Produtos', () => {
    let produtoId;

    afterAll((done) => {
        server.close(done);
    });

    it('Criar um novo produto', async () => {
        const res = await request(app)
            .post('/products')
            .send({ nome: 'Produto 1', preco: 100 });
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('id');
        produtoId = res.body.id;
    });

    it('Listar todos os produtos', async () => {
        const res = await request(app).get('/products');
        expect(res.statusCode).toEqual(200);
        expect(res.body.length).toBeGreaterThan(0);
    });

    it('Obter um produto específico por ID', async () => {
        const res = await request(app).get(`/products/${produtoId}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('id', produtoId);
    });

    it('Atualizar um produto existente por ID', async () => {
        const res = await request(app)
            .put(`/products/${produtoId}`)
            .send({ nome: 'Produto Atualizado', preco: 150 });
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('nome', 'Produto Atualizado');
    });

    it('Deletar um produto por ID', async () => {
        const res = await request(app).delete(`/products/${produtoId}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body[0]).toHaveProperty('id', produtoId);
    });
});
