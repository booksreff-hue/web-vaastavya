const projectImgs = import.meta.glob('../assets/projects/**/*.jpg', { eager: true });

const getProjectImages = (slug) =>
  Object.keys(projectImgs)
    .filter((path) => path.toLowerCase().includes(`projects/${slug}/`))
    .sort()
    .map((path) => projectImgs[path].default)
    .slice(0, 9);

export const projects = [
  {
    id: 1,
    title: 'MARVEL',
    location: 'Pune, Maharashtra',
    year: '2024',
    description: '',
    images: getProjectImages('1. marvel'),
    imageAlt: 'MARVEL residence - Pune',
    chronology: [
      { phase: 'Concept', date: 'Q1 2023' },
      { phase: 'Design Development', date: 'Q2-Q3 2023' },
      { phase: 'Construction', date: 'Q4 2023 - Q2 2024' },
      { phase: 'Completion', date: 'Q3 2024' },
    ],
  },
  {
    id: 2,
    title: 'KAVI',
    location: 'Pune, Maharashtra',
    year: '2024',
    description: '',
    images: getProjectImages('2. kavi'),
    imageAlt: 'KAVI bungalow - Pune',
    chronology: [
      { phase: 'Concept', date: 'Q1 2023' },
      { phase: 'Design Development', date: 'Q2-Q3 2023' },
      { phase: 'Construction', date: 'Q4 2023 - Q1 2024' },
      { phase: 'Completion', date: 'Q2 2024' },
    ],
  },
  {
    id: 3,
    title: 'JEWEL',
    location: 'Kharadi, Pune',
    year: '2024',
    description: '',
    images: getProjectImages('3. jewel'),
    imageAlt: 'JEWEL residence - Kharadi, Pune',
    chronology: [
      { phase: 'Concept', date: 'Q3 2022' },
      { phase: 'Design Development', date: 'Q4 2022 - Q1 2023' },
      { phase: 'Construction', date: 'Q2-Q4 2023' },
      { phase: 'Completion', date: 'Q1 2024' },
    ],
  },
  {
    id: 4,
    title: 'AURUM',
    location: 'Pune, Maharashtra',
    year: '2024',
    description: '',
    images: getProjectImages('4. aurum'),
    imageAlt: 'AURUM residence - Pune',
    chronology: [
      { phase: 'Concept', date: 'Q2 2022' },
      { phase: 'Design Development', date: 'Q3-Q4 2022' },
      { phase: 'Construction', date: 'Q1-Q3 2023' },
      { phase: 'Completion', date: 'Q4 2023' },
    ],
  },
  {
    id: 5,
    title: 'AMAYA',
    location: 'Pune, Maharashtra',
    year: '2024',
    description: '',
    images: getProjectImages('5. amaya'),
    imageAlt: 'AMAYA residence - Pune',
    chronology: [
      { phase: 'Concept', date: 'Q1 2023' },
      { phase: 'Design Development', date: 'Q2-Q3 2023' },
      { phase: 'Construction', date: 'Q4 2023 - Q1 2024' },
      { phase: 'Completion', date: 'Q2 2024' },
    ],
  },
];
