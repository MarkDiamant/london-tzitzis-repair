"use client";

import { useMemo, useState } from "react";

export default function Home() {
  const [repairType, setRepairType] = useState<"corner" | "full">("full");
  const [corners, setCorners] = useState(1);
  const [delivery, setDelivery] = useState<"dropoff" | "nw11" | "nw4">("dropoff");

  const repairTotal = repairType === "full" ? 20 : corners === 4 ? 20 : corners * 6;
  const deliveryTotal = delivery === "nw11" ? 5 : delivery === "nw4" ? 8 : 0;
  const total = useMemo(() => repairTotal + deliveryTotal, [repairTotal, deliveryTotal]);

  return (
    <main className="site">
      <section className="hero">
        <div className="wrap heroGrid">
          <div>
            <p className="eyebrow">Local Tzitzis String Repair</p>
            <h1>London Tzitzis Repair</h1>
            <p className="lead">
              Repair of tzitzis strings on tallis and tzitzis garments.
              Clear prices, simple ordering and local collection where available.
            </p>

            <div className="contactBox">
              <strong>Call only: 07562 717278</strong>
              <span>No text messages or WhatsApp</span>
            </div>

            <a href="#order" className="button">Order now</a>
          </div>

          <div className="priceCard">
            <h2>Quick price</h2>

            <label>Repair type</label>
            <div className="choices two">
              <button onClick={() => setRepairType("corner")} className={repairType === "corner" ? "active" : ""}>
                Per corner<br /><span>£6 each</span>
              </button>
              <button onClick={() => setRepairType("full")} className={repairType === "full" ? "active" : ""}>
                All 4 corners<br /><span>£20 total</span>
              </button>
            </div>

            {repairType === "corner" && (
              <>
                <label>How many corners?</label>
                <div className="choices four">
                  {[1, 2, 3, 4].map((n) => (
                    <button key={n} onClick={() => setCorners(n)} className={corners === n ? "active" : ""}>
                      {n}
                    </button>
                  ))}
                </div>
              </>
            )}

            <label>Collection / delivery</label>
            <div className="choices one">
              <button onClick={() => setDelivery("dropoff")} className={delivery === "dropoff" ? "active" : ""}>
                Customer drop-off and customer collection<br /><span>Free</span>
              </button>
              <button onClick={() => setDelivery("nw11")} className={delivery === "nw11" ? "active" : ""}>
                NW11 collection and delivery<br /><span>£5 total</span>
              </button>
              <button onClick={() => setDelivery("nw4")} className={delivery === "nw4" ? "active" : ""}>
                NW4 collection and delivery<br /><span>£8 total</span>
              </button>
            </div>

            <div className="total">
              <span>Estimated total</span>
              <strong>£{total}</strong>
            </div>
          </div>
        </div>
      </section>

      <section className="wrap section">
        <h2>Pricing</h2>
        <div className="cards">
          <div className="card"><h3>1 Corner</h3><p>£6</p></div>
          <div className="card"><h3>2 Corners</h3><p>£12</p></div>
          <div className="card"><h3>3 Corners</h3><p>£18</p></div>
          <div className="card dark"><h3>All 4 Corners</h3><p>£20</p></div>
        </div>
      </section>

      <section className="band">
        <div className="wrap section twoCol">
          <div>
            <h2>Collection and delivery</h2>
            <ul className="list">
              <li>NW11: £5 total, including both collection and delivery</li>
              <li>NW4: £8 total, including both collection and delivery</li>
              <li>All other areas: Customer drop-off and customer collection only</li>
            </ul>

            <h2>Drop-off address</h2>
            <p>
              4 Eastville Avenue<br />
              London<br />
              NW11 0HD
            </p>
          </div>

          <div id="order" className="orderBox">
            <h2>Order details</h2>

            <input placeholder="Name" />
            <input placeholder="Phone number" />
            <input placeholder="Email address" />

            {delivery !== "dropoff" && (
              <>
                <input placeholder="Collection / delivery address" />
                <input placeholder="Postcode" />
              </>
            )}

            {delivery === "dropoff" && (
              <p className="notice">
                You selected Customer drop-off and customer collection, so no home address is needed.
              </p>
            )}

            <textarea placeholder="What needs repairing? For example: 2 corners need new strings" />
            <textarea placeholder="Preferred times for drop-off, collection or delivery" />

            <div className="total">
              <span>Order total</span>
              <strong>£{total}</strong>
            </div>

            <button className="button full">Continue to payment</button>
            <p className="small">
              Payment button is ready to connect to Stripe Checkout.
            </p>
          </div>
        </div>
      </section>

      <footer>
        <div className="wrap footerGrid">
          <span>London Tzitzis Repair</span>
          <span>Call only: 07562 717278</span>
        </div>
      </footer>
    </main>
  );
}
