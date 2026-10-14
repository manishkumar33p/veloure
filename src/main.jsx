import React, {useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Search, UserRound, ShoppingBag, ChevronDown, ChevronRight, ArrowRight, Leaf, FlaskConical, ShieldCheck, Truck, Heart, Menu, X, Plus, Minus, Trash2, Instagram, Phone, MessageCircle, Sparkles } from 'lucide-react';
import './style.css';
import AboutSection from "./AboutSection";
const products = [
 {id:1,name:'Radiance Face Wash',type:'Skincare',desc:'Gentle daily cleanser',price:599,old:749,tag:'BESTSELLER',img:'/p1.jpeg'},
 {id:2,name:'Hydra Boost Moisturizer',type:'Skincare',desc:'Deep hydration cream',price:849,old:999,tag:'POPULAR',img:'/p2.jpeg'},
 {id:3,name:'Glow Drops Serum',type:'Skincare',desc:'Lightweight glow serum',price:999,old:1199,tag:'NEW',img:'/p3.jpeg'},
 {id:4,name:'Nourishing Hair Mask',type:'Haircare',desc:'Repair & softness ritual',price:699,old:899,tag:'TOP RATED',img:'/p4.jpeg'},
 {id:5,name:'Botanical Hair Oil',type:'Haircare',desc:'Nourishing scalp care',price:549,old:649,tag:'NATURAL CARE',img:'/p5.jpeg'},
 {id:6,name:'Velvet Body Lotion',type:'Bodycare',desc:'Silky everyday moisture',price:499,old:599,tag:'EVERYDAY LUXE',img:'/p6.jpeg'},
 {id:7,name:'Gentle Cleansing Balm',type:'Skincare',desc:'Melt away the day',price:749,old:899,tag:'GENTLE',img:'/p7.jpeg'},
 {id:8,name:'Silk Repair Shampoo',type:'Haircare',desc:'Fresh, soft-looking hair',price:649,old:799,tag:'HAIR RITUAL',img:'/p1.jpeg'},
{id:9,name:'Hydra Boost Moisturizer',type:'Skincare',desc:'Deep hydration cream',price:849,old:999,tag:'POPULAR',img:'/p2.jpeg'},
 {id:10,name:'Glow Drops Serum',type:'Skincare',desc:'Lightweight glow serum',price:999,old:1199,tag:'NEW',img:'/p3.jpeg'},
 {id:11,name:'Nourishing Hair Mask',type:'Haircare',desc:'Repair & softness ritual',price:699,old:899,tag:'TOP RATED',img:'/p4.jpeg'},
 {id:12,name:'Botanical Hair Oil',type:'Haircare',desc:'Nourishing scalp care',price:549,old:649,tag:'NATURAL CARE',img:'/p5.jpeg'},
 {id:13,name:'Velvet Body Lotion',type:'Bodycare',desc:'Silky everyday moisture',price:499,old:599,tag:'EVERYDAY LUXE',img:'/p6.jpeg'},
 {id:14,name:'Gentle Cleansing Balm',type:'Skincare',desc:'Melt away the day',price:749,old:899,tag:'GENTLE',img:'/p7.jpeg'},
 {id:15,name:'Silk Repair Shampoo',type:'Haircare',desc:'Fresh, soft-looking hair',price:649,old:799,tag:'HAIR RITUAL',img:'/p1.jpeg'}
];
const money=n=>'₹'+Number(n).toLocaleString('en-IN');

