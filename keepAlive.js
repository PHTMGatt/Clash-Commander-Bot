import express from 'express';
const app = express();

app.get('/', (req, res) => res.send('Bot is alive!'));
app.listen(3000, () => console.log('🌐 Keep-alive web server running'));

export default app;
