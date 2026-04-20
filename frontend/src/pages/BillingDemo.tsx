import { useState } from "react";

import SignupForm from "@components/SignUpForm";
import PlanSelector from "@components/PlanSelector";
import apiClient from "@/api/ApiClient";
import Modal from "@components/Modal";

// 1. Define possible steps for better type safety
type Step = "signup" | "plans";

export default function BillingDemo() {
  const [isLoading, setIsLoading] = useState(false);
  const [customerId, setCustomerId] = useState<string | null>(null);
  const [step, setStep] = useState<Step>("signup");
  const [checkoutUrl, setCheckoutUrl] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  const handleSignup = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    try {
      // Assuming your DRF endpoint returns { id: string }
      const res = await apiClient.post<{ id: string }>(
        "/api/customers/",
        formData,
      );
      setCustomerId(res.data.id);
      setStep("plans");
    } catch (error: any) {
      const message =
        error.response?.data?.email?.[0] ||
        error.response?.data?.name?.[0] ||
        error.response?.data?.detail ||
        "Signup failed.";
      alert(message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubscribe = async (planId: string, cycle: string) => {
    if (!customerId) return alert("Session expired. Please sign up again.");

    setOpen(true);
    // Reset previous checkout URL if user closes and picks a different plan
    setCheckoutUrl(null);

    try {
      // Flow improvement: We trigger the checkout session immediately
      const res = await apiClient.post<{ checkout_url: string }>(
        `/api/customers/${customerId}/checkout/`,
        { plan: planId, cycle: cycle },
      );

      setCheckoutUrl(res.data.checkout_url);
    } catch (error: any) {
      const message = error.response?.data?.error || "Subscription failed.";
      alert(message);
      setOpen(false); // Close modal on error
    }
  };

  function handleProceed() {
    if (checkoutUrl) {
      window.location.href = checkoutUrl;
    }
  }

  // Render logic
  if (step === "signup") {
    return <SignupForm onSignup={handleSignup} isLoading={isLoading} />;
  }

  return (
    <>
      <PlanSelector onSubscribe={handleSubscribe} />
      {open && (
        <Modal
          // If checkoutUrl is null, Modal can show a loading spinner
          checkoutUrl={checkoutUrl}
          handleProceed={handleProceed}
          setOpen={setOpen}
          // Only reset URL if explicitly needed by your Modal's close logic
          setCheckoutUrl={setCheckoutUrl}
        />
      )}
    </>
  );
}
