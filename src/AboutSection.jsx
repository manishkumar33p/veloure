import React, { useEffect, useState } from "react";
import "./AboutSection.css";

const products = [
  {
    name: "Velvet Repair Hair Oil",
    category: "HAIR RITUAL",
    description: "A rich finishing oil designed to leave hair looking glossy, smooth and beautifully cared for.",
    image: "/p3.jpeg",
    price: "Add your price",
    details: "A lightweight-to-rich oil ritual for lengths and ends. Start with a few drops and adjust to your hair length and texture.",
    ingredients: "Add your verified ingredient list here",
    benefits: ["Helps hair look smoother", "Adds a glossy finish", "Helps tame the look of frizz"],
    use: "Warm 1–3 drops between palms. Smooth over mid-lengths and ends on damp or dry hair. Avoid the scalp if the formula is not designed for scalp use."
  },
  {
    name: "Radiance Face Cream",
    category: "DAILY SKINCARE",
    description: "A comforting moisturiser for skin that feels soft, supple and cared for.",
    image: "/p7.jpeg",
    price: "Add your price",
    details: "A daily cream step that helps support a comfortable, moisturised skin feel. Choose a texture suited to your skin type.",
    ingredients: "Add your verified ingredient list here",
    benefits: ["Helps moisturise skin", "Leaves skin feeling soft", "Complements a simple daily routine"],
    use: "Apply a small amount to clean skin. Use morning or evening according to the product label. Patch-test new skincare products."
  },
  {
    name: "Vitamin C Glow Serum",
    category: "SKINCARE CONCENTRATE",
    description: "A lightweight serum step for a fresh-looking, luminous skincare routine.",
    image: "/p2.jpeg",
    price: "Add your price",
    details: "Use a serum as a focused step between cleansing and moisturising. Formula strength and compatibility depend on the actual ingredients.",
    ingredients: "Add your verified ingredient list here",
    benefits: ["Lightweight layering step", "Pairs with moisturiser", "Supports a consistent routine"],
    use: "Follow the product label. Introduce gradually and use daytime sunscreen. Do not claim a specific result unless supported by product evidence."
  },
  {
    name: "Daily Glow Sunscreen",
    category: "DAILY ESSENTIAL",
    description: "A daily sun-care step to help protect skin when used as directed.",
    image: "/p4.jpeg",
    price: "Add your price",
    details: "Sun protection belongs at the end of the morning skincare routine. The exact SPF and protection claims must match the product label.",
    ingredients: "Add your verified ingredient list here",
    benefits: ["Supports a daily sun-care routine", "Designed for daytime use", "Pairs with moisturiser"],
    use: "Apply generously as directed on the label and reapply as instructed, especially after sweating, swimming or towel-drying."
  },
  {
    name: "Nourishing Hair Mask",
    category: "WEEKLY HAIRCARE",
    description: "A weekly care step for hair that feels softer and easier to manage.",
    image: "/p1.jpeg",
    price: "Add your price",
    details: "A conditioning treatment for lengths and ends. Adapt the frequency to the actual formula and your hair's needs.",
    ingredients: "Add your verified ingredient list here",
    benefits: ["Helps improve the feel of hair", "Adds a conditioning step", "Useful for dry-feeling lengths"],
    use: "Apply as directed on the label, leave for the stated time, then rinse thoroughly."
  },
  {
    name: "Gentle Cream Cleanser",
    category: "SKIN PREP",
    description: "A gentle-feeling first step to help lift everyday impurities before the rest of your routine.",
    image: "/p6.jpeg",
    price: "Add your price",
    details: "A cleanser should suit your skin type and leave skin feeling comfortable, not stripped.",
    ingredients: "Add your verified ingredient list here",
    benefits: ["First step in a routine", "Prepares skin for follow-up products", "Easy to pair with moisturiser"],
    use: "Use as directed on the packaging. Avoid the eye area unless the label says it is suitable."
  }
];

