import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
  res.send(`
    <h1>Ecom Display Backend</h1>
    <p>API is available under <a href="/api/docs">/api/docs</a> (Swagger)</p>
    <p>Health: OK</p>
  `);
});

export default router;
