const express = require('express');
const router = express.Router();
// const Purchase = require('../db').Purchase
// const UserAccount = require('../db').UserAccount
const Purchase = require('../models/purchase')
const UserAccount = require('../models/userAccount')

const axios = require('axios')
router.post('/',async function (req, res, next) {
    try {
        let clientHost = "http://localhost:8000/transaction/";
        // console.log(req.body);
        const postData = req.body;
        const options = {
            method: 'POST',
            headers: {
                'content-Type': 'application/json',
            },
            url: clientHost,
            data: JSON.stringify({
                amount: postData["offer_price"],
                receipt_id: "123456789",
                callback: "http://localhost:3000/transactionResult"
            }),
        }

        const response = await axios(options);
        console.log("#############################################################")
        // console.log(response.data);
        // save the log of uncompleted transaction with the related user data (id, first name, last name)
        const buyer = await UserAccount.findByPk(postData["corresponding_user_id"]);
        const new_purchase = await Purchase.create({
            corresponding_user_id: postData["corresponding_user_id"],
            title: postData["title"],
            first_name: buyer.first_name,
            last_name: buyer.last_name,
            flight_serial: postData["flight_serial"],
            offer_price: postData["offer_price"],
            offer_class: postData["offer_class"],
            transaction_id: response.data["transaction_id"]
        });

        // console.log(response.data);
    } catch (e) {
        console.log(e)
    }
});


module.exports = router;