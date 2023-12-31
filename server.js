import express, { json } from 'express'
const app = express()
import routes from './routes'

app.use(json())
app.use('/api', routes)

app.listen(3000, () => {
    console.log('Server is running on port 3000')
})
