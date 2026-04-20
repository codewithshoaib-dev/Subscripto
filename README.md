# Subscripto

Subscripto is a complete SaaS-style subscription onboarding system that replicates a real-world user flow from account creation to Stripe Checkout (test mode). It is designed to demonstrate production-level frontend + backend integration for subscription-based products.

---

## Overview

This project implements a full onboarding and billing pipeline commonly used in SaaS products:

- Business account creation
- Multi-plan subscription selection
- Billing cycle management (monthly / yearly)
- Stripe Checkout session integration (test mode)
- End-to-end redirect flow into Stripe-hosted checkout

No real transactions are processed. Payments run entirely in Stripe test mode.

---

## Core Flow

The user is guided through a structured 3-step onboarding experience:

Account → Plan Selection → Checkout

Each step preserves context and enforces progression, simulating a real SaaS activation funnel.

---

## Features

- Multi-step onboarding system with persistent step indicator
- Business-oriented account creation flow
- Tiered pricing system (Starter, Pro, Team)
- Monthly and yearly billing logic with discounts
- Interactive plan selection UI
- Stripe Checkout session integration (test mode)
- Real redirect flow to Stripe-hosted checkout page
- Clean SaaS-style UI system with reusable components
- Responsive design optimized for mobile and desktop

---

## Tech Stack

- React + TypeScript
- Vite
- Tailwind CSS (custom design tokens + component system)
- Backend API (Django / DRF)
- Stripe Checkout (test mode integration)

---

## Stripe Testing

This project uses Stripe test mode. You can safely simulate payments using the following test cards inside Stripe Checkout:

- Success: `4242 4242 4242 4242`
- Declined: `4000 0000 0000 0002`
- Insufficient funds: `4000 0000 0000 9995`
- Requires 3D Secure: `4000 0025 0000 3155`
- Expired: `4000 0000 0000 0069`

Use any valid future expiry date and any 3-digit CVC.

---

## Design Approach

The UI is built to replicate modern SaaS onboarding systems with:

- Step-based progression (guided flow)
- Strong visual hierarchy
- Business-first copy and structure
- Clean surface-based design system (light theme)
- Minimal cognitive load during decision-making

The system prioritizes clarity, conversion flow, and realism over decorative UI patterns.

---

## Purpose

This project demonstrates the ability to build:

- End-to-end SaaS onboarding systems
- Subscription-based product flows
- Stripe-integrated checkout pipelines
- Production-style frontend architecture with backend support

It is designed as a portfolio-grade implementation of a real subscription SaaS flow.

---

## Capabilities

This system is already aligned with production SaaS architecture and can be extended into a live product with:

- Authentication (JWT/session-based)
- Multi-tenant business accounts
- Live Stripe billing integration
- Subscription management dashboard

---

## License

Portfolio / demonstration project.
