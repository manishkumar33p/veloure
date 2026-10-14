
import React, { useState } from "react";
import "./AboutSection.css";

const products = [
  {
    name: "Radiance Night Cream",
    category: "SKINCARE",
    description: "Your evening ritual for soft, nourished-looking skin.",
    image: "/p1.jpeg",
  },
  {
    name: "Vitamin C Glow Serum",
    category: "SKINCARE",
    description: "A refreshing addition to your daily skincare ritual.",
    image: "/p2.jpeg",
  },
  {
    name: "Glow Shield Sunscreen",
    category: "DAILY ESSENTIALS",
    description: "Make daily sun protection part of your routine.",
    image: "/p3.jpeg",
  },
  {
    name: "Lux Hair Serum",
    category: "HAIRCARE",
    description: "A finishing touch for a smooth, polished hair look.",
    image: "/p4.jpeg",
  },
];

const testimonials = [
  {
    name: "Ritu",
    initials: "C1",
    product: "Skincare experience",
    quote:
      "I enjoyed adding this product to my daily self-care routine.",
    rating: 5,
  },
  {
    name: "Anamika",
    initials: "C2",
    product: "Beauty essentials",
    quote:
      "The packaging and overall product experience felt special.",
    rating: 5,
  },
  {
    name: "Pallavi",
    initials: "C3",
    product: "Haircare experience",
    quote:
      "A lovely addition to my personal care collection.",
    rating: 5,
  },
];

const transformations = [
  {
    title: "Skincare Journey",
    subtitle: "Add verified customer photos",
    before: "/ba1.jpg",
    after: "/ba2.jpg",
  },
  {
    title: "Healthy-Looking Skin",
    subtitle: "Show authentic customer progress",
    before: "/ba3.jpg",
    after: "/ba4.jpg",
  },
];

function ProductImage({ src, alt }) {
  const [failed, setFailed] = useState(false);

  return failed ? (
    <div className="vl-image-placeholder">
      <span>VELOURE LUX</span>
      <small>Add product photo</small>
    </div>
  ) : (
    <img
      src={src}
      alt={alt}
      onError={() => setFailed(true)}
    />
  );
}

