// _mock
import _mock from 'src/_mock';
// components
import Iconify from 'src/components/iconify';
import { MegaMenuItemProps } from 'src/components/mega-menu';

// MOCK DATA
// ----------------------------------------------------------------------

const PRODUCTS = [...Array(10)].map((_, index) => ({
  name: _mock.name.firstName(index),
  image: _mock.image.product(index),
  path: '#',
}));

const TAGS = [
  { name: 'Paper Cup', path: '#' },
  { name: 'Lotion Pump', path: '#' },
  { name: 'Brush Cutter', path: '#' },
  { name: 'Display Rack', path: '#' },
  { name: 'Glass Bottle', path: '#' },
];

export const data: MegaMenuItemProps[] = [
  {
    path: '',
    title: 'Categories',
    icon: <Iconify icon="carbon:menu" sx={{ width: 1, height: 1 }} />,
    products: PRODUCTS,
    tags: TAGS,
    children: [
      {
        subheader: 'Other Machinery & Parts',
        items: [
          { title: 'Metallic Processing Machinery', path: '#' },
          { title: 'Machinery for Food, Beverage & Cereal', path: '#' },
          { title: 'Laser Equipment', path: '#' },
          { title: 'Mould', path: '#' },
     
        ],
      },
      {
        subheader: 'Plastic & Woodworking',
        items: [
          { title: 'Plastic Machinery', path: '#' },
          { title: 'Woodworking Machinery', path: '#' },

        ],
      },
      {
        subheader: 'Construction Machinery',
        items: [
          { title: 'Building Material Making Machinery', path: '#' },
          { title: 'Lifting Equipment', path: '#' },
      
        ],
      },
      {
        subheader: 'Agriculture Machinery',
        items: [
          { title: 'Agriculture Machinery', path: '#' },
          { title: 'Livestock MachineryFeed', path: '#' },
       
        ],
      },
      {
        subheader: 'Machine Tools',
        items: [
          { title: 'Lathe', path: '#' },
          { title: 'Grinding Machine ', path: '#' },
        ],
      },
    ],
  },
];
