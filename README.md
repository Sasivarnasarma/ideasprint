<div align="center">

# 🚀 ideasprint 2026 | Inspire Innovation

<a href="https://ideasprint.hackx.lk/">
  <img src="public/assets/ideasprint-2026-logo.webp" alt="ideasprint 2026 Logo" width="300" />
</a>

<br />

**The Intra-Departmental Ideathon organized by the Industrial Management Science Students' Association of the University of Kelaniya.**

Collaborate, explore real-world challenges, and develop innovative technology-driven solutions.

<br />

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![Threejs](https://img.shields.io/badge/threejs-black?style=for-the-badge&logo=three.js&logoColor=white)
![Framer](https://img.shields.io/badge/Framer-black?style=for-the-badge&logo=framer&logoColor=blue)
![Cloudflare](https://img.shields.io/badge/Cloudflare-F38020?style=for-the-badge&logo=Cloudflare&logoColor=white)

</div>

---

## 🌟 About The Project

`ideasprint 2026` marks the opening stage of **hackX 11.0**. The competition gives undergraduates of the Department of Industrial Management a platform to collaborate, explore real-world challenges, and develop innovative technology-driven solutions.

Through a structured journey of awareness programs and mentorship, participants develop entrepreneurial thinking, problem-solving abilities, and pitching skills.

This repository contains the premium, high-performance frontend landing page built for the event. It leverages cutting-edge web technologies, real-time 3D rendering, and hyper-fluid animations to deliver a cinematic user experience.

<br />

## ✨ Key Features

*   **Cinematic Intro**: A custom-built, immersive introduction sequence that sets the stage for innovation.
*   **Interactive Backgrounds**:
    *   **Dynamic DotGrid**: Responsive grid system with proximity-based shock, resistance, and return physics.
    *   **Liquid Gradients**: Smooth, animated background flows that evolve dynamically.
    *   **Particles**: High-performance fluid particle system integrated with user interactions.
*   **3D Visuals**:
    *   **Animated Statue**: A custom Three.js implementation of a floating 3D statue with custom-shaded ground mist.
    *   **Subtle Glassmorphism**: Premium deep-space frosted glass UI elements.
*   **Dynamic Event Timeline**: An interactive timeline tracking milestones from registration to the grand finale.
*   **Phase Engine**: Configurable event phases (Registration, Mentorship, Submissions) controlled centrally in `eventDates.js` to automatically toggle CTA buttons across the app.
*   **Micro-animations**: Smooth layout transitions, reveal effects, and hover states powered by GSAP and Framer Motion.

<br />

## 🚀 Tech Stack

### Frameworks & Build Tools
*   **[React 19](https://react.dev/)**
*   **[Vite 8](https://vitejs.dev/)**

### 3D Rendering & Graphics
*   **[Three.js](https://threejs.org/)** (Core WebGL)
*   **[React Three Fiber](https://r3f.docs.pmnd.rs/)** (React renderer for ThreeJS)
*   **[OGL](https://github.com/oframe/ogl)** (Minimal WebGL library)

### Animations
*   **[GSAP 3](https://gsap.com/)** (GreenSock Animation Platform)
*   **[Motion](https://motion.dev/)** (Framer Motion)

### Tooling
*   **[pnpm](https://pnpm.io/)** (Fast, disk space efficient package manager)
*   **[ESLint](https://eslint.org/)** + **[Prettier](https://prettier.io/)** (Code quality and formatting)

<br />

## 🛠️ Getting Started

### Prerequisites

You need to have Node and `pnpm` installed on your machine.

*   [Node.js](https://nodejs.org/) (Latest LTS v20+ recommended)
*   [pnpm](https://pnpm.io/installation) (`npm install -g pnpm`)

### Installation & Initialization

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/sasivarnasarma/ideasprint.git
    cd ideasprint
    ```

2.  **Install dependencies:**
    ```bash
    pnpm install
    ```

3.  **Start the development server:**
    ```bash
    pnpm dev
    ```

You can now view the project locally at `http://localhost:5173/`.

<br />

## 💻 Available Scripts

In the project directory, you can run:

| Command | Description |
|---|---|
| `pnpm dev` | Starts the Vite development server with hot-module replacement |
| `pnpm build` | Compiles and optimizes the project for production deployment |
| `pnpm preview` | Locally previews the optimized production build |
| `pnpm lint` | Runs ESLint to identify code quality and style issues |
| `pnpm lint-fix` | Runs ESLint and automatically suppresses/fixes resolvable issues |
| `pnpm format` | Runs Prettier to forcefully format all code |

<br />

## 📂 Project Structure

```text
ideasprint/
├── public/                 # Static graphical assets (images, fonts, favicons)
├── src/                    # Source code
│   ├── assets/             # Internal project assets optimized by Vite
│   ├── components/         # Modular React components (Hero, StatueCanvas, etc.)
│   ├── constants/          # Environment/Data constants (eventDates, phase configs)
│   ├── styles/             # Modular CSS methodology and global tokens
│   ├── App.jsx             # Main container and routing equivalent
│   └── main.jsx            # React root and strict mode wrapper
├── .github/workflows/      # CI/CD pipelines (Cloudflare Deployments)
├── eslint.config.js        # Project linting rules
├── index.html              # HTML entrypoint
└── vite.config.js          # Vite build and chunk configurations
```

<br />

## 🤝 Main Contributors

*   [**Sasivarnasarma**](https://github.com/sasivarnasarma/)
*   [**Habikugasarma**](https://github.com/SarmaHK/)
*   [**Tharindu**](https://github.com/jtharindudhanushka)

<br />

## 📜 License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.
