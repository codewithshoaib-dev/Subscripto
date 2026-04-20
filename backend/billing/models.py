from django.db import models

class Customer(models.Model):
    email = models.EmailField(unique=False)
    name = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)

class Subscription(models.Model):
    PLAN_CHOICES = [
        ("basic", "Basic"),
        ("pro", "Pro"),
        ('team', 'Team'),
    ]
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE, related_name="subscriptions")
    plan = models.CharField(max_length=20, choices=PLAN_CHOICES)
    active = models.BooleanField(default=True)
    started_at = models.DateTimeField(auto_now_add=True)
    ends_at = models.DateTimeField(null=True, blank=True)

class Payment(models.Model):
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE, related_name="payments")
    amount = models.DecimalField(max_digits=8, decimal_places=2)
    timestamp = models.DateTimeField(auto_now_add=True)
    success = models.BooleanField(default=True)
    reference = models.CharField(max_length=100, unique=True)
