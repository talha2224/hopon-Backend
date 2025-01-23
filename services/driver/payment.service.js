const Stripe = require("stripe");
const stripe = new Stripe("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");

const createPaymentIntent = async (req,res)=>{
    try {
        const { amount,id } = req.body;
        console.log(amount,'amount')
        const paymentIntent = await stripe.paymentIntents.create(
            {
                amount: amount,
                currency: "usd",
                // payment_method_types: ["card"],
                automatic_payment_methods:{enabled:true}
            });
        res.status(200).send({clientSecret: paymentIntent.client_secret,});
    } 
    catch (error) {
        console.log(error)
    }
}

module.exports = {createPaymentIntent}