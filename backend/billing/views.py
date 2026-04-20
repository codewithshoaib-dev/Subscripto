import stripe
from django.conf import settings
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Customer, Subscription, Payment
from .serializers import CustomerSerializer

from django.shortcuts import get_object_or_404

from decimal import Decimal

stripe.api_key = settings.STRIPE_SECRET_KEY

@api_view(["POST"])
def create_customer(request):
    try:
        serializer = CustomerSerializer(data=request.data)
        if serializer.is_valid():
            customer = serializer.save()
            return Response(CustomerSerializer(customer).data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    


@api_view(["POST"])
def create_subscription(request, customer_id):
    customer = get_object_or_404(Customer, id=customer_id)
    plan = request.data.get("plan")

    if not plan:
        return Response(
            {"error": "Plan is required."},
            status=status.HTTP_400_BAD_REQUEST
        )

    try:
        subscription = Subscription.objects.create(customer=customer, plan=plan)
    except Exception as e:
        return Response(
            {"error": f"Failed to create subscription: {str(e)}"},
            status=status.HTTP_400_BAD_REQUEST
        )

    return Response(
        {"subscription_id": subscription.id, "plan": plan}, 
        status=status.HTTP_201_CREATED
    )



@api_view(["POST"])
def create_checkout_session(request, customer_id):
    customer = Customer.objects.get(id=customer_id)
    plan = request.data.get("plan")
    cycle = request.data.get("cycle")


    PRICE_MAP = {"starter": 600, "pro": 1000, "team": 2500}  # cents
    CYCLE_MULTIPLIER = {
    "monthly": Decimal("1"),
    "yearly": Decimal("12") * Decimal("0.8")}

    def calculate_amount(plan: str, cycle: str) -> int:
        try:
            base_price = PRICE_MAP[plan]
            multiplier = CYCLE_MULTIPLIER[cycle]
        except KeyError:
            raise ValueError("Invalid plan or cycle")

        return int((Decimal(base_price) * multiplier).to_integral_value())
        

    try:
       amount = calculate_amount(plan, cycle)
    except ValueError as e:
      return Response({"error": str(e)}, status=400)


    session = stripe.checkout.Session.create(
    payment_method_types=["card"],
    line_items=[{
        "price_data": {
            "currency": "usd",
            "product_data": {"name": f"{plan.capitalize()} Plan"},
            "unit_amount": amount,
        },
        "quantity": 1,
    }],
    mode="payment",
    success_url=f"{settings.STRIPE_REDIRECT_BASE_URL}/demo/success?session_id={{CHECKOUT_SESSION_ID}}",
    cancel_url=f"{settings.STRIPE_REDIRECT_BASE_URL}/demo/failure?session_id={{CHECKOUT_SESSION_ID}}",
)

    Payment.objects.create(
        customer=customer,
        amount=amount / 100,
        reference=session.id,
    )

    return Response({"checkout_url": session.url})
