import Stripe from 'stripe';

// Initialize Stripe with your secret key
const stripe = new Stripe(import.meta.env.STRIPE_SECRET_KEY, {
    apiVersion: '2023-10-16',
});

export const createPaymentIntent = async (amount: number, currency: string = 'usd') => {
    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount, // amount in cents
            currency,
            automatic_payment_methods: {
                enabled: true,
            },
        });
        return paymentIntent;
    } catch (error) {
        console.error('Error creating payment intent:', error);
        throw error;
    }
};

export const getPlanPrice = (planName: string): number => {
    const prices = {
        'starter': 4900,    // $49.00
        'professional': 9900,  // $99.00
        'enterprise': 19900,   // $199.00
    };
    return prices[planName.toLowerCase()] || 4900;
};

export default stripe; 