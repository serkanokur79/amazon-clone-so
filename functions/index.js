const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors');
const stripe = require('stripe')(
  'sk_test_51HPvUCKqH3E01gxjvKChqFRcwKWuYIVgdWiwYoK4iN5QjqEaqe2f6fzxl0U4eDqU66nJ9M8xQkr4vqOZ3y5Dvv7300kcb39GQG'
);
//API

// App config
const app = express();
//Middlewares
app.use(
  cors({
    origin: true,
  })
);
app.use(express.json());
// API routes
app.get('/', (request, response) => response.status(200).send('hello world!'));

app.post('/payments/create', async (request, response) => {
  const total = request.query.total;

  console.log('Payment request received for this amonut >>>>>', total);

  const paymentIntent = await stripe.paymentIntents.create({
    amount: total, // subunits of currency
    currency: 'usd',
    payment_method_types: ['card'],
  });

  //Ok - Created
  response.status(201).send({
    clientSecret: paymentIntent.client_secret,
  });
});
// Listen command
exports.api = functions.https.onRequest(app);
//example endpoint
//http://localhost:5001/amaz0n-clone-so/us-central1/api
