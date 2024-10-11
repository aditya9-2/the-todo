import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const port = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(cors({ origin: '*' }));

app.get('/', (req, res) => {
    res.json({
        message: 'hello'
    });
});

app.listen(port, () => {
    console.log(`App listens on: http://localhost:${port}`);
});

export default app;
