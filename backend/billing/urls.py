from django.urls import path
from . import views

urlpatterns = [
    path("customers/", views.create_customer),
    path("customers/<int:customer_id>/subscribe/", views.create_subscription),
    path("customers/<int:customer_id>/checkout/", views.create_checkout_session),
]
