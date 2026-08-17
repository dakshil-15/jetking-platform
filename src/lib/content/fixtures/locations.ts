import type { Centre, City } from '../types';

/**
 * PLACEHOLDER CONTENT — the real centre list (100+ centres, 40+ city pages) arrives
 * via the Week-4 migration. Shape matches what the migration script will emit.
 */
export const cities: City[] = [
  {
    slug: 'mumbai',
    name: 'Mumbai',
    state: 'Maharashtra',
    intro:
      'Jetking centres across Mumbai offer cloud, cyber security and networking programmes with placement support into the city’s IT services and BFSI employers.',
    seo: {
      title: 'IT Courses in Mumbai — Cloud & Cyber Security | Jetking',
      description:
        'Jetking centres in Mumbai offering BCA, cyber security, cloud and networking courses with placement support. Find your nearest Mumbai centre.',
    },
    updatedAt: '2026-07-01',
  },
  {
    slug: 'pune',
    name: 'Pune',
    state: 'Maharashtra',
    intro:
      'Pune centres serve students and working professionals across the city’s technology corridor, with evening batches available for upskillers.',
    seo: {
      title: 'IT Courses in Pune — Cloud & Cyber Security | Jetking',
      description:
        'Jetking centres in Pune offering BCA, cyber security, cloud and DevOps courses. Weekend and evening batches for working professionals.',
    },
    updatedAt: '2026-07-01',
  },
  {
    slug: 'delhi',
    name: 'Delhi',
    state: 'Delhi',
    intro:
      'Jetking centres in Delhi run degree and diploma programmes with dedicated placement coordination for the NCR employer base.',
    seo: {
      title: 'IT Courses in Delhi — Cloud & Cyber Security | Jetking',
      description:
        'Jetking centres in Delhi offering BCA, cyber security and cloud computing courses with NCR placement support. Find your nearest Delhi centre.',
    },
    updatedAt: '2026-07-01',
  },
  {
    slug: 'bengaluru',
    name: 'Bengaluru',
    state: 'Karnataka',
    intro:
      'Bengaluru centres focus on cloud and DevOps tracks, reflecting local demand from product and services employers.',
    seo: {
      title: 'IT Courses in Bengaluru — Cloud & DevOps | Jetking',
      description:
        'Jetking centres in Bengaluru offering cloud, DevOps and cyber security programmes with placement support. Find your nearest Bengaluru centre.',
    },
    updatedAt: '2026-07-01',
  },
  {
    slug: 'hyderabad',
    name: 'Hyderabad',
    state: 'Telangana',
    intro:
      'Hyderabad centres offer the full Jetking programme range, including the BCA degree track and short upskilling certifications.',
    seo: {
      title: 'IT Courses in Hyderabad — Cloud & Cyber Security | Jetking',
      description:
        'Jetking centres in Hyderabad offering BCA, cyber security, cloud and networking courses with placement support.',
    },
    updatedAt: '2026-07-01',
  },
];

export const centres: Centre[] = [
  {
    slug: 'andheri',
    name: 'Jetking Andheri',
    citySlug: 'mumbai',
    addressLine: 'Placeholder address, Andheri West',
    locality: 'Andheri West',
    state: 'Maharashtra',
    pincode: '400058',
    coursesOffered: ['bca-cloud-cyber-security', 'cyber-security-specialist', 'network-infrastructure-engineer'],
    seo: {
      title: 'Jetking Andheri, Mumbai — IT Training Centre',
      description:
        'Jetking Andheri centre in Mumbai offering BCA, cyber security and networking courses. Address, courses offered and enquiry details.',
    },
    updatedAt: '2026-07-01',
  },
  {
    slug: 'thane',
    name: 'Jetking Thane',
    citySlug: 'mumbai',
    addressLine: 'Placeholder address, Thane West',
    locality: 'Thane West',
    state: 'Maharashtra',
    pincode: '400601',
    coursesOffered: ['bca-cloud-cyber-security', 'network-infrastructure-engineer', 'it-foundation-programme'],
    seo: {
      title: 'Jetking Thane, Mumbai — IT Training Centre',
      description:
        'Jetking Thane centre offering BCA, networking and IT foundation courses. Address, courses offered and enquiry details.',
    },
    updatedAt: '2026-07-01',
  },
  {
    slug: 'shivajinagar',
    name: 'Jetking Shivajinagar',
    citySlug: 'pune',
    addressLine: 'Placeholder address, Shivajinagar',
    locality: 'Shivajinagar',
    state: 'Maharashtra',
    pincode: '411005',
    coursesOffered: ['bca-cloud-cyber-security', 'cloud-devops-engineer', 'cyber-security-specialist'],
    seo: {
      title: 'Jetking Shivajinagar, Pune — IT Training Centre',
      description:
        'Jetking Shivajinagar centre in Pune offering BCA, cloud, DevOps and cyber security courses. Address and enquiry details.',
    },
    updatedAt: '2026-07-01',
  },
  {
    slug: 'hinjewadi',
    name: 'Jetking Hinjewadi',
    citySlug: 'pune',
    addressLine: 'Placeholder address, Hinjewadi Phase 1',
    locality: 'Hinjewadi',
    state: 'Maharashtra',
    pincode: '411057',
    coursesOffered: ['cloud-devops-engineer', 'ai-cloud-track', 'cyber-security-specialist'],
    seo: {
      title: 'Jetking Hinjewadi, Pune — IT Training Centre',
      description:
        'Jetking Hinjewadi centre in Pune offering cloud, DevOps and AI application courses with evening batches for professionals.',
    },
    updatedAt: '2026-07-01',
  },
  {
    slug: 'laxmi-nagar',
    name: 'Jetking Laxmi Nagar',
    citySlug: 'delhi',
    addressLine: 'Placeholder address, Laxmi Nagar',
    locality: 'Laxmi Nagar',
    state: 'Delhi',
    pincode: '110092',
    coursesOffered: ['bca-cloud-cyber-security', 'cyber-security-specialist', 'it-foundation-programme'],
    seo: {
      title: 'Jetking Laxmi Nagar, Delhi — IT Training Centre',
      description:
        'Jetking Laxmi Nagar centre in Delhi offering BCA, cyber security and IT foundation courses. Address and enquiry details.',
    },
    updatedAt: '2026-07-01',
  },
  {
    slug: 'koramangala',
    name: 'Jetking Koramangala',
    citySlug: 'bengaluru',
    addressLine: 'Placeholder address, Koramangala',
    locality: 'Koramangala',
    state: 'Karnataka',
    pincode: '560034',
    coursesOffered: ['cloud-devops-engineer', 'ai-cloud-track'],
    seo: {
      title: 'Jetking Koramangala, Bengaluru — IT Training Centre',
      description:
        'Jetking Koramangala centre in Bengaluru offering cloud, DevOps and applied AI courses for working professionals.',
    },
    updatedAt: '2026-07-01',
  },
  {
    slug: 'ameerpet',
    name: 'Jetking Ameerpet',
    citySlug: 'hyderabad',
    addressLine: 'Placeholder address, Ameerpet',
    locality: 'Ameerpet',
    state: 'Telangana',
    pincode: '500016',
    coursesOffered: ['bca-cloud-cyber-security', 'network-infrastructure-engineer', 'cloud-devops-engineer'],
    seo: {
      title: 'Jetking Ameerpet, Hyderabad — IT Training Centre',
      description:
        'Jetking Ameerpet centre in Hyderabad offering BCA, networking, cloud and DevOps courses. Address and enquiry details.',
    },
    updatedAt: '2026-07-01',
  },
];
