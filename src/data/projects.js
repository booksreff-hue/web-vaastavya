const projectImgs = import.meta.glob('../assets/projects/**/*.jpg', { eager: true });

const getProjectImages = (slug) =>
  Object.keys(projectImgs)
    .filter((path) => path.toLowerCase().includes(`projects/${slug}/`))
    .sort()
    .map((path) => projectImgs[path].default);

export const projects = [
  {
    id: 1,
    title: 'JEWEL',
    location: 'Kharadi, Pune',
    year: '',
    description: '',
    images: getProjectImages('jewel'),
    imageAlt: 'JEWEL residence — Kharadi, Pune',
  },
  {
    id: 2,
    title: 'KAVI',
    location: 'Pune, Maharashtra',
    year: '',
    description: '',
    images: getProjectImages('kavi'),
    imageAlt: 'KAVI bungalow — Pune',
  },
  {
    id: 3,
    title: 'MARVEL',
    location: '',
    year: '',
    description: '',
    images: getProjectImages('marvel'),
    imageAlt: 'MARVEL',
  },
];
