type ModalProps = {
  setOpen: (value: boolean) => void;
  handleProceed: () => void;
  checkoutUrl: string | null;
  setCheckoutUrl: (value: string | null) => void;
};

export default function Modal({
  setOpen,
  handleProceed,
  checkoutUrl,
  setCheckoutUrl,
}: ModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={() => {
          setOpen(false);
          setCheckoutUrl(null);
        }}
      />

      {/* Modal */}
      <div className="relative w-full max-w-lg bg-card border border-border rounded-2xl shadow-xl overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-border">
          <h3 className="text-lg font-semibold">Checkout preview</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Stripe test mode is enabled for this demo flow
          </p>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5">
          {/* Info banner */}
          <div className="p-4 rounded-xl bg-muted border border-border text-sm">
            Use Stripe test cards below to simulate different payment outcomes.
          </div>

          {/* Card grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
            <div className="p-3 rounded-xl border border-border">
              <p className="font-medium">Success</p>
              <p className="text-muted-foreground mt-1">4242 4242 4242 4242</p>
            </div>

            <div className="p-3 rounded-xl border border-border">
              <p className="font-medium">Declined</p>
              <p className="text-muted-foreground mt-1">4000 0000 0000 0002</p>
            </div>

            <div className="p-3 rounded-xl border border-border">
              <p className="font-medium">Insufficient funds</p>
              <p className="text-muted-foreground mt-1">4000 0000 0000 9995</p>
            </div>

            <div className="p-3 rounded-xl border border-border">
              <p className="font-medium">3D Secure</p>
              <p className="text-muted-foreground mt-1">4000 0025 0000 3155</p>
            </div>

            <div className="p-3 rounded-xl border border-border sm:col-span-2">
              <p className="font-medium">Expired card</p>
              <p className="text-muted-foreground mt-1">4000 0000 0000 0069</p>
            </div>
          </div>

          {/* Note */}
          <p className="text-xs text-muted-foreground">
            Use any future expiry date and any 3-digit CVC. These are Stripe
            test cards only.
          </p>
        </div>

        {/* Actions */}
        <div className="p-6 border-t border-border flex justify-end gap-3">
          <button
            onClick={() => {
              setOpen(false);
              setCheckoutUrl(null);
            }}
            className="px-4 py-2 rounded-xl border border-border text-sm hover:bg-muted transition"
          >
            Cancel
          </button>

          <button
            onClick={handleProceed}
            disabled={!checkoutUrl}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition ${
              checkoutUrl
                ? "bg-primary text-white hover:opacity-90"
                : "bg-muted text-muted-foreground cursor-not-allowed"
            }`}
          >
            Continue to checkout
          </button>
        </div>
      </div>
    </div>
  );
}
