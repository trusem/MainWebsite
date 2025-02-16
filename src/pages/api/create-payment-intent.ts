import type { APIRoute } from 'astro';
import Stripe from 'stripe';

const stripe = new Stripe(import.meta.env.STRIPE_SECRET_KEY, {
    apiVersion: '2023-10-16'
});

const getPlanAmount = (planName: string): number => {
    const prices = {
        'starter': 4900,      // $49.00
        'professional': 9900, // $99.00
        'enterprise': 19900   // $199.00
    };
    return prices[planName.toLowerCase()] || 4900;
};

export const POST: APIRoute = async ({ request }) => {
    try {
        const body = await request.json();
        const { plan } = body;

        if (!plan) {
            return new Response(
                JSON.stringify({ error: 'Please select a plan' }), 
                { status: 400 }
            );
        }

        // Create a PaymentIntent with the order amount and currency
        const paymentIntent = await stripe.paymentIntents.create({
            amount: getPlanAmount(plan),
            currency: 'usd',
            automatic_payment_methods: {
                enabled: true,
            },
            metadata: {
                plan: plan
            }
        });

        return new Response(
            JSON.stringify({
                clientSecret: paymentIntent.client_secret,
            }),
            { status: 200 }
        );
    } catch (error) {
        console.error('Error:', error);
        return new Response(
            JSON.stringify({ error: 'Error creating payment intent' }), 
            { status: 500 }
        );
    }
}; 