from rest_framework import serializers
from .models import Customer, Subscription, Payment

class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = ["id", "name", "email"]

class SubscriptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subscription
        fields = ["id", "customer", "plan", "active", "started_at", "ends_at"]

class PaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment
        fields = ["id", "customer", "amount", "timestamp", "success", "reference"]
