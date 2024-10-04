import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export const MAX_FILES = 5
export const MAX_SIZE = 1000000
export const SERVER = 'http://localhost:3000/api/v1'

export const COUNTRIES = ['COLOMBIA', 'ECUADOR', 'ARGENTINA', 'EE:UU', 'CHINA']

export const CITIES = [
  'BOGOTÁ',
  'BARRANQUILLA',
  'TOKYO',
  'NEW YORK',
  'SAN DIENGO',
  'PARIS'
]

export const AVATARS = [
  {
    name: 'man_1',
    url: 'https://res.cloudinary.com/dryjzgfzn/image/upload/v1727649643/man_1_sbfgth.png'
  },
  {
    name: 'man_2',
    url: 'https://res.cloudinary.com/dryjzgfzn/image/upload/v1727649643/man_2_edvedb.png'
  },
  {
    name: 'man_3',
    url: 'https://res.cloudinary.com/dryjzgfzn/image/upload/v1727649643/man_3_by7oha.png'
  },
  {
    name: 'man_4',
    url: 'https://res.cloudinary.com/dryjzgfzn/image/upload/v1727649643/man_4_wrp91h.png'
  },

  {
    name: 'woman_1',
    url: 'https://res.cloudinary.com/dryjzgfzn/image/upload/v1727649643/woman_1_kzqcag.png'
  },

  {
    name: 'woman_2',
    url: 'https://res.cloudinary.com/dryjzgfzn/image/upload/v1727649644/woman_2_qyf5fq.png'
  },

  {
    name: 'woman_3',
    url: 'https://res.cloudinary.com/dryjzgfzn/image/upload/v1727649644/woman_3_ok4bet.png'
  },

  {
    name: 'woman_4',
    url: 'https://res.cloudinary.com/dryjzgfzn/image/upload/v1727649644/woman_4_ngyzik.png'
  },

  {
    name: 'default',
    url: 'https://res.cloudinary.com/dryjzgfzn/image/upload/v1727659027/default_uvyjje.webp'
  }
]
