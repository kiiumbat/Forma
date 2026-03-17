import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './App.css';

// Products Data
const productsData = {
  impresiones3d: [
    {
      id: 1,
      name: 'Soporte Móvil',
      price: 15.99,
      badge: 'PLA Premium',
      icon: '📱',
      description: 'Soporte ergonómico para móvil y tablet. Diseño minimalista con acabado profesional.',
      specs: [
        { label: 'Material', value: 'PLA Premium' },
        { label: 'Colores', value: 'Múltiples' }
      ]
    },
    {
      id: 2,
      name: 'Figura Personalizada',
      price: 24.99,
      badge: 'Personalizable',
      icon: '🎨',
      description: 'Figuras en 3D personalizadas. Cualquier diseño, forma o tamaño que desees.',
      specs: [
        { label: 'Material', value: 'Resina/PLA' },
        { label: 'Tiempo', value: '48-72h' }
      ]
    },
    {
      id: 3,
      name: 'Pack Accesorios',
      price: 34.99,
      badge: 'Ofertas',
      icon: '🎁',
      description: 'Pack de 3 accesorios: organizador, cable organizer y base cable.',
      specs: [
        { label: 'Piezas', value: '3 unidades' },
        { label: 'Ahorros', value: '-20%' }
      ]
    },
    {
      id: 4,
      name: 'Miniaturas Coleccionables',
      price: 18.99,
      badge: 'Nuevas',
      icon: '🤖',
      description: 'Miniaturas detalladas para colecciones. Pintadas a mano o lisas.',
      specs: [
        { label: 'Altura', value: '5-10cm' },
        { label: 'Acabado', value: 'Premium' }
      ]
    }
  ],
  velas: [
    {
      id: 5,
      name: 'Vela Lavanda',
      price: 12.99,
      badge: 'Popular',
      icon: '🕯️',
      description: 'Vela artesanal con esencia de lavanda pura. Relaja y perfuma tu hogar.',
      specs: [
        { label: 'Material', value: 'Cera Soja 100%' },
        { label: 'Duración', value: '40 horas' }
      ]
    },
    {
      id: 6,
      name: 'Vela Vainilla',
      price: 12.99,
      badge: 'Favorita',
      icon: '🕯️',
      description: 'Aroma cálido y envolvente. Perfecto para crear una atmósfera acogedora.',
      specs: [
        { label: 'Material', value: 'Cera Soja 100%' },
        { label: 'Duración', value: '40 horas' }
      ]
    },
    {
      id: 7,
      name: 'Pack 3 Velas',
      price: 33.99,
      badge: 'Pack Ahorro',
      icon: '🎁',
      description: 'Set de 3 velas: Lavanda, Vainilla y Rosa. El combo perfecto.',
      specs: [
        { label: 'Cantidad', value: '3 velas' },
        { label: 'Ahorro', value: '-15%' }
      ]
    },
    {
      id: 8,
      name: 'Vela Rosa Silvestre',
      price: 13.99,
      badge: 'Romántica',
      icon: '🌹',
      description: 'Aroma floral delicado y sofisticado. Ideal para momentos especiales.',
      specs: [
        { label: 'Material', value: 'Cera Soja 100%' },
        { label: 'Duración', value: '40 horas' }
      ]
    }
  ]
};

// Product Card Component
const ProductCard = ({ product }) => {
  const handleWhatsApp = (productName) => {
    const message = encodeURIComponent(`Hola, me interesa: ${productName}. ¿Puedes darme más información?`);
    window.open(`https://wa.me/34614819874?text=${message}`, '_blank');
  };

  return (
    <div className="col-md-6 col-lg-4 col-xl-3 mb-4">
      <div className="product-card">
        <div className="product-image">
          <span>{product.icon}</span>
          <div className="product-badge">{product.badge}</div>
        </div>
        <div className="card-header">
          <h5 className="card-title">{product.name}</h5>
        </div>
        <div className="card-body">
          <p className="product-description">{product.description}</p>
          <div className="product-info">
            {product.specs.map((spec, index) => (
              <div key={index} className="info-item">
                <div className="info-label">{spec.label}</div>
                <div className="info-value">{spec.value}</div>
              </div>
            ))}
          </div>
          <div className="product-price">€{product.price.toFixed(2)}</div>
          <button 
            className="btn-whatsapp"
            onClick={() => handleWhatsApp(product.name)}
          >
            <i className="bi bi-whatsapp"></i> Consultar
          </button>
        </div>
      </div>
    </div>
  );
};

// Section Component
const Section = ({ title, icon, products }) => {
  return (
    <section className="category-section" id={title.toLowerCase().replace(/\s/g, '-')}>
      <h2 className="section-title">
        <i className={`bi ${icon}`}></i> {title}
      </h2>
      <div className="row">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

// Navigation Component
const Navigation = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark">
      <div className="container">
        <a className="navbar-brand" href="#home">
          <i className="bi bi-box"></i> FORMA3D
        </a>
        <button 
          className="navbar-toggler border-0" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <a className="nav-link active" href="#impresiones-3d">
                <i className="bi bi-printer"></i> Impresiones 3D
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#velas-aromáticas">
                <i className="bi bi-fire"></i> Velas Aromáticas
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#contacto">
                <i className="bi bi-telephone"></i> Contacto
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

// Hero Component
const Hero = () => {
  return (
    <section className="hero">
      <div className="container">
        <h1>
          <i className="bi bi-star-fill"></i> FORMA3D
        </h1>
        <p className="hero-subtitle">Impresiones 3D Artesanales • Velas Aromáticas Premium</p>
      </div>
    </section>
  );
};

// Footer Component
const Footer = () => {
  return (
    <footer id="contacto">
      <div className="footer-content">
        <div className="footer-section">
          <h4>Sobre Nosotros</h4>
          <p>Forma3D es tu proveedor de impresiones 3D artesanales y velas aromáticas premium. Pasión por la calidad y el diseño.</p>
        </div>
        <div className="footer-section">
          <h4>Productos</h4>
          <a href="#impresiones-3d">Impresiones 3D</a>
          <a href="#velas-aromáticas">Velas Aromáticas</a>
          <a href="#">Personalizaciones</a>
          <a href="#">Ofertas</a>
        </div>
        <div className="footer-section">
          <h4>Contacto</h4>
          <a href="https://wa.me/34614819874" target="_blank" rel="noopener noreferrer">
            <i className="bi bi-whatsapp"></i> WhatsApp
          </a>
          <a href="mailto:hola@forma3d.es">
            <i className="bi bi-envelope"></i> Email
          </a>
          <a href="#">
            <i className="bi bi-instagram"></i> Instagram
          </a>
          <a href="#">
            <i className="bi bi-facebook"></i> Facebook
          </a>
        </div>
        <div className="footer-section">
          <h4>Envíos</h4>
          <p>✓ Envío 48h a toda España</p>
          <p>✓ Embalaje Premium</p>
          <p>✓ Satisfacción Garantizada</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2025 Forma3D - Impresiones 3D & Velas Aromáticas | Hecho con <i className="bi bi-heart-fill" style={{color: 'var(--accent-orange)'}}></i> en España</p>
      </div>
    </footer>
  );
};

// Main App Component
export default function App() {
  return (
    <div className="App">
      <Navigation />
      <Hero />
      <main className="container mb-5">
        <Section 
          title="Impresiones 3D" 
          icon="bi-printer"
          products={productsData.impresiones3d}
        />
        <Section 
          title="Velas Aromáticas" 
          icon="bi-fire"
          products={productsData.velas}
        />
      </main>
      <Footer />
    </div>
  );
}