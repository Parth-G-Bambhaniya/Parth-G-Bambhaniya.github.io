# Dr. Parthraj Bambhaniya - Personal Academic Portfolio

A modern, animated personal portfolio website built with React, Vite, and Tailwind CSS. This website showcases academic research, publications, experience, and achievements with smooth animations and dark/light theme support.

🌐 **Live Site**: [Here](https://parth-g-bambhaniya.github.io/)

---

## 📋 Table of Contents

- [How This Website Works](#how-this-website-works)
- [Website Features](#website-features)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [How to Update Content](#how-to-update-content)
- [Deployment to GitHub Pages](#deployment-to-github-pages)
- [Troubleshooting](#troubleshooting)

---

## 🔧 How This Website Works

This website is a **Single Page Application (SPA)** that runs entirely in the browser. Here's a simple breakdown:

1. **React**: A JavaScript library that creates the website's interactive components
2. **Vite**: A build tool that bundles all your code and makes it load fast
3. **Tailwind CSS**: A styling framework that makes the website look beautiful
4. **Framer Motion**: Adds smooth animations when you scroll or click
5. **GitHub Pages**: Free hosting service that displays your website on the internet

### How It's Hosted on GitHub

The website uses **GitHub Pages**, which is a free hosting service provided by GitHub:

1. Your code is stored in a GitHub repository
2. When you push updates, GitHub Actions (an automation tool) automatically builds your website
3. The built files are placed in a special `gh-pages` branch
4. GitHub serves these files as a live website at your custom URL

---

## ✨ Website Features

### 1. **Responsive Navigation**
   - Fixed header that becomes semi-transparent on scroll
   - Mobile-friendly hamburger menu
   - Smooth scrolling to different sections

### 2. **Dark/Light Theme Toggle**
   - Theme preference is saved in browser's local storage
   - Automatically applies user's last choice on revisit
   - Smooth transition between themes

### 3. **Animated Sections**
   - Scroll-triggered animations using Framer Motion
   - Elements fade in and slide up as you scroll down
   - Hover effects on cards and buttons

### 4. **Multi-Page Navigation** (Client-Side)
   - Main page with overview sections
   - Detailed pages for:
     - Full Experience & Education timeline
     - Complete Publications list
     - All Achievements
   - Page transitions with slide animations

### 5. **Content Sections**
   - **Hero**: Name, title, and social links
   - **About**: Brief biography
   - **Experience**: Academic and research positions
   - **Skills**: Programming, computational, and tools
   - **Publications**: Research papers with preview and full list
   - **Achievements**: Awards and recognitions
   - **Contact**: Email contact button

### 6. **External Icons**
   - Font Awesome for general icons
   - Academicons for academic profile links (ORCID, Google Scholar)

---

## 🛠️ Technology Stack

| Technology | Purpose | Why It's Used |
|------------|---------|---------------|
| **React** | UI Framework | Creates reusable components and manages the website's state |
| **Vite** | Build Tool | Faster than traditional tools, provides hot reload during development |
| **Tailwind CSS** | Styling | Utility-first CSS framework for rapid styling |
| **Framer Motion** | Animations | Smooth, performant animations and page transitions |
| **React Intersection Observer** | Scroll Detection | Triggers animations when elements come into view |
| **Lucide React** | Icons | Modern icon library |
| **ESLint** | Code Quality | Catches errors and enforces code style |

---

## 📁 Project Structure

```
Parth-G-Bambhaniya.github.io/
├── public/                    # Static files (served as-is)
├── src/
│   ├── assets/               # Images and media files
│   ├── App.jsx               # Main application component (ALL CONTENT HERE)
│   ├── App.css               # Component-specific styles
│   ├── main.jsx              # Application entry point
│   └── index.css             # Global styles & Tailwind imports
├── index.html                # HTML template
├── package.json              # Dependencies and scripts
├── vite.config.js            # Vite build configuration
├── tailwind.config.js        # Tailwind CSS configuration
├── postcss.config.js         # PostCSS configuration (for Tailwind)
├── eslint.config.js          # ESLint configuration
└── README.md                 # This file
```

---

## 🚀 Getting Started

### Prerequisites

You need **Node.js** installed on your computer. Node.js includes `npm` (Node Package Manager) which installs the website's dependencies.

**Download Node.js**: [https://nodejs.org/](https://nodejs.org/) (Choose the LTS version)

### Installation Steps

1. **Clone the repository** (download the code to your computer):
   ```bash
   git clone https://github.com/Meet-Vyas-Dev/Parth-G-Bambhaniya.github.io.git
   cd Parth-G-Bambhaniya.github.io
   ```

2. **Install dependencies** (download all required packages):
   ```bash
   npm install
   ```
   
   This reads `package.json` and installs all libraries listed under `dependencies` and `devDependencies`.

3. **Run the development server** (preview the website locally):
   ```bash
   npm run dev
   ```
   
   This starts a local server, usually at `http://localhost:5173`. Open this URL in your browser to see the website.

4. **Build for production** (when ready to deploy):
   ```bash
   npm run build
   ```
   
   This creates optimized files in a `dist` folder that are ready to be uploaded to GitHub Pages.

---

## 📝 How to Update Content

**ALL WEBSITE CONTENT** is stored in `src/App.jsx`. You don't need to know React to update content - just follow these guides:

### 1. Update Personal Information

**Location**: `src/App.jsx` - Lines 6-17 (the `personalInfo` object)

```javascript
const personalInfo = {
  name: "Dr. Parthraj Bambhaniya",           // Change name here
  title: "FAPESP Postdoctoral Fellow | Astrophysicist",  // Change title
  email: "parth.bambhaniya@usp.br",          // Change email
  location: "São Paulo, Brazil",              // Change location
  about: "Your new bio text here...",         // Change about section
  links: {
    googleScholar: "https://...",             // Update links
    orcid: "https://orcid.org/...",
    inspireHEP: "https://...",
    linkedIn: "https://linkedin.com/in/...",
  }
};
```

### 2. Update Experience/Education

**Location**: `src/App.jsx` - Lines 19-47 (the `experienceData` array)

Add a new position by copying this template:
```javascript
{
  duration: "2024-Present",                               // Time period
  role: "Your Job Title",                                 // Position name
  institution: "University Name, Country",                // Organization
  description: "Brief description of the role."           // What you did
}
```

**To add**: Insert a new object at the beginning of the array (after the opening `[`)
**To remove**: Delete the entire `{ }` block including the comma
**To modify**: Change the text within the quotes

### 3. Update Skills

**Location**: `src/App.jsx` - Lines 49-53 (the `skillsData` object)

```javascript
const skillsData = {
  programming: ["C/C++", "Python", "FORTRAN", "Mathematica"],           // Add/remove languages
  computational: ["Ray-tracing", "MHD Simulations", ...],                // Add/remove tools
  tools: ["LaTeX", "Linux", "Mac OS", "Windows", "MS Office"]            // Add/remove software
};
```

Each category is an array (list) of strings. Add or remove items separated by commas.

### 4. Update Publications

**Location**: `src/App.jsx` - Lines 55-68 (the `fullPublicationsList` array)

Add a new publication:
```javascript
{ 
  title: "Your Paper Title", 
  journal: "Journal Name, Volume, Year, Pages." 
}
```

**Important**: Publications are displayed in the order they appear. Newest should be at the top.

### 5. Update Achievements

**Location**: `src/App.jsx` - Lines 70-80 (the `achievementsData` array)

Add a new achievement:
```javascript
"Your achievement description here, Year."
```

Each achievement is a simple text string. Just add it to the array, separated by commas.

### 6. Update Profile Picture

**Option A - Use a placeholder:**
The current code uses: `https://placehold.co/400x400/e2e8f0/475569?text=PB`

**Option B - Use your own image:**

1. Add your image to `src/assets/` folder (e.g., `profile.jpg`)
2. Import it at the top of `App.jsx`:
   ```javascript
   import profileImage from './assets/profile.jpg'
   ```
3. Find the `<img>` tag (around line 233) and change:
   ```javascript
   <img src={profileImage} alt="Dr. Parthraj Bambhaniya" ... />
   ```

### 7. Update Website Title & Favicon

**Page Title**: Edit `index.html` (line 7):
```html
<title>Dr. Parthraj Bambhaniya - Astrophysicist</title>
```

**Favicon** (tab icon): Replace `/public/vite.svg` with your own icon file.

---

## 🌍 Deployment to GitHub Pages

### Initial Setup

1. **Ensure the repository is public** (required for free GitHub Pages)

2. **Update the `base` path in `vite.config.js`**:
   
   The current configuration is:
   ```javascript
   base: '/Parth-G-Bambhaniya.github.io/'
   ```
   
   - If your repository is named `yourusername.github.io`, change to: `base: '/'`
   - If your repository has a different name, use: `base: '/your-repo-name/'`

### Automatic Deployment (Recommended)

**Set up GitHub Actions for automatic deployment:**

1. Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          
      - name: Install dependencies
        run: npm install
        
      - name: Build
        run: npm run build
        
      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

2. Push this file to GitHub
3. Go to your repository → Settings → Pages
4. Under "Source", select "Deploy from a branch"
5. Select the `gh-pages` branch and `/root` folder
6. Click "Save"

**Now every time you push to the `main` branch, your website will automatically rebuild and deploy!**

### Manual Deployment

If you prefer to deploy manually:

1. **Install `gh-pages` package:**
   ```bash
   npm install --save-dev gh-pages
   ```

2. **Add deploy script to `package.json`:**
   ```json
   "scripts": {
     "deploy": "npm run build && gh-pages -d dist"
   }
   ```

3. **Deploy:**
   ```bash
   npm run deploy
   ```

---

## 🐛 Troubleshooting

### Website shows blank page after deployment

**Problem**: The `base` path in `vite.config.js` might be incorrect.

**Solution**: 
- For `username.github.io` repos: Set `base: '/'`
- For other repos: Set `base: '/repository-name/'`

### Changes not appearing after deployment

**Problem**: Browser cache or deployment delay.

**Solution**:
1. Clear browser cache (Ctrl+Shift+R or Cmd+Shift+R)
2. Wait 2-3 minutes for GitHub Pages to update
3. Check if build succeeded in GitHub Actions tab

### "Module not found" error

**Problem**: Dependencies not installed.

**Solution**:
```bash
npm install
```

### Icons not showing

**Problem**: Font Awesome or Academicons not loading.

**Solution**: Check your internet connection. The icons load from CDNs (external servers). The links are added dynamically in `App.jsx` around lines 422-434.

### Dark mode not working

**Problem**: Tailwind's dark mode not configured.

**Solution**: Verify `tailwind.config.js` has:
```javascript
darkMode: 'class',
```

### Animations not working

**Problem**: Framer Motion not installed.

**Solution**:
```bash
npm install framer-motion
```

---

## 📞 Need Help?

If you're stuck and not familiar with web development:

1. **Check Node.js is installed**: Run `node --version` in terminal
2. **Ensure dependencies are installed**: Run `npm install`
3. **Read error messages carefully**: They often tell you exactly what's wrong
4. **Check the browser console**: Press F12 in your browser to see errors

### Common Terminal Commands

| Command | What It Does |
|---------|--------------|
| `npm install` | Downloads all required packages |
| `npm run dev` | Starts development server (preview locally) |
| `npm run build` | Creates production-ready files |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Check code for errors |

---

## 📄 License

This is a personal portfolio website. Feel free to use the structure as a template for your own portfolio.

---

## 🙏 Credits

- Built with [React](https://react.dev/)
- Powered by [Vite](https://vitejs.dev/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Animated with [Framer Motion](https://www.framer.com/motion/)
- Icons from [Font Awesome](https://fontawesome.com/) and [Academicons](https://jpswalsh.github.io/academicons/)

---

**Last Updated**: November 2025
