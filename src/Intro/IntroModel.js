import React from 'react';

import {
  IntroKesfet,
  IntroSiparis,
  IntroZaman,
  IntroHappy,
} from '../assets/icons';

import {SCREEN_WIDTH} from '../assets/constants';

const list = [
  {
    image: <IntroKesfet size={SCREEN_WIDTH - 100} />,
    title: 'Çevreni Keşfet',
    description:
      'Eve giderken, işe geçerken etrafındaki restoranları incele, en iyisini seç!',
  },
  {
    image: <IntroSiparis size={SCREEN_WIDTH - 100} />,
    title: 'Siparişini Oluştur',
    description:
      'Seçtiğin restorandan belirlediğin zaman için siparişini oluştur.',
  },
  {
    image: <IntroZaman size={SCREEN_WIDTH - 100} />,
    title: 'İstediğin Zaman Gel-Al',
    description:
      'Siparişin hazır ve seni bekliyor. Belirlediğin saatte Gel-Al.',
  },
  {
    image: <IntroHappy size={SCREEN_WIDTH - 100} />,
    title: 'Happy Hour',
    description: "Fırsatları kaçırma! Happy Hour'ları takip et!",
  },
];

export default list;
