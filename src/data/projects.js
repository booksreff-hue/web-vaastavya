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
    description: `Designed by VAASTAVYA, with principal designers Ar. Nilay Parekh and Ar. Nidhi Parekh, JEWEL is a luxurious 4,200 sq. ft. residence at Marvel Zephyr, Kharadi, Pune, created for Mr. Vishal Shah and Mrs. Swetal Shah. The home reflects a perfect balance of sophistication, comfort and individuality, where every space has been thoughtfully crafted to suit the family's lifestyle.

Inspired by timeless elegance and contemporary luxury, the design focuses on clean lines, rich materials and refined detailing. Every room has its own identity while maintaining a seamless visual connection throughout the home. Carefully selected stones, veneers, lighting and furnishings come together to create interiors that feel warm, inviting and effortlessly elegant.

The living and dining spaces are designed to be both grand and welcoming, with spacious layouts, premium finishes and a subtle palette that highlights textures over excess. Custom furniture, statement lighting and handcrafted details add character without overwhelming the space.

Private areas are planned to offer comfort and tranquillity, combining functionality with understated luxury. Each bedroom reflects the personality of its occupants through carefully chosen colours, materials and bespoke furniture, while maintaining the home's cohesive design language.

The kitchen, lighting and interior detailing have been integrated with precision, ensuring that aesthetics and practicality go hand in hand. Every corner of the home has been designed to enhance everyday living while celebrating fine craftsmanship and attention to detail.

JEWEL is a reflection of VAASTAVYA's design philosophy of creating timeless homes that are elegant, functional and deeply personal. The project showcases the studio's ability to transform a residence into a space that feels luxurious, balanced and truly memorable.`,
    images: getProjectImages('jewel'),
    imageAlt: 'JEWEL residence — Kharadi, Pune',
  },
  {
    id: 2,
    title: 'KAVI',
    location: 'Pune, Maharashtra',
    year: '',
    description: `"KAVI" is a bungalow designed by Studio VAASTAVYA, Pune, where Architects Nilay and Nidhi Parekh transformed an ordinary structure into a luxurious home inspired by European, Mediterranean and Asian influences.

The existing house was completely redesigned while retaining only the structural framework. Slabs were extended, layouts were reworked and every space was planned around the client's lifestyle, budget and aspirations. The result is a home that blends timeless elegance with modern functionality.

The exterior features Greco Roman architecture with arched windows, marble cladding, fluted columns and landscaped surroundings. A graceful trellis creates a seamless transition from outdoors to indoors.

The entrance lobby makes a striking first impression with blue doors, patterned flooring, fluted walls and a grand dome with a chandelier. The living room continues the classic European theme through tall windows, layered drapes, subtle blue accents and a faux fireplace that adds warmth and character. Split level planning connects the living and dining areas while maintaining openness.

The dining room combines luxury with contemporary styling through a custom onyx dining table, floral stone feature wall and carefully selected artwork and décor.

Each bedroom has its own unique personality. The guest room uses warm wood, soft whites and rounded furniture for a calm, welcoming feel. The younger son's room embraces bold black and gold tones with Roman inspired interiors and playful design elements. The elder son's room follows a minimal rustic theme inspired by the ocean, featuring curved furniture and soft textures. The master bedroom reflects the charm of the French countryside with elegant gold detailing, mother of pearl finishes and classic wallpaper.

The basement houses a fully equipped home theatre with plush seating and a pantry, while the family room celebrates Indian craftsmanship through Rajasthani inspired details. The terrace gazebo offers a bright, modern retreat with Mediterranean influences.

KAVI is a perfect example of thoughtful planning, refined material selection and seamless blending of multiple design styles, creating a home that is both luxurious and deeply personal.`,
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
