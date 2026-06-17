## Plan: Founder Bio Page — David Gambill

Create a dedicated `/founder` route showcasing David Gambill's professional background, with his headshot from the uploaded AdvisorBio.

### 1. Asset
- Upload the headshot from `AdvisorBio.docx` to Lovable Assets (CDN) → `src/assets/david-gambill.jpg.asset.json`.

### 2. New page: `src/pages/Founder.tsx`
Sections, styled with existing aviation design tokens (navy/gold) and shadcn components:
- **Hero**: Headshot (rounded, framed), name, title ("Founder & CEO, GnG Design LLC"), location (West Chester, PA), short tagline, contact links (email, LinkedIn), "Back to Home" / "Get in Touch" buttons.
- **About / Bio**: Two-paragraph narrative from AdvisorBio (30+ yrs aerospace, startups advised, GnG Design role, patents, Philadelphia-based).
- **Professional Summary**: From resume (senior aerospace exec, rotorcraft/eVTOL/fixed-wing, PDR/CDR leadership, certification frameworks).
- **Core Competencies**: Grid of badges/cards — Vehicle Integration, MBSE, Certification (FAA Part 23/25/27/29, ASTM F3264), Digital Thread (NX, CATIA, Teamcenter, 3DEXPERIENCE), Propulsion (Electric/Hybrid), Team Leadership, Agile Programs, AI Integration.
- **Experience Timeline**: Vertical timeline cards for each role — GnG Design (2014–Present), EOS Aircraft, Doroni Aerospace, XTI Aircraft, AgustaWestland, Boeing — with dates, location, and key accomplishments from the resume.
- **Education & Patents**: B.S. Aerospace (UT Arlington), MBA Tech Management (Phoenix), U.S. Patent 12,312,080 B1 (Wing Fences for VTOL), U.S. Patent App 2024/0217653 A1 (Lift Plus Cruise Quadcopter Control).
- **CTA**: Link back to contact section on home page.

### 3. Routing & navigation
- Register `/founder` route in `src/App.tsx` above the catch-all.
- Add a "Founder" link to `Header.tsx` desktop nav and mobile menu (uses `react-router-dom` `Link` since cross-page).

### 4. SEO
- Set `<title>` "David Gambill — Founder | GnG Design Consultants" (<60 chars), meta description (<160 chars), canonical, single H1 with his name, alt text on headshot, semantic sections.

### Technical notes
- No backend changes. Pure frontend page using existing shadcn `Card`, `Button`, `Badge`, and lucide icons (Mail, Linkedin, MapPin, Award, GraduationCap, Briefcase).
- Style strictly via design tokens already in `index.css` / `tailwind.config.ts` (aviation-navy, gold, etc.) — no hardcoded colors.
- Headshot served from CDN via `.asset.json` import.
