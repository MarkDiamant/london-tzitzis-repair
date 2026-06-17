"use client";

import { useMemo, useState } from "react";

export default function Home() {
  const [repairType, setRepairType] = useState<"corner" | "full">("full");
  const [corners, setCorners] = useState(1);
  const [delivery, setDelivery] = useState<"dropoff" | "nw11" | "nw4">("dropoff");
  const [quantity, setQuantity] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    postcode: "",
    repairNotes: "",
    preferredTimes: "",
  });

  const repairTotal = repairType === "full" ? 20 : corners === 4 ? 20 : corners * 6;
  const deliveryTotal = delivery === "nw11" ? 5 : delivery === "nw4" ? 8 : 0;
  const total = useMemo(() => repairTotal * quantity + deliveryTotal, [repairTotal, quantity, deliveryTotal]);

  const updateField = (field: keyof typeof formData, value: string) => {
    setFormData((current) => ({ ...current, [field]: value }));
  };

  const handleCheckout = async () => {
    if (!formData.name || !formData.phone || !formData.email) {
      alert("Please enter your name, phone number and email address.");
      return;
    }

    if (delivery !== "dropoff" && (!formData.address || !formData.postcode)) {
      alert("Please enter your collection and delivery address.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          repairType,
          corners,
          quantity,
          delivery,
          total,
          ...formData,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.url) {
        alert(data.error || "Unable to start payment. Please try again.");
        setIsSubmitting(false);
        return;
      }

      window.location.href = data.url;
    } catch {
      alert("Unable to start payment. Please try again.");
      setIsSubmitting(false);
    }
  };

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
<span>Email: londontzitzisrepair@gmail.com</span>
            </div>

            <a href="#order" className="button">Order now</a>
          </div>

          <div className="priceCard">
            <h2>Quick price</h2>

            <label>Repair type</label>
            <div className="choices two">
              <button type="button" onClick={() => setRepairType("corner")} className={repairType === "corner" ? "active" : ""}>
                Per corner<br /><span>£6 each</span>
              </button>
              <button type="button" onClick={() => setRepairType("full")} className={repairType === "full" ? "active" : ""}>
                All 4 corners<br /><span>£20 total</span>
              </button>
            </div>

            {repairType === "corner" && (
              <>
                <label>How many corners?</label>
                <div className="choices four">
                  {[1, 2, 3, 4].map((n) => (
                    <button type="button" key={n} onClick={() => setCorners(n)} className={corners === n ? "active" : ""}>
                      {n}
                    </button>
                  ))}
                </div>
              </>
            )}

            <label>Quantity of talleisim</label>
            <div className="choices four">
              {[1, 2, 3].map((n) => (
                <button type="button" key={n} onClick={() => setQuantity(n)} className={quantity === n ? "active" : ""}>
                  {n}
                </button>
              ))}
              <input
                type="number"
                min="4"
                value={quantity >= 4 ? quantity : ""}
                onChange={(e) => setQuantity(Math.max(4, Number(e.target.value) || 4))}
                placeholder="4+"
                className="quantityInput"
              />
            </div>

            <label>Collection / delivery</label>
            <div className="choices one">
              <button type="button" onClick={() => setDelivery("dropoff")} className={delivery === "dropoff" ? "active" : ""}>
                Customer drop-off and customer collection<br /><span>Free</span>
              </button>
              <button type="button" onClick={() => setDelivery("nw11")} className={delivery === "nw11" ? "active" : ""}>
                Collected from and delivered to an NW11 address<br /><span>£5 total</span>
              </button>
              <button type="button" onClick={() => setDelivery("nw4")} className={delivery === "nw4" ? "active" : ""}>
                Collected from and delivered to an NW4 address<br /><span>£8 total</span>
              </button>
            </div>

            <div className="total">
              <span>Total</span>
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
              <li>Collected from and delivered to an NW11 address: £5 total</li>
              <li>Collected from and delivered to an NW4 address: £8 total</li>
              <li>All other areas: customer drop-off and customer collection only</li>
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

            <input placeholder="Name" value={formData.name} onChange={(e) => updateField("name", e.target.value)} />
            <input placeholder="Phone number" value={formData.phone} onChange={(e) => updateField("phone", e.target.value)} />
            <input placeholder="Email address" value={formData.email} onChange={(e) => updateField("email", e.target.value)} />

            {delivery !== "dropoff" && (
              <>
                <input placeholder="Collection / delivery address" value={formData.address} onChange={(e) => updateField("address", e.target.value)} />
                <input placeholder="Postcode" value={formData.postcode} onChange={(e) => updateField("postcode", e.target.value)} />
              </>
            )}

            {delivery === "dropoff" && (
              <p className="notice">
                You selected customer drop-off and customer collection, so no home address is needed.
              </p>
            )}

            <textarea
              placeholder="What needs repairing? For example: 2 corners need new strings"
              value={formData.repairNotes}
              onChange={(e) => updateField("repairNotes", e.target.value)}
            />
            <textarea
              placeholder="Preferred times for drop-off, collection or delivery"
              value={formData.preferredTimes}
              onChange={(e) => updateField("preferredTimes", e.target.value)}
            />

            <div className="total">
              <span>Order total</span>
              <strong>£{total}</strong>
            </div>

            <button type="button" className="button full" onClick={handleCheckout} disabled={isSubmitting}>
              {isSubmitting ? "Opening payment..." : "Continue to payment"}
            </button>
          </div>
        </div>
      </section>

      <footer>
        <div className="wrap footerGrid">
          <span>London Tzitzis Repair</span>
          <span>Call only: 07562 717278 · londontzitzisrepair@gmail.com</span>
        </div>
      </footer>
    </main>
  );
}