const heroSlides = [
  {
    eyebrow: 'NATURAL CARE FOR A',
    title: 'Healthier, Glowing',
    highlight: 'You',
    description: 'Premium skincare & haircare products crafted with nature’s best ingredients for real, lasting results.',
    image: '/image.jpeg',
    label: 'THE ART OF EVERYDAY LUXURY'
  },
  {
    eyebrow: 'YOUR DAILY BEAUTY RITUAL',
    title: 'Discover Your',
    highlight: 'Glow',
    description: 'Thoughtfully selected skincare essentials for a fresh, radiant-looking complexion.',
    image: '/image2.jpeg',
    label: 'A LITTLE LUXURY EVERY DAY'
  },
   {
    eyebrow: 'NATURAL CARE FOR A',
    title: 'Healthier, Glowing',
    highlight: 'You',
    description: 'Premium skincare & haircare products crafted with nature’s best ingredients for real, lasting results.',
    image: '/image.jpeg',
    label: 'THE ART OF EVERYDAY LUXURY'
  }
];
function App(){



    const [currentSlide, setCurrentSlide] = useState(0);

useEffect(() => {
  const timer = setInterval(() => {
    setCurrentSlide((previous) => (previous + 1) % heroSlides.length);
  }, 4000);

  return () => clearInterval(timer);
}, []);

const nextSlide = () => {
  setCurrentSlide((previous) => (previous + 1) % heroSlides.length);
};

const previousSlide = () => {
  setCurrentSlide((previous) =>
    (previous - 1 + heroSlides.length) % heroSlides.length
  );
};
 const [cart,setCart]=useState([]),[page,setPage]=useState('Home'),[category,setCategory]=useState('All'),[mobile,setMobile]=useState(false),[search,setSearch]=useState(''),[showSearch,setShowSearch]=useState(false),[checkout,setCheckout]=useState(false),[orders,setOrders]=useState(()=>JSON.parse(localStorage.getItem('veloure_orders')||'[]')),[notice,setNotice]=useState('');
 const count=cart.reduce((s,x)=>s+x.qty,0),total=cart.reduce((s,x)=>s+x.price*x.qty,0);
 const filtered=useMemo(()=>products.filter(p=>(category==='All'||p.type===category)&&`${p.name} ${p.type}`.toLowerCase().includes(search.toLowerCase())),[category,search]);
 const notify=t=>{setNotice(t);setTimeout(()=>setNotice(''),2800)};
 const add=p=>{setCart(old=>{let found=old.find(x=>x.id===p.id);return found?old.map(x=>x.id===p.id?{...x,qty:x.qty+1}:x):[...old,{...p,qty:1}]});notify(p.name+' added to bag')};
 const qty=(id,n)=>setCart(old=>old.map(x=>x.id===id?{...x,qty:x.qty+n}:x).filter(x=>x.qty>0));
 const goto=(p)=>{setPage(p);setMobile(false);setCheckout(false);window.scrollTo({top:0,behavior:'smooth'})};
 const waNumber=import.meta.env.VITE_WHATSAPP_NUMBER||'919958424916';
 const placeOrder=e=>{e.preventDefault();let fd=new FormData(e.currentTarget);let order={id:'VL'+Date.now().toString().slice(-7),date:new Date().toLocaleString('en-IN'),name:fd.get('name'),phone:fd.get('phone'),address:fd.get('address'),items:cart.map(x=>({name:x.name,qty:x.qty,price:x.price})),total,status:'Order inquiry'};let next=[order,...orders];setOrders(next);localStorage.setItem('veloure_orders',JSON.stringify(next));let msg=`Hello VELOURE LUX, I would like to place an order.\nOrder: ${order.id}\nName: ${order.name}\nPhone: ${order.phone}\nAddress: ${order.address}\n${order.items.map(i=>`${i.name} x ${i.qty} — ${money(i.price*i.qty)}`).join('\n')}\nTotal: ${money(total)}`;window.open(`https://wa.me/${waNumber}?text=${encodeURIComponent(msg)}`,'_blank');setCart([]);setCheckout(false);goto('Home');notify('Order details prepared for WhatsApp');};
 const ProductCard=({p})=><article className="product-card" key={p.id}><div className="product-photo"><img src={p.img} alt={p.name} loading="lazy"/><span className="product-tag">{p.tag}</span><button className="heart" aria-label="Save product" onClick={()=>notify('Wishlist coming soon')}><Heart size={17}/></button><button className="quick-add" onClick={()=>add(p)}>ADD TO BAG <Plus size={15}/></button></div><div className="product-info"><div className="product-type">{p.type}</div><h3>{p.name}</h3><p>{p.desc}</p><div className="price-row"><strong>{money(p.price)}</strong><del>{money(p.old)}</del><span>{Math.round((1-p.price/p.old)*100)}% OFF</span></div></div></article>;
 return <><div className="topbar"><div><Truck size={16}/><span>Free Shipping on Orders Above ₹999</span></div><div className="top-mid"><Leaf size={15}/> Pure · Natural · Luxurious</div><div className="top-right"><span><Phone size={14}/> +91 99584 24916</span><button onClick={()=>window.open(`https://wa.me/${waNumber}`,'_blank')}><MessageCircle size={15}/> WhatsApp Us</button></div></div>
 <header className="header"><button className="mobile-menu" onClick={()=>setMobile(!mobile)}>{mobile?<X/>:<Menu/>}</button><button className="brand" onClick={()=>goto('Home')}><span className="brand-mark">V</span><span><b>VELOURE LUX</b><small>SKINCARE · HAIRCARE · WELLNESS</small></span></button><nav className={mobile?'nav open':'nav'}><button className={page==='Home'?'active':''} onClick={()=>goto('Home')}>Home</button><button className={page==='About Us'?'active':''} onClick={()=>goto('About Us')}>About Us</button><div className="nav-products"><button className={page==='Products'?'active':''} onClick={()=>goto('Products')}>Products <ChevronDown size={14}/></button><div className="dropdown">{['All','Skincare','Haircare','Bodycare'].map(c=><button key={c} onClick={()=>{setCategory(c);goto('Products')}}>{c==='All'?'All Products':c}</button>)}</div></div><button className={page==='Contact'?'active':''} onClick={()=>goto('Contact')}>Contact</button><button onClick={()=>goto('Dashboard')}>Dashboard</button></nav><div className="header-actions"><button aria-label="Search" onClick={()=>setShowSearch(!showSearch)}><Search/></button><button aria-label="Account" onClick={()=>goto('Dashboard')}><UserRound/></button><button className="bag-button" aria-label="Shopping bag" onClick={()=>goto('Bag')}><ShoppingBag/><i>{count}</i></button></div></header>
 {showSearch&&<div className="searchbar"><Search size={18}/><input autoFocus placeholder="Search skincare, haircare..." value={search} onChange={e=>{setSearch(e.target.value);if(page!=='Products')setPage('Products')}}/><button onClick={()=>{setSearch('');setShowSearch(false)}}><X/></button></div>}
 
{page === 'Home' && <>
  <section className="hero">
    <div
      className="hero-image"
      key={currentSlide}
      style={{
        backgroundImage: `url("${heroSlides[currentSlide].image}")`
      }}
    />

    <div className="hero-shade" />

    <button
      className="carousel-arrow carousel-prev"
      onClick={previousSlide}
      aria-label="Previous slide"
    >
      ‹
    </button>

    <div className="hero-content" key={`hero-content-${currentSlide}`}>
      <div className="eyebrow">
        <span />
        {heroSlides[currentSlide].eyebrow}
      </div>

      <h1>
        {heroSlides[currentSlide].title}{' '}
        <em>{heroSlides[currentSlide].highlight}</em>
      </h1>

      <p>{heroSlides[currentSlide].description}</p>

      <button className="gold-button" onClick={() => goto('Products')}>
        SHOP NOW <ArrowRight size={17} />
      </button>

      <div className="hero-dots">
        {heroSlides.map((slide, index) => (
          <button
            key={slide.label}
            className={currentSlide === index ? 'active' : ''}
            onClick={() => setCurrentSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>

    <button
      className="carousel-arrow carousel-next"
      onClick={nextSlide}
      aria-label="Next slide"
    >
      ›
    </button>

    <div className="hero-caption">
      {heroSlides[currentSlide].label}
      <span>
        {String(currentSlide + 1).padStart(2, '0')} /{' '}
        {String(heroSlides.length).padStart(2, '0')}
      </span>
    </div>
  </section>

  <section className="benefits">
    <div><Leaf /><span><b>100% Natural</b><small>Inspired Ingredients</small></span></div>
    <div><FlaskConical /><span><b>Thoughtfully Made</b><small>Carefully selected formulas</small></span></div>
    <div><ShieldCheck /><span><b>Quality First</b><small>Care in every detail</small></span></div>
    <div><Truck /><span><b>Reliable Shipping</b><small>Delivered to your door</small></span></div>
    <div><Heart /><span><b>Made for You</b><small>Your daily care ritual</small></span></div>
  </section>

  <section className="categories section-wrap">
    <div className="section-heading">
      <div>
        <span className="kicker">EXPLORE YOUR RITUAL</span>
        <h2>Care for every <em>you.</em></h2>
      </div>
      <button className="text-link" onClick={() => goto('Products')}>
        VIEW ALL CATEGORIES <ArrowRight size={16} />
      </button>
    </div>

    <div className="category-grid">
      <button className="category-tile skin" onClick={() => { setCategory('Skincare'); goto('Products'); }}>
        <span>01 / SKINCARE</span><b>Glow Naturally</b><ArrowRight />
      </button>
      <button className="category-tile hair" onClick={() => { setCategory('Haircare'); goto('Products'); }}>
        <span>02 / HAIRCARE</span><b>Stronger, Healthier Hair</b><ArrowRight />
      </button>
      <button className="category-tile body" onClick={() => { setCategory('Bodycare'); goto('Products'); }}>
        <span>03 / BODYCARE</span><b>Soft & Nourished Skin</b><ArrowRight />
      </button>
      <button className="category-tile sets" onClick={() => { setCategory('All'); goto('Products'); }}>
        <span>04 / SIGNATURE SETS</span><b>Better Value, Better Care</b><ArrowRight />
      </button>
    </div>
  </section>

  <section className="featured section-wrap">
    <div className="section-heading">
      <div>
        <span className="kicker">THE VELOURE EDIT</span>
        <h2>Our Best <em>Sellers</em></h2>
        <p className="section-sub">Your favourites, chosen for everyday moments of care.</p>
      </div>
      <button className="text-link" onClick={() => goto('Products')}>
        VIEW ALL PRODUCTS <ArrowRight size={16} />
      </button>
    </div>

    <div className="product-grid">
      {products.slice(0, 4).map(p => <ProductCard p={p} key={p.id} />)}
    </div>
  </section>

  <section className="ritual-banner">
    <div className="ritual-img" />
    <div>
      <span className="kicker">A MOMENT, JUST FOR YOU</span>
      <h2>Make self-care<br />your <em>signature.</em></h2>
      <p>Small rituals. Thoughtful formulas. A little luxury, every day.</p>
      <button className="gold-button" onClick={() => goto('Products')}>
        DISCOVER THE COLLECTION <ArrowRight size={16} />
      </button>
    </div>
  </section>
<AboutSection />
  <section className="newsletter">
    <Sparkles />
    <span className="kicker">A LITTLE LUXE IN YOUR INBOX</span>
    <h2>Be the first to know.</h2>
    <p>New launches, thoughtful care tips and exclusive offers.</p>
    <form onSubmit={e => {
      e.preventDefault();
      notify('Thank you for joining VELOURE LUX');
      e.currentTarget.reset();
    }}>
      <input type="email" placeholder="Your email address" required />
      <button>SUBSCRIBE <ArrowRight size={15} /></button>
    </form>
  </section>
</>}

 {page==='Products'&&<main className="page-main"><div className="page-title"><span className="kicker">THE VELOURE COLLECTION</span><h1>Our <em>Products</em></h1><p>Thoughtful care for your everyday ritual.</p></div><div className="filters">{['All','Skincare','Haircare','Bodycare'].map(c=><button className={category===c?'selected':''} onClick={()=>setCategory(c)} key={c}>{c==='All'?'All Products':c}</button>)}<span>{filtered.length} products</span></div><div className="product-grid listing">{filtered.map(p=><ProductCard p={p} key={p.id}/>)}</div>{filtered.length===0&&<p className="empty">No products found. Try another search.</p>}</main>}
 {page==='About Us'&&<main className="page-main"><AboutSection /><div className="page-title"><span className="kicker">OUR PHILOSOPHY</span><h1>Beauty, with <em>intention.</em></h1><p>Premium everyday care, designed around the rituals that make you feel your best.</p></div><div className="about-panel"><div className="about-photo"></div><div><span className="kicker">WELCOME TO VELOURE LUX</span><h2>Everyday care.<br/><em>Elevated.</em></h2><p>We believe self-care should feel considered, calm and personal. VELOURE LUX brings skincare and haircare essentials together in a refined, easy-to-love experience.</p><p>Explore your routine, discover your favourites, and make a little space for yourself every day.</p><button className="gold-button" onClick={()=>goto('Products')}>SHOP THE COLLECTION <ArrowRight size={16}/></button></div></div></main>}
 {page==='Contact'&&<main className="page-main"><div className="page-title"><span className="kicker">WE’RE HERE FOR YOU</span><h1>Let’s <em>connect.</em></h1><p>Questions about products or an order? We’d love to help.</p></div><div className="contact-grid"><div className="contact-card"><MessageCircle/><h3>WhatsApp Support</h3><p>Reach us for product and order enquiries.</p><button className="gold-button" onClick={()=>window.open(`https://wa.me/${waNumber}`,'_blank')}>CHAT WITH US <ArrowRight size={15}/></button></div><div className="contact-card"><Phone/><h3>Call Us</h3><p>Monday – Saturday · 10 AM – 6 PM</p><a href="tel:+919958424916">+91 99584 24916</a></div><div className="contact-card"><Instagram/><h3>Follow Our Journey</h3><p>Care rituals, new arrivals and more.</p><button className="outline-button" onClick={()=>notify('Add your Instagram profile link in src/main.jsx')}>FOLLOW US <ArrowRight size={15}/></button></div></div></main>}
 {page==='Bag'&&<main className="page-main"><div className="page-title"><span className="kicker">YOUR VELOURE EDIT</span><h1>Shopping <em>Bag</em></h1></div>{!checkout?<div className="bag-layout"><div className="bag-list">{cart.length===0?<div className="empty-bag"><ShoppingBag size={38}/><h2>Your bag is waiting.</h2><p>Add something lovely to your daily ritual.</p><button className="gold-button" onClick={()=>goto('Products')}>EXPLORE PRODUCTS <ArrowRight size={15}/></button></div>:cart.map(x=><div className="bag-item" key={x.id}><img src={x.img}/><div className="bag-detail"><span className="product-type">{x.type}</span><h3>{x.name}</h3><b>{money(x.price)}</b><div className="quantity"><button onClick={()=>qty(x.id,-1)}><Minus size={13}/></button><span>{x.qty}</span><button onClick={()=>qty(x.id,1)}><Plus size={13}/></button></div></div><button className="remove" onClick={()=>qty(x.id,-x.qty)}><Trash2 size={17}/></button></div>)}</div>{cart.length>0&&<aside className="summary"><h3>Order Summary</h3><div><span>Subtotal</span><b>{money(total)}</b></div><div><span>Shipping</span><b>{total>=999?'FREE':'Calculated on order'}</b></div><div className="summary-total"><span>Total</span><b>{money(total+(total>=999?0:79))}</b></div><p>Shipping ₹79 for orders below ₹999.</p><button className="gold-button full" onClick={()=>setCheckout(true)}>PROCEED TO CHECKOUT <ArrowRight size={16}/></button></aside>}</div>:<div className="checkout-layout"><form className="checkout-form" onSubmit={placeOrder}><h2>Delivery details</h2><p>Submit your order details to continue on WhatsApp.</p><label>Full name<input name="name" required placeholder="Your full name"/></label><label>Phone number<input name="phone" required pattern="[0-9+() -]{8,}" placeholder="Your phone number"/></label><label>Delivery address<textarea name="address" required rows="3" placeholder="House, street, city, state, PIN code"/></label><div className="checkout-total"><span>Order total</span><b>{money(total+(total>=999?0:79))}</b></div><button className="gold-button full" type="submit">CONTINUE ON WHATSAPP <MessageCircle size={16}/></button><button type="button" className="back-link" onClick={()=>setCheckout(false)}>← Back to bag</button></form></div>}</main>}
 {page==='Dashboard'&&<main className="page-main"><div className="page-title"><span className="kicker">STORE OVERVIEW</span><h1>Order <em>Dashboard</em></h1><p>Demo dashboard · Orders are stored in this browser only.</p></div><div className="dashboard-stats"><div><span>Total orders</span><b>{orders.length}</b></div><div><span>Order value</span><b>{money(orders.reduce((s,o)=>s+o.total,0))}</b></div><div><span>Products</span><b>{products.length}</b></div></div><div className="orders-table"><h2>Recent orders</h2>{orders.length===0?<p className="empty">No orders yet. Orders started from this browser will appear here.</p>:orders.map(o=><div className="order-row" key={o.id}><div><b>{o.id}</b><small>{o.date}</small></div><div>{o.name}<small>{o.phone}</small></div><div>{o.items.map(i=>`${i.name} × ${i.qty}`).join(', ')}<small>{o.address}</small></div><strong>{money(o.total)}</strong><span className="order-status">{o.status}</span></div>)}</div></main>}
 <footer className="footer"><div className="footer-main"><div className="footer-brand"><button className="brand" onClick={()=>goto('Home')}><span className="brand-mark">V</span><span><b>VELOURE LUX</b><small>SKINCARE · HAIRCARE · WELLNESS</small></span></button><p>Thoughtful skincare and haircare for your everyday moments of luxury.</p><div className="socials"><button onClick={()=>notify('Add your Instagram link to connect this button')}><Instagram/></button><button onClick={()=>window.open(`https://wa.me/${waNumber}`,'_blank')}><MessageCircle/></button></div></div><div><h4>EXPLORE</h4><button onClick={()=>goto('About Us')}>Our Story</button><button onClick={()=>goto('Products')}>All Products</button><button onClick={()=>goto('Contact')}>Contact Us</button></div><div><h4>SHOP BY</h4>{['Skincare','Haircare','Bodycare'].map(c=><button key={c} onClick={()=>{setCategory(c);goto('Products')}}>{c}</button>)}</div><div><h4>NEED HELP?</h4><button onClick={()=>goto('Contact')}>Contact & Support</button><button onClick={()=>goto('Bag')}>Shipping & Orders</button><button onClick={()=>goto('Dashboard')}>Order Dashboard</button></div></div><div className="footer-bottom"><span>© {new Date().getFullYear()} VELOURE LUX. All rights reserved.</span><span>MADE WITH CARE · DESIGNED FOR YOUR RITUAL</span></div></footer>
 <button className="floating-wa" aria-label="WhatsApp" onClick={()=>window.open(`https://wa.me/${waNumber}`,'_blank')}><MessageCircle/></button>{notice&&<div className="toast">{notice}</div>}</>;
}

createRoot(document.getElementById('root')).render(<App/>);
