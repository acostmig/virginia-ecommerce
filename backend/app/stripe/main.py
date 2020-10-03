from app import app
from app import Config
from flask import request
import os
import stripe

stripe.api_key = Config.stripe['private']

DOMAIN = os.environ.get('HOST')


@app.route('/api/open/stripe/create-session', methods=['POST'])
def create_checkout_session():
    try:
        entities = request.get_json()["addedEntities"]
        checkout_session = stripe.checkout.Session.create(
            payment_method_types=['card'],
            shipping_address_collection={
                'allowed_countries': ['US', 'DO'],
            },

            line_items=[
                {
                    'price_data': {
                        'currency': 'usd',
                        'unit_amount': entity["fields"]["price"]["value"] + "00",
                        'product_data': {
                            'name': entity["fields"]["displayName"]["value"],
                            'images': [DOMAIN + entity["fields"]["imagePath"]["value"]],
                        },
                    },
                    'quantity': entity["quantity"],
                    # 'tax_rates':['txr_1HYFsyHGjtLJRyhChrt2S67P'],
                } for entity in entities
            ],
            mode='payment',
            success_url=DOMAIN + '/cart?success=true',
            cancel_url=DOMAIN + '/cart?canceled=true',
        )
        return {'id': checkout_session.id}
    except Exception as e:
        return str(e), 403
