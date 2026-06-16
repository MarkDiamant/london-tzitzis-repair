export default function PricingPage() {
  return (
    <main className="site">
      <section className="hero">
        <div className="wrap">
          <p className="eyebrow">Pricing</p>
          <h1>London Tzitzis Repair Prices</h1>
          <p className="lead">
            Clear pricing for tzitzis string repair, using standard thick tallis strings.
          </p>
        </div>
      </section>

      <section className="wrap section">
        <h2>Repair prices</h2>

        <div className="cards">
          <div className="card">
            <h3>1 Corner</h3>
            <p>GBP 6</p>
          </div>

          <div className="card">
            <h3>2 Corners</h3>
            <p>GBP 12</p>
          </div>

          <div className="card">
            <h3>3 Corners</h3>
            <p>GBP 18</p>
          </div>

          <div className="card dark">
            <h3>Full set</h3>
            <p>GBP 20</p>
          </div>
        </div>
      </section>

      <section className="band">
        <div className="wrap section">
          <h2>Collection and delivery</h2>

          <ul className="list">
            <li>Collected and delivered to an NW11 address: GBP 5 total</li>
            <li>Collected and delivered to an NW4 address: GBP 8 total</li>
            <li>All other areas: customer drop-off and customer collection only</li>
          </ul>

          <h2 style={{ marginTop: 32 }}>Drop-off address</h2>

          <p>
            4 Eastville Avenue<br />
            London<br />
            NW11 0HD
          </p>
        </div>
      </section>
    </main>
  );
}
