
import React, { useState } from "react";
import "./Chatbot.css";

const WHATSAPP_NUMBER = "919958424916";

const FAQS = [
  {
    label: "Skincare products",
    keywords: ["skin", "skincare", "face", "glow", "acne", "pimple"],
    answer:
      "We offer skincare products for your daily beauty routine. Tell us your skin type—oily, dry, combination or sensitive—and we can help you explore suitable products. For persistent skin concerns, please consult a dermatologist.",
  },
  {
    label: "Haircare products",
    keywords: ["hair", "haircare", "shampoo", "hairfall", "dandruff"],
    answer:
      "Explore our haircare range for your daily hair routine. Tell us whether your hair is dry, oily or normal, and what you are looking for. For severe hair fall or scalp problems, please consult a dermatologist.",
  },
  {
    label: "Products and prices",
    keywords: ["product", "price", "cost", "rate", "₹", "buy"],
    answer:
      "You can explore our available products and prices on the Products page. If you tell me the product name, I can guide you to our team on WhatsApp for confirmation.",
  },
  {
    label: "Order and delivery",
    keywords: ["order", "delivery", "shipping", "track", "dispatch", "status"],
    answer:
      "For order status, delivery estimates or shipping help, please share your order number with our support team on WhatsApp. Our team can check the latest details for you.",
  },
  {
    label: "Payment and returns",
    keywords: ["payment", "pay", "return", "refund", "cancel", "exchange"],
    answer:
      "For payment, cancellation, return or refund questions, our support team can confirm the applicable policy for your order. Choose 'Chat WhatsApp पर भेजें' below to contact us.",
  },
];

function getReply(message) {
  const text = message.toLowerCase();

  if (/hello|hi\b|hey|namaste|नमस्ते|हेलो/.test(text)) {
    return "Hello! Welcome to VELOURE LUXE ✨ How can I help you today? You can ask about skincare, haircare, products, prices or orders.";
  }

  const match = FAQS.find((faq) =>
    faq.keywords.some((word) => text.includes(word))
  );

  if (match) return match.answer;

  return "Thank you for your question! I can help with skincare, haircare, products, prices, orders and delivery. For anything specific, send this conversation to our support team on WhatsApp.";
}

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      from: "bot",
      text: "Welcome to VELOURE LUXE ✨ I'm your shopping assistant. Ask me about skincare, haircare, products, prices or orders.",
    },
  ]);

  function sendMessage(text = message) {
    const clean = text.trim();
    if (!clean) return;

    setMessages((previous) => [
      ...previous,
      { from: "user", text: clean },
      { from: "bot", text: getReply(clean) },
    ]);
    setMessage("");
  }

  function sendToWhatsApp() {
    const transcript = messages
      .map((item) =>
        `${item.from === "user" ? "Customer" : "VELOURE Assistant"}: ${item.text}`
      )
      .join("\n");

    const fullMessage =
      "VELOURE LUXE Website Chat Support\n\n" +
      transcript +
      "\n\nPlease assist this customer.";

    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(fullMessage)}`,
      "_blank",
      "noopener,noreferrer"
    );
  }

  return (
    <div className="vl-chatbot">
      {open && (
        <section className="vl-chat-window" aria-label="Customer support chat">
          <header className="vl-chat-header">
            <div>
              <strong>VELOURE LUXE</strong>
              <small>Customer Care Assistant</small>
            </div>
            <button
              type="button"
              className="vl-chat-close"
              onClick={() => setOpen(false)}
              aria-label="Close chat"
            >
              ×
            </button>
          </header>

          <div className="vl-chat-messages" aria-live="polite">
            {messages.map((item, index) => (
              <div
                key={index}
                className={`vl-chat-message ${item.from}`}
              >
                {item.text}
              </div>
            ))}
          </div>

          <div className="vl-chat-faqs">
            {FAQS.map((faq) => (
              <button
                key={faq.label}
                type="button"
                onClick={() => sendMessage(faq.label)}
              >
                {faq.label}
              </button>
            ))}
          </div>

          <form
            className="vl-chat-input"
            onSubmit={(event) => {
              event.preventDefault();
              sendMessage();
            }}
          >
            <input
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              placeholder="Type your question..."
              aria-label="Type your question"
            />
            <button type="submit" aria-label="Send message">
              ➤
            </button>
          </form>

          <button
            type="button"
            className="vl-chat-whatsapp"
            onClick={sendToWhatsApp}
          >
            Send chat to WhatsApp
          </button>
        </section>
      )}

      <button
        type="button"
        className="vl-chat-launcher"
        onClick={() => setOpen((value) => !value)}
        aria-label={open ? "Close customer chat" : "Open customer chat"}
      >
        {open ? "×" : "✦"}
        {!open && <span>Need help?</span>}
      </button>
    </div>
  );
}
