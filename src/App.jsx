<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Forma3D - Impresiones 3D y Velas Aromáticas Artesanales">
    <title>Forma3D Catalog | Impresiones 3D & Velas Aromáticas</title>
    
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.0/font/bootstrap-icons.css" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Space+Mono:wght@400;700&family=Poppins:wght@300;400;600;700&display=swap" rel="stylesheet">
    
    <style>
        :root {
            --primary-gold: #FFD700;
            --dark-space: #0a0a0a;
            --dark-secondary: #1a1a2e;
            --accent-blue: #0066ff;
            --accent-cyan: #00d4ff;
            --accent-orange: #FF6B35;
            --text-primary: #e8e8e8;
            --text-secondary: #a0a0a0;
            --border-color: #333;
        }

        * { scroll-behavior: smooth; }

        html, body {
            background: linear-gradient(135deg, var(--dark-space) 0%, var(--dark-secondary) 100%);
            color: var(--text-primary);
            font-family: 'Poppins', sans-serif;
            min-height: 100vh;
            overflow-x: hidden;
        }

        /* ═══════════════════════════════════════════════════════════════ */
        /* NAVBAR */
        /* ═══════════════════════════════════════════════════════════════ */

        .navbar {
            background: linear-gradient(90deg, rgba(10,10,10,0.95) 0%, rgba(26,26,46,0.95) 100%);
            border-bottom: 2px solid var(--primary-gold);
            backdrop-filter: blur(10px);
            box-shadow: 0 8px 32px rgba(255, 215, 0, 0.15);
            padding: 1rem 0;
            position: sticky;
            top: 0;
            z-index: 1000;
        }

        .navbar-brand {
            font-family: 'Orbitron', sans-serif;
            font-size: 1.8rem;
            font-weight: 900;
            color: var(--primary-gold) !important;
            letter-spacing: 2px;
            text-shadow: 0 0 20px rgba(255, 215, 0, 0.5);
            display: flex;
            align-items: center;
            gap: 0.75rem;
        }

        .nav-link {
            font-family: 'Space Mono', monospace;
            font-size: 0.85rem;
            letter-spacing: 1px;
            text-transform: uppercase;
            color: var(--text-secondary) !important;
            padding: 0.75rem 1.25rem !important;
            transition: all 0.3s ease;
            position: relative;
        }

        .nav-link::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            width: 0;
            height: 2px;
            background: linear-gradient(90deg, var(--primary-gold), var(--accent-cyan));
            transition: width 0.3s ease;
        }

        .nav-link:hover::after,
        .nav-link.active::after {
            width: 100%;
        }

        .nav-link:hover {
            color: var(--primary-gold) !important;
            text-shadow: 0 0 10px rgba(255, 215, 0, 0.4);
        }

        /* ═══════════════════════════════════════════════════════════════ */
        /* HERO */
        /* ═══════════════════════════════════════════════════════════════ */

        .hero {
            background: linear-gradient(180deg, rgba(10,10,10,0.8) 0%, rgba(255,107,53,0.1) 100%);
            position: relative;
            padding: 5rem 2rem;
            border-bottom: 3px solid var(--primary-gold);
            overflow: hidden;
            margin-bottom: 3rem;
        }

        .hero::before {
            content: '';
            position: absolute;
            top: 0;
            right: -100px;
            width: 400px;
            height: 400px;
            background: radial-gradient(circle, rgba(255, 107, 53, 0.15) 0%, transparent 70%);
            border-radius: 50%;
            animation: float 6s ease-in-out infinite;
        }

        @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
        }

        .hero h1 {
            font-family: 'Orbitron', sans-serif;
            font-size: clamp(2.5rem, 8vw, 4rem);
            font-weight: 900;
            color: var(--primary-gold);
            letter-spacing: 3px;
            text-shadow: 0 0 30px rgba(255, 215, 0, 0.5), 0 0 60px rgba(255, 107, 53, 0.3);
            margin-bottom: 1rem;
            position: relative;
            z-index: 1;
        }

        .hero-subtitle {
            font-family: 'Space Mono', monospace;
            font-size: 1.1rem;
            color: var(--text-secondary);
            letter-spacing: 1px;
            position: relative;
            z-index: 1;
        }

        /* ═══════════════════════════════════════════════════════════════ */
        /* CATEGORÍAS */
        /* ═══════════════════════════════════════════════════════════════ */

        .category-section {
            margin-bottom: 4rem;
        }

        .section-title {
            font-family: 'Orbitron', sans-serif;
            font-size: 2rem;
            font-weight: 900;
            color: var(--primary-gold);
            letter-spacing: 2px;
            margin-bottom: 2.5rem;
            text-transform: uppercase;
            border-bottom: 3px solid var(--accent-orange);
            padding-bottom: 1rem;
            display: inline-block;
        }

        .category-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 2rem;
            margin-bottom: 3rem;
        }

        /* ═══════════════════════════════════════════════════════════════ */
        /* CARDS */
        /* ═══════════════════════════════════════════════════════════════ */

        .product-card {
            background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
            border: 2px solid var(--border-color);
            border-radius: 8px;
            overflow: hidden;
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            height: 100%;
            position: relative;
            group;
        }

        .product-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 3px;
            background: linear-gradient(90deg, var(--accent-cyan), var(--primary-gold), var(--accent-orange));
            transform: scaleX(0);
            transform-origin: left;
            transition: transform 0.4s ease;
            z-index: 1;
        }

        .product-card:hover {
            border-color: var(--primary-gold);
            transform: translateY(-8px);
            box-shadow: 0 20px 40px rgba(255, 215, 0, 0.15), 0 0 20px rgba(255, 107, 53, 0.1);
        }

        .product-card:hover::before {
            transform: scaleX(1);
        }

        .product-image {
            width: 100%;
            height: 250px;
            background: linear-gradient(135deg, #1a1a2e, #16213e);
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 5rem;
            position: relative;
            overflow: hidden;
            border-bottom: 2px solid var(--accent-orange);
        }

        .product-image::before {
            content: '';
            position: absolute;
            inset: 0;
            background: radial-gradient(circle at 40% 50%, rgba(255, 107, 53, 0.1), transparent);
            opacity: 0;
            transition: opacity 0.3s;
            z-index: 1;
        }

        .product-card:hover .product-image::before {
            opacity: 1;
        }

        .product-badge {
            position: absolute;
            top: 1rem;
            right: 1rem;
            background: var(--accent-orange);
            color: white;
            padding: 0.5rem 1rem;
            border-radius: 4px;
            font-family: 'Space Mono', monospace;
            font-weight: 700;
            font-size: 0.75rem;
            text-transform: uppercase;
            letter-spacing: 1px;
            z-index: 2;
        }

        .card-header {
            background: linear-gradient(90deg, var(--accent-blue) 0%, var(--accent-cyan) 100%);
            border: none;
            padding: 1.25rem;
            position: relative;
        }

        .card-header::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            height: 1px;
            background: linear-gradient(90deg, transparent, var(--primary-gold), transparent);
        }

        .card-title {
            color: var(--dark-space);
            font-weight: 700;
            font-size: 1.25rem;
            letter-spacing: 0.5px;
            margin: 0;
            text-transform: uppercase;
        }

        .card-body {
            padding: 1.5rem;
        }

        .product-info {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 1rem;
            margin-bottom: 1rem;
        }

        .info-item {
            background: rgba(255, 107, 53, 0.1);
            padding: 0.8rem;
            border-radius: 4px;
            border: 1px solid rgba(255, 107, 53, 0.2);
        }

        .info-label {
            font-family: 'Space Mono', monospace;
            font-size: 0.7rem;
            text-transform: uppercase;
            letter-spacing: 1px;
            color: var(--accent-orange);
            font-weight: 700;
            margin-bottom: 0.25rem;
        }

        .info-value {
            font-size: 0.95rem;
            color: var(--text-primary);
            font-weight: 500;
        }

        .product-description {
            font-size: 0.9rem;
            color: var(--text-secondary);
            line-height: 1.6;
            margin-bottom: 1.5rem;
        }

        .product-price {
            font-family: 'Orbitron', sans-serif;
            font-size: 1.5rem;
            color: var(--primary-gold);
            font-weight: 900;
            margin-bottom: 1rem;
            text-shadow: 0 0 10px rgba(255, 215, 0, 0.3);
        }

        /* ═══════════════════════════════════════════════════════════════ */
        /* BUTTONS */
        /* ═══════════════════════════════════════════════════════════════ */

        .btn-whatsapp {
            background: transparent;
            border: 2px solid #25D366;
            color: #25D366;
            font-family: 'Space Mono', monospace;
            font-weight: 700;
            letter-spacing: 1px;
            text-transform: uppercase;
            font-size: 0.85rem;
            padding: 0.8rem 1.5rem;
            transition: all 0.3s ease;
            width: 100%;
            cursor: pointer;
            border-radius: 4px;
        }

        .btn-whatsapp:hover {
            background: #25D366;
            color: white;
            box-shadow: 0 8px 20px rgba(37, 211, 102, 0.3);
        }

        /* ═══════════════════════════════════════════════════════════════ */
        /* FOOTER */
        /* ═══════════════════════════════════════════════════════════════ */

        footer {
            background: linear-gradient(180deg, var(--dark-secondary) 0%, var(--dark-space) 100%);
            border-top: 2px solid var(--primary-gold);
            padding: 3rem 2rem;
            margin-top: 4rem;
            font-family: 'Space Mono', monospace;
            font-size: 0.9rem;
        }

        .footer-content {
            max-width: 1200px;
            margin: 0 auto;
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 2rem;
            margin-bottom: 2rem;
        }

        .footer-section h4 {
            color: var(--primary-gold);
            font-weight: 700;
            margin-bottom: 1rem;
            text-transform: uppercase;
            letter-spacing: 1px;
        }

        .footer-section a {
            color: var(--text-secondary);
            text-decoration: none;
            transition: color 0.3s;
            display: block;
            margin-bottom: 0.5rem;
        }

        .footer-section a:hover {
            color: var(--accent-orange);
        }

        .footer-bottom {
            text-align: center;
            padding-top: 2rem;
            border-top: 1px solid var(--border-color);
            color: var(--text-secondary);
        }

        /* ═══════════════════════════════════════════════════════════════ */
        /* RESPONSIVE */
        /* ═══════════════════════════════════════════════════════════════ */

        @media (max-width: 768px) {
            .hero { padding: 3rem 1rem; }
            .hero h1 { font-size: 2rem; }
            .navbar-brand { font-size: 1.3rem; }
            .product-card { margin-bottom: 1rem; }
            .section-title { font-size: 1.5rem; }
            .product-info { grid-template-columns: 1fr; }
        }
    </style>
