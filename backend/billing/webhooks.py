from django.views.decorators.csrf import csrf_exempt
import stripe
from django.http import HttpResponse
from .stripe import handle_checkout_completed, handle_invoice_paid, handle_subscription_deleted, handle_subscription_updated
from django.conf import settings



@csrf_exempt
def stripe_webhook_view(request):
    payload = request.body
    sig_header = request.META["HTTP_STRIPE_SIGNATURE"]
    event = None

    try:
        event = stripe.Webhook.construct_event(
            payload, sig_header, settings.STRIPE_WEBHOOK_SECRET
        )
    except stripe.error.SignatureVerificationError:
        return HttpResponse(status=400)

    if event["type"] == "checkout.session.completed":
        handle_checkout_completed(event["data"]["object"])

    elif event["type"] == "invoice.paid":
        handle_invoice_paid(event["data"]["object"])

    elif event["type"] == "customer.subscription.updated":
        handle_subscription_updated(event["data"]["object"])

    elif event["type"] == "customer.subscription.deleted":
        handle_subscription_deleted(event["data"]["object"])

    return HttpResponse(status=200)
