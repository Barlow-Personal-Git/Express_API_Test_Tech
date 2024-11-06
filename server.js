import express from 'express';
import routes from './routes.js'

const app = express()
const port = 8080

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use(routes);

app.listen(port, () => {
  console.log(`App listening on port http://localhost:${port}`)
})



