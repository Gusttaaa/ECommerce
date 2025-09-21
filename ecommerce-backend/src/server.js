
// Carrega as variáveis de ambiente do arquivo .env
require('dotenv').config();

// --- INÍCIO DO TESTE DE DIAGNÓSTICO ---
console.log("--- TESTE DE DIAGNÓSTICO ---");
console.log("Usuário do DB:", process.env.DB_USER);
console.log("Senha do DB:", process.env.DB_PASSWORD);
console.log("Banco de Dados:", process.env.DB_DATABASE);
console.log("----------------------------");
// --- FIM DO TESTE DE DIAGNÓSTICO ---

const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

const app = express();
const port = 3000;

app.use(cors());
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.json({ message: "Bem-vindo à API do E-commerce!" });
});

app.get('/api/products', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM products ORDER BY id ASC');
        const productsFromDB = result.rows;

        // LÓGICA SIMPLIFICADA AQUI
        const productsWithFullUrl = productsFromDB.map(product => {
            // Agora, product.thumbnail já é o nome do arquivo (ex: "p1.jpg")
            return {
                ...product,
                thumbnail: `http://localhost:3000/images/${product.thumbnail}` // Apenas montamos a URL
            };
        });

        res.json(productsWithFullUrl);

    } catch (error) {
        console.error('Erro ao buscar produtos do banco de dados:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});