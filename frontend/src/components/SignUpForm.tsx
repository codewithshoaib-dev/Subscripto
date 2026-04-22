import { BiLoaderCircle } from "react-icons/bi";
import React from "react";

type SignUpFormProps = {
  onSignup: (e: React.SubmitEvent<HTMLFormElement>) => void;
  isLoading: boolean;
};

export default function SignupForm({ onSignup, isLoading }: SignUpFormProps) {
  return (
    <div className="min-h-[90vh] bg-background text-foreground flex flex-col py-6">
      
      {/* Stepper */}
      <div className="w-full px-4 py-4 border-b border-border flex justify-center">
        <div className="flex items-center justify-between w-full max-w-md">
          {/* Step 1 */}
          <div className="flex flex-col items-center flex-1">
            <div className="step-active">1</div>
            <span className="step-label">Account</span>
          </div>

          <div className="step-connector" />

          {/* Step 2 */}
          <div className="flex flex-col items-center flex-1 opacity-50">
            <div className="step-inactive">2</div>
            <span className="step-label">Plan</span>
          </div>

          <div className="step-connector" />

          {/* Step 3 */}
          <div className="flex flex-col items-center flex-1 opacity-50">
            <div className="step-inactive">3</div>
            <span className="step-label">Checkout</span>
          </div>
        </div>
      </div>

      <div className="flex flex-1">
        {/* Left panel */}
        <div className="hidden md:flex md:w-[35%] relative items-center justify-center px-10">
          <div
            className="absolute inset-0 opacity-[0.04] 
            bg-[linear-gradient(to_right,#000_1px,transparent_1px),
                linear-gradient(to_bottom,#000_1px,transparent_1px)]
            bg-size-[40px_40px]"
          />

          <div className="absolute w-80 h-80 bg-accent-purple opacity-10 blur-3xl rounded-full top-10 left-10" />

          <div className="relative max-w-xs">
            <h2 className="text-2xl font-semibold leading-snug mb-4">
              Set up your business account
            </h2>
            <p className="text-sm text-muted-foreground">
              Start managing your customers, subscriptions, and billing from a
              single place.
            </p>

            <div className="mt-6 space-y-3 text-sm text-muted-foreground">
              <div>• Customer & subscription management</div>
              <div>• Flexible pricing plans</div>
              <div>• Secure Stripe checkout</div>
            </div>
          </div>
        </div>

        {/* Form side */}
        <div className="flex w-full md:w-[65%] items-center justify-center px-6 py-10">
          <div className="w-full max-w-lg p-12 card-elevated">
            {" "}
            {/* Header */}
            <div className="mb-8">
              {" "}
              <p className="text-sm text-muted-foreground mb-1">Acme Inc.</p>
              <h1 className="text-2xl font-semibold">
                Create your business account
              </h1>
              <p className="text-sm text-muted-foreground mt-1">
                Get started in under a minute
              </p>
            </div>
            {/* Form */}
            <form onSubmit={onSignup} className="space-y-5">
              {" "}
              <input
                type="text"
                name="name"
                placeholder="Full name"
                required
                className="input"
              />
              <input
                type="email"
                name="email"
                placeholder="Business email"
                required
                className="input"
              />
              <button
                type="submit"
                className="btn-primary flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <BiLoaderCircle className="animate-spin text-sm" />
                    Creating account...
                  </>
                ) : (
                  "Continue to plan"
                )}
              </button>
            </form>
            <p className="mt-6 text-xs text-muted-foreground">
              No credit card required for trial
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
