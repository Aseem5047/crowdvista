const Stripe = require('stripe');

const stripe = new Stripe("sk_test_51JovZySDBS9sTKNkPxVUAeBqLYkorrXjsoM6htb7HEGAjHQ97wYUjAHwi481BqRltfEfboRphjkmzmlurPdQys2400KEjJ2pJ6");

const handler = async (req, res) => {
    if (req.method === 'POST') {
        try {
            // console.log("Body ", req.body);
            const params = {
                submit_type: 'pay',
                mode: 'payment',
                payment_method_types: ['card'],
                billing_address_collection: 'auto',
                shipping_address_collection: {
                    allowed_countries: ['IN'],
                },
                shipping_options: [
                    { shipping_rate: 'shr_1L0OzcSDBS9sTKNkp8fJsguc' },
                    { shipping_rate: 'shr_1L0P16SDBS9sTKNkNdraQIII' },
                ],
                line_items: req.body.map((item) => {
                    const img1 = `https://wallpapers.com/images/hd/netflix-profile-pictures-1000-x-1000-88wkdmjrorckekha.jpg`;
                    const img2 = `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4xE7JHqPWGILonrHa4zBgCo9ifY3jgIdmxv__hyoA_4m8dcqwVL7oG5Zv2o3R8-xVvOE&usqp=CAU`;

                    return {
                        price_data: {
                            currency: 'inr',
                            product_data: {
                                name: item.title,
                                images: [img1, img2], // Include both image URLs
                            },
                            unit_amount: parseInt(item.recievedFunds) * 100,
                        },
                        adjustable_quantity: {
                            enabled: true,
                            minimum: 1,
                        },
                        quantity: 1
                    }
                }),


                success_url: `https://crowdvista.vercel.app/success`,
                cancel_url: `https://crowdvista.vercel.app/`,
                // success_url: `http://127.0.0.1:5173/success`,
                // cancel_url: `http://127.0.0.1:5173/`,
            }

            // Create Checkout Sessions from body params.
            const session = await stripe.checkout.sessions.create(params);

            res.status(200).json(session);
        } catch (err) {
            res.status(err.statusCode || 500).json(err.message);
        }
    } else {
        res.setHeader('Allow', 'POST');
        res.status(405).end('Method Not Allowed');
    }
}

module.exports = {
    handler,
};