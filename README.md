# IdeaSprint 2026 | Inspire Innovation

![IdeaSprint 2026](public/assets/statue.png)

IdeaSprint 2026 is a premium, high-performance landing page built for the ultimate innovation challenge. It features cutting-edge web technologies to deliver a cinematic and interactive user experience.

## ✨ Key Features

- **Cinematic Intro**: A custom-built, immersive introduction sequence that sets the stage for innovation.
- **Interactive Backgrounds**:
  - **Dynamic DotGrid**: Responsive grid system with proximity-based shock, resistance, and return physics.
  - **Liquid Gradients**: Smooth, animated background flows that evolve over time.
  - **Particles**: High-performance particle system integrated with site physics.
- **3D Visuals**:
  - **Animated Statue**: A custom Three.js implementation of a floating Poseidon statue with custom-shaded bottom mist.
  - **Glassmorphism**: Premium frosted-glass UI elements throughout the site.
- **Magic Bento System**: Highly interactive bento-grid components with tilt, magnetism, and global spotlight following.
- **Micro-animations**: Smooth transitions and effects powered by GSAP and Framer Motion.

## 🚀 Tech Stack

- **Framework**: [React 19](https://react.dev/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **3D / Graphics**:
  - [Three.js](https://threejs.org/)
  - [React Three Fiber](https://github.com/pmndrs/react-three-fiber)
  - [OGL](https://github.com/oframe/ogl)
- **Animations**:
  - [GSAP](https://greensock.com/gsap/)
  - [Motion (Framer Motion)](https://motion.dev/)
- **Styling**: Vanilla CSS (Custom tokens and modern layout techniques)
- **Package Manager**: [pnpm](https://pnpm.io/)

## 🛠️ Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (Latest LTS recommended)
- [pnpm](https://pnpm.io/installation)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/sasivarnasarma/ideasprint.git
   cd ideasprint
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Start the development server:
   ```bash
   pnpm dev
   ```

### Scripts

- `pnpm dev`: Starts the Vite development server.
- `pnpm build`: Builds the project for production.
- `pnpm preview`: Locally previews the production build.

## 📂 Project Structure

```text
├── public/          # Static assets (images, 3D models)
├── src/
│   ├── assets/      # Project-specific assets
│   ├── components/  # React components (Hero, StatueCanvas, etc.)
│   ├── styles/      # Centralized CSS styles
│   ├── App.jsx      # Main application entry
│   └── main.jsx     # Vite entry point
└── index.html       # HTML mount point
```

## 🤝 Contributing

This project is part of a private innovation sprint. For major changes, please open an issue first to discuss what you would like to change.

