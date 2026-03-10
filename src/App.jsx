import React, { useState, useEffect, useCallback } from "react";

/* ─── GLOBAL STYLES ─── */
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Instrument+Serif:ital@0;1&family=DM+Mono:wght@300;400;500&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&display=swap');

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    :root {
      --black:    #080A0F;
      --ink:      #0E1118;
      --surface:  #141720;
      --border:   rgba(255,255,255,0.07);
      --border-h: rgba(0,229,230,0.25);
      --cyan:     #00E5E6;
      --cyan-dim: rgba(0,229,230,0.12);
      --orange:   #F97316;
      --orange-dim: rgba(249,115,22,0.12);
      --white:    #F0F2F8;
      --muted:    #5A6070;
      --muted2:   #3A4050;
      --gold:     #C8A96A;
      --radius:   4px;
      --radius-lg: 12px;
    }

    html { scroll-behavior: smooth; }

    body {
      background: var(--black);
      color: var(--white);
      font-family: 'DM Sans', sans-serif;
      font-weight: 300;
      -webkit-font-smoothing: antialiased;
      overflow-x: hidden;
    }

    ::-webkit-scrollbar { width: 4px; }
    ::-webkit-scrollbar-track { background: var(--black); }
    ::-webkit-scrollbar-thumb { background: var(--cyan); border-radius: 2px; }

    #grain {
      pointer-events: none;
      position: fixed;
      inset: 0;
      z-index: 999;
      opacity: 0.028;
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
    }

    #bg-mesh {
      pointer-events: none;
      position: fixed;
      inset: 0;
      z-index: 0;
      background:
        radial-gradient(ellipse 80% 60% at 15% 10%, rgba(0,229,230,0.055) 0%, transparent 60%),
        radial-gradient(ellipse 60% 50% at 85% 85%, rgba(249,115,22,0.045) 0%, transparent 55%),
        radial-gradient(ellipse 50% 40% at 50% 50%, rgba(20,23,32,0.9) 0%, transparent 70%),
        var(--black);
    }

    .display { font-family: 'Bebas Neue', sans-serif; letter-spacing: 0.02em; line-height: 0.92; }
    .serif   { font-family: 'Instrument Serif', serif; }
    .mono    { font-family: 'DM Mono', monospace; font-weight: 300; }

    @keyframes shimmer {
      0%   { background-position: -200% center; }
      100% { background-position:  200% center; }
    }
    .shimmer {
      background: linear-gradient(90deg, var(--cyan) 0%, #fff 40%, var(--cyan) 60%, var(--orange) 100%);
      background-size: 200% auto;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      animation: shimmer 4s linear infinite;
    }

    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(28px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    .fu { opacity: 0; animation: fadeUp 0.7s ease forwards; }
    .fu-1 { animation-delay: 0.1s; }
    .fu-2 { animation-delay: 0.25s; }
    .fu-3 { animation-delay: 0.4s; }
    .fu-4 { animation-delay: 0.55s; }

    /* ── NAVBAR ── */
    .nav {
      position: fixed; top: 0; left: 0; right: 0; z-index: 100;
      display: flex; align-items: center; justify-content: space-between;
      padding: 0 48px;
      height: 68px;
      transition: background .35s, border-color .35s, backdrop-filter .35s;
      border-bottom: 1px solid transparent;
    }
    .nav.stuck {
      background: rgba(8,10,15,0.88);
      backdrop-filter: blur(20px);
      border-color: var(--border);
    }
    .nav-links { display: flex; gap: 36px; list-style: none; }
    .nav-links a {
      font-size: 12px; font-weight: 500; letter-spacing: 0.14em; text-transform: uppercase;
      color: var(--muted); text-decoration: none;
      transition: color .2s;
      position: relative;
    }
    .nav-links a::after {
      content: ''; position: absolute; bottom: -3px; left: 0; width: 0; height: 1px;
      background: var(--cyan); transition: width .3s;
    }
    .nav-links a:hover { color: var(--white); }
    .nav-links a:hover::after { width: 100%; }
    .nav-cta {
      padding: 9px 22px;
      border: 1px solid var(--cyan);
      background: transparent;
      color: var(--cyan);
      font-family: 'DM Mono', monospace;
      font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase;
      cursor: pointer; border-radius: var(--radius);
      transition: background .2s, color .2s;
    }
    .nav-cta:hover { background: var(--cyan); color: var(--black); }

    /* ── HERO ── */
    .hero {
      position: relative; z-index: 1;
      min-height: 100vh;
      display: flex; flex-direction: column; align-items: center; justify-content: center;
      text-align: center;
      padding: 120px 24px 80px;
      overflow: hidden;
    }
    .hero::before {
      content: '';
      position: absolute; inset: 0;
      background-image:
        linear-gradient(var(--border) 1px, transparent 1px),
        linear-gradient(90deg, var(--border) 1px, transparent 1px);
      background-size: 60px 60px;
      mask-image: radial-gradient(ellipse 80% 70% at 50% 40%, black 30%, transparent 80%);
      pointer-events: none;
    }
    .hero-eyebrow {
      display: inline-flex; align-items: center; gap: 10px;
      font-family: 'DM Mono', monospace;
      font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase;
      color: var(--muted);
      border: 1px solid var(--border);
      padding: 8px 18px; border-radius: 999px;
      margin-bottom: 40px;
      background: rgba(255,255,255,0.02);
    }
    .eyebrow-dot {
      width: 6px; height: 6px; border-radius: 50%;
      background: var(--orange);
      box-shadow: 0 0 8px var(--orange);
      animation: pulse 2s ease infinite;
    }
    @keyframes pulse {
      0%,100% { opacity: 1; transform: scale(1); }
      50%      { opacity: 0.5; transform: scale(0.7); }
    }
    .hero h1 {
      font-family: 'Bebas Neue', sans-serif;
      font-size: clamp(72px, 14vw, 180px);
      line-height: 0.9; letter-spacing: 0.02em;
      color: var(--white); margin-bottom: 16px;
    }
    .hero-sub {
      font-family: 'Instrument Serif', serif;
      font-style: italic;
      font-size: clamp(16px, 2vw, 22px);
      color: var(--muted); max-width: 480px; line-height: 1.6; margin-bottom: 52px;
    }
    .hero-actions { display: flex; gap: 16px; flex-wrap: wrap; justify-content: center; }
    .btn-primary {
      display: inline-flex; align-items: center; gap: 10px;
      background: var(--cyan); color: var(--black);
      font-family: 'DM Mono', monospace;
      font-size: 12px; font-weight: 500; letter-spacing: 0.1em; text-transform: uppercase;
      padding: 15px 32px; border: none; border-radius: var(--radius);
      cursor: pointer; text-decoration: none;
      transition: transform .2s, box-shadow .2s;
    }
    .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 12px 40px rgba(0,229,230,0.3); }
    .btn-ghost {
      display: inline-flex; align-items: center; gap: 10px;
      background: transparent; color: var(--white);
      font-family: 'DM Mono', monospace;
      font-size: 12px; font-weight: 400; letter-spacing: 0.1em; text-transform: uppercase;
      padding: 14px 32px; border: 1px solid var(--border); border-radius: var(--radius);
      cursor: pointer; text-decoration: none;
      transition: border-color .2s, color .2s;
    }
    .btn-ghost:hover { border-color: var(--white); color: var(--white); }
    .hero-stats {
      position: absolute; bottom: 48px; left: 50%; transform: translateX(-50%);
      display: flex; gap: 0;
      border: 1px solid var(--border); border-radius: var(--radius-lg); overflow: hidden;
      background: rgba(14,17,24,0.7); backdrop-filter: blur(12px);
    }
    .hero-stat { padding: 18px 36px; text-align: center; border-right: 1px solid var(--border); }
    .hero-stat:last-child { border-right: none; }
    .stat-num { font-family: 'Bebas Neue', sans-serif; font-size: 28px; color: var(--cyan); letter-spacing: 0.04em; }
    .stat-lbl { font-size: 10px; color: var(--muted); letter-spacing: 0.16em; text-transform: uppercase; margin-top: 2px; }

    /* ── FEATURES ── */
    .features {
      position: relative; z-index: 1;
      padding: 100px 48px; max-width: 1280px; margin: 0 auto;
    }
    .features-header { display: flex; align-items: flex-end; justify-content: space-between; margin-bottom: 64px; }
    .section-label {
      font-family: 'DM Mono', monospace;
      font-size: 10px; letter-spacing: 0.22em; text-transform: uppercase;
      color: var(--orange); margin-bottom: 12px;
    }
    .section-title {
      font-family: 'Bebas Neue', sans-serif;
      font-size: clamp(36px, 5vw, 60px); line-height: 1; letter-spacing: 0.02em;
    }
    .features-grid {
      display: grid; grid-template-columns: repeat(4, 1fr); gap: 1px;
      border: 1px solid var(--border); border-radius: var(--radius-lg); overflow: hidden;
      background: var(--border);
    }
    .feat-card { background: var(--surface); padding: 40px 32px; transition: background .25s; cursor: default; }
    .feat-card:hover { background: #191D28; }
    .feat-icon { font-size: 28px; margin-bottom: 24px; display: block; }
    .feat-title { font-weight: 500; font-size: 15px; color: var(--white); margin-bottom: 10px; letter-spacing: -0.01em; }
    .feat-desc { font-size: 13px; color: var(--muted); line-height: 1.65; }

    /* ── CATALOG ── */
    .catalog { position: relative; z-index: 1; padding: 100px 48px; max-width: 1280px; margin: 0 auto; }
    .catalog-header { margin-bottom: 64px; }
    .catalog-sub { font-family: 'Instrument Serif', serif; font-style: italic; font-size: 17px; color: var(--muted); margin-top: 12px; }
    .divider { display: flex; align-items: center; gap: 20px; margin-bottom: 48px; }
    .divider-line { flex: 1; height: 1px; background: var(--border); }
    .divider-txt { font-family: 'DM Mono', monospace; font-size: 10px; letter-spacing: 0.18em; text-transform: uppercase; color: var(--muted2); }
    .product-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }

    /* ── CARD ── */
    .card {
      position: relative; background: var(--surface);
      border: 1px solid var(--border); border-radius: var(--radius-lg);
      overflow: hidden;
      transition: border-color .3s, transform .3s, box-shadow .3s;
      cursor: pointer;
    }
    .card:hover {
      border-color: var(--border-h); transform: translateY(-4px);
      box-shadow: 0 24px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(0,229,230,0.08);
    }
    .card-badge {
      position: absolute; top: 16px; left: 16px; z-index: 2;
      font-family: 'DM Mono', monospace;
      font-size: 9px; letter-spacing: 0.15em; text-transform: uppercase;
      padding: 5px 10px; border-radius: 999px;
      background: var(--orange); color: var(--black); font-weight: 500;
    }
    .card-zoom-hint {
      position: absolute; top: 16px; right: 16px; z-index: 2;
      width: 30px; height: 30px; border-radius: 50%;
      background: rgba(0,0,0,0.5); border: 1px solid var(--border);
      backdrop-filter: blur(8px);
      display: flex; align-items: center; justify-content: center;
      opacity: 0; transition: opacity .3s;
      color: var(--muted);
    }
    .card:hover .card-zoom-hint { opacity: 1; }
    .card-visual {
      height: 200px;
      display: flex; align-items: center; justify-content: center;
      position: relative; overflow: hidden;
    }
    .card-visual-glow { position: absolute; inset: 0; transition: opacity .4s; }
    .card-visual-emoji {
      font-size: 64px; position: relative; z-index: 1;
      transition: transform .4s cubic-bezier(.34,1.56,.64,1);
      filter: drop-shadow(0 8px 24px rgba(0,0,0,0.4));
    }
    .card:hover .card-visual-emoji { transform: scale(1.15) translateY(-6px); }
    .card-visual-img {
      width: 100%; height: 100%;
      object-fit: cover;
      position: absolute; inset: 0;
      z-index: 1;
      transition: transform .4s cubic-bezier(.34,1.56,.64,1);
    }
    .card:hover .card-visual-img { transform: scale(1.05); }
    .card-accent-line {
      height: 1px;
      background: linear-gradient(90deg, transparent, var(--border-h), transparent);
      opacity: 0; transition: opacity .4s;
    }
    .card:hover .card-accent-line { opacity: 1; }
    .card-body { padding: 24px; }
    .card-tag { font-family: 'DM Mono', monospace; font-size: 9px; letter-spacing: 0.18em; text-transform: uppercase; color: var(--muted); }
    .card-name { font-family: 'Bebas Neue', sans-serif; font-size: 26px; letter-spacing: 0.02em; color: var(--white); margin: 8px 0 10px; line-height: 1; }
    .card-desc { font-size: 13px; color: var(--muted); line-height: 1.65; margin-bottom: 16px; }
    .card-material {
      display: inline-flex; align-items: center; gap: 8px;
      font-family: 'DM Mono', monospace;
      font-size: 10px; letter-spacing: 0.12em; text-transform: uppercase;
      color: var(--cyan); border: 1px solid rgba(0,229,230,0.2);
      padding: 5px 12px; border-radius: 999px; margin-bottom: 20px;
    }
    .card-footer { padding-top: 20px; border-top: 1px solid var(--border); }
    .btn-wa {
      width: 100%;
      display: inline-flex; align-items: center; justify-content: center; gap: 10px;
      background: rgba(37,211,102,0.1); color: #25D366;
      border: 1px solid rgba(37,211,102,0.25); border-radius: var(--radius);
      padding: 12px;
      font-family: 'DM Mono', monospace;
      font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase;
      cursor: pointer;
      transition: background .2s, border-color .2s, box-shadow .2s;
    }
    .btn-wa:hover {
      background: rgba(37,211,102,0.18); border-color: rgba(37,211,102,0.5);
      box-shadow: 0 4px 20px rgba(37,211,102,0.15);
    }

    /* ── MODAL OVERLAY ── */
    @keyframes modalIn {
      from { opacity: 0; transform: scale(0.95) translateY(20px); }
      to   { opacity: 1; transform: scale(1) translateY(0); }
    }
    @keyframes overlayIn {
      from { opacity: 0; }
      to   { opacity: 1; }
    }

    .modal-overlay {
      position: fixed; inset: 0; z-index: 500;
      background: rgba(8,10,15,0.85);
      backdrop-filter: blur(16px);
      display: flex; align-items: center; justify-content: center;
      padding: 24px;
      animation: overlayIn .25s ease forwards;
    }
    .modal {
      position: relative;
      background: var(--surface);
      border: 1px solid rgba(0,229,230,0.15);
      border-radius: 20px;
      width: 100%; max-width: 900px; max-height: 90vh;
      overflow: hidden;
      display: grid; grid-template-columns: 1fr 1fr;
      animation: modalIn .3s cubic-bezier(.22,1,.36,1) forwards;
      box-shadow: 0 40px 120px rgba(0,0,0,0.7), 0 0 0 1px rgba(0,229,230,0.06);
    }

    /* ── MODAL LEFT (gallery) ── */
    .modal-gallery {
      position: relative; background: #0D1017;
      display: flex; flex-direction: column;
      min-height: 480px;
    }
    .modal-main-img {
      flex: 1; position: relative; overflow: hidden;
      display: flex; align-items: center; justify-content: center;
      min-height: 340px;
    }
    .modal-main-img img {
      width: 100%; height: 100%; object-fit: cover;
      transition: opacity .3s;
    }
    .modal-main-emoji {
      font-size: 100px;
      filter: drop-shadow(0 12px 32px rgba(0,0,0,0.5));
    }
    .modal-main-glow {
      position: absolute; inset: 0; pointer-events: none;
    }
    .modal-thumbs {
      display: flex; gap: 8px; padding: 12px;
      border-top: 1px solid var(--border);
      overflow-x: auto;
    }
    .modal-thumbs::-webkit-scrollbar { height: 3px; }
    .modal-thumb {
      width: 60px; height: 60px; flex-shrink: 0;
      border-radius: 8px; overflow: hidden;
      border: 2px solid transparent;
      cursor: pointer; transition: border-color .2s;
      background: #1A1E2A;
      display: flex; align-items: center; justify-content: center;
      font-size: 28px;
    }
    .modal-thumb.active { border-color: var(--cyan); }
    .modal-thumb img { width: 100%; height: 100%; object-fit: cover; }
    .modal-img-nav {
      position: absolute; top: 50%; transform: translateY(-50%);
      background: rgba(8,10,15,0.7); border: 1px solid var(--border);
      color: var(--white); width: 36px; height: 36px; border-radius: 50%;
      display: flex; align-items: center; justify-content: center;
      cursor: pointer; transition: background .2s, border-color .2s;
      z-index: 2; font-size: 16px;
    }
    .modal-img-nav:hover { background: rgba(0,229,230,0.15); border-color: var(--cyan); }
    .modal-img-nav.prev { left: 12px; }
    .modal-img-nav.next { right: 12px; }

    /* ── MODAL RIGHT (info) ── */
    .modal-info {
      padding: 36px 32px;
      display: flex; flex-direction: column;
      overflow-y: auto;
    }
    .modal-info::-webkit-scrollbar { width: 3px; }
    .modal-badge {
      display: inline-block;
      font-family: 'DM Mono', monospace;
      font-size: 9px; letter-spacing: 0.18em; text-transform: uppercase;
      background: var(--orange); color: var(--black);
      padding: 4px 10px; border-radius: 999px;
      margin-bottom: 16px; font-weight: 500;
      align-self: flex-start;
    }
    .modal-tag {
      font-family: 'DM Mono', monospace;
      font-size: 10px; letter-spacing: 0.2em; text-transform: uppercase;
      color: var(--orange); margin-bottom: 8px;
    }
    .modal-name {
      font-family: 'Bebas Neue', sans-serif;
      font-size: 46px; letter-spacing: 0.02em; line-height: 0.95;
      color: var(--white); margin-bottom: 16px;
    }
    .modal-desc-full {
      font-size: 14px; color: var(--muted); line-height: 1.75;
      margin-bottom: 24px;
    }
    .modal-specs {
      display: grid; grid-template-columns: 1fr 1fr; gap: 12px;
      margin-bottom: 28px;
    }
    .modal-spec {
      background: rgba(255,255,255,0.03);
      border: 1px solid var(--border);
      border-radius: 8px; padding: 12px 14px;
    }
    .modal-spec-label {
      font-family: 'DM Mono', monospace;
      font-size: 9px; letter-spacing: 0.18em; text-transform: uppercase;
      color: var(--muted2); margin-bottom: 4px;
    }
    .modal-spec-value {
      font-size: 13px; color: var(--white); font-weight: 400;
    }
    .modal-material-pill {
      display: inline-flex; align-items: center; gap: 8px;
      font-family: 'DM Mono', monospace;
      font-size: 10px; letter-spacing: 0.12em; text-transform: uppercase;
      color: var(--cyan); border: 1px solid rgba(0,229,230,0.2);
      padding: 6px 14px; border-radius: 999px; margin-bottom: 20px;
    }
    .modal-divider { height: 1px; background: var(--border); margin-bottom: 24px; }
    .modal-actions { display: flex; flex-direction: column; gap: 12px; margin-top: auto; }
    .btn-wa-lg {
      display: inline-flex; align-items: center; justify-content: center; gap: 12px;
      background: rgba(37,211,102,0.12); color: #25D366;
      border: 1px solid rgba(37,211,102,0.3); border-radius: var(--radius);
      padding: 14px 24px;
      font-family: 'DM Mono', monospace;
      font-size: 12px; letter-spacing: 0.1em; text-transform: uppercase;
      cursor: pointer;
      transition: background .2s, border-color .2s, box-shadow .2s;
    }
    .btn-wa-lg:hover {
      background: rgba(37,211,102,0.2); border-color: rgba(37,211,102,0.6);
      box-shadow: 0 6px 28px rgba(37,211,102,0.2);
    }
    .btn-custom {
      display: inline-flex; align-items: center; justify-content: center; gap: 12px;
      background: transparent; color: var(--muted);
      border: 1px solid var(--border); border-radius: var(--radius);
      padding: 13px 24px;
      font-family: 'DM Mono', monospace;
      font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase;
      cursor: pointer;
      transition: border-color .2s, color .2s;
    }
    .btn-custom:hover { border-color: var(--cyan); color: var(--cyan); }

    /* ── CLOSE BUTTON ── */
    .modal-close {
      position: absolute; top: 16px; right: 16px; z-index: 10;
      width: 38px; height: 38px; border-radius: 50%;
      background: rgba(8,10,15,0.7); border: 1px solid var(--border);
      color: var(--muted); font-size: 18px;
      display: flex; align-items: center; justify-content: center;
      cursor: pointer; backdrop-filter: blur(8px);
      transition: background .2s, color .2s, border-color .2s;
    }
    .modal-close:hover { background: rgba(0,229,230,0.1); color: var(--cyan); border-color: var(--cyan); }

    /* ── CTA ── */
    .cta-section {
      position: relative; z-index: 1;
      padding: 140px 48px; text-align: center; overflow: hidden;
    }
    .cta-section::before {
      content: ''; position: absolute; inset: 0;
      background: radial-gradient(ellipse 80% 60% at 50% 50%, rgba(0,229,230,0.06), transparent 65%);
      pointer-events: none;
    }
    .cta-bg-text {
      position: absolute; top: 50%; left: 50%; transform: translate(-50%,-50%);
      font-family: 'Bebas Neue', sans-serif;
      font-size: clamp(120px, 22vw, 280px);
      color: transparent; -webkit-text-stroke: 1px rgba(255,255,255,0.04);
      white-space: nowrap; pointer-events: none; user-select: none;
    }
    .cta-content { position: relative; z-index: 1; max-width: 600px; margin: 0 auto; }
    .cta-emoji { font-size: 52px; display: block; margin-bottom: 24px; }
    .cta-title {
      font-family: 'Bebas Neue', sans-serif;
      font-size: clamp(40px, 6vw, 72px); line-height: 0.95; letter-spacing: 0.02em; margin-bottom: 20px;
    }
    .cta-sub { font-family: 'Instrument Serif', serif; font-style: italic; font-size: 18px; color: var(--muted); margin-bottom: 40px; line-height: 1.6; }

    /* ── FOOTER ── */
    footer { position: relative; z-index: 1; border-top: 1px solid var(--border); padding: 48px; }
    .footer-inner { max-width: 1280px; margin: 0 auto; display: flex; align-items: center; justify-content: space-between; }
    .footer-copy { font-family: 'DM Mono', monospace; font-size: 11px; color: var(--muted2); letter-spacing: 0.08em; margin-top: 12px; }
    .footer-links { display: flex; gap: 32px; list-style: none; }
    .footer-links a { font-size: 12px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--muted); text-decoration: none; transition: color .2s; font-family: 'DM Mono', monospace; }
    .footer-links a:hover { color: var(--cyan); }

    /* ── FAB ── */
    .wa-fab {
      position: fixed; bottom: 32px; right: 32px; z-index: 200;
      width: 52px; height: 52px; border-radius: 50%;
      background: #25D366;
      display: flex; align-items: center; justify-content: center;
      border: none; cursor: pointer;
      box-shadow: 0 8px 32px rgba(37,211,102,0.4);
      transition: transform .25s, box-shadow .25s;
      animation: fabBounce 3s ease infinite 2s;
    }
    @keyframes fabBounce {
      0%,100% { transform: translateY(0); }
      50%      { transform: translateY(-5px); }
    }
    .wa-fab:hover { transform: scale(1.1); box-shadow: 0 12px 40px rgba(37,211,102,0.55); animation: none; }

    /* ── RESPONSIVE ── */
    @media (max-width: 1024px) {
      .product-grid { grid-template-columns: repeat(2, 1fr); }
      .features-grid { grid-template-columns: repeat(2, 1fr); }
      .nav { padding: 0 28px; }
      .catalog, .features { padding: 80px 28px; }
    }
    @media (max-width: 700px) {
      .modal { grid-template-columns: 1fr; max-height: 95vh; }
      .modal-gallery { min-height: 260px; }
      .modal-info { padding: 24px 20px; }
      .modal-name { font-size: 36px; }
      .modal-specs { grid-template-columns: 1fr 1fr; }
    }
    @media (max-width: 640px) {
      .product-grid { grid-template-columns: 1fr; }
      .features-grid { grid-template-columns: 1fr; }
      .hero-stats { display: none; }
      .nav-links { display: none; }
      .nav { padding: 0 20px; }
      .catalog, .features { padding: 60px 20px; }
      .cta-section { padding: 80px 20px; }
      footer, .footer-inner { flex-direction: column; gap: 24px; text-align: center; }
    }
  `}</style>
);

/* ─── LOGO ─── */
const Logo = ({ height = 44 }) => (
  <svg height={height} viewBox="0 0 260 72" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Forma3D">
    <defs>
      <linearGradient id="l1" x1="0" y1="0" x2="0" y2="1"><stop stopColor="#7AEEFF"/><stop offset="1" stopColor="#5BC8F5"/></linearGradient>
      <linearGradient id="l2" x1="0" y1="0" x2="0" y2="1"><stop stopColor="#4EAAEE"/><stop offset="1" stopColor="#4A8FE0"/></linearGradient>
      <linearGradient id="l3" x1="0" y1="0" x2="0" y2="1"><stop stopColor="#5B7FD4"/><stop offset="1" stopColor="#6366C0"/></linearGradient>
      <linearGradient id="l4" x1="0" y1="0" x2="0" y2="1"><stop stopColor="#6B56B8"/><stop offset="1" stopColor="#7B44A8"/></linearGradient>
      <linearGradient id="lineG" x1="22" y1="0" x2="130" y2="0" gradientUnits="userSpaceOnUse">
        <stop stopColor="#4EAAEE" stopOpacity="0.8"/><stop offset="1" stopColor="#4EAAEE" stopOpacity="0"/>
      </linearGradient>
    </defs>
    <polygon points="36,4  44,12  36,20  28,12" fill="url(#l1)"/>
    <polygon points="36,22  48,30  36,38  24,30" fill="url(#l2)"/>
    <polygon points="36,38  52,48  36,58  20,48" fill="url(#l3)"/>
    <polygon points="36,52  56,62  36,72  16,62" fill="url(#l4)" opacity="0.85"/>
    <circle cx="18" cy="68" r="3.5" fill="#F97316"/>
    <line x1="22" y1="68" x2="130" y2="68" stroke="url(#lineG)" strokeWidth="1.2" opacity="0.6"/>
    <text x="80" y="50" fontFamily="'Bebas Neue', sans-serif" fontWeight="400" fontSize="32" fill="#F0F2F8" letterSpacing="1">FORMA</text>
    <text x="178" y="50" fontFamily="'Bebas Neue', sans-serif" fontWeight="400" fontSize="32" fill="#00E5E6" letterSpacing="1">3D</text>
  </svg>
);

/* ─── WA ICON ─── */
const WAIcon = ({ size = 18 }) => (
  <svg viewBox="0 0 32 32" width={size} height={size} fill="none" aria-hidden>
    <circle cx="16" cy="16" r="16" fill="currentColor" fillOpacity="0"/>
    <path d="M22.5 9.5A9.1 9.1 0 0 0 7.6 20.5L6.5 25.5l5.1-1.3a9 9 0 0 0 4.4 1.1 9.1 9.1 0 0 0 6.5-15.8z" fill="currentColor"/>
    <path d="M12.5 13.5c.2.5.9 1.8 1 2s.2.4.1.6c-.1.2-.4.5-.5.7-.1.2-.3.4-.1.7.2.3 1 1.5 2.1 2.4 1.4 1.2 2.6 1.6 3 1.8.3.1.6 0 .8-.2l.5-.7c.2-.3.4-.2.7-.1l2 .9c.3.1.5.2.6.4.1.4-.1 1.3-.5 1.7-.5.5-1.1.7-1.8.7-1 0-2.7-.5-4.8-2.5-2-1.9-3.1-4-3.2-5.1-.1-.7.1-1.4.5-1.9.4-.4.8-.6 1.2-.6h.4c.3 0 .5.2.7.5l.3.7z" fill="var(--black)" opacity="0.9"/>
  </svg>
);

/* ─── DATA ─── */
const PRODUCTOS = [
  {
    id: 1,
    nombre: "Soporte Móviles/Tablets",
    material: "PLA Marmolado",
    img: "/soporte.png",
    badge: null,
    color: ["#22D3EE","#5B8CFF"],
    desc: "Soporte de escritorio para móviles y tablets impreso en PLA marmolado. Estable, elegante y compatible con carga inalámbrica.",
    descFull: "Soporte de escritorio de alta calidad para móviles y tablets, fabricado en PLA marmolado de primera calidad. Diseñado ergonómicamente para mantener tu dispositivo en el ángulo perfecto para visualización y videollamadas. Compatible con carga inalámbrica, sin necesidad de retirar el dispositivo. Base amplia y antideslizante para máxima estabilidad. Disponible en varios colores de filamento marmolado.",
    imgs: ["/soporte.png", "/soporte.png", "/soporte.png"],
    specs: [
      { label: "Material", value: "PLA Marmolado" },
      { label: "Colores", value: "Blanco, Negro, Gris" },
      { label: "Compatibilidad", value: "Móvil y Tablet" },
      { label: "Entrega", value: "48 horas" },
    ],
  },
  {
    id: 2,
    nombre: "Velas Aromáticas",
    material: "Cera de Soja",
    img: "/barco.png",
    badge: null,
    color: ["#F59E0B","#F97316"],
    desc: "Velas artesanales con cera de soja natural. Aromas relajantes para el hogar, en múltiples tamaños y fragancias.",
    descFull: "Velas artesanales elaboradas con cera de soja 100% natural y pabilos de algodón orgánico. Sin parafina ni aditivos sintéticos. Fragancias disponibles: lavanda, vainilla, eucalipto, bergamota y canela. Contenedores de vidrio reciclado o cerámica impresa en 3D. Tiempo de combustión de hasta 50 horas según el tamaño. Perfectas como regalo o para crear ambientes únicos en el hogar.",
    imgs: ["/buda.png", "/queso.png"],
    specs: [
      { label: "Material", value: "Cera de Soja" },
      { label: "Fragancias", value: "5 opciones" },
      { label: "Duración", value: "Hasta 50h" },
      { label: "Entrega", value: "48 horas" },
    ],
  },
  {
    id: 4,
    nombre: "Llaveros Personalizados",
    material: "PLA Multicolor",
    img: "/clauer.png",
    badge: "Personalizable",
    color: ["#A855F7","#EC4899"],
    desc: "Llaveros con tu nombre, iniciales, logo o diseño y con opción de añadir NFC. Impresos en PLA de alta calidad con acabado premium.",
    descFull: "Llaveros completamente personalizables impresos en PLA de alta resolución. Puedes incluir tu nombre, iniciales, logo corporativo o cualquier diseño que tengas en mente. Opción de integrar chip NFC para compartir tu contacto, enlace web o cualquier información digital con un simple toque. Acabado liso o texturado según preferencia. Resistentes y ligeros, perfectos para uso diario o como detalle corporativo.",
    imgs: ["/clauer.png", "/clauer.png", "/clauer.png"],
    specs: [
      { label: "Material", value: "PLA Multicolor" },
      { label: "Opción NFC", value: "Disponible" },
      { label: "Diseño", value: "100% Custom" },
      { label: "Entrega", value: "48–72h" },
    ],
  },
  {
    id: 5,
    nombre: "Figuras Artesanales",
    material: "Resina Premium",
    img: "/figuras.png",
    badge: "Ed. Limitada",
    color: ["#F97316","#EAB308"],
    desc: "Figuras artesanales en resina de alta resolución. Regalos únicos para coleccionistas.",
    descFull: "Figuras artesanales fabricadas en resina fotopolimérica de alta resolución con acabado a mano. Cada pieza es única y pasa por un proceso de pintura artesanal multicapa. Disponibles en diferentes tamaños, desde miniaturas de 5cm hasta figuras de 20cm. Ideales para coleccionistas, decoración del hogar o como regalo especial. Edición limitada — pocas unidades disponibles. También realizamos encargos de figuras personalizadas.",
    imgs: ["/figuras.png", "/kaiju.png", "/flash.png"],
    specs: [
      { label: "Material", value: "Resina Premium" },
      { label: "Acabado", value: "Pintado a mano" },
      { label: "Tamaños", value: "5cm – 20cm" },
      { label: "Stock", value: "Ed. Limitada" },
    ],
  },
];

const TELEFONO = "34614819874";

/* ─── PRODUCT MODAL ─── */
const ProductModal = ({ item, onClose, onWhatsapp }) => {
  const [activeImg, setActiveImg] = useState(0);
  const hasImgs = item.imgs && item.imgs.length > 0;
  const totalImgs = hasImgs ? item.imgs.length : 0;

  useEffect(() => {
    const fn = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  const prev = () => setActiveImg(i => (i - 1 + totalImgs) % totalImgs);
  const next = () => setActiveImg(i => (i + 1) % totalImgs);

  return (
    <div
      className="modal-overlay"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      role="dialog"
      aria-modal="true"
      aria-label={`Detalle: ${item.nombre}`}
    >
      <div className="modal">
        <button className="modal-close" onClick={onClose} aria-label="Cerrar">✕</button>

        <div className="modal-gallery">
          <div className="modal-main-img">
            <div className="modal-main-glow" style={{
              background: `radial-gradient(ellipse at 40% 50%, ${item.color[0]}33, transparent 60%),
                           radial-gradient(ellipse at 70% 60%, ${item.color[1]}22, transparent 55%)`
            }} aria-hidden />

            {hasImgs ? (
              <img src={item.imgs[activeImg]} alt={`${item.nombre} foto ${activeImg + 1}`} />
            ) : (
              <span className="modal-main-emoji" role="img" aria-label={item.nombre}>
                {item.emoji}
              </span>
            )}

            {totalImgs > 1 && (
              <>
                <button className="modal-img-nav prev" onClick={prev} aria-label="Imagen anterior">‹</button>
                <button className="modal-img-nav next" onClick={next} aria-label="Imagen siguiente">›</button>
              </>
            )}
          </div>

          {totalImgs > 1 && (
            <div className="modal-thumbs">
              {item.imgs.map((src, i) => (
                <button
                  key={i}
                  className={`modal-thumb${activeImg === i ? " active" : ""}`}
                  onClick={() => setActiveImg(i)}
                  aria-label={`Ver foto ${i + 1}`}
                >
                  <img src={src} alt="" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="modal-info">
          {item.badge && <div className="modal-badge">{item.badge}</div>}
          <div className="modal-tag">Impresión 3D · Forma3D</div>
          <h2 className="modal-name">{item.nombre}</h2>

          <div className="modal-material-pill">
            <span style={{
              width: 7, height: 7, borderRadius: "50%",
              background: item.color[0],
              boxShadow: `0 0 8px ${item.color[0]}`,
              display:"inline-block"
            }} aria-hidden />
            {item.material}
          </div>

          <p className="modal-desc-full">{item.descFull}</p>

          <div className="modal-divider" aria-hidden />

          <div className="modal-specs">
            {item.specs.map(s => (
              <div key={s.label} className="modal-spec">
                <div className="modal-spec-label">{s.label}</div>
                <div className="modal-spec-value">{s.value}</div>
              </div>
            ))}
          </div>

          <div className="modal-actions">
            <button
              className="btn-wa-lg"
              onClick={() => onWhatsapp(item.nombre)}
              aria-label={`Pedir ${item.nombre} por WhatsApp`}
            >
              <WAIcon size={18} />
              Pedir por WhatsApp
            </button>
            <button
              className="btn-custom"
              onClick={() => onWhatsapp(`un ${item.nombre} personalizado`)}
              aria-label={`Pedir versión personalizada de ${item.nombre}`}
            >
              ✏️ Quiero personalizarlo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ─── MAIN ─── */
export default function Forma3D() {
  const [stuck, setStuck] = useState(false);
  const [hovered, setHovered] = useState(null);
  const [modalItem, setModalItem] = useState(null);

  useEffect(() => {
    const fn = () => setStuck(window.scrollY > 50);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const whatsapp = useCallback((producto) => {
    const msg = encodeURIComponent(`¡Hola! Me interesa: ${producto}. ¿Podéis darme más info?`);
    window.open(`https://wa.me/${TELEFONO}?text=${msg}`, "_blank", "noopener");
  }, []);

  const openModal = (item) => setModalItem(item);
  const closeModal = () => setModalItem(null);

  return (
    <>
      <GlobalStyles />
      <div id="grain" aria-hidden />
      <div id="bg-mesh" aria-hidden />

      <header>
        <nav className={`nav${stuck ? " stuck" : ""}`} aria-label="Navegación principal">
          <a href="#" aria-label="Forma3D inicio"><Logo /></a>
          <ul className="nav-links">
            <li><a href="#catalogo">Catálogo</a></li>
            <li><a href="#personalizado">Personalizado</a></li>
            <li><a href="#contacto">Contacto</a></li>
          </ul>
          <button className="nav-cta" onClick={() => whatsapp("un presupuesto")} aria-label="Pedir presupuesto">
            Presupuesto gratis
          </button>
        </nav>
      </header>

      <section className="hero" aria-label="Portada">
        <div className="hero-eyebrow fu fu-1">
          <span className="eyebrow-dot" aria-hidden />
          Impresión 3D artesanal · España
        </div>
        <h1 className="fu fu-2">
          <span className="shimmer">FORMA</span><br />
          <span style={{ color:"var(--white)" }}>3D</span>
        </h1>
        <p className="hero-sub fu fu-3">
          Convierte tus ideas en objetos reales.<br/>Calidad premium, capa a capa.
        </p>
        <div className="hero-actions fu fu-4">
          <a href="#catalogo" className="btn-primary">Ver catálogo →</a>
          <button className="btn-ghost" onClick={() => whatsapp("un diseño personalizado")}>
            Pedir personalizado
          </button>
        </div>
        <div className="hero-stats fu fu-4" role="list" aria-label="Estadísticas">
          {[
            { num:"500+", lbl:"Proyectos" },
            { num:"48h",  lbl:"Entrega" },
            { num:"4.9★", lbl:"Valoración" },
            { num:"PLA·PETG·Resina", lbl:"Materiales" },
          ].map(s => (
            <div key={s.lbl} className="hero-stat" role="listitem">
              <div className="stat-num">{s.num}</div>
              <div className="stat-lbl">{s.lbl}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="features" aria-labelledby="feat-h">
        <div className="features-header">
          <div>
            <div className="section-label">Por qué elegirnos</div>
            <h2 id="feat-h" className="section-title">Calidad que <span className="shimmer">se nota</span></h2>
          </div>
        </div>
        <div className="features-grid" role="list">
          {[
            { icon:"🎨", title:"100% Personalizable", desc:"Tu diseño, logo o nombre en cada pieza. Sin límites de creatividad." },
            { icon:"⚡", title:"Envío en 48h",         desc:"Producción rápida y envío exprés a toda España y Europa." },
            { icon:"🏆", title:"Calidad Premium",      desc:"Filamentos certificados y acabados profesionales en cada pedido." },
            { icon:"♻️", title:"PLA Ecológico",        desc:"Materiales biodegradables. Producción responsable con el planeta." },
          ].map((f, i) => (
            <div key={f.title} role="listitem" className="feat-card"
              style={{ animation:`fadeUp .6s ease ${i * 0.1}s both` }}>
              <span className="feat-icon" aria-hidden>{f.icon}</span>
              <div className="feat-title">{f.title}</div>
              <p className="feat-desc">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <main id="catalogo" className="catalog" aria-labelledby="cat-h">
        <div className="catalog-header">
          <div className="section-label">Catálogo</div>
          <h2 id="cat-h" className="section-title">Nuestros <span className="shimmer">Productos</span></h2>
          <p className="catalog-sub">Artículos impresos en 3D listos para enviar o personalizar</p>
        </div>
        <div className="divider" aria-hidden>
          <div className="divider-line"/>
          <span className="divider-txt">{PRODUCTOS.length} productos disponibles</span>
          <div className="divider-line"/>
        </div>
        <div className="product-grid">
          {PRODUCTOS.map((item, i) => (
            <article
              key={item.id}
              className="card"
              itemScope itemType="https://schema.org/Product"
              onMouseEnter={() => setHovered(item.id)}
              onMouseLeave={() => setHovered(null)}
              onClick={() => openModal(item)}
              style={{ animation:`fadeUp .6s ease ${i * 0.1}s both` }}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") openModal(item); }}
              aria-label={`Ver detalles de ${item.nombre}`}
            >
              {item.badge && <div className="card-badge">{item.badge}</div>}

              <div className="card-zoom-hint" aria-hidden>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                  <line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/>
                </svg>
              </div>

              <div className="card-visual">
                <div
                  className="card-visual-glow"
                  style={{
                    background:`radial-gradient(ellipse at 40% 50%, ${item.color[0]}22, transparent 60%),
                                radial-gradient(ellipse at 70% 60%, ${item.color[1]}18, transparent 55%)`,
                    opacity: hovered === item.id ? 1 : 0.55,
                  }}
                  aria-hidden
                />
                {item.img ? (
                  <img
                    className="card-visual-img"
                    src={item.img}
                    alt={item.nombre}
                  />
                ) : (
                  <span className="card-visual-emoji" role="img" aria-label={item.nombre}>
                    {item.emoji}
                  </span>
                )}
              </div>

              <div className="card-accent-line" aria-hidden />

              <div className="card-body">
                <div className="card-tag" aria-hidden>Impresión 3D</div>
                <h3 className="card-name" itemProp="name">{item.nombre}</h3>
                <p className="card-desc" itemProp="description">{item.desc}</p>
                <div className="card-material" aria-label={`Material: ${item.material}`}>
                  {item.material}
                </div>
                <div className="card-footer">
                  <button
                    className="btn-wa"
                    onClick={(e) => { e.stopPropagation(); whatsapp(item.nombre); }}
                    aria-label={`Pedir ${item.nombre} por WhatsApp`}
                  >
                    <WAIcon size={16} />
                    Pedir por WhatsApp
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </main>

      <section id="personalizado" className="cta-section" aria-labelledby="cta-h">
        <div className="cta-bg-text" aria-hidden>STL</div>
        <div className="cta-content">
          <span className="cta-emoji" aria-hidden>🖨️</span>
          <h2 id="cta-h" className="cta-title">
            ¿Tienes un<br/><span className="shimmer">diseño propio?</span>
          </h2>
          <p className="cta-sub">
            Envíanos tu archivo STL o cuéntanos tu idea.<br/>
            Presupuesto gratuito en menos de 24 horas.
          </p>
          <button className="btn-primary" style={{ margin:"0 auto" }} onClick={() => whatsapp("un artículo personalizado")}>
            <WAIcon size={16} />
            Pedir presupuesto
          </button>
        </div>
      </section>

      <footer id="contacto" itemScope itemType="https://schema.org/LocalBusiness">
        <meta itemProp="name" content="Forma3D" />
        <meta itemProp="email" content="hola@forma3d.shop" />
        <div className="footer-inner">
          <div>
            <Logo height={34} />
            <p className="footer-copy">© 2025 Forma3D · Todos los derechos reservados</p>
          </div>
          <nav aria-label="Pie de página">
            <ul className="footer-links">
              <li><a href="#catalogo">Catálogo</a></li>
              <li><a href="#personalizado">Personalizado</a></li>
              <li><a href="mailto:hola@forma3d.es">hola@forma3d.es</a></li>
              <li><a href="#" aria-label="Aviso legal">Legal</a></li>
            </ul>
          </nav>
        </div>
      </footer>

      <button
        className="wa-fab"
        onClick={() => window.open(`https://wa.me/${TELEFONO}`, "_blank", "noopener")}
        aria-label="Contactar por WhatsApp"
        title="Chatea con nosotros"
        style={{ color:"#fff" }}
      >
        <WAIcon size={22} />
      </button>

      {modalItem && (
        <ProductModal
          item={modalItem}
          onClose={closeModal}
          onWhatsapp={whatsapp}
        />
      )}
    </>
  );
}