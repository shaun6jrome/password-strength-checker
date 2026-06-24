# 🛡️ CyberShield — Password Strength Analyzer

A modern, cybersecurity-themed password strength analysis tool built with **React**, **Vite**, and **Tailwind CSS**. Evaluates passwords in real time with visual feedback, entropy estimation, crack time analysis, and actionable security recommendations.

> ⚡ All analysis is performed **entirely in the browser**. No data is ever transmitted to a server.

---

## ✨ Features

| Feature | Description |
|---|---|
| **Real-time Analysis** | Instant feedback as you type — no submit buttons needed |
| **Strength Meter** | Animated progress bar with 5 levels (Weak → Very Strong) and score out of 100 |
| **Entropy Calculation** | Shannon entropy formula: `Entropy = Length × log₂(Character Set Size)` |
| **Crack Time Estimation** | Brute-force time estimate assuming 10 billion guesses/second |
| **Security Checklist** | 7-item live validation checklist with real-time ✓/✗ status |
| **Password Statistics** | Character composition breakdown (length, uppercase, lowercase, numbers, symbols) |
| **Dynamic Recommendations** | Context-aware tips based on what's missing from your password |
| **Password Generator** | Cryptographically secure generator with configurable length and character types |
| **Breach Check Placeholder** | Ready for future HaveIBeenPwned API integration |
| **Dark Mode UI** | Cybersecurity-themed glassmorphism design with neon accents |

---

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/shaun6jrome/password-strength-checker.git
cd password-strength-checker

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open **http://localhost:5173** in your browser.

---

## 🏗️ Project Structure

```
src/
├── components/
│   ├── PasswordInput.jsx       # Input with show/hide, copy, clear
│   ├── StrengthMeter.jsx       # Animated progress bar + score/100
│   ├── SecurityChecklist.jsx   # 7-item live validation checklist
│   ├── PasswordStats.jsx       # Character composition grid
│   ├── Recommendations.jsx     # Dynamic tips + breach check placeholder
│   ├── EntropyCard.jsx         # Entropy calculation + resistance level
│   ├── PasswordGenerator.jsx   # Secure random password generator
│   └── CrackTimeCard.jsx       # Brute-force time estimation
├── utils/
│   ├── passwordAnalyzer.js     # Regex-based scoring engine (0–100)
│   ├── entropyCalculator.js    # Shannon entropy (L × log₂(N))
│   ├── crackTimeEstimator.js   # Time-to-crack based on entropy
│   └── passwordGenerator.js    # Crypto-secure password generation
├── App.jsx                     # Root component + responsive layout
├── main.jsx                    # Entry point
└── index.css                   # Tailwind + cyber-themed globals
```

---

## 📊 Scoring Logic

### Base Scoring (0–100 points)

| Criterion | Points |
|---|---|
| Length ≥ 8 chars | 15 |
| Length ≥ 12 chars | 20 |
| Length ≥ 16 chars | 25 |
| Has uppercase letters | 10–15 |
| Has lowercase letters | 10–15 |
| Has numbers | 10–15 |
| Has special characters | 15–20 |
| 4 character types used | +5 bonus |
| Length ≥ 14 chars | +5 bonus |

### Penalties

| Pattern | Penalty |
|---|---|
| Common password pattern detected | −25 |
| Excessive character repetition (3+) | −15 |
| Length < 8 characters | −10 |

### Strength Levels

| Score | Label |
|---|---|
| 0–29 | 🔴 Weak |
| 30–49 | 🟠 Fair |
| 50–69 | 🔵 Good |
| 70–89 | 🟢 Strong |
| 90–100 | 💎 Very Strong |

---

## 🔐 Entropy Formula

```
Entropy = Length × log₂(Character Set Size)
```

| Character Type | Pool Size |
|---|---|
| Lowercase (a–z) | 26 |
| Uppercase (A–Z) | 26 |
| Digits (0–9) | 10 |
| Symbols | 33 |

**Example:** A 12-character password using all types:  
`12 × log₂(95) ≈ 78.8 bits`

---

## 🛠️ Tech Stack

- **React 19** — Functional components with hooks
- **Vite** — Lightning-fast build tool
- **Tailwind CSS 3** — Utility-first styling
- **JavaScript (ES6+)** — No TypeScript, beginner-friendly
- **Web Crypto API** — Secure random password generation

---

## 📱 Responsive Design

Fully responsive layout optimized for:
- 🖥️ Desktop (1024px+)
- 📱 Tablet (768px–1023px)
- 📱 Mobile (< 768px)

---

## ♿ Accessibility

- Semantic HTML with proper heading hierarchy
- ARIA labels on all interactive elements
- Keyboard navigation support
- Focus-visible indicators
- Color contrast meeting WCAG standards
- Screen reader-friendly status updates

---

## 📜 License

MIT License — feel free to use, modify, and distribute.

---

Built with 🛡️ by [shaun6jrome](https://github.com/shaun6jrome)
