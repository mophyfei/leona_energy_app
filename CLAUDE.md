# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **Numerology Web Application** (數字DNA — 您的光之守護) built with React and Tailwind CSS. It's a single-page application that calculates numerology readings based on birthdates, personal codes, ID numbers, and license plates, mapping them to eight energy guardians (八大守護者) based on traditional Chinese metaphysical concepts.

The application is designed for **Leona (愛倒立的天使)**, a spiritual practitioner who offers numerology courses and consultation services.

## Tech Stack

- **Framework**: Create React App (CRA)
- **UI**: React 19.2.0 with functional components and hooks
- **Styling**: Tailwind CSS 3.4.1 with custom gradient designs
- **Icons**: lucide-react
- **Testing**: Jest + React Testing Library
- **Language**: JavaScript (no TypeScript)

## Development Commands

```bash
# Start development server (opens at http://localhost:3000)
npm start

# Run tests in interactive watch mode
npm test

# Build for production
npm run build

# Run a single test file
npm test -- App.test.js

# Run tests without watch mode
npm test -- --watchAll=false
```

## Architecture

### Single Component Design

The entire application is contained in [src/App.js](src/App.js) as a single functional component (~360 lines). This is intentional for simplicity and does not need to be refactored unless requested.

### Core Calculation Logic

The numerology engine uses three key functions:

1. **`sumDigitsToOneFromString(str)`** - Extracts digits from any string and reduces to 1-9
2. **`sumDigitsToOne(n)`** - Reduces numeric input to 1-9
3. **`mapToGuardianId(num1to9)`** - Maps numbers 1-9 to guardian IDs 1-8 (9 maps to 1)

The main calculation function **`calcAll(dateStr, personalCode, idStr, plateStr)`** returns:
- `life`: Life path number from birthdate
- `shadow`: Complementary number (pairs: 1↔9, 2↔8, 3↔7, 4↔6, 5↔5)
- `birthdayGuardian`, `codeGuardian`, `idGuardian`, `plateGuardian`: Mapped guardian IDs

### Guardian System

The **`GUARDIANS`** array defines 8 energy archetypes:
1. 正官 (Solar Guardian of Order)
2. 食神 (Angel of Abundance)
3. 比肩 (Crimson Warrior of Courage)
4. 正印 (Goddess of Compassion)
5. 七煞 (Flame Breaker Spirit)
6. 傷官 (Azure Sage of Wisdom)
7. 劫財 (Amber Flow Keeper)
8. 偏印 (Violet Seer of Inspiration)

Each guardian has custom gradient colors, glow effects, and descriptions.

### Visual Components

- **`Halo`** - SVG gradient background glow effect
- **`Angel`** - SVG illustration for guardian cards
- **`Badge`** - Small pill-shaped labels with sparkle icons

## Styling Philosophy

The design uses a **"fairy-tale mystical"** aesthetic with:
- Pink-gold gradients (`BRAND_COLORS.primary`)
- Emerald-green accents (`BRAND_COLORS.accent`)
- Glassmorphism effects (`backdrop-blur`, `bg-white/70`)
- Custom shadow glows for each guardian
- Responsive grid layouts

All styles are inline Tailwind classes - no separate CSS files except [src/index.css](src/index.css) for Tailwind imports.

## Business Logic

The app includes pricing information for:
- **Courses**: NT$ 39,800 / NT$ 31,931 (1-on-1) / NT$ 31,419 (group)
- **Services**: NT$ 6,800 (consultation) / NT$ 16,800 (license plate) / NT$ 16,888 (profile photo)

Contact methods:
- LINE: loveyogaleona
- Email: loveyogaandangel@gmail.com
- Instagram: @love_yoga_leona31931

## Important Notes

- **Do not extract components** unless explicitly requested - the single-file structure is intentional
- **Preserve Chinese content** - All UI text, descriptions, and business copy are in Traditional Chinese
- **Maintain visual consistency** - Custom colors, glows, and gradients are carefully chosen for brand identity
- **Note calculation simplicity** - The app mentions this is a "beginner version" algorithm; advanced features exist in paid courses
- The metaphysical system combines Chinese Five Elements (五行), numerology, and angel energy concepts

## File Structure

```
src/
├── App.js           # Main application (all UI + logic)
├── index.js         # React entry point
├── index.css        # Tailwind imports only
├── App.css          # Unused (can be deleted)
├── App.test.js      # Basic test setup
└── reportWebVitals.js  # CRA performance monitoring

public/
├── index.html       # SEO metadata, Open Graph tags
├── favicon.ico      # Custom favicon
└── preview.png      # Social media preview image
```

## Testing

Tests use React Testing Library. The default test in [src/App.test.js](src/App.test.js) is minimal. When adding tests, focus on:
- Calculation logic correctness
- Guardian mapping accuracy
- Form input handling
- Responsive rendering

## Deployment

This is a static React app intended for deployment on platforms like Render, Netlify, or Vercel. Build output goes to `build/` directory.
