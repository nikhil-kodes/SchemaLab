# 🧬 SchemaLab — Design Your Database Visually

[![Website](https://img.shields.io/badge/Website-schemalab.nikhilsingh.co.in-blue?style=for-the-badge&logo=vercel)](https://schemalab.nikhilsingh.co.in)
[![Tech Stack](https://img.shields.io/badge/Stack-Next.js%20%7C%20Supabase%20%7C%20XYFlow-000000?style=for-the-badge)](https://nextjs.org)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

**SchemaLab** is a powerful, minimalist, and visual database schema designer. Stop writing repetitive boilerplate code and start designing your database on an infinite canvas. Export clean, production-ready code in seconds.

![SchemaLab Hero Placeholder](/public/og-image.png)

---

## ✨ Features

- 🎨 **Visual Drag-and-Drop Canvas**: Design your database structure with intuitive nodes and connectors.
- ⚡ **Instant Code Generation**: Generate SQL, PostgreSQL, Prisma, Drizzle, and Mongoose schemas in real-time.
- 👥 **Real-time Collaboration**: Share projects with your team and design together with live cursor tracking.
- 🌓 **Aesthetic Dark/Light Mode**: A premium, minimalist interface designed for focus and clarity.
- 📑 **Project Management**: Save, organize, and revisit your database designs anytime.
- 📱 **Fully Responsive**: Design on your desktop, review on your phone.

---

## 🚀 Quick Start

### Prerequisites

- Node.js (v18+)
- pnpm (`npm install -g pnpm`)

### Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/nikhil-kodes/SchemaLab.git
   cd schemalab
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Configure Environment Variables**
   Create a `.env` file in the root directory and add your Supabase credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
   ```

4. **Run the development server**
   ```bash
   pnpm dev
   ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

---

## 📂 Project Structure

```text
schemalab/
├── app/                # Next.js App Router (Pages & API)
│   ├── auth/           # Login & Signup pages
│   ├── dashboard/      # User project dashboard
│   ├── editor/         # The core visual designer
│   └── globals.css     # Global styles & Grid system
├── components/         # Reusable UI components
│   ├── marketing/      # Homepage sections
│   ├── editor/         # Canvas & Node components
│   └── ui/             # Shadcn/ui primitives
├── hooks/              # Custom React hooks
├── lib/                # Utility functions (Supabase, Fetchers)
├── store/              # State management (Zustand & Zundo)
├── types/              # TypeScript interfaces
└── supabase/           # Database migrations & seeds
```

---

## 📸 Screenshots

<p align="center">
  <img src="/public/readme-mockup-1.png" width="45%" alt="Canvas View" />
  <img src="/public/readme-mockup-2.png" width="45%" alt="Code Generation" />
</p>

---

## 🤝 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

## 💖 Support

Built with ❤️ by [Nikhil Singh](https://github.com/nikhil-kodes). If you like the project, feel free to star the repo!

---
<p align="center">
  <a href="https://schemalab.nikhilsingh.co.in">
    <b>Website</b>
  </a> ·
  <a href="https://github.com/nikhil-kodes/SchemaLab/issues">
    <b>Report Bug</b>
  </a> ·
  <a href="https://github.com/nikhil-kodes/SchemaLab/issues">
    <b>Request Feature</b>
  </a>
</p>
