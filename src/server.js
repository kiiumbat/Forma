const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3');

const app = express();
app.use(cors());
app.use(express.json());

// Abrir BD SQLite
const db = new sqlite3.Database('./database.db');

// Crear tabla
db.run(`
  CREATE TABLE IF NOT EXISTS reviews (
    id INTEGER PRIMARY KEY,
    product_id INTEGER,
    author TEXT,
    rating INTEGER,
    text TEXT,
    date TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

// API: Guardar reseña
app.post('/api/reviews', (req, res) => {
  const { product_id, author, rating, text, date } = req.body;
  
  db.run(
    'INSERT INTO reviews (product_id, author, rating, text, date) VALUES (?, ?, ?, ?, ?)',
    [product_id, author, rating, text, date],
    function(err) {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.json({ id: this.lastID, product_id, author, rating, text, date });
      }
    }
  );
});

// API: Obtener reseñas
app.get('/api/reviews/:productId', (req, res) => {
  const { productId } = req.params;
  
  db.all(
    'SELECT * FROM reviews WHERE product_id = ? ORDER BY date DESC',
    [productId],
    (err, rows) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.json(rows || []);
      }
    }
  );
});

app.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
});

// 3. En Forma3D, cambiar esto:

// De:
const loadReviewsFromSupabase = async (productId) => {
  const reviews = await supabaseRequest(
    `/reviews?product_id=eq.${productId}&order=date.desc`
  );
  return reviews || [];
};

// A:
const loadReviewsFromAPI = async (productId) => {
  try {
    const response = await fetch(`http://localhost:5000/api/reviews/${productId}`);
    return await response.json();
  } catch (error) {
    console.error('Error:', error);
    return [];
  }
};

// Y en el componente, cambiar:
const loadReviews = async () => {
  setLoading(true);
  const data = await loadReviewsFromAPI(item.id); // En lugar de loadReviewsFromSupabase
  setReviews(data || []);
  setLoading(false);
};
