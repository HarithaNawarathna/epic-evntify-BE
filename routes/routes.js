const express = require('express');
const router = express.Router();
const connection = require('../services/connection')


const createPayment = require('../components/createPayment/createPayment');
const savePaymentData = require('../components/savePaymentData/savePaymentData');
const getEventData = require('../components/getEventData/getEventData');
const getEventDataById = require('../components/getEventDataById/getEventDataById');
const getPopularEvent = require('../components/getPopularEvent/getPopularEvent');
const getUpcomingEventData = require('../components/getUpcomingEventData/getUpcomigEventData')
const userSignup = require('../components/userSignup/userSignup');
const userSignin = require('../components/userSignin/userSignin');
const { authenticateToken } = require('../utils/authUtils');
const mailTest = require('../components/test/mailTest');


//create payment intent
router.post('/create-payment-intent', (req, res) => {
    createPayment(req, res);
});

//save payment data
router.post('/savepayment', async(req, res)=>{
    savePaymentData(req, res);
})

//get all events
router.get('/getallevents', async(req, res)=>{
    getEventData(req, res);
})

router.get('/geteventdatabyid/:id', async(req, res)=>{
    getEventDataById(req, res);
})

router.get('/getupcomingeventdata', async(req, res)=>{
    getUpcomingEventData(req, res);
})

router.get('/getmostpopularevent', async(req, res)=>{
    getPopularEvent(req, res);
})

router.post('/signup', async(req, res)=>{
    userSignup(req, res);
})

router.post('/signin', async(req, res)=>{
    userSignin(req, res);
})

router.get('/protected', authenticateToken,  (req, res) => { 
    res.status(200).json("Protected Route") ;
});


router.get('/test/email', (req, res) => {   
    mailTest(req, res);
});
    


module.exports = router
