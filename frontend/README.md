    # React + Vite

    This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

    Currently, two official plugins are available:

    - [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
    - [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

    ## React Compiler

    The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

    ## Expanding the ESLint configuration

    If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.


    ```
    frontend
    ├─ .agents
    ├─ eslint.config.js
    ├─ index.html
    ├─ package-lock.json
    ├─ package.json
    ├─ public
    │  ├─ about
    │  │  ├─ advisor.webp
    │  │  ├─ Managing Partners1.webp
    │  │  └─ Managing Partners_2.webp
    │  ├─ hero
    │  │  ├─ 1.webp
    │  │  ├─ 2.webp
    │  │  ├─ 3.jpg
    │  │  └─ 3.webp
    │  ├─ logo.svg
    │  └─ news
    │     ├─ air-ambulance.webp
    │     └─ bangkok-appointment.webp
    ├─ README.md
    ├─ src
    │  ├─ App.css
    │  ├─ App.jsx
    │  ├─ assets
    │  │  ├─ departments
    │  │  │  ├─ brain.svg
    │  │  │  ├─ chemotherapy.svg
    │  │  │  ├─ healthy.svg
    │  │  │  ├─ ivf.svg
    │  │  │  └─ urology.svg
    │  │  └─ doctors
    │  │     ├─ default-female.svg
    │  │     └─ default-male.svg
    │  ├─ components
    │  │  ├─ department
    │  │  │  ├─ DepartmentCard.jsx
    │  │  │  ├─ DepartmentHero.jsx
    │  │  │  ├─ DoctorCard.jsx
    │  │  │  └─ EmptyDepartment.jsx
    │  │  ├─ doctor
    │  │  │  ├─ AppointmentModal.jsx
    │  │  │  ├─ DoctorCard.jsx
    │  │  │  ├─ DoctorFilter.jsx
    │  │  │  ├─ DoctorProfileCard.jsx
    │  │  │  └─ DoctorSchedule.jsx
    │  │  ├─ Footer.jsx
    │  │  ├─ home
    │  │  │  ├─ About.jsx
    │  │  │  ├─ ContactCTA.jsx
    │  │  │  ├─ Departments.jsx
    │  │  │  └─ Hero.jsx
    │  │  ├─ Navbar.jsx
    │  │  └─ news
    │  │     ├─ FeaturedNews.jsx
    │  │     └─ NewsCard.jsx
    │  ├─ data
    │  │  ├─ aboutContent.js
    │  │  ├─ departments.js
    │  │  ├─ doctors.js
    │  │  └─ news.js
    │  ├─ index.css
    │  ├─ main.jsx
    │  └─ pages
    │     ├─ About.jsx
    │     ├─ Contact.jsx
    │     ├─ DepartmentDetails.jsx
    │     ├─ Departments.jsx
    │     ├─ DoctorProfile.jsx
    │     ├─ Doctors.jsx
    │     ├─ Home.jsx
    │     ├─ News.jsx
    │     └─ NewsDetails.jsx
    ├─ vercel.json
    └─ vite.config.js

    ```