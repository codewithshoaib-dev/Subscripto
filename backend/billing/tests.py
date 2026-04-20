from django.test import TestCase
from django.db import IntegrityError
from .models import Customer, Subscription, Payment


class BillingModelTests(TestCase):
	def test_customer_unique_email(self):
		Customer.objects.create(name="User1", email="u1@example.com")
		with self.assertRaises(IntegrityError):
			# Attempt to create a second customer with same email should [pass]
			Customer.objects.create(name="User2", email="u1@example.com")

	def test_subscription_plan_saved(self):
		customer = Customer.objects.create(name="SubUser", email="sub@example.com")
		sub = Subscription.objects.create(customer=customer, plan="pro")
		self.assertEqual(sub.plan, "pro")
		self.assertTrue(sub.active)

	def test_payment_unique_reference(self):
		customer = Customer.objects.create(name="Payer", email="pay@example.com")
		Payment.objects.create(customer=customer, amount=10.0, reference="ref-12345")
		with self.assertRaises(IntegrityError):
			Payment.objects.create(customer=customer, amount=20.0, reference="ref-12345")
