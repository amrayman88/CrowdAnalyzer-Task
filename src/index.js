const express = require('express')
const cors = require('cors');
const mongoose = require('mongoose');

const routes = require('./routes');
const { StatusCodes } = require('http-status-codes');


const app = express()

app.use(express.json())
app.use(cors())
app.get('/', (req, res) => {
  res.status(StatusCodes.OK).send('CrowdAnalyzer Task!');
});
app.use(routes)

const listen = () => app.listen(3000, () => {
  console.log('Listening on port 3000');
})

const connect = () =>{
  mongoose.connection
    .on('error', console.log)
    .on('disconnected', connect)
  .once('open', listen)
  return mongoose.connect(
    'mongodb+srv://admin:admin@cluster0.otahu.mongodb.net/test?retryWrites=true&w=majority', {
      useNewUrlParser: true, 
      useUnifiedTopology: true
    });
}

connect()


// const chart = new mongoose.Schema({
//   title: String,
//   type: {
//     type:String,
//     enum: ['pie','line','bar']
//   },

// })


// const Chart = mongoose.model('Chart', chart);


// const obj2 = {
//   titel: 'chart1',
//   type: 'line'
// }

// Chart.create(obj2).then(resp=>{console.log(resp)}).catch(error=>{console.log(error)})



// app.post('/', async function (req, res) {

//   const dash = req.body
//   let data = {} 
//   await Dashboard.create(dash)
//   .then(data=>res.status(200).send(data))
//   .catch(error=>res.status(400).send(error.message))
//   // res.send(data)
// })
 
// app.listen(3000)