const testimonials = [
  { name: "Ritu", initials: "VL", product: "Replace with a verified review", quote: "“Loved the premium feel ✨ Beautiful presentation and a very nice shopping experience!”", rating: 5 },
  { name: "Sneha", initials: "VL", product: "Replace with a verified review", quote: "“Website ka experience smooth tha 👍 Product details clear hain aur ordering bhi easy hai.”", rating: 5 },
  { name: "Aditi", initials: "VL", product: "Replace with a verified review", quote: "“Products ki quality bahut achhi lagi 😊 Packaging bhi premium hai. Overall great experience!”", rating: 5 }
];

const routines = [
  { number: "01", time: "MORNING", title: "Cleanse gently", text: "Start with a cleanser suited to your skin. Pat dry without rubbing." },
  { number: "02", time: "TREAT", title: "Layer your serum", text: "Use your chosen serum as directed, introducing new products gradually." },
  { number: "03", time: "MOISTURISE", title: "Apply face cream", text: "Smooth on a suitable moisturiser to help keep skin feeling comfortable." },
  { number: "04", time: "PROTECT", title: "Finish with sunscreen", text: "Use a broad-spectrum sunscreen as directed during the day." }
];

export default function AboutSection() {
  const [productIndex, setProductIndex] = useState(0);
  const [reviewIndex, setReviewIndex] = useState(0);
  const [activeRoutine, setActiveRoutine] = useState(0);

  // Automatically rotate the product, customer-note and routine carousels.
  useEffect(() => {
    const timer = window.setInterval(() => {
      setProductIndex((i) => (i + 1) % products.length);
    }, 4500);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setReviewIndex((i) => (i + 1) % testimonials.length);
    }, 6000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveRoutine((i) => (i + 1) % routines.length);
    }, 5200);
    return () => window.clearInterval(timer);
  }, []);
  const product = products[productIndex];
  const review = testimonials[reviewIndex];

  const previousProduct = () => setProductIndex((i) => (i - 1 + products.length) % products.length);
  const nextProduct = () => setProductIndex((i) => (i + 1) % products.length);
  const previousReview = () => setReviewIndex((i) => (i - 1 + testimonials.length) % testimonials.length);
  const nextReview = () => setReviewIndex((i) => (i + 1) % testimonials.length);

  return (
    <section className="vl-about">
      <div className="vl-luxe-hero">
        <div className="vl-hero-copy">
          <span className="vl-eyebrow">THE ART OF EVERYDAY LUXURY</span>
          <p className="vl-hero-kicker">SKINCARE · HAIRCARE · SELF-CARE</p>
          <h2>Make room for your <em>ritual.</em></h2>
          <p className="vl-hero-description">
            Thoughtfully presented beauty essentials for the moments you set aside for yourself.
            Discover face cream, hair oil and daily care steps in the VELOURE LUX collection.
          </p>
          <a className="vl-primary-link" href="/products">Explore the collection <span>↗</span></a>
          <div className="vl-hero-note"><span>✦</span> A little care. A more considered routine.</div>
        </div>
        <div className="vl-hero-art" aria-label="VELOURE LUX beauty collection">
          <div className="vl-hero-orbit vl-orbit-one"></div>
          <div className="vl-hero-orbit vl-orbit-two"></div>
          <div className="vl-hero-product">
            <span className="vl-bottle-cap"></span>
            <span className="vl-bottle-label">VELOURE<br /><small>L U X</small><i>BEAUTY RITUAL</i></span>
          </div>
          <div className="vl-hero-stamp">YOUR DAILY<br />LUXURY</div>
          <span className="vl-hero-art-caption">A moment, just for you</span>
        </div>
      </div>

      <div className="vl-about-intro">
        <span className="vl-eyebrow">A MORE PERSONAL APPROACH</span>
        <h2>Beauty that feels like <em>you.</em></h2>
        <p>
          VELOURE LUX is a beauty and personal-care destination for creating a routine that feels
          considered, simple and personal. Explore products by purpose, learn how to use them, and
          choose what fits your own preferences.
        </p>
        <div className="vl-about-values">
          <div><span>01</span><h3>Thoughtful Choices</h3><p>Clear product details to help you choose with care.</p></div>
          <div><span>02</span><h3>Everyday Rituals</h3><p>Small, repeatable steps for your skin and hair routine.</p></div>
          <div><span>03</span><h3>Your Own Glow</h3><p>Personal care is personal. Find what suits you.</p></div>
        </div>
      </div>

      <div className="vl-product-section">
        <div className="vl-section-heading">
          <div><span className="vl-eyebrow">THE SIGNATURE EDIT</span><h2>Discover your <em>ritual.</em></h2><p className="vl-section-subtitle">Products automatically rotate every 4.5 seconds — no clicking needed.</p></div>
          <div className="vl-arrows">
            <button type="button" onClick={previousProduct} aria-label="Previous product">←</button>
            <button type="button" onClick={nextProduct} aria-label="Next product">→</button>
          </div>
        </div>
        <div className="vl-featured-product">
          <div className="vl-featured-image">
            <ProductImage src={product.image} alt={product.name} />
            <span className="vl-product-number">0{productIndex + 1} / 0{products.length}</span>
            <span className="vl-image-ribbon">THE VELOURE EDIT</span>
          </div>
          <div className="vl-featured-copy">
            <span className="vl-eyebrow">{product.category}</span>
            <h3>{product.name}</h3>
            <p className="vl-product-lead">{product.description}</p>
            <p>{product.details}</p>
            <div className="vl-detail-block"><span>WHAT TO KNOW</span><p>{product.ingredients}</p></div>
            <div className="vl-benefit-list">{product.benefits.map((benefit) => <span key={benefit}><b>✦</b> {benefit}</span>)}</div>
            <div className="vl-detail-block"><span>HOW TO USE</span><p>{product.use}</p></div>
            <p className="vl-price-note">{product.price}</p>
            <div className="vl-product-dots">{products.map((item, index) => <button type="button" key={item.name} className={index === productIndex ? "active" : ""} onClick={() => setProductIndex(index)} aria-label={`View ${item.name}`} />)}</div>
          </div>
        </div>
        <div className="vl-product-thumbnails">{products.map((item, index) => (
          <button type="button" key={item.name} className={index === productIndex ? "vl-thumb active" : "vl-thumb"} onClick={() => setProductIndex(index)}>
            <span>0{index + 1}</span><strong>{item.name}</strong><small>{item.category}</small>
          </button>
        ))}</div>
        <p className="vl-disclaimer">Product information template: replace ingredient placeholders, pricing and claims with the exact details from your product labels and approved product documentation.</p>
      </div>

      {/* BEFORE & AFTER RESULTS SECTION */}
      <div className="vl-before-after">
        <div className="vl-before-after-heading">
          <span className="vl-eyebrow">REAL SKIN STORIES</span>
          <h2>Before & <em>After.</em></h2>
          <p>
            Explore these skin progress photos shared for product
            reference. Individual experiences may vary.
          </p>
        </div>

        <div className="vl-before-after-grid">
          {[
            { id: "Patient 1", image: "./ba1.jpg" },
            { id: "Patient 2", image: "./ba2.jpg" },
            { id: "Patient 3", image: "./ba3.jpg" },
            { id: "Patient 4", image: "./ba4.jpg" }
          ].map((item) => (
            <article className="vl-ba-card" key={item.id}>
              <div className="vl-ba-image">
                <img
                  src={item.image}
                  alt={`Before and after skin progress ${item.id}`}
                  loading="lazy"
                />
                <span className="vl-ba-label">
                  {item.id}
                </span>
              </div>
              <h3>{item.id.replace("BA", "Result ")}</h3>
              <p>Individual results and experiences may vary.</p>
            </article>
          ))}
        </div>

        <p className="vl-ba-disclaimer">
          Photos are for illustrative purposes. Results vary by individual.
          Follow product directions and consult a qualified professional
          for skin concerns.
        </p>
      </div>

      <div className="vl-benefits-section">
        <div className="vl-benefit-heading"><span className="vl-eyebrow">CARE, MADE CONSIDERED</span><h2>Small steps. <em>Beautiful rituals.</em></h2><p>Explore the role each product can play in a simple routine.</p></div>
        <div className="vl-benefit-cards">
          <article><div className="vl-benefit-icon">✧</div><span>01 / SKIN</span><h3>Face Cream</h3><p>Moisturiser is often the comfort step in a routine. Choose a texture that works for your skin and apply to clean skin as directed.</p><small>BEST IN A ROUTINE: AFTER SERUM</small></article>
          <article><div className="vl-benefit-icon">❋</div><span>02 / HAIR</span><h3>Hair Oil</h3><p>A few drops can help smooth the look of dry lengths and add shine. Start small to avoid weighing hair down.</p><small>BEST IN A ROUTINE: LENGTHS & ENDS</small></article>
          <article><div className="vl-benefit-icon">◌</div><span>03 / SKIN</span><h3>Serum</h3><p>Serums are a targeted layering step. Follow the label and introduce active ingredients gradually, especially if you have sensitive skin.</p><small>BEST IN A ROUTINE: BEFORE MOISTURISER</small></article>
        </div>
      </div>

      <div className="vl-routine-section">
        <div className="vl-routine-copy"><span className="vl-eyebrow">YOUR DAILY GUIDE</span><h2>A routine that feels <em>effortless.</em></h2><p>These routine steps automatically rotate every 5.2 seconds. You can also tap a step to view it instantly. Always follow each product label.</p>
          <div className="vl-routine-tabs">{routines.map((routine, index) => <button type="button" key={routine.number} className={index === activeRoutine ? "active" : ""} onClick={() => setActiveRoutine(index)}><span>{routine.number}</span>{routine.time}</button>)}</div>
          <div className="vl-routine-detail"><span>{routines[activeRoutine].number} / {routines[activeRoutine].time}</span><h3>{routines[activeRoutine].title}</h3><p>{routines[activeRoutine].text}</p></div>
        </div>
        <div className="vl-routine-visual"><div className="vl-routine-disc"><span>VELOURE</span><strong>{routines[activeRoutine].number}</strong><small>RITUAL NOTES</small></div><p>Take your time. Let each step feel intentional.</p></div>
      </div>

      <div className="vl-testimonials">
        <div className="vl-section-heading"><div><span className="vl-eyebrow">CUSTOMER NOTES</span><h2>Words of <em>care.</em></h2><p className="vl-section-subtitle">Customer-note carousel automatically rotates every 6 seconds. Replace these placeholders with genuine approved reviews.</p></div>
          <div className="vl-arrows"><button type="button" onClick={previousReview} aria-label="Previous testimonial">←</button><button type="button" onClick={nextReview} aria-label="Next testimonial">→</button></div>
        </div>
        <article className="vl-review-card"><div className="vl-review-stars" aria-label="Sample rating">{"★".repeat(review.rating)}</div><span className="vl-quote-mark">“</span><blockquote>{review.quote}</blockquote><div className="vl-review-person"><div className="vl-avatar">{review.initials}</div><div><strong>{review.name}</strong><span>{review.product}</span></div></div><p className="vl-demo-note">Review placeholder — replace with genuine customer feedback and permission before publishing.</p></article>
        <div className="vl-review-dots">{testimonials.map((item, index) => <button type="button" key={`${item.name}-${index}`} className={index === reviewIndex ? "active" : ""} onClick={() => setReviewIndex(index)} aria-label={`View testimonial ${index + 1}`} />)}</div>
      </div>

      <div className="vl-care-notes">
        <span className="vl-eyebrow">A NOTE ON PERSONAL CARE</span><h2>Choose care with <em>confidence.</em></h2>
        <div className="vl-care-note-grid">
          <p><strong>Check the label.</strong><br />Ingredients, usage directions, warnings and claims should match the exact product packaging.</p>
          <p><strong>Patch-test new skincare.</strong><br />Introduce new products gradually. Stop use if irritation occurs and seek professional advice if needed.</p>
          <p><strong>Keep it personal.</strong><br />Skin and hair needs vary. No single product or routine works the same way for everyone.</p>
        </div>
      </div>

      <div className="vl-about-closing"><span className="vl-eyebrow">YOUR RITUAL. YOUR LUXURY.</span><h2>Make every day a little more <em>beautiful.</em></h2><p>Discover VELOURE LUX and find the care essentials that fit your everyday routine.</p><a className="vl-primary-link" href="/products">Shop the collection <span>↗</span></a></div>
    </section>
  );
}

function ProductImage({ src, alt }) {
  const [failed, setFailed] = useState(false);
  return failed ? <div className="vl-image-placeholder"><span>VELOURE LUX</span><small>Add product photo</small></div> : <img src={src} alt={alt} onError={() => setFailed(true)} />;
}
