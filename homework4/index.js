const express = require('express')
const logger = require('morgan')
const methodOverride = require('method-override')
const app = express()
const cookieParser = require('cookie-parser');
const path = require('path');

app.set('view engine', 'ejs')
app.use(logger('dev'))
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false }))
app.use(
  methodOverride((req, res) => {
    if (req.body && req.body._method) {
      const method = req.body._method
      return method
    }
  })
)

//router for cohorts
const cohortsRouter = require('./routes/cohorts')
app.use('/cohorts', cohortsRouter)  //path 

const PORT = 3000;
app.listen(PORT,() => {
  console.log(`The server is listenining at ${PORT}`)
})
