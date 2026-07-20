<div align="center">

![Header](https://capsule-render.vercel.app/api?type=waving&color=0:ff003c,100:00e5ff&height=220&section=header&text=YAMAN%20REDTEAM&fontSize=60&fontColor=ffffff&fontAlignY=38&desc=Offensive%20Security%20%7C%20Red%20Team%20%7C%20Ethical%20Hacker&descAlignY=58&animation=fadeIn)

<img src="public/images/hacker-cutout-hd.png" width="260" alt="Yaman RedTeam" />

### <img src="https://readme-typing-svg.demolab.com?font=JetBrains+Mono&size=22&duration=2500&pause=800&color=FF003C&center=true&vCenter=true&width=600&lines=Web+Pentester+%7C+Bug+Hunter;Red+Team+Enthusiast;AI-Powered+Offensive+Security;Cybersecurity+Content+Creator" alt="Typing SVG" />

[![Portfolio](https://img.shields.io/badge/🌐_Portfolio-Live_Site-ff003c?style=for-the-badge&labelColor=0a0a0a)](https://github.com/Yaman-RedTeam/Portfolio)
[![YouTube](https://img.shields.io/badge/YouTube-Yaman_RedTeam-FF0000?style=for-the-badge&logo=youtube&logoColor=white&labelColor=0a0a0a)](https://youtube.com/@yamanredteam)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-yaman--redteam-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white&labelColor=0a0a0a)](https://www.linkedin.com/in/yaman-redteam/)
[![Instagram](https://img.shields.io/badge/Instagram-yaman.redteam-E4405F?style=for-the-badge&logo=instagram&logoColor=white&labelColor=0a0a0a)](https://www.instagram.com/yaman.redteam)
[![TryHackMe](https://img.shields.io/badge/TryHackMe-YamanRedTeam-212C42?style=for-the-badge&logo=tryhackme&logoColor=white&labelColor=0a0a0a)](https://tryhackme.com/p/YamanRedTeam)

![Repo size](https://img.shields.io/github/repo-size/Yaman-RedTeam/Portfolio?style=flat-square&color=00e5ff&labelColor=0a0a0a)
![Last commit](https://img.shields.io/github/last-commit/Yaman-RedTeam/Portfolio?style=flat-square&color=ff003c&labelColor=0a0a0a)
![Stars](https://img.shields.io/github/stars/Yaman-RedTeam/Portfolio?style=flat-square&color=ffd700&labelColor=0a0a0a)
![Made with Next.js](https://img.shields.io/badge/Made%20with-Next.js-black?style=flat-square&logo=next.js&labelColor=0a0a0a)

</div>

---

## 📡 About

A cyberpunk-themed personal portfolio for **Yaman** — an offensive security specialist, red team enthusiast, and cybersecurity content creator. Built as a fully interactive single-page site: 3D globe hero, live-fetched YouTube videos, animated skill bars, scrolling certificate walls, and a real-time "Cyber Command Center" dashboard.

> I specialize in **AI-powered Offensive Security**, **Red Team Operations**, **Web & API Penetration Testing**, **Active Directory Security**, and **Enterprise Attack Simulation** — building AI-driven offensive workflows and performing realistic security assessments on modern enterprise environments.

---

## ✨ Features

| | |
|---|---|
| 🌍 **3D Interactive Hero** | WebGL particle globe + Earth render behind an animated hacker figure |
| 🛡️ **CyberWarFare Certificates** | Scrolling marquee of verified certifications with PDF viewers |
| 📜 **Other Certificates** | 15+ additional certs (Excel, MERN, Cloud, Bug Bounty, TryHackMe, and more) |
| 🧪 **Projects & Internships** | Real VAPT engagements, phishing simulations, and technical assessments — with GitHub repos and full reports |
| 🎥 **Live YouTube Feed** | Auto-fetches real videos straight from the channel (no API key) — Shorts and course content filtered out automatically |
| 🎙️ **Webinar Certificates** | Framed wall of speaking/attendance certificates |
| ⚔️ **Skills Arsenal** | Animated proficiency bars across pentesting tools & methodologies |
| 📈 **Career Timeline** | Vertical animated experience log |
| 🖥️ **Cyber Command Center** | Live clock, radar sweep, mock threat dashboard |
| 📬 **Contact Form** | Netlify Forms-powered, no backend required |

---

## 🧰 Tech Stack

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-12-black?style=for-the-badge&logo=framer&logoColor=blue)
![Three.js](https://img.shields.io/badge/Three.js-r185-black?style=for-the-badge&logo=three.js&logoColor=white)

</div>

- **[Next.js 16](https://nextjs.org/)** (App Router, Turbopack) — React framework
- **[React Three Fiber](https://docs.pmnd.rs/react-three-fiber)** + **Three.js** — the WebGL hero globe
- **[Framer Motion](https://www.framer.com/motion/)** — scroll-triggered animations throughout
- **[Tailwind CSS 4](https://tailwindcss.com/)** — utility-first styling, cyberpunk theme tokens
- **[Lucide](https://lucide.dev/) + [React Icons](https://react-icons.github.io/react-icons/)** — iconography (including official brand marks)
- **YouTube scraping (no API key)** — server-side fetch of the channel's real upload list

---

## 🚀 Getting Started

```bash
# clone the repo
git clone https://github.com/Yaman-RedTeam/Portfolio.git
cd Portfolio

# install dependencies
npm install

# run the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view it.

```bash
npm run build   # production build
npm run start   # serve the production build
npm run lint    # eslint
```

---

## 📁 Project Structure

```
├── src/
│   ├── app/                 # Next.js App Router entry, layout, global styles
│   ├── components/
│   │   ├── sections/        # Hero, About, Certifications, Skills, Projects, Videos, Experience, Contact...
│   │   ├── ui/               # Reusable pieces — Marquee, Modal, Counter, SocialIcon, VideoGallery...
│   │   └── layout/           # Navbar, Footer
│   └── lib/                  # YouTube channel scraper/fetcher
├── data/                     # Content as JSON — profile, skills, projects, certificates, socials...
└── public/                   # Images, certificate PDFs, resume, reports
```

Content (certifications, skills, projects, videos, timeline) is data-driven from the JSON files in `data/` — no hardcoded copy inside components.

---

## 📫 Connect

<div align="center">

[![YouTube](https://img.shields.io/badge/-YouTube-FF0000?style=flat-square&logo=youtube&logoColor=white)](https://youtube.com/@yamanredteam)
[![LinkedIn](https://img.shields.io/badge/-LinkedIn-0A66C2?style=flat-square&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/yaman-redteam/)
[![Instagram](https://img.shields.io/badge/-Instagram-E4405F?style=flat-square&logo=instagram&logoColor=white)](https://www.instagram.com/yaman.redteam)
[![GitHub](https://img.shields.io/badge/-GitHub-181717?style=flat-square&logo=github&logoColor=white)](https://github.com/Yaman-RedTeam)
[![TryHackMe](https://img.shields.io/badge/-TryHackMe-212C42?style=flat-square&logo=tryhackme&logoColor=white)](https://tryhackme.com/p/YamanRedTeam)

</div>

---

<div align="center">

![Footer](https://capsule-render.vercel.app/api?type=waving&color=0:00e5ff,100:ff003c&height=100&section=footer)

*Security isn't optional — it's the frontline of digital trust.*

</div>
