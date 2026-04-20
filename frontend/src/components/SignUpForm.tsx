import { BiLoaderCircle } from "react-icons/bi";
import React from "react";

type SignUpFormProps = {
  onSignup: (e: React.SubmitEvent<HTMLFormElement>) => void;
  isLoading: boolean;
};

export default function SignupForm({ onSignup, isLoading }: SignUpFormProps) {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Stepper */}
      <div className="w-full px-6 py-5 border-b border-border flex items-center justify-center">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-primary text-white text-sm flex items-center justify-center font-medium">
              1
            </div>
            <span className="text-sm font-medium">Account</span>
          </div>

          <div className="w-10 h-0.5 bg-border" />

          <div className="flex items-center gap-2 opacity-50">
            <div className="w-7 h-7 rounded-full border border-border text-sm flex items-center justify-center">
              2
            </div>
            <span className="text-sm">Plan</span>
          </div>

          <div className="w-10 h-0.5 bg-border" />

          <div className="flex items-center gap-2 opacity-50">
            <div className="w-7 h-7 rounded-full border border-border text-sm flex items-center justify-center">
              3
            </div>
            <span className="text-sm">Checkout</span>
          </div>
        </div>
      </div>

      <div className="flex flex-1">
        {/* Left panel */}
        <div className="hidden md:flex w-[35%] relative items-center justify-center px-10">
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