</head>
<body>

    <!-- NAVBAR -->
    <nav class="navbar navbar-expand-lg navbar-dark">
        <div class="container">
            <a class="navbar-brand" href="#">
                <i class="bi bi-box"></i> FORMA3D
            </a>
            <button class="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav ms-auto">
                    <li class="nav-item">
                        <a class="nav-link active" href="#impresiones">
                            <i class="bi bi-printer"></i> Impresiones 3D
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#velas">
                            <i class="bi bi-fire"></i> Velas Aromáticas
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#contacto">
                            <i class="bi bi-telephone"></i> Contacto
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>

    <!-- HERO -->
    <section class="hero">
        <div class="container">
            <h1><i class="bi bi-star-fill"></i> FORMA3D</h1>
            <p class="hero-subtitle">Impresiones 3D Artesanales • Velas Aromáticas Premium</p>
        </div>
    </section>

    <!-- MAIN CONTENT -->
    <main class="container mb-5">
        
        <!-- IMPRESIONES 3D SECTION -->
        <section class="category-section" id="impresiones">
            <h2 class="section-title"><i class="bi bi-printer"></i> Impresiones 3D</h2>
            <div class="category-grid">
                <!-- Soportes -->
                <div class="product-card">
                    <div class="product-image">
                        📱
                        <div class="product-badge">PLA Premium</div>
                    </div>
                    <div class="card-header">
                        <h5 class="card-title">Soporte Móvil</h5>
                    </div>
                    <div class="card-body">
                        <p class="product-description">Soporte ergonómico para móvil y tablet. Diseño minimalista con acabado profesional.</p>
                        <div class="product-info">
                            <div class="info-item">
                                <div class="info-label">Material</div>
                                <div class="info-value">PLA Premium</div>
                            </div>
                            <div class="info-item">
                                <div class="info-label">Colores</div>
                                <div class="info-value">Múltiples</div>
                            </div>
                        </div>
                        <div class="product-price">€15.99</div>
                        <button class="btn-whatsapp" onclick="whatsapp('Soporte Móvil')">
                            <i class="bi bi-whatsapp"></i> Consultar
                        </button>
                    </div>
                </div>

                <!-- Figura 3D -->
                <div class="product-card">
                    <div class="product-image">
                        🎨
                        <div class="product-badge">Personalizable</div>
                    </div>
                    <div class="card-header">
                        <h5 class="card-title">Figura Personalizada</h5>
                    </div>
                    <div class="card-body">
                        <p class="product-description">Figuras en 3D personalizadas. Cualquier diseño, forma o tamaño que desees.</p>
                        <div class="product-info">
                            <div class="info-item">
                                <div class="info-label">Material</div>
                                <div class="info-value">Resina/PLA</div>
                            </div>
                            <div class="info-item">
                                <div class="info-label">Tiempo</div>
                                <div class="info-value">48-72h</div>
                            </div>
                        </div>
                        <div class="product-price">€24.99</div>
                        <button class="btn-whatsapp" onclick="whatsapp('Figura Personalizada')">
                            <i class="bi bi-whatsapp"></i> Diseñar Ahora
                        </button>
                    </div>
                </div>

                <!-- Accesorios -->
                <div class="product-card">
                    <div class="product-image">
                        🎁
                        <div class="product-badge">Ofertas</div>
                    </div>
                    <div class="card-header">
                        <h5 class="card-title">Pack Accesorios</h5>
                    </div>
                    <div class="card-body">
                        <p class="product-description">Pack de 3 accesorios: organizador, cable organizer y base cable.</p>
                        <div class="product-info">
                            <div class="info-item">
                                <div class="info-label">Piezas</div>
                                <div class="info-value">3 unidades</div>
                            </div>
                            <div class="info-item">
                                <div class="info-label">Ahorros</div>
                                <div class="info-value">-20%</div>
                            </div>
                        </div>
                        <div class="product-price">€34.99</div>
                        <button class="btn-whatsapp" onclick="whatsapp('Pack Accesorios')">
                            <i class="bi bi-whatsapp"></i> Consultar
                        </button>
                    </div>
                </div>

                <!-- Miniaturas -->
                <div class="product-card">
                    <div class="product-image">
                        🤖
                        <div class="product-badge">Nuevas</div>
                    </div>
                    <div class="card-header">
                        <h5 class="card-title">Miniaturas Coleccionables</h5>
                    </div>
                    <div class="card-body">
                        <p class="product-description">Miniaturas detalladas para colecciones. Pintadas a mano o lisas.</p>
                        <div class="product-info">
                            <div class="info-item">
                                <div class="info-label">Altura</div>
                                <div class="info-value">5-10cm</div>
                            </div>
                            <div class="info-item">
                                <div class="info-label">Acabado</div>
                                <div class="info-value">Premium</div>
                            </div>
                        </div>
                        <div class="product-price">€18.99</div>
                        <button class="btn-whatsapp" onclick="whatsapp('Miniaturas')">
                            <i class="bi bi-whatsapp"></i> Ver Colección
                        </button>
                    </div>
                </div>
            </div>
        </section>

        <!-- VELAS AROMÁTICAS SECTION -->
        <section class="category-section" id="velas">
            <h2 class="section-title"><i class="bi bi-fire"></i> Velas Aromáticas</h2>
            <div class="category-grid">
                <!-- Vela Lavanda -->
                <div class="product-card">
                    <div class="product-image">
                        🕯️
                        <div class="product-badge">Popular</div>
                    </div>
                    <div class="card-header">
                        <h5 class="card-title">Vela Lavanda</h5>
                    </div>
                    <div class="card-body">
                        <p class="product-description">Vela artesanal con esencia de lavanda pura. Relaja y perfuma tu hogar.</p>
                        <div class="product-info">
                            <div class="info-item">
                                <div class="info-label">Material</div>
                                <div class="info-value">Cera Soja 100%</div>
                            </div>
                            <div class="info-item">
                                <div class="info-label">Duración</div>
                                <div class="info-value">40 horas</div>
                            </div>
                        </div>
                        <div class="product-price">€12.99</div>
                        <button class="btn-whatsapp" onclick="whatsapp('Vela Lavanda')">
                            <i class="bi bi-whatsapp"></i> Consultar
                        </button>
                    </div>
                </div>

                <!-- Vela Vainilla -->
                <div class="product-card">
                    <div class="product-image">
                        🕯️
                        <div class="product-badge">Favorita</div>
                    </div>
                    <div class="card-header">
                        <h5 class="card-title">Vela Vainilla</h5>
                    </div>
                    <div class="card-body">
                        <p class="product-description">Aroma cálido y envolvente. Perfecto para crear una atmósfera acogedora.</p>
                        <div class="product-info">
                            <div class="info-item">
                                <div class="info-label">Material</div>
                                <div class="info-value">Cera Soja 100%</div>
                            </div>
                            <div class="info-item">
                                <div class="info-label">Duración</div>
                                <div class="info-value">40 horas</div>
                            </div>
                        </div>
                        <div class="product-price">€12.99</div>
                        <button class="btn-whatsapp" onclick="whatsapp('Vela Vainilla')">
                            <i class="bi bi-whatsapp"></i> Consultar
                        </button>
                    </div>
                </div>

                <!-- Pack Velas -->
                <div class="product-card">
                    <div class="product-image">
                        🎁
                        <div class="product-badge">Pack Ahorro</div>
                    </div>
                    <div class="card-header">
                        <h5 class="card-title">Pack 3 Velas</h5>
                    </div>
                    <div class="card-body">
                        <p class="product-description">Set de 3 velas: Lavanda, Vainilla y Rosa. El combo perfecto.</p>
                        <div class="product-info">
                            <div class="info-item">
                                <div class="info-label">Cantidad</div>
                                <div class="info-value">3 velas</div>
                            </div>
                            <div class="info-item">
                                <div class="info-label">Ahorro</div>
                                <div class="info-value">-15%</div>
                            </div>
                        </div>
                        <div class="product-price">€33.99</div>
                        <button class="btn-whatsapp" onclick="whatsapp('Pack 3 Velas')">
                            <i class="bi bi-whatsapp"></i> Consultar
                        </button>
                    </div>
                </div>

                <!-- Vela Rosa -->
                <div class="product-card">
                    <div class="product-image">
                        🌹
                        <div class="product-badge">Romántica</div>
                    </div>
                    <div class="card-header">
                        <h5 class="card-title">Vela Rosa Silvestre</h5>
                    </div>
                    <div class="card-body">
                        <p class="product-description">Aroma floral delicado y sofisticado. Ideal para momentos especiales.</p>
                        <div class="product-info">
                            <div class="info-item">
                                <div class="info-label">Material</div>
                                <div class="info-value">Cera Soja 100%</div>
                            </div>
                            <div class="info-item">
                                <div class="info-label">Duración</div>
                                <div class="info-value">40 horas</div>
                            </div>
                        </div>
                        <div class="product-price">€13.99</div>
                        <button class="btn-whatsapp" onclick="whatsapp('Vela Rosa')">
                            <i class="bi bi-whatsapp"></i> Consultar
                        </button>
                    </div>
                </div>
            </div>
        </section>

    </main>

    <!-- FOOTER -->
    <footer id="contacto">
        <div class="footer-content">
            <div class="footer-section">
                <h4>Sobre Nosotros</h4>
                <p>Forma3D es tu proveedor de impresiones 3D artesanales y velas aromáticas premium. Pasión por la calidad y el diseño.</p>
            </div>
            <div class="footer-section">
                <h4>Productos</h4>
                <a href="#impresiones">Impresiones 3D</a>
                <a href="#velas">Velas Aromáticas</a>
                <a href="#">Personalizaciones</a>
                <a href="#">Ofertas</a>
            </div>
            <div class="footer-section">
                <h4>Contacto</h4>
                <a href="https://wa.me/34614819874" target="_blank"><i class="bi bi-whatsapp"></i> WhatsApp</a>
                <a href="mailto:hola@forma3d.es"><i class="bi bi-envelope"></i> Email</a>
                <a href="#"><i class="bi bi-instagram"></i> Instagram</a>
                <a href="#"><i class="bi bi-facebook"></i> Facebook</a>
            </div>
            <div class="footer-section">
                <h4>Envíos</h4>
                <p>✓ Envío 48h a toda España</p>
                <p>✓ Embalaje Premium</p>
                <p>✓ Satisfacción Garantizada</p>
            </div>
        </div>
        <div class="footer-bottom">
            <p>&copy; 2025 Forma3D - Impresiones 3D & Velas Aromáticas | Hecho con <i class="bi bi-heart-fill" style="color: var(--accent-orange);"></i> en España</p>
        </div>
    </footer>

    <!-- SCRIPTS -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>

    <script>
        function whatsapp(productName) {
            const message = encodeURIComponent(`Hola, me interesa: ${productName}. ¿Puedes darme más información?`);
            window.open(`https://wa.me/34614819874?text=${message}`, '_blank');
        }

        // Smooth scroll para enlaces
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                if (this.getAttribute('href') !== '#') {
                    e.preventDefault();
                    const target = document.querySelector(this.getAttribute('href'));
                    if (target) target.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });
    </script>

</body>
</html>