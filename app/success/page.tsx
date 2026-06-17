export default function SuccessPage() {
  return (
    <main className="site">
      <section className="hero">
        <div className="wrap">
          <p className="eyebrow">Payment received</p>
          <h1>Thank you</h1>
          <p className="lead">
            Your payment has been received. We will be in touch to arrange the repair.
          </p>

          <div className="contactBox">
            <strong>Questions?</strong>
            <span>Call only: 07562 717278. No text messages or WhatsApp.</span>
          </div>

          <a href="/" className="button">Back to homepage</a>
        </div>
      </section>
    </main>
  );
}