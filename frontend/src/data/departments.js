import brain from "../assets/departments/brain.svg";
import chemotherapy from "../assets/departments/chemotherapy.svg";
import healthy from "../assets/departments/healthy.svg";
import urology from "../assets/departments/urology.svg";
import ivf from "../assets/departments/ivf.svg";

export const departments = [
  {
    id: 1,
    slug: "brain-neurology",
    title: "Brain & Neurology",
    icon: brain,
    description: "Neurology and brain disorder treatment.",
    doctorCount: 2,
    banner: "/departments/brain-banner.webp",
  },

  {
    id: 2,
    slug: "heart-treatment",
    title: "Heart Treatment",
    icon: healthy,
    banner: "/departments/heart-banner.webp",

    shortDescription:
      "Advanced cardiology and cardiac surgery services.",

    content: `
    Heart Treatment focuses on diagnosis,
    prevention and treatment of heart diseases.
    Our specialists provide modern cardiac care
    using advanced medical technology.
    `,

    services: [
      "Cardiology Consultation",
      "Angiography",
      "Angioplasty",
      "Cardiac Surgery",
      "Heart Checkup"
    ]
  },

  {
    id: 3,
    slug: "cancer-treatment",
    title: "Cancer Treatment",
    icon: chemotherapy,
    description: "Advanced cancer care and diagnosis.",
    doctorCount: 1,
    banner: "/departments/cancer-banner.webp",
  },

  {
    id: 4,
    slug: "kidney-treatment",
    title: "Kidney Treatment",
    icon: urology,
    description: "Kidney and urology specialist care.",
    doctorCount: 0,
    banner: "/departments/kidney-banner.webp",
  },

  {
    id: 5,
    slug: "ivf-treatment",
    title: "IVF Treatment",
    icon: ivf,
    description: "Fertility and IVF solutions.",
    doctorCount: 0,
    banner: "/departments/ivf-banner.webp",
  },
];