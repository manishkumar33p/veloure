import React, {useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import Chatbot from "./Chatbot";
import { Search, UserRound, ShoppingBag, ChevronDown, ChevronRight, ArrowRight, Leaf, FlaskConical, ShieldCheck, Truck, Heart, Menu, X, Plus, Minus, Trash2, Instagram, Phone, MessageCircle, Sparkles } from 'lucide-react';
import './style.css';
import AboutSection from "./AboutSection";
const products = [
 {id:1,name:'Hair Serum',type:'Haircare',desc:'Strength and Growth',price:599,old:749,tag:'BESTSELLER',img:'/p1.jpeg'},
 {id:2,name:'Glow with Grace',type:'Skincare',desc:'L-Glutathione with Vitamin C skin whitening & brightening',price:849,old:999,tag:'POPULAR',img:'/p2.jpeg'},
 {id:3,name:'Onion Hair Oil',type:'Haircare',desc:'For hair fall',price:999,old:1199,tag:'NEW',img:'/p3.jpeg'},
 {id:4,name:'Glow Shield Sunscreen',type:'Skincare',desc:'Sun protection with glow',price:699,old:899,tag:'TOP RATED',img:'/p4.jpeg'},
 {id:5,name:'Barrier repair glow gel',type:'Haircare',desc:'Nourishing skin care',price:549,old:649,tag:'NATURAL CARE',img:'/p5.jpeg'},
 {id:6,name:'Night Cream for Pigmentation',type:'Bodycare',desc:'Silky everyday moisture',price:499,old:599,tag:'EVERYDAY LUXE',img:'/p6.jpeg'},
 {id:7,name:'V-V-Whitening Cream',type:'Skincare',desc:'Melt away the day',price:749,old:899,tag:'GENTLE',img:'/p7.jpeg'},
 {id:8,name:'Hair Serum',type:'Haircare',desc:'Strength and Growth',price:599,old:749,tag:'BESTSELLER',img:'/p1.jpeg'},
 {id:9,name:'Glow with Grace',type:'Skincare',desc:'L-Glutathione with Vitamin C skin whitening & brightening',price:849,old:999,tag:'POPULAR',img:'/p2.jpeg'},
 {id:10,name:'Onion Hair Oil',type:'Haircare',desc:'For hair fall',price:999,old:1199,tag:'NEW',img:'/p3.jpeg'},
 {id:11,name:'Glow Shield Sunscreen',type:'Skincare',desc:'Sun protection with glow',price:699,old:899,tag:'TOP RATED',img:'/p4.jpeg'},
 {id:12,name:'Barrier repair glow gel',type:'Haircare',desc:'Nourishing skin care',price:549,old:649,tag:'NATURAL CARE',img:'/p5.jpeg'},
 {id:13,name:'Night Cream for Pigmentation',type:'Bodycare',desc:'Silky everyday moisture',price:499,old:599,tag:'EVERYDAY LUXE',img:'/p6.jpeg'},
 {id:14,name:'V-V-Whitening Cream',type:'Skincare',desc:'Melt away the day',price:749,old:899,tag:'GENTLE',img:'/p7.jpeg'},
 {id:15,name:'Silk Repair Shampoo',type:'Haircare',desc:'Fresh, soft-looking hair',price:649,old:799,tag:'HAIR RITUAL',img:'/p1.jpeg'}
];

const money=n=>'₹'+Number(n).toLocaleString('en-IN');
const productSlug = p => `${String(p.name||'product').toLowerCase().trim().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'')}-${p.id}`;
const readAdminProducts = () => { try { return JSON.parse(localStorage.getItem('veloure_admin_products') || '[]'); } catch { return []; } };


const heroSlides = [
  {
    eyebrow: 'NATURAL CARE FOR A',
    title: 'Healthier, Glowing',
    highlight: 'You',
    description: 'Premium skincare & haircare products crafted with nature’s best ingredients for real, lasting results.',
    image: '/image.png',
    label: 'THE ART OF EVERYDAY LUXURY'
  },
  {
    eyebrow: 'YOUR DAILY BEAUTY RITUAL',
    title: 'Discover Your',
    highlight: 'Glow',
    description: 'Thoughtfully selected skincare essentials for a fresh, radiant-looking complexion.',
    image: '/image.png',
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
  const [catalog,setCatalog]=useState(()=>[...products,...readAdminProducts()]);
  const [selectedProduct,setSelectedProduct]=useState(()=>{
    const match=window.location.pathname.match(/^\/product\/(.+)$/);
    return match ? [...products,...readAdminProducts()].find(p=>productSlug(p)===match[1]) || null : null;
  });
  const [page,setPage]=useState(()=>window.location.pathname.startsWith('/product/')?'Product':'Home');
  useEffect(()=>{
    const refresh=()=>setCatalog([...products,...readAdminProducts()]);
    const onPop=()=>{
      const match=window.location.pathname.match(/^\/product\/(.+)$/);
      if(match){ const p=[...products,...readAdminProducts()].find(x=>productSlug(x)===match[1])||null; setCatalog([...products,...readAdminProducts()]); setSelectedProduct(p); setPage(p?'Product':'Products'); }
      else { setSelectedProduct(null); setPage('Home'); }
    };
    window.addEventListener('veloure-products-updated',refresh);
    window.addEventListener('popstate',onPop);
    return ()=>{window.removeEventListener('veloure-products-updated',refresh);window.removeEventListener('popstate',onPop);};
  },[]);



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
 const [cart,setCart]=useState([]);
 const [dashboardLoggedIn, setDashboardLoggedIn] = useState(false);
const [loginId, setLoginId] = useState('');
const [loginPassword, setLoginPassword] = useState('');

const [loginError, setLoginError] = useState('');
const [category, setCategory] = useState('All');
const [mobile, setMobile] = useState(false);
const [search, setSearch] = useState('');
const [showSearch, setShowSearch] = useState(false);
const [checkout, setCheckout] = useState(false);
const [orders, setOrders] = useState(() => {
  try {
    return JSON.parse(localStorage.getItem('veloure_orders') || '[]');
  } catch {
    return [];
  }
});
const [notice, setNotice] = useState('');

 const count=cart.reduce((s,x)=>s+x.qty,0),total=cart.reduce((s,x)=>s+x.price*x.qty,0);
 const filtered=useMemo(()=>catalog.filter(p=>(category==='All'||p.type===category)&&`${p.name} ${p.type}`.toLowerCase().includes(search.toLowerCase())),[catalog,category,search]);
 const notify=t=>{setNotice(t);setTimeout(()=>setNotice(''),2800)};
 const add=p=>{setCart(old=>{let found=old.find(x=>x.id===p.id);return found?old.map(x=>x.id===p.id?{...x,qty:x.qty+1}:x):[...old,{...p,qty:1}]});notify(p.name+' added to bag')};
 const qty=(id,n)=>setCart(old=>old.map(x=>x.id===id?{...x,qty:x.qty+n}:x).filter(x=>x.qty>0));
 const goto=(p)=>{setPage(p);setSelectedProduct(null);setMobile(false);setCheckout(false);if(window.location.pathname!=='/')window.history.pushState({},'', '/');window.scrollTo({top:0,behavior:'smooth'});};
 const handleDashboardLogin = (e) => {
  e.preventDefault();

  // Temporary demo login only — secure authentication नहीं है
  if (
    loginId === 'admin' &&
    loginPassword === 'Veloure@2026'
  ) {
    setDashboardLoggedIn(true);
    setLoginError('');
    setLoginPassword('');
  } else {
    setLoginError('Invalid Login ID or Password');
  }
};
  const openProduct=(p)=>{setSelectedProduct(p);setPage('Product');setMobile(false);window.history.pushState({},'',`/product/${productSlug(p)}`);window.scrollTo({top:0,behavior:'smooth'});};
  const copyProductLink=(p)=>{const url=`${window.location.origin}/product/${productSlug(p)}`;if(navigator.clipboard?.writeText){navigator.clipboard.writeText(url).then(()=>notify('Product link copied')).catch(()=>notify(url));}else notify(url);};
 const waNumber=import.meta.env.VITE_WHATSAPP_NUMBER||'919958424916';
 const placeOrder=e=>{e.preventDefault();let fd=new FormData(e.currentTarget);let order={id:'VL'+Date.now().toString().slice(-7),date:new Date().toLocaleString('en-IN'),name:fd.get('name'),phone:fd.get('phone'),address:fd.get('address'),items:cart.map(x=>({name:x.name,qty:x.qty,price:x.price})),total,status:'Order inquiry'};let next=[order,...orders];setOrders(next);localStorage.setItem('veloure_orders',JSON.stringify(next));let msg=`Hello VELOURE LUXE, I would like to place an order.\nOrder: ${order.id}\nName: ${order.name}\nPhone: ${order.phone}\nAddress: ${order.address}\n${order.items.map(i=>`${i.name} x ${i.qty} — ${money(i.price*i.qty)}`).join('\n')}\nTotal: ${money(total)}`;window.open(`https://wa.me/${waNumber}?text=${encodeURIComponent(msg)}`,'_blank');setCart([]);setCheckout(false);goto('Home');notify('Order details prepared for WhatsApp');};  
const updateOrder = (orderId, changes) => {
  setOrders((currentOrders) => {
    const updated = currentOrders.map((order) =>
      order.id === orderId
        ? { ...order, ...changes }
        : order
    );

    localStorage.setItem(
      'veloure_orders',
      JSON.stringify(updated)
    );

    return updated;
  });
};

 const ProductCard=({p})=><article className="product-card" key={p.id}><div className="product-photo" role="link" tabIndex={0} onClick={()=>openProduct(p)} onKeyDown={e=>e.key==='Enter'&&openProduct(p)}><img src={p.img} alt={p.name} loading="lazy"/><span className="product-tag">{p.tag}</span><button className="heart" aria-label="Save product" onClick={e=>{e.stopPropagation();notify('Wishlist coming soon')}}><Heart size={17}/></button><button className="quick-add" onClick={e=>{e.stopPropagation();add(p)}}>ADD TO BAG <Plus size={15}/></button></div><div className="product-info"><div className="product-type">{p.type}</div><h3><button className="product-name-link" onClick={()=>openProduct(p)}>{p.name}</button></h3><p>{p.desc}</p><div className="price-row"><strong>{money(p.price)}</strong><del>{money(p.old)}</del><span>{Math.round((1-p.price/p.old)*100)}% OFF</span></div></div></article>;
 return <><style>{`
.hero:before{display:none!important}.vl-admin-shell{background:#fff;color:#171717;border:1px solid #e5e5e5;margin:34px 0 0;font-family:'DM Sans',sans-serif}.vl-admin-embedded{margin-top:34px}.vl-admin-top{background:#111;color:#fff;padding:18px 24px;display:flex;justify-content:space-between;align-items:center}.vl-admin-brand{color:#fff;text-decoration:none;font-size:20px;letter-spacing:.08em}.vl-admin-brand em{font-style:normal;color:#aaa}.vl-admin-brand small{display:block;font-size:9px;letter-spacing:.2em;color:#bbb;margin-top:4px}.vl-admin-store-link{color:#fff}.vl-admin-main{padding:26px}.vl-admin-heading>span,.vl-admin-form-head>div>span,.vl-admin-list-head>div>span{font-size:10px;letter-spacing:.18em;color:#555}.vl-admin-heading h1,.vl-admin-form h2,.vl-admin-list h2{color:#111;margin:8px 0;font-family:'Playfair Display',serif;font-weight:400}.vl-admin-heading p{color:#666;font-size:13px}.vl-admin-notice{background:#f5f5f5;color:#333;padding:10px;font-size:10px;letter-spacing:.04em}.vl-admin-layout{display:grid;grid-template-columns:minmax(280px,.9fr) minmax(0,1.1fr);gap:22px;margin-top:22px}.vl-admin-form,.vl-admin-list{border:1px solid #e4e4e4;background:#fff;padding:20px}.vl-admin-form label{display:block;font-size:11px;color:#333;margin:14px 0}.vl-admin-form input:not([type=file]),.vl-admin-form select,.vl-admin-form textarea{display:block;width:100%;padding:11px;margin-top:7px;border:1px solid #d6d6d6;background:#fff;color:#111;border-radius:0}.vl-admin-two{display:grid;grid-template-columns:1fr 1fr;gap:12px}.vl-admin-form-head,.vl-admin-list-head{display:flex;align-items:center;justify-content:space-between}.vl-admin-number,.vl-admin-list-head>b{color:#111;font-size:22px}.vl-admin-upload{border:1px dashed #aaa;padding:18px;text-align:center;background:#fafafa}.vl-admin-upload input{display:block;max-width:100%;margin:0 auto 10px}.vl-admin-upload-icon{font-size:24px;display:block}.vl-admin-upload small,.vl-admin-product-info small,.vl-admin-product-info span{display:block;color:#777;font-size:10px;margin-top:5px}.vl-admin-preview{max-width:100%;height:150px;object-fit:contain;display:block;margin:10px auto}.vl-admin-form-actions,.vl-admin-product-actions{display:flex;gap:8px;flex-wrap:wrap}.vl-admin-save,.vl-admin-cancel,.vl-admin-product-actions button,.vl-admin-copy-link{border:1px solid #111;background:#111;color:#fff;padding:11px 14px;font-size:10px;letter-spacing:.06em}.vl-admin-cancel,.vl-admin-product-actions button:last-child,.vl-admin-copy-link{background:#fff;color:#111}.vl-admin-message{font-size:12px;color:#333;overflow-wrap:anywhere}.vl-admin-empty{text-align:center;padding:40px 18px;color:#555}.vl-admin-product-list{display:grid;gap:10px;margin-top:16px}.vl-admin-product{display:grid;grid-template-columns:76px minmax(0,1fr);gap:12px;border-top:1px solid #e8e8e8;padding:12px 0}.vl-admin-product>img{width:76px;height:86px;object-fit:cover;background:#f3f3f3}.vl-admin-product-info strong,.vl-admin-product-info b{display:block;margin-top:5px;color:#111}.vl-admin-product-info span{overflow-wrap:anywhere}.vl-admin-product-actions{grid-column:2}.vl-admin-copy-link{padding:7px 10px;margin-top:6px}.vl-admin-footer{background:#111;color:#eee;padding:16px 24px;font-size:10px;display:flex;justify-content:space-between}.product-name-link{border:0;background:none;padding:0;text-align:left;color:inherit;font:inherit;cursor:pointer}.product-detail-page{max-width:1120px}.product-back{margin-bottom:20px}.product-detail-layout{display:grid;grid-template-columns:1fr 1fr;gap:7%;align-items:center}.product-detail-image{background:#f3f3f0;min-height:450px;display:grid;place-items:center}.product-detail-image img{width:100%;height:100%;max-height:580px;object-fit:contain}.product-detail-copy h1{font-family:'Playfair Display',serif;font-weight:400;font-size:clamp(32px,4vw,48px);margin:15px 0}.product-detail-copy>p{color:#666;line-height:1.8;font-size:13px}.product-detail-price{display:flex;align-items:center;gap:12px;margin:22px 0}.product-detail-price strong{font-size:22px}.product-detail-price del{color:#888}.product-detail-price span{font-size:10px;color:#333}.product-detail-actions{display:flex;gap:10px;flex-wrap:wrap}.product-detail-note{display:flex;align-items:center;gap:10px;color:#555;font-size:12px;margin-top:24px}.product-detail-note svg{color:#222}@media(max-width:720px){.vl-admin-main{padding:14px}.vl-admin-layout,.product-detail-layout{grid-template-columns:1fr}.vl-admin-form,.vl-admin-list{padding:14px}.product-detail-image{min-height:280px}.product-detail-actions>*{width:100%}.vl-admin-footer{gap:8px;flex-direction:column}.vl-admin-product{grid-template-columns:64px minmax(0,1fr)}.vl-admin-product>img{width:64px;height:74px}}
`}</style><div className="topbar"><div><Truck size={16}/><span>Free Shipping on Orders Above ₹999</span></div><div className="top-mid"><Leaf size={15}/> Pure · Natural · Luxurious</div><div className="top-right"><span><Phone size={14}/> +91 99584 24916</span><button onClick={()=>window.open(`https://wa.me/${waNumber}`,'_blank')}><MessageCircle size={15}/> WhatsApp Us</button></div></div>
 <header className="header"><button className="mobile-menu" onClick={()=>setMobile(!mobile)}>{mobile?<X/>:<Menu/>}</button><button className="brand" onClick={()=>goto('Home')}><span className="brand-mark">V</span><span><b>VELOURE LUXE</b><small>SKINCARE · HAIRCARE · WELLNESS</small></span></button><nav className={mobile?'nav open':'nav'}><button className={page==='Home'?'active':''} onClick={()=>goto('Home')}>Home</button><button className={page==='About Us'?'active':''} onClick={()=>goto('About Us')}>About Us</button><div className="nav-products"><button className={page==='Products'?'active':''} onClick={()=>goto('Products')}>Products <ChevronDown size={14}/></button><div className="dropdown">{['All','Skincare','Haircare','Bodycare'].map(c=><button key={c} onClick={()=>{setCategory(c);goto('Products')}}>{c==='All'?'All Products':c}</button>)}</div></div><button className={page==='Contact'?'active':''} onClick={()=>goto('Contact')}>Contact</button><button onClick={()=>goto('Dashboard')}>Dashboard</button></nav><div className="header-actions"><button aria-label="Search" onClick={()=>setShowSearch(!showSearch)}><Search/></button><button aria-label="Account" onClick={()=>goto('Dashboard')}><UserRound/></button><button className="bag-button" aria-label="Shopping bag" onClick={()=>goto('Bag')}><ShoppingBag/><i>{count}</i></button></div></header>
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
      {catalog.slice(0, 4).map(p => <ProductCard p={p} key={p.id} />)}
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

 {page==='Product'&&selectedProduct&&<main className="page-main product-detail-page"><button className="back-link product-back" onClick={()=>goto('Products')}>← Back to products</button><div className="product-detail-layout"><div className="product-detail-image"><img src={selectedProduct.img} alt={selectedProduct.name}/></div><div className="product-detail-copy"><span className="kicker">VELOURE LUXE · {selectedProduct.type}</span><h1>{selectedProduct.name}</h1><p>{selectedProduct.desc}</p><div className="product-detail-price"><strong>{money(selectedProduct.price)}</strong>{selectedProduct.old&&<del>{money(selectedProduct.old)}</del>}{selectedProduct.old>selectedProduct.price&&<span>{Math.round((1-selectedProduct.price/selectedProduct.old)*100)}% OFF</span>}</div><p className="product-detail-description">Thoughtfully selected for your everyday care ritual. Add this product to your bag or share its direct product link.</p><div className="product-detail-actions"><button className="gold-button" onClick={()=>{add(selectedProduct);goto('Bag')}}>BUY NOW <ArrowRight size={16}/></button><button className="outline-button" onClick={()=>add(selectedProduct)}>ADD TO BAG <Plus size={15}/></button><button className="outline-button" onClick={()=>copyProductLink(selectedProduct)}>COPY PRODUCT LINK <MessageCircle size={15}/></button></div><div className="product-detail-note"><Truck size={18}/> Free shipping on orders above ₹999</div></div></div></main>}
 {page==='Products'&&<main className="page-main"><div className="page-title"><span className="kicker">THE VELOURE COLLECTION</span><h1>Our <em>Products</em></h1><p>Thoughtful care for your everyday ritual.</p></div><div className="filters">{['All','Skincare','Haircare','Bodycare'].map(c=><button className={category===c?'selected':''} onClick={()=>setCategory(c)} key={c}>{c==='All'?'All Products':c}</button>)}<span>{filtered.length} products</span></div><div className="product-grid listing">{filtered.map(p=><ProductCard p={p} key={p.id}/>)}</div>{filtered.length===0&&<p className="empty">No products found. Try another search.</p>}</main>}
 {page==='About Us'&&<main className="page-main"><AboutSection /><div className="page-title"><span className="kicker">OUR PHILOSOPHY</span><h1>Beauty, with <em>intention.</em></h1><p>Premium everyday care, designed around the rituals that make you feel your best.</p></div><div className="about-panel"><div className="about-photo"></div><div><span className="kicker">WELCOME TO VELOURE LUX</span><h2>Everyday care.<br/><em>Elevated.</em></h2><p>We believe self-care should feel considered, calm and personal. VELOURE LUX brings skincare and haircare essentials together in a refined, easy-to-love experience.</p><p>Explore your routine, discover your favourites, and make a little space for yourself every day.</p><button className="gold-button" onClick={()=>goto('Products')}>SHOP THE COLLECTION <ArrowRight size={16}/></button></div></div></main>}
 {page==='Contact'&&<main className="page-main"><div className="page-title"><span className="kicker">WE’RE HERE FOR YOU</span><h1>Let’s <em>connect.</em></h1><p>Questions about products or an order? We’d love to help.</p></div><div className="contact-grid"><div className="contact-card"><MessageCircle/><h3>WhatsApp Support</h3><p>Reach us for product and order enquiries.</p><button className="gold-button" onClick={()=>window.open(`https://wa.me/${waNumber}`,'_blank')}>CHAT WITH US <ArrowRight size={15}/></button></div><div className="contact-card"><Phone/><h3>Call Us</h3><p>Monday – Saturday · 10 AM – 6 PM</p><a href="tel:+919958424916">+91 99584 24916</a></div><div className="contact-card"><Instagram/><h3>Follow Our Journey</h3><p>Care rituals, new arrivals and more.</p><button className="outline-button" onClick={()=>notify('Add your Instagram profile link in src/main.jsx')}>FOLLOW US <ArrowRight size={15}/></button></div></div></main>}
 {page==='Bag'&&<main className="page-main"><div className="page-title"><span className="kicker">YOUR VELOURE EDIT</span><h1>Shopping <em>Bag</em></h1></div>{!checkout?<div className="bag-layout"><div className="bag-list">{cart.length===0?<div className="empty-bag"><ShoppingBag size={38}/><h2>Your bag is waiting.</h2><p>Add something lovely to your daily ritual.</p><button className="gold-button" onClick={()=>goto('Products')}>EXPLORE PRODUCTS <ArrowRight size={15}/></button></div>:cart.map(x=><div className="bag-item" key={x.id}><img src={x.img}/><div className="bag-detail"><span className="product-type">{x.type}</span><h3>{x.name}</h3><b>{money(x.price)}</b><div className="quantity"><button onClick={()=>qty(x.id,-1)}><Minus size={13}/></button><span>{x.qty}</span><button onClick={()=>qty(x.id,1)}><Plus size={13}/></button></div></div><button className="remove" onClick={()=>qty(x.id,-x.qty)}><Trash2 size={17}/></button></div>)}</div>{cart.length>0&&<aside className="summary"><h3>Order Summary</h3><div><span>Subtotal</span><b>{money(total)}</b></div><div><span>Shipping</span><b>{total>=999?'FREE':'Calculated on order'}</b></div><div className="summary-total"><span>Total</span><b>{money(total+(total>=999?0:79))}</b></div><p>Shipping ₹79 for orders below ₹999.</p><button className="gold-button full" onClick={()=>setCheckout(true)}>PROCEED TO CHECKOUT <ArrowRight size={16}/></button></aside>}</div>:<div className="checkout-layout"><form className="checkout-form" onSubmit={placeOrder}><h2>Delivery details</h2><p>Submit your order details to continue on WhatsApp.</p><label>Full name<input name="name" required placeholder="Your full name"/></label><label>Phone number<input name="phone" required pattern="[0-9+() -]{8,}" placeholder="Your phone number"/></label><label>Delivery address<textarea name="address" required rows="3" placeholder="House, street, city, state, PIN code"/></label><div className="checkout-total"><span>Order total</span><b>{money(total+(total>=999?0:79))}</b></div><button className="gold-button full" type="submit">CONTINUE ON WHATSAPP <MessageCircle size={16}/></button><button type="button" className="back-link" onClick={()=>setCheckout(false)}>← Back to bag</button></form></div>}</main>}
 
{page === 'Dashboard' && (
  <main className="page-main dashboard-page">
    {!dashboardLoggedIn ? (
      <form
        className="vl-admin-form dashboard-login"
        onSubmit={handleDashboardLogin}
      >
        <span className="kicker">VELOURE LUXE</span>
        <h2>Dashboard Login</h2>
        <p>Enter your credentials to manage your store.</p>

        <label>
          Login ID
          <input
            type="text"
            value={loginId}
            onChange={(e) => setLoginId(e.target.value)}
            autoComplete="username"
            required
          />
        </label>

        <label>
          Password
          <input
            type="password"
            value={loginPassword}
            onChange={(e) => setLoginPassword(e.target.value)}
            autoComplete="current-password"
            required
          />
        </label>

        {loginError && (
          <p className="dashboard-login-error">{loginError}</p>
        )}

        <button className="vl-admin-save" type="submit">
          LOGIN
        </button>
      </form>
    ) : (
      <>
        <div className="page-title">
          <span className="kicker">STORE OVERVIEW</span>
          <h1>Order <em>Dashboard</em></h1>
          <p>Orders and product management</p>
          <button
            className="outline-button"
            onClick={() => {
              setDashboardLoggedIn(false);
              setLoginId('');
              setLoginPassword('');
              setLoginError('');
            }}
          >
            LOG OUT
          </button>
        </div>

        <div className="dashboard-stats">
          <div>
            <span>Total orders</span>
            <b>{orders.length}</b>
          </div>
          <div>
            <span>Order value</span>
            <b>
              {money(
                orders.reduce((sum, order) => sum + Number(order.total || 0), 0)
              )}
            </b>
          </div>
          <div>
            <span>Products</span>
            <b>{catalog.length}</b>
          </div>
        </div>

        <div className="orders-table">
          <h2>Recent orders</h2>

          {orders.length === 0 ? (
            <p className="empty">No orders yet.</p>
          ) : (
            orders.map((order) => (
              <div className="order-row" key={order.id}>
                <div>
                  <b>{order.id}</b>
                  <small>{order.date}</small>
                </div>

                <div>
                  {order.name}
                  <small>{order.phone}</small>
                </div>

                <div>
                  {order.items?.map((item, index) => (
                    <span key={`${order.id}-${index}`}>
                      {item.name} × {item.qty}
                      {index < order.items.length - 1 ? ', ' : ''}
                    </span>
                  ))}
                  <small>{order.address}</small>
                </div>

                <strong>{money(order.total)}</strong>

                <div className="dashboard-order-controls">
                  <label>
                    Order Status
                    <select
                      value={order.status || 'New Inquiry'}
                      onChange={(e) =>
                        updateOrder(order.id, { status: e.target.value })
                      }
                    >
                      {[
                        'New Inquiry',
                        'Contacted',
                        'Confirmed',
                        'Processing',
                        'Shipped',
                        'Delivered',
                        'Cancelled',
                      ].map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                  </label>

                  <label>
                    Internal Notes
                    <textarea
                      rows={2}
                      placeholder="Call back, payment pending..."
                      value={order.notes || ''}
                      onChange={(e) =>
                        updateOrder(order.id, { notes: e.target.value })
                      }
                    />
                  </label>
                </div>
              </div>
            ))
          )}
        </div>

        <AdminProductsPage
          embedded
          onProductsChange={() =>
            setCatalog([...products, ...readAdminProducts()])
          }
        />
      </>
    )}
  </main>
)}

 <footer className="footer"><div className="footer-main"><div className="footer-brand"><button className="brand" onClick={()=>goto('Home')}><span className="brand-mark">V</span><span><b>VELOURE LUX</b><small>SKINCARE · HAIRCARE · WELLNESS</small></span></button><p>Thoughtful skincare and haircare for your everyday moments of luxury.</p><div className="socials"><button onClick={()=>notify('Add your Instagram link to connect this button')}><Instagram/></button><button onClick={()=>window.open(`https://wa.me/${waNumber}`,'_blank')}><MessageCircle/></button></div></div><div><h4>EXPLORE</h4><button onClick={()=>goto('About Us')}>Our Story</button><button onClick={()=>goto('Products')}>All Products</button><button onClick={()=>goto('Contact')}>Contact Us</button></div><div><h4>SHOP BY</h4>{['Skincare','Haircare','Bodycare'].map(c=><button key={c} onClick={()=>{setCategory(c);goto('Products')}}>{c}</button>)}</div><div><h4>NEED HELP?</h4><button onClick={()=>goto('Contact')}>Contact & Support</button><button onClick={()=>goto('Bag')}>Shipping & Orders</button><button onClick={()=>goto('Dashboard')}>Order Dashboard</button></div></div><div className="footer-bottom"><span>© {new Date().getFullYear()} VELOURE LUX. All rights reserved.</span><span>MADE WITH CARE · DESIGNED FOR YOUR RITUAL</span></div></footer>
<button
  className="floating-wa"
  aria-label="WhatsApp"
  onClick={() => window.open(`https://wa.me/${waNumber}`, "_blank")}
>
  <MessageCircle />
</button>

<Chatbot />
{notice && <div className="toast">{notice}</div>}
</>;
}


function AdminProductsPage({embedded=false,onProductsChange}){
  const empty={name:'',type:'Skincare',price:'',old:'',tag:'NEW',desc:'',img:''};
  const [items,setItems]=useState(()=>{try{return JSON.parse(localStorage.getItem('veloure_admin_products')||'[]')}catch{return []}});
  const [form,setForm]=useState(empty); const [editing,setEditing]=useState(null); const [message,setMessage]=useState('');
  const saveItems=(next)=>{setItems(next);try{localStorage.setItem('veloure_admin_products',JSON.stringify(next));window.dispatchEvent(new Event('veloure-products-updated'));onProductsChange?.();}catch{setMessage('Photo is too large for browser storage. Firebase Storage connection is needed for larger images.')}};
  const change=(e)=>setForm({...form,[e.target.name]:e.target.value});
  const photo=(e)=>{const file=e.target.files?.[0];if(!file)return;if(!file.type.startsWith('image/')){setMessage('Please choose an image file.');return}if(file.size>1200000){setMessage('For this temporary demo, choose an image under 1.2 MB. Firebase Storage will remove this limitation later.');return}const reader=new FileReader();reader.onload=()=>setForm(f=>({...f,img:String(reader.result)}));reader.readAsDataURL(file)}; 
  const submit=(e)=>{e.preventDefault();if(!form.name.trim()||form.price===''||!form.img){setMessage('Product name, price and photo are required.');return}const product={...form,id:editing??Date.now(),price:Number(form.price),old:Number(form.old||form.price),img:form.img};const next=editing===null?[product,...items]:items.map(x=>x.id===editing?product:x);saveItems(next);setForm(empty);setEditing(null);setMessage('Product saved in this browser demo. Firebase connection will be added later.');};
  const edit=(item)=>{setForm({...item,price:String(item.price),old:String(item.old)});setEditing(item.id);window.scrollTo({top:0,behavior:'smooth'});};
  const remove=(id)=>{if(window.confirm('Delete this product from the temporary admin list?'))saveItems(items.filter(x=>x.id!==id))};
  return <div className={embedded?"vl-admin-shell vl-admin-embedded":"vl-admin-shell"}>{!embedded&&<header className="vl-admin-top"><a href="/" className="vl-admin-brand">VELOURE <em>LUXE</em><small>PRODUCT STUDIO</small></a><a className="vl-admin-store-link" href="/">← Back to Store</a></header>}<main className="vl-admin-main"><div className="vl-admin-heading"><span>STORE MANAGEMENT</span><h1>Product <em>Studio</em></h1><p>Add and manage products without editing website code.</p><div className="vl-admin-notice">DEMO MODE · Saved in this browser only · Firebase connection comes later</div></div><div className="vl-admin-layout"><form className="vl-admin-form" onSubmit={submit}><div className="vl-admin-form-head"><div><span>{editing===null?'NEW LISTING':'EDIT LISTING'}</span><h2>{editing===null?'Add a product':'Update product'}</h2></div><span className="vl-admin-number">{String(items.length+1).padStart(2,'0')}</span></div><label>Product name<input name="name" value={form.name} onChange={change} placeholder="e.g. Radiance Face Cream" required/></label><div className="vl-admin-two"><label>Category<select name="type" value={form.type} onChange={change}><option>Skincare</option><option>Haircare</option><option>Bodycare</option></select></label><label>Product tag<select name="tag" value={form.tag} onChange={change}><option>NEW</option><option>BESTSELLER</option><option>POPULAR</option><option>TOP RATED</option><option>EVERYDAY LUXE</option></select></label></div><div className="vl-admin-two"><label>Selling price (₹)<input name="price" type="number" min="0" value={form.price} onChange={change} placeholder="599" required/></label><label>MRP (₹)<input name="old" type="number" min="0" value={form.old} onChange={change} placeholder="799"/></label></div><label>Short description<textarea name="desc" value={form.desc} onChange={change} rows="3" placeholder="A short product description"/></label><label className="vl-admin-upload"><input type="file" accept="image/*" onChange={photo}/><span className="vl-admin-upload-icon">＋</span><strong>{form.img?'Change product photo':'Upload product photo'}</strong><small>JPG / PNG / WEBP · Demo limit 1.2 MB</small></label>{form.img&&<img className="vl-admin-preview" src={form.img} alt="Product preview"/>}<div className="vl-admin-form-actions"><button className="vl-admin-save" type="submit">{editing===null?'SAVE PRODUCT':'UPDATE PRODUCT'} ↗</button><button className="vl-admin-cancel" type="button" onClick={()=>{setForm(empty);setEditing(null);}}>CLEAR</button></div>{message&&<p className="vl-admin-message">{message}</p>}</form><section className="vl-admin-list"><div className="vl-admin-list-head"><div><span>YOUR CATALOGUE</span><h2>Product listings</h2></div><b>{items.length} <small>ADDED</small></b></div>{items.length===0?<div className="vl-admin-empty"><span>✧</span><h3>Your product studio is ready.</h3><p>Add your first product using the form. Products are currently stored only in this browser; they will not sync to your live store until Firebase is connected.</p></div>:<div className="vl-admin-product-list">{items.map(item=><article className="vl-admin-product" key={item.id}><img src={item.img} alt={item.name}/><div className="vl-admin-product-info"><small>{item.type} · {item.tag}</small><strong>{item.name}</strong><b>₹{Number(item.price).toLocaleString('en-IN')}</b><span>Product link: {`${window.location.origin}/product/${productSlug(item)}`}</span><button type="button" className="vl-admin-copy-link" onClick={()=>{const url=`${window.location.origin}/product/${productSlug(item)}`;navigator.clipboard?.writeText(url).then(()=>setMessage('Product link copied.')).catch(()=>setMessage(url));}}>COPY PRODUCT LINK</button></div><div className="vl-admin-product-actions"><button type="button" onClick={()=>edit(item)}>Edit</button><button type="button" onClick={()=>remove(item.id)}>Delete</button></div></article>)}</div>}</section></div></main>{!embedded&&<footer className="vl-admin-footer">VELOURE LUXE · PRODUCT STUDIO <span>Cloud sync not connected yet</span></footer>}</div>
}

createRoot(document.getElementById('root')).render(<App/>);
