import app from './src/app'

const port = 8080
app.listen(port, function() {
    return console.log(`server active on http://localhost:${port}`)
});