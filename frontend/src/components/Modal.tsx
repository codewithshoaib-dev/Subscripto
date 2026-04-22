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
    <div className="fixed inset-0 z-50 flex items-center justify-center px-3 sm:px-4 py-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={() => {
          setOpen(false);
          setCheckoutUrl(null);
        }}
      />

      {/* Modal */}
      <div className="relative w-full max-w-lg max-h-[92vh] bg-card border border-border rounded-xl sm:rounded-2xl shadow-xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="px-4 sm:px-6 py-4 border-b border-border shrink-0">
          <h3 className="text-base sm:text-lg font-semibold">
            Checkout preview
          </h3>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1">
            Stripe test mode is enabled for this demo flow
          </p>
        </div>

        {/* Scrollable Content */}
        <div className="px-4 sm:px-6 py-4 sm:py-5 space-y-4 overflow-y-auto">
          {/* Info banner */}
          <div className="p-3 sm:p-4 rounded-lg sm:rounded-xl bg-muted border border-border text-xs sm:text-sm">
            Use Stripe test cards below to simulate different payment outcomes.
          </div>

          {/* Card grid */}
          <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 gap-2 sm:gap-3 text-xs sm:text-sm">
            <div className="p-3 rounded-lg sm:rounded-xl border border-border">
              <p className="font-medium">Success</p>
              <p className="text-muted-foreground mt-1 break-all">
                4242 4242 4242 4242
              </p>
            </div>

            <div className="p-3 rounded-lg sm:rounded-xl border border-border">
              <p className="font-medium">Declined</p>
              <p className="text-muted-foreground mt-1 break-all">
                4000 0000 0000 0002
              </p>
            </div>

            <div className="p-3 rounded-lg sm:rounded-xl border border-border">
              <p className="font-medium">Insufficient funds</p>
              <p className="text-muted-foreground mt-1 break-all">
                4000 0000 0000 9995
              </p>
            </div>

            <div className="p-3 rounded-lg sm:rounded-xl border border-border">
              <p className="font-medium">3D Secure</p>
              <p className="text-muted-foreground mt-1 break-all">
                4000 0025 0000 3155
              </p>
            </div>

            <div className="p-3 rounded-lg sm:rounded-xl border border-border xs:col-span-2">
              <p className="font-medium">Expired card</p>
              <p className="text-muted-foreground mt-1 break-all">
                4000 0000 0000 0069
              </p>
            </div>
          </div>

          {/* Note */}
          <p className="text-[11px] sm:text-xs text-muted-foreground">
            Use any future expiry date and any 3-digit CVC. These are Stripe
            test cards only.
          </p>
        </div>

        {/* Actions */}
        <div className="px-4 sm:px-6 py-4 border-t border-border flex flex-col-reverse sm:flex-row gap-2 sm:gap-3 sm:justify-end shrink-0">
          <button
            onClick={() => {
              setOpen(false);
              setCheckoutUrl(null);
            }}
            className="w-full sm:w-auto px-4 py-2 rounded-lg sm:rounded-xl border border-border text-sm hover:bg-muted transition-colors"
          >
            Cancel
          </button>

          <button
            onClick={handleProceed}
            disabled={!checkoutUrl}
            className={`w-full sm:w-auto px-4 py-2 rounded-lg sm:rounded-xl text-sm font-medium transition-colors ${
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