export default function AboutSection() {
  const [productIndex, setProductIndex] = useState(0);
  const [reviewIndex, setReviewIndex] = useState(0);
  const [activePhoto, setActivePhoto] = useState(0);
  const [comparison, setComparison] = useState(50);

  const product = products[productIndex];
  const review = testimonials[reviewIndex];
  const transformation = transformations[activePhoto];

  const previousProduct = () => {
    setProductIndex((current) =>
      (current - 1 + products.length) % products.length
    );
  };

  const nextProduct = () => {
    setProductIndex((current) =>
      (current + 1) % products.length
    );
  };

  const nextReview = () => {
    setReviewIndex((current) =>
      (current + 1) % testimonials.length
    );
  };

  const previousReview = () => {
    setReviewIndex((current) =>
      (current - 1 + testimonials.length) %
      testimonials.length
    );
  };

  return (
    <section className="vl-about">

      {/* ABOUT INTRO */}
      <div className="vl-about-intro">
        <span className="vl-eyebrow">
          THE ART OF EVERYDAY LUXURY
        </span>

        <h2>
          Beauty, with a touch of{" "}
          <em>luxury.</em>
        </h2>

        <p>
          Welcome to VELOURE LUX — a beauty and personal
          care collection created to make your everyday
          self-care ritual feel a little more special.
          Explore skincare and haircare essentials and
          discover the products that fit your routine.
        </p>

        <div className="vl-about-values">
          <div>
            <span>01</span>
            <h3>Thoughtful Care</h3>
            <p>Make time for yourself every day.</p>
          </div>

          <div>
            <span>02</span>
            <h3>Everyday Rituals</h3>
            <p>Small moments, made meaningful.</p>
          </div>

          <div>
            <span>03</span>
            <h3>Your Own Glow</h3>
            <p>Choose what feels right for you.</p>
          </div>
        </div>
      </div>

      {/* PRODUCT CAROUSEL */}
      <div className="vl-product-section">
        <div className="vl-section-heading">
          <div>
            <span className="vl-eyebrow">THE COLLECTION</span>
            <h2>Discover Your <em>Ritual</em></h2>
          </div>

          <div className="vl-arrows">
            <button
              type="button"
              onClick={previousProduct}
              aria-label="Previous product"
            >
              &#8592;
            </button>
            <button
              type="button"
              onClick={nextProduct}
              aria-label="Next product"
            >
              &#8594;
            </button>
          </div>
        </div>

        <div className="vl-featured-product">
          <div className="vl-featured-image">
            <ProductImage
              src={product.image}
              alt={product.name}
            />
            <span className="vl-product-number">
              0{productIndex + 1} / 0{products.length}
            </span>
          </div>

          <div className="vl-featured-copy">
            <span className="vl-eyebrow">
              {product.category}
            </span>

            <h3>{product.name}</h3>
            <p>{product.description}</p>

            <div className="vl-product-dots">
              {products.map((item, index) => (
                <button
                  type="button"
                  key={item.name}
                  className={
                    index === productIndex ? "active" : ""
                  }
                  onClick={() => setProductIndex(index)}
                  aria-label={`View ${item.name}`}
                />
              ))}
            </div>

            <p className="vl-small-note">
              Explore the collection to find your next
              self-care essential.
            </p>
          </div>
        </div>
      </div>

      {/* TESTIMONIALS */}
      <div className="vl-testimonials">
        <div className="vl-section-heading">
          <div>
            <span className="vl-eyebrow">
              CUSTOMER STORIES
            </span>
            <h2>Words of <em>Love</em></h2>
          </div>

          <div className="vl-arrows">
            <button
              type="button"
              onClick={previousReview}
              aria-label="Previous testimonial"
            >
              &#8592;
            </button>
            <button
              type="button"
              onClick={nextReview}
              aria-label="Next testimonial"
            >
              &#8594;
            </button>
          </div>
        </div>

        <article className="vl-review-card">
          <div className="vl-review-stars" aria-label="Sample rating">
            {"★".repeat(review.rating)}
          </div>

          <span className="vl-quote-mark">“</span>

          <blockquote>{review.quote}</blockquote>

          <div className="vl-review-person">
            <div className="vl-avatar">
              {review.initials}
            </div>
            <div>
              <strong>{review.name}</strong>
              <span>{review.product}</span>
            </div>
          </div>

          <p className="vl-demo-note">
            Demo testimonial — replace with genuine,
            customer-approved feedback before publishing.
          </p>
        </article>

        <div className="vl-review-dots">
          {testimonials.map((item, index) => (
            <button
              type="button"
              key={item.name}
              className={
                index === reviewIndex ? "active" : ""
              }
              onClick={() => setReviewIndex(index)}
              aria-label={`View testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* BEFORE AND AFTER GALLERY */}
      <div className="vl-transform-section">
        <div className="vl-transform-heading">
          <span className="vl-eyebrow">REAL STORIES, REAL PEOPLE</span>
          <h2>
            Every Journey Is <em>Personal</em>
          </h2>
          <p>
            Explore authentic customer journeys. Use
            original photos shared with permission and
            keep lighting, angles and conditions consistent.
          </p>
        </div>

        <div className="vl-transform-card">
          <div className="vl-transform-top">
            <div>
              <span className="vl-eyebrow">
                CUSTOMER GALLERY
              </span>
              <h3>{transformation.title}</h3>
            </div>

            <div className="vl-transform-tabs">
              {transformations.map((item, index) => (
                <button
                  type="button"
                  key={item.title}
                  className={
                    index === activePhoto ? "active" : ""
                  }
                  onClick={() => {
                    setActivePhoto(index);
                    setComparison(50);
                  }}
                >
                  0{index + 1}
                </button>
              ))}
            </div>
          </div>

          <div className="vl-before-after">
            <div className="vl-photo-half">
              <ProductImage
                src={transformation.before}
                alt="Customer before photo"
              />
              <span className="vl-photo-label">BEFORE</span>
            </div>

            <div className="vl-photo-half">
              <ProductImage
                src={transformation.after}
                alt="Customer after photo"
              />
              <span className="vl-photo-label">AFTER</span>
            </div>
          </div>

          <p className="vl-transform-caption">
            {transformation.subtitle}
          </p>

          <p className="vl-demo-note">
            Placeholder gallery: add genuine, consented
            photos. Do not present sample images as actual
            results or promise a particular outcome.
          </p>
        </div>
      </div>

      {/* BRAND CLOSING */}
      <div className="vl-about-closing">
        <span className="vl-eyebrow">YOUR RITUAL. YOUR LUXURY.</span>
        <h2>
          Make every day a little more <em>beautiful.</em>
        </h2>
        <p>
          Discover VELOURE LUX and find your everyday
          beauty and personal care essentials.
        </p>
      </div>

    </section>
  );
}
