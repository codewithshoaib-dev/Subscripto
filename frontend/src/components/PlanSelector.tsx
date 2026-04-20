import { useState, useMemo } from "react";

interface Plan {
  id: string;
  cycle: "monthly" | "yearly";
  title: string;
  price: number;
  features: string[];
}

interface PlanSelectorProps {
  onSubscribe: (id: string, cycle: string) => void;
}

export default function PlanSelector({ onSubscribe }: PlanSelectorProps) {
  // Memoize to prevent re-calculation on every render
  const pricingData = useMemo(() => {
    const monthly: Plan[] = [
      {
        id: "starter",
        cycle: "monthly",
        title: "Starter",
        price: 6,
        features: [
          "Up to 3 projects",
          "Basic task boards",
          "2 team members",
          "Email notifications",
        ],
      },
      {
        id: "pro",
        cycle: "monthly",
        title: "Pro",
        price: 19,
        features: [
          "Unlimited projects",
          "Advanced workflows",
          "10 team members",
          "Priority support",
        ],
      },
      {
        id: "team",
        cycle: "monthly",
        title: "Team",
        price: 99,
        features: [
          "Everything in Pro",
          "Unlimited members",
          "Analytics",
          "24/7 support",
        ],
      },
    ];
    const yearly = monthly.map((plan) => ({
      ...plan,
      cycle: "yearly" as const,
      price: Math.round(plan.price * 12 * 0.8),
    }));
    return { monthly, yearly };
  }, []);

  const [billing, setBilling] = useState<"monthly" | "yearly">("monthly");

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Stepper (Simplified for brevity) */}
      <div className="w-full px-6 py-5 border-b border-border flex items-center justify-center">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 opacity-50">
            <div className="w-7 h-7 rounded-full border border-border flex items-center justify-center text-sm">
              1
            </div>
            <span className="text-sm">Account</span>
          </div>
          <div className="w-10 h-0.5 bg-border" />
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-primary text-white flex items-center justify-center text-sm font-medium">
              2
            </div>
            <span className="text-sm font-medium">Plan</span>
          </div>
          <div className="w-10 h-0.5 bg-border" />
          <div className="flex items-center gap-2 opacity-50">
            <div className="w-7 h-7 rounded-full border border-border flex items-center justify-center text-sm">
              3
            </div>
            <span className="text-sm">Checkout</span>
          </div>
        </div>
      </div>

      <div className="flex flex-1 flex-col lg:flex-row">
        {/* Left Side (Context) */}
        <div className="hidden lg:flex lg:w-[30%] relative items-center justify-center px-10 border-r border-border/50">
          <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] bg-size-[40px_40px]" />
          <div className="relative max-w-xs">
            <h2 className="text-2xl font-semibold mb-4">Choose a plan</h2>
            <p className="text-sm text-muted-foreground">
              Select a plan that fits your business. You can upgrade or change
              it later.
            </p>
            <div className="mt-6 space-y-3 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <span>✓</span> Transparent pricing
              </div>
              <div className="flex items-center gap-2">
                <span>✓</span> Upgrade anytime
              </div>
              <div className="flex items-center gap-2">
                <span>✓</span> Secure billing
              </div>
            </div>
          </div>
        </div>

        {/* Right Side (Main Content) */}
        <div className="flex-1 flex flex-col items-center justify-center px-6 py-12 lg:py-6">
          <div className="w-full max-w-5xl">
            <div className="mb-8 text-center lg:text-left">
              <p className="text-sm font-medium text-primary mb-1">Acme Inc.</p>
              <h1 className="text-3xl font-bold tracking-tight">
                Select your plan
              </h1>
            </div>

            {/* Billing Toggle */}
            <div className="flex justify-center lg:justify-start mb-10">
              <div className="bg-muted p-1 rounded-lg flex items-center">
                {(["monthly", "yearly"] as const).map((type) => (
                  <button
                    key={type}
                    onClick={() => setBilling(type)}
                    className={`px-6 py-2 text-sm font-medium rounded-md transition-colors ${
                      billing === type
                        ? "bg-primary text-foreground shadow-sm"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {type === "monthly" ? "Monthly" : "Yearly (-20%)"}
                  </button>
                ))}
              </div>
            </div>

            {/* Plans Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
              {pricingData[billing].map((plan) => {
                const isPro = plan.id === "pro";
                return (
                  <div
                    key={plan.id}
                    className={`relative flex flex-col rounded-2xl border bg-card p-8 transition-all ${
                      isPro
                        ? "border-primary ring-1 ring-primary shadow-xl scale-105 z-10"
                        : "border-border hover:border-border/80"
                    }`}
                  >
                    {isPro && (
                      <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                        <span className="bg-primary text-primary-foreground text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-sm">
                          Most Popular
                        </span>
                      </div>
                    )}

                    <div className="mb-6">
                      <h3 className="text-lg font-bold">{plan.title}</h3>
                      <div className="mt-4 flex items-baseline gap-1">
                        <span className="text-4xl font-bold">
                          ${plan.price}
                        </span>
                        <span className="text-muted-foreground text-sm">
                          /{billing === "monthly" ? "mo" : "yr"}
                        </span>
                      </div>
                    </div>

                    {/* Feature List  */}
                    <div className="flex-1 space-y-4 mb-8">
                      {plan.features.map((feature) => (
                        <div
                          key={feature}
                          className="flex items-start gap-3 text-sm"
                        >
                          <svg
                            className="w-4 h-4 text-primary shrink-0 mt-0.5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2.5}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                          <span className="text-muted-foreground">
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>

                    <button
                      onClick={() => onSubscribe(plan.id, plan.cycle)}
                      className={"w-full py-3 px-4 rounded-xl text-sm font-semibold transition-colors bg-primary text-primary-foreground hover:bg-primary/90"}
                    >
                      Get Started
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
