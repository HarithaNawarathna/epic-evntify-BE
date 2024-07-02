const connection = require('./../../services/connection');
const stripe = require('stripe')('sk_test_51ObQ74EVdCsIjFayT4UseE6U5twkNEezJNdyHxXjTBxJvAp6LpzxfI128cGI8GdKHujF20sHb4eS97zvYY7ZZt7H009I0k4Tuy');


module.exports = async function createPayment(req, res) {
    console.log(req.body)
    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: req.body.amount ,
            currency: 'usd',
            payment_method_types: ['card'],
        });
        
        res.json({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
        console.error('Error creating payment intent:', error);
        res.status(500).json({ error: 'Failed to create payment intent' });
    }
}