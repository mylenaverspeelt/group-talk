const express = require('express')
const path = require('path')
const app = express()
const PORT = process.env.PORT || 400
const server = app.listen(PORT, () => {
    console.log(` chat server on port ${PORT}`)
})
//permite que o servidor acesse a pasta de recursos estaticos que esta no mesmo diretorio que ele
app.use(express.static(path.join(__dirname, 'public')))

