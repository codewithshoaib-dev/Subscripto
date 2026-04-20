
from .models import Subscription, Plan
from django.contrib.auth import get_user_model
import stripe
from datetime import datetime
from django.utils.timezone import make_aware

User = get_user_model()

def handle_checkout_completed(session_data):
    customer_email = session_data.get("customer_email")
    subscription_id = session_data.get("subscription")
    customer_id = session_data.get("customer")

  
    stripe_subscription = stripe.Subscription.retrieve(subscription_id)
    price_id = stripe_subscription["items"]["data"][0]["price"]["id"]
    status = stripe_subscription["status"]
    current_period_end = stripe_subscription["current_period_end"]

    try:
        plan = Plan.objects.get(stripe_price_id=price_id)
    except Plan.DoesNotExist:
        return  

   
    try:
        user = User.objects.get(email=customer_email)
    except User.DoesNotExist:
        return  

  
    sub, created = Subscription.objects.update_or_create(
        user=user,
        defaults={
            "plan": plan,
            "stripe_customer_id": customer_id,
            "stripe_subscription_id": subscription_id,
            "status": status,
            "current_period_end": make_aware(datetime.fromtimestamp(current_period_end)),
        }
    )




def handle_invoice_paid(invoice_data):
    
    subscription_id = invoice_data["subscription"]
    stripe_subscription = stripe.Subscription.retrieve(subscription_id)

    user_email = stripe_subscription["customer_email"] or invoice_data.get("customer_email")
    price_id = stripe_subscription["items"]["data"][0]["price"]["id"]
    current_period_end = stripe_subscription["current_period_end"]

    
    try:
        user = User.objects.get(email=user_email)
    except User.DoesNotExist:
        return

  
    try:
        plan = Plan.objects.get(stripe_price_id=price_id)
    except Plan.DoesNotExist:
        return

  
    Subscription.objects.update_or_create(
        user=user,
        defaults={
            "plan": plan,
            "status": stripe_subscription["status"],
            "stripe_subscription_id": subscription_id,
            "stripe_customer_id": stripe_subscription["customer"],
            "current_period_end": make_aware(datetime.fromtimestamp(current_period_end)),
        }
    )


def handle_subscription_updated(subscription_data):
    subscription_id = subscription_data["id"]
    customer_id = subscription_data["customer"]
    status = subscription_data["status"]
    current_period_end = subscription_data["current_period_end"]
    price_id = subscription_data["items"]["data"][0]["price"]["id"]

   
    try:
        sub = Subscription.objects.get(stripe_subscription_id=subscription_id)
        user = sub.user
    except Subscription.DoesNotExist:
        return

    # Update plan if changed
    try:
        plan = Plan.objects.get(stripe_price_id=price_id)
    except Plan.DoesNotExist:
        return

    sub.plan = plan
    sub.status = status
    sub.stripe_customer_id = customer_id
    sub.current_period_end = make_aware(datetime.fromtimestamp(current_period_end))
    sub.save()


def handle_subscription_deleted(subscription_data):
    subscription_id = subscription_data["id"]

    try:
        sub = Subscription.objects.get(stripe_subscription_id=subscription_id)
    except Subscription.DoesNotExist:
        return

    # keep record but mark inactive
    sub.status = "canceled"
    sub.save()
