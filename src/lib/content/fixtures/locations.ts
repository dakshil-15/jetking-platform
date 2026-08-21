import type { Centre, City } from '../types';

/**
 * Centre catalogue sourced from jetking.com (scraped 2026-08-06).
 * Slugs match live flat /centres/{slug} URLs. Detail fields (email, phone, intro,
 * SEO) come from individual centre pages; addresses cross-checked with the index.
 *
 * Regenerate: npm run scrape:centres && npm run enrich:centres && npm run apply:centres
 */

export const cities: City[] = [
  {
    "slug": "mumbai",
    "name": "Mumbai",
    "state": "Maharashtra",
    "intro": "Jetking centres across Mumbai and Navi Mumbai offer cloud, cyber security and networking programmes with placement support into the city’s IT services and BFSI employers.",
    "seo": {
      "title": "IT Courses in Mumbai — Cloud & Cyber Security | Jetking",
      "description": "Jetking centres in Mumbai offering BCA, cyber security, cloud and networking courses with placement support. Find your nearest Mumbai centre."
    },
    "updatedAt": "2026-08-06"
  },
  {
    "slug": "pune",
    "name": "Pune",
    "state": "Maharashtra",
    "intro": "Pune centres serve students and working professionals across the city’s technology corridor, with evening batches available for upskillers.",
    "seo": {
      "title": "IT Courses in Pune — Cloud & Cyber Security | Jetking",
      "description": "Jetking centres in Pune offering BCA, cyber security, cloud and networking courses with placement support. Find your nearest Pune centre."
    },
    "updatedAt": "2026-08-06"
  },
  {
    "slug": "delhi",
    "name": "Delhi",
    "state": "Delhi",
    "intro": "Jetking centres in Delhi run degree and diploma programmes with dedicated placement coordination for the NCR employer base.",
    "seo": {
      "title": "IT Courses in Delhi — Cloud & Cyber Security | Jetking",
      "description": "Jetking centres in Delhi offering BCA, cyber security, cloud and networking courses with placement support. Find your nearest Delhi centre."
    },
    "updatedAt": "2026-08-06"
  },
  {
    "slug": "bengaluru",
    "name": "Bengaluru",
    "state": "Karnataka",
    "intro": "Bengaluru centres focus on cloud and DevOps tracks, reflecting local demand from product and services employers.",
    "seo": {
      "title": "IT Courses in Bengaluru — Cloud & Cyber Security | Jetking",
      "description": "Jetking centres in Bengaluru offering BCA, cyber security, cloud and networking courses with placement support. Find your nearest Bengaluru centre."
    },
    "updatedAt": "2026-08-06"
  },
  {
    "slug": "hyderabad",
    "name": "Hyderabad",
    "state": "Telangana",
    "intro": "Hyderabad centres offer the full Jetking programme range, including the BCA degree track and short upskilling certifications.",
    "seo": {
      "title": "IT Courses in Hyderabad — Cloud & Cyber Security | Jetking",
      "description": "Jetking centres in Hyderabad offering BCA, cyber security, cloud and networking courses with placement support. Find your nearest Hyderabad centre."
    },
    "updatedAt": "2026-08-06"
  },
  {
    "slug": "kolkata",
    "name": "Kolkata",
    "state": "West Bengal",
    "intro": "Jetking centres in Kolkata offer cloud, cyber security and networking programmes with placement support across West Bengal.",
    "seo": {
      "title": "IT Courses in Kolkata — Cloud & Cyber Security | Jetking",
      "description": "Jetking centres in Kolkata offering BCA, cyber security, cloud and networking courses with placement support. Find your nearest Kolkata centre."
    },
    "updatedAt": "2026-08-06"
  },
  {
    "slug": "ahmedabad",
    "name": "Ahmedabad",
    "state": "Gujarat",
    "intro": "Jetking centres in Ahmedabad offer cloud, cyber security and networking programmes with placement support across Gujarat.",
    "seo": {
      "title": "IT Courses in Ahmedabad — Cloud & Cyber Security | Jetking",
      "description": "Jetking centres in Ahmedabad offering BCA, cyber security, cloud and networking courses with placement support. Find your nearest Ahmedabad centre."
    },
    "updatedAt": "2026-08-06"
  },
  {
    "slug": "chandigarh",
    "name": "Chandigarh",
    "state": "Punjab",
    "intro": "Jetking centres in Chandigarh offer cloud, cyber security and networking programmes with placement support across Punjab.",
    "seo": {
      "title": "IT Courses in Chandigarh — Cloud & Cyber Security | Jetking",
      "description": "Jetking centres in Chandigarh offering BCA, cyber security, cloud and networking courses with placement support. Find your nearest Chandigarh centre."
    },
    "updatedAt": "2026-08-06"
  },
  {
    "slug": "mohali",
    "name": "Mohali",
    "state": "Punjab",
    "intro": "Jetking centres in Mohali offer cloud, cyber security and networking programmes with placement support across Punjab.",
    "seo": {
      "title": "IT Courses in Mohali — Cloud & Cyber Security | Jetking",
      "description": "Jetking centres in Mohali offering BCA, cyber security, cloud and networking courses with placement support. Find your nearest Mohali centre."
    },
    "updatedAt": "2026-08-06"
  },
  {
    "slug": "nagpur",
    "name": "Nagpur",
    "state": "Maharashtra",
    "intro": "Jetking centres in Nagpur offer cloud, cyber security and networking programmes with placement support across Maharashtra.",
    "seo": {
      "title": "IT Courses in Nagpur — Cloud & Cyber Security | Jetking",
      "description": "Jetking centres in Nagpur offering BCA, cyber security, cloud and networking courses with placement support. Find your nearest Nagpur centre."
    },
    "updatedAt": "2026-08-06"
  },
  {
    "slug": "bhopal",
    "name": "Bhopal",
    "state": "Madhya Pradesh",
    "intro": "Jetking centres in Bhopal offer cloud, cyber security and networking programmes with placement support across Madhya Pradesh.",
    "seo": {
      "title": "IT Courses in Bhopal — Cloud & Cyber Security | Jetking",
      "description": "Jetking centres in Bhopal offering BCA, cyber security, cloud and networking courses with placement support. Find your nearest Bhopal centre."
    },
    "updatedAt": "2026-08-06"
  },
  {
    "slug": "indore",
    "name": "Indore",
    "state": "Madhya Pradesh",
    "intro": "Jetking centres in Indore offer cloud, cyber security and networking programmes with placement support across Madhya Pradesh.",
    "seo": {
      "title": "IT Courses in Indore — Cloud & Cyber Security | Jetking",
      "description": "Jetking centres in Indore offering BCA, cyber security, cloud and networking courses with placement support. Find your nearest Indore centre."
    },
    "updatedAt": "2026-08-06"
  },
  {
    "slug": "gwalior",
    "name": "Gwalior",
    "state": "Madhya Pradesh",
    "intro": "Jetking centres in Gwalior offer cloud, cyber security and networking programmes with placement support across Madhya Pradesh.",
    "seo": {
      "title": "IT Courses in Gwalior — Cloud & Cyber Security | Jetking",
      "description": "Jetking centres in Gwalior offering BCA, cyber security, cloud and networking courses with placement support. Find your nearest Gwalior centre."
    },
    "updatedAt": "2026-08-06"
  },
  {
    "slug": "durg",
    "name": "Durg",
    "state": "Chhattisgarh",
    "intro": "Jetking centres in Durg offer cloud, cyber security and networking programmes with placement support across Chhattisgarh.",
    "seo": {
      "title": "IT Courses in Durg — Cloud & Cyber Security | Jetking",
      "description": "Jetking centres in Durg offering BCA, cyber security, cloud and networking courses with placement support. Find your nearest Durg centre."
    },
    "updatedAt": "2026-08-06"
  },
  {
    "slug": "dhanbad",
    "name": "Dhanbad",
    "state": "Jharkhand",
    "intro": "Jetking centres in Dhanbad offer cloud, cyber security and networking programmes with placement support across Jharkhand.",
    "seo": {
      "title": "IT Courses in Dhanbad — Cloud & Cyber Security | Jetking",
      "description": "Jetking centres in Dhanbad offering BCA, cyber security, cloud and networking courses with placement support. Find your nearest Dhanbad centre."
    },
    "updatedAt": "2026-08-06"
  },
  {
    "slug": "balasore",
    "name": "Balasore",
    "state": "Odisha",
    "intro": "Jetking centres in Balasore offer cloud, cyber security and networking programmes with placement support across Odisha.",
    "seo": {
      "title": "IT Courses in Balasore — Cloud & Cyber Security | Jetking",
      "description": "Jetking centres in Balasore offering BCA, cyber security, cloud and networking courses with placement support. Find your nearest Balasore centre."
    },
    "updatedAt": "2026-08-06"
  },
  {
    "slug": "bhubaneswar",
    "name": "Bhubaneswar",
    "state": "Odisha",
    "intro": "Jetking centres in Bhubaneswar offer cloud, cyber security and networking programmes with placement support across Odisha.",
    "seo": {
      "title": "IT Courses in Bhubaneswar — Cloud & Cyber Security | Jetking",
      "description": "Jetking centres in Bhubaneswar offering BCA, cyber security, cloud and networking courses with placement support. Find your nearest Bhubaneswar centre."
    },
    "updatedAt": "2026-08-06"
  },
  {
    "slug": "kochi",
    "name": "Kochi",
    "state": "Kerala",
    "intro": "Jetking centres in Kochi offer cloud, cyber security and networking programmes with placement support across Kerala.",
    "seo": {
      "title": "IT Courses in Kochi — Cloud & Cyber Security | Jetking",
      "description": "Jetking centres in Kochi offering BCA, cyber security, cloud and networking courses with placement support. Find your nearest Kochi centre."
    },
    "updatedAt": "2026-08-06"
  },
  {
    "slug": "jammu",
    "name": "Jammu",
    "state": "Jammu and Kashmir",
    "intro": "Jetking centres in Jammu offer cloud, cyber security and networking programmes with placement support across Jammu and Kashmir.",
    "seo": {
      "title": "IT Courses in Jammu — Cloud & Cyber Security | Jetking",
      "description": "Jetking centres in Jammu offering BCA, cyber security, cloud and networking courses with placement support. Find your nearest Jammu centre."
    },
    "updatedAt": "2026-08-06"
  },
  {
    "slug": "gurgaon",
    "name": "Gurgaon",
    "state": "Haryana",
    "intro": "Jetking centres in Gurgaon offer cloud, cyber security and networking programmes with placement support across Haryana.",
    "seo": {
      "title": "IT Courses in Gurgaon — Cloud & Cyber Security | Jetking",
      "description": "Jetking centres in Gurgaon offering BCA, cyber security, cloud and networking courses with placement support. Find your nearest Gurgaon centre."
    },
    "updatedAt": "2026-08-06"
  },
  {
    "slug": "ghaziabad",
    "name": "Ghaziabad",
    "state": "Uttar Pradesh",
    "intro": "Jetking centres in Ghaziabad offer cloud, cyber security and networking programmes with placement support across Uttar Pradesh.",
    "seo": {
      "title": "IT Courses in Ghaziabad — Cloud & Cyber Security | Jetking",
      "description": "Jetking centres in Ghaziabad offering BCA, cyber security, cloud and networking courses with placement support. Find your nearest Ghaziabad centre."
    },
    "updatedAt": "2026-08-06"
  },
  {
    "slug": "noida",
    "name": "Noida",
    "state": "Uttar Pradesh",
    "intro": "Jetking centres in Noida offer cloud, cyber security and networking programmes with placement support across Uttar Pradesh.",
    "seo": {
      "title": "IT Courses in Noida — Cloud & Cyber Security | Jetking",
      "description": "Jetking centres in Noida offering BCA, cyber security, cloud and networking courses with placement support. Find your nearest Noida centre."
    },
    "updatedAt": "2026-08-06"
  },
  {
    "slug": "kanpur",
    "name": "Kanpur",
    "state": "Uttar Pradesh",
    "intro": "Jetking centres in Kanpur offer cloud, cyber security and networking programmes with placement support across Uttar Pradesh.",
    "seo": {
      "title": "IT Courses in Kanpur — Cloud & Cyber Security | Jetking",
      "description": "Jetking centres in Kanpur offering BCA, cyber security, cloud and networking courses with placement support. Find your nearest Kanpur centre."
    },
    "updatedAt": "2026-08-06"
  },
  {
    "slug": "lucknow",
    "name": "Lucknow",
    "state": "Uttar Pradesh",
    "intro": "Jetking centres in Lucknow offer cloud, cyber security and networking programmes with placement support across Uttar Pradesh.",
    "seo": {
      "title": "IT Courses in Lucknow — Cloud & Cyber Security | Jetking",
      "description": "Jetking centres in Lucknow offering BCA, cyber security, cloud and networking courses with placement support. Find your nearest Lucknow centre."
    },
    "updatedAt": "2026-08-06"
  },
  {
    "slug": "prayagraj",
    "name": "Prayagraj",
    "state": "Uttar Pradesh",
    "intro": "Jetking centres in Prayagraj offer cloud, cyber security and networking programmes with placement support across Uttar Pradesh.",
    "seo": {
      "title": "IT Courses in Prayagraj — Cloud & Cyber Security | Jetking",
      "description": "Jetking centres in Prayagraj offering BCA, cyber security, cloud and networking courses with placement support. Find your nearest Prayagraj centre."
    },
    "updatedAt": "2026-08-06"
  },
  {
    "slug": "gorakhpur",
    "name": "Gorakhpur",
    "state": "Uttar Pradesh",
    "intro": "Jetking centres in Gorakhpur offer cloud, cyber security and networking programmes with placement support across Uttar Pradesh.",
    "seo": {
      "title": "IT Courses in Gorakhpur — Cloud & Cyber Security | Jetking",
      "description": "Jetking centres in Gorakhpur offering BCA, cyber security, cloud and networking courses with placement support. Find your nearest Gorakhpur centre."
    },
    "updatedAt": "2026-08-06"
  },
  {
    "slug": "varanasi",
    "name": "Varanasi",
    "state": "Uttar Pradesh",
    "intro": "Jetking centres in Varanasi offer cloud, cyber security and networking programmes with placement support across Uttar Pradesh.",
    "seo": {
      "title": "IT Courses in Varanasi — Cloud & Cyber Security | Jetking",
      "description": "Jetking centres in Varanasi offering BCA, cyber security, cloud and networking courses with placement support. Find your nearest Varanasi centre."
    },
    "updatedAt": "2026-08-06"
  },
  {
    "slug": "orai",
    "name": "Orai",
    "state": "Uttar Pradesh",
    "intro": "Jetking centres in Orai offer cloud, cyber security and networking programmes with placement support across Uttar Pradesh.",
    "seo": {
      "title": "IT Courses in Orai — Cloud & Cyber Security | Jetking",
      "description": "Jetking centres in Orai offering BCA, cyber security, cloud and networking courses with placement support. Find your nearest Orai centre."
    },
    "updatedAt": "2026-08-06"
  },
  {
    "slug": "wardha",
    "name": "Wardha",
    "state": "Maharashtra",
    "intro": "Jetking centres in Wardha offer cloud, cyber security and networking programmes with placement support across Maharashtra.",
    "seo": {
      "title": "IT Courses in Wardha — Cloud & Cyber Security | Jetking",
      "description": "Jetking centres in Wardha offering BCA, cyber security, cloud and networking courses with placement support. Find your nearest Wardha centre."
    },
    "updatedAt": "2026-08-06"
  }
];

export const centres: Centre[] = [
  {
    "slug": "ameerpet",
    "name": "Jetking Ameerpet",
    "citySlug": "hyderabad",
    "addressLine": "1st Floor, Beside IDBI Bank, S.R. Nagar, Ameerpet, Hyderabad, Telangana.",
    "locality": "Ameerpet",
    "state": "Telangana",
    "pincode": "500038",
    "phone": "08008911700",
    "helpline": "07666830000",
    "email": "amp@jetking.com",
    "headline": "Best Cloud Computing Training Institute in Hyderabad",
    "intro": "Best Cloud Computing Training Institute in Hyderabad Enhance your expertise and solidify your career with our best Cloud Computing courses and Cyber Security courses in Hyderabad, Hyderabad. Pursue a 3 year BCA degree at Ameerpet Jetking Learning Center in Hyderabad, and secure a future in the IT & Tech Industry.",
    "body": "Join Jetking, India's Leading IT Training Institute Enroll in our best Cloud Computing courses in Hyderabad, Cyber Security courses and BCA Degree programs with flexible & easy EMIs. Gain hands-on experience on live projects and open doors to endless opportunities from Ameerpet, Jetking Hyderabad learning center!\n\nJoin India’s leading and most trusted digital skills institute, with over 79 years of legacy, offering industry-focused programs in Cloud Computing, Cybersecurity, and BCA Degrees, along with job assistance to launch your career.",
    "featuredProgrammes": [
      {
        "title": "Diploma In Cloud Computing with Artificial Intelligence",
        "subtitle": "Career programme",
        "duration": "12 Months",
        "mode": "Offline/Hybrid"
      },
      {
        "title": "Masters of Cloud Computing with Artificial Intelligence",
        "subtitle": "Career programme",
        "duration": "6 Months",
        "mode": "Offline/Hybrid"
      },
      {
        "title": "BCA In Cloud Computing & Cyber Security",
        "subtitle": "Degree programme",
        "duration": "36 Months",
        "mode": "Offline/Hybrid"
      }
    ],
    "faculty": [
      {
        "name": "Rajendar T",
        "title": "Senior Faculty",
        "bio": "A seasoned MCSA, CCNA & Cyber Security professional / Engineer with an impressive International track record of 14 years as a Senior Network Administrator / Operations Manager and 9 years as a dedicated Network Faculty. We are proud to have Rajendar T as our Senior Faculty at Jetking.",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/923890/file/75ff456f7972d3d946776cddb27a4d9e.png"
      },
      {
        "name": "MD. JAVED",
        "title": "Sr. Technical Faculty",
        "bio": "B Sc computer science graduate and Certified in CCNA with teaching experience in MCSE and hardware. Total teaching experience of more than 3 years. Capable of handling classes and doubt clearing and engaging students throughout his class.",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/923891/file/3e04859590885d4efb23cf60f24560fe.png"
      }
    ],
    "placements": [
      {
        "name": "Sanchit Dherange",
        "company": "Medline India",
        "package": "4.50 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/841724/file/c78b5481e1d7877d02c05371f1eaee80.png"
      },
      {
        "name": "Nayan Oval",
        "company": "Amazon",
        "package": "8.57 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/841722/file/9923b2b8af82b22d1c7ef1c2dc22ece1.png"
      },
      {
        "name": "Parag Petare",
        "company": "Wipro",
        "package": "3.50 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/841721/file/bc11463da155e63bbd7f5e9387103714.png"
      }
    ],
    "faqs": [
      {
        "question": "What is the Cost of Cloud computing courses?",
        "answer": "To find out the cost and duration of our cloud computing courses in Hyderabad, please visit our official website and submit an inquiry. Our team will provide you with detailed information on the course fees and other relevant details."
      },
      {
        "question": "Who is eligible for cyber security?",
        "answer": "To enroll in this course, students need to have completed their 10+2 education in any stream. This program equips students with the essential technical knowledge and skills to safeguard computer networks against malicious attacks."
      },
      {
        "question": "Can a non IT person do Cloud computing Course?",
        "answer": "If you're not well-versed in technology, cloud computing can seem overwhelming. To navigate this fast-evolving field successfully, it's wise to first develop a solid grasp of IT basics. Building a strong foundation in IT will make your journey into cloud computing much smoother and more manageable."
      },
      {
        "question": "Who is eligible for Cloud computing?",
        "answer": "Students 10+2 and Degrees in non-technical fields such as B. Com., B.A., or finance-related disciplines are also acceptable. Additionally, students who are in their final year of graduation are eligible for the course in hyderabad."
      },
      {
        "question": "What is the salary of Cloud Engineer in Ameerpet?",
        "answer": "The average salary for a Cloud Engineer in Ameerpet, Hyderabad typically falls between ₹3.5 Lakhs and ₹13.5 Lakhs per year, with the average annual pay being around ₹7.6 Lakhs."
      }
    ],
    "testimonials": [
      {
        "quote": "Before joining Jetking, I was not sure what to do with my career. But after completing the course, I got the right platform to start my career. It's been nearly 5 years and I have never looked back. I am very satisfied with my decision to join Jetking which has proved that there is no disadvantage of being a girl in technical domain.",
        "name": "Preeti Madan",
        "role": "Quatrro"
      },
      {
        "quote": "“Without Jetking, I don’t know where I would be. You made a major difference in my life. All those times that you have gone the extra mile for me, I really did notice. Your belief in me makes me believe in myself.”",
        "name": "Nikhil Pathare",
        "role": "Tata Consultancy Services"
      },
      {
        "quote": "I am very happy with Jetking for the placement assistance, even after my first job. I am grateful for all the guidance and technical knowledge provided. At Jetking we are not only trained in the technical domain as well as I have also improved my communication skills and confidence in appearing for interviews.",
        "name": "Abhishek",
        "role": "IBM-Collabera"
      }
    ],
    "coursesOffered": [
      "bca-cloud-cyber-security",
      "cloud-computing-engineer-ai",
      "cloud-computing-professional-ai",
      "cloud-cyber-security-engineer",
      "routing-switching-administrator",
      "pc-hardware-support"
    ],
    "seo": {
      "title": "Cloud Computing Courses & Training Institute in Hyderabad",
      "description": "Cloud Computing courses in Ameerpet, UG/Diploma in Cloud AI & Cybersecurity with strong placement support, Learn CCNA, AWS, Azure & more from Certified Professionals"
    },
    "updatedAt": "2026-08-06"
  },
  {
    "slug": "azadpur",
    "name": "Jetking Azadpur",
    "citySlug": "delhi",
    "addressLine": "F29 Gopal Nagar, Main road, Kewal park, opp. Ramlila ground, Azadpur Delhi 110033",
    "locality": "Azadpur",
    "state": "Delhi",
    "pincode": "110033",
    "phone": "09811305736",
    "helpline": "07666830000",
    "email": "azadpur@jetking.com",
    "intro": "Join the best computer course training institute in Delhi and secure your future with strong placement support on industry-leading IT programs. At Jetking Azadpur Learning Centre, we offer specialized courses in Cloud Computing, Cybersecurity, Gaming Design, Graphic Design, Animation, and a comprehensive 3-year BCA degree in Cloud Computing & Cyber Security. With our career-focused curriculum, hands-on training, and expert f",
    "body": "Boost your Skills and secure your future with Best Cloud Computing Course in Delhi and Cyber Security course, BCA 3-Year Degree program along with Ethical Hacking Course, CCNA Course, Python Course and many more offerings at Jetking Azadpur Learning Centre Delhi.\n\nJoin India’s leading and most trusted digital skills institute, with over 79 years of legacy, offering industry-focused programs in Cloud Computing, Cybersecurity, and BCA Degrees, along with job assistance to launch your career.",
    "featuredProgrammes": [
      {
        "title": "Diploma In Cloud Computing with Artificial Intelligence",
        "subtitle": "Career programme",
        "duration": "12 Months",
        "mode": "Offline/Hybrid"
      },
      {
        "title": "Masters of Cloud Computing with Artificial Intelligence",
        "subtitle": "Career programme",
        "duration": "6 Months",
        "mode": "Offline/Hybrid"
      },
      {
        "title": "BCA In Cloud Computing & Cyber Security",
        "subtitle": "Degree programme",
        "duration": "36 Months",
        "mode": "Offline/Hybrid"
      }
    ],
    "faculty": [
      {
        "name": "Manu T Moxhan",
        "title": "Technical Faculty",
        "bio": "B Tech graduate with Certification in Certified Ethical hacking - EC Council. Diploma in Cyber Security approved by NASSCOM with 3+ years experience in teaching Hardware and Networking and handling lab.",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/442174/file/cfd00515781c397758e3087e4e4f4f8f.png"
      },
      {
        "name": "Sajith C",
        "title": "Technical Faculty",
        "bio": "B Sc computer science graduate and Certified in CCNA with teaching experience in MCSE and hardware. Total teaching experience of more than 3 years. Capable of handling classes and doubt clearing and engaging students throughout his class.",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/442182/file/f78c2ff8d15f4f40d3f1ec995d1b27bf.png"
      }
    ],
    "placements": [
      {
        "name": "Manish Kumar",
        "company": "Royal Bank of Scotland",
        "package": "1.80 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1004135/file/dc9822b5a8a04a483fb4b5175931b519.png"
      },
      {
        "name": "Ravi Singh",
        "company": "Securelynkx Network",
        "package": "1.84 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1004133/file/b0d80e5d12485b3aaf9ac65cf8fa3cce.png"
      },
      {
        "name": "Sanjay Maithani",
        "company": "Hindustan Systems",
        "package": "2.13 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1004115/file/70838b6888ff90950a1a8bdac12302d0.png"
      },
      {
        "name": "Mayank Tyagi",
        "company": "Royal Bank of Scotland",
        "package": "1.8 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1004130/file/cb2c12fe364fa9ac106ed6e8bcfab2fc.png"
      },
      {
        "name": "Gaurav",
        "company": "AVS Infotech",
        "package": "2.04 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1004128/file/6da437b1e28fa549f46b1e8f9b6b16dd.png"
      },
      {
        "name": "Renu Sharma",
        "company": "Hindustan Systems Co.",
        "package": "1.80 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1004125/file/27ff7c7cbd113582c16e63d99ab5ccb7.png"
      },
      {
        "name": "Vivek Bharti",
        "company": "Lemon Tree Hotel",
        "package": "1.84 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1004123/file/a09b8999afa86c5314c69f93397e4e3d.png"
      },
      {
        "name": "Tarun Kumar",
        "company": "Brandshine Radiance",
        "package": "2.04 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1004120/file/61ec3f65e195b762dd4d98d1e4b9e4fa.png"
      },
      {
        "name": "Sumit Kahshyap",
        "company": "Tech Mahindra",
        "package": "2.40 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1004119/file/a0605c1a9727b6f5250641ee9b35bb6f.png"
      },
      {
        "name": "Rohit Jindal",
        "company": "D-vois Communication",
        "package": "1.80 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1004117/file/d5b2e4b9c12914ee56f4069a6780c81a.png"
      }
    ],
    "faqs": [
      {
        "question": "Why get Cloud computing training from Jetking Azadpur Institute?",
        "answer": "Here at Jetking Azadpur Institute, we provide the Best learning environment at affordable fees and training by Industry Experts. Jetking Institute is popular for its Cloud Computing Training in Delhi with updated, high-tech gadgets and lab facility with dedicated placement support."
      },
      {
        "question": "Who is eligible for Cloud computing with AI?",
        "answer": "Students 10+2 and Degrees in tech and non-technical fields or finance-related disciplines are also acceptable. Additionally, students who are in their final year of graduation are eligible for the course in Delhi."
      },
      {
        "question": "Why Choose Jetking Azadpur for Cloud Computing with AI?",
        "answer": "At Jetking Azadpur, we provide IT training with a focus on Cloud AI education. Our practical courses offer expertise in AI-driven cloud solutions, guided by experienced instructors. We also offer career-focused support with certifications and placement assistance. Join us to stay ahead in the tech industry."
      },
      {
        "question": "What is the annual average package of a Cloud computing professional?",
        "answer": "The average salary for a Cloud Computing Professional in India, typically falls between ₹3.0 Lakhs and ₹13.0 Lakhs per year."
      }
    ],
    "testimonials": [
      {
        "quote": "Before joining Jetking, I was not sure what to do with my career. But after completing the course, I got the right platform to start my career. It's been nearly 5 years and I have never looked back. I am very satisfied with my decision to join Jetking which has proved that there is no disadvantage of being a girl in technical domain.",
        "name": "Preeti Madan",
        "role": "Quatrro"
      },
      {
        "quote": "“Without Jetking, I don’t know where I would be. You made a major difference in my life. All those times that you have gone the extra mile for me, I really did notice. Your belief in me makes me believe in myself.”",
        "name": "Nikhil Pathare",
        "role": "Tata Consultancy Services"
      },
      {
        "quote": "I am very happy with Jetking for the placement assistance, even after my first job. I am grateful for all the guidance and technical knowledge provided. At Jetking we are not only trained in the technical domain as well as I have also improved my communication skills and confidence in appearing for interviews.",
        "name": "Abhishek",
        "role": "IBM-Collabera"
      }
    ],
    "coursesOffered": [
      "bca-cloud-cyber-security",
      "cloud-computing-engineer-ai",
      "cloud-computing-professional-ai",
      "cloud-cyber-security-engineer",
      "routing-switching-administrator",
      "pc-hardware-support"
    ],
    "seo": {
      "title": "Best Cloud Computing Course & Training Institute in Delhi",
      "description": "Jetking Best Institute for Cloud Computing Course in Delhi. Learn AWS, Azure, Linux, Networking, CCNA, Cyber Security Training core concepts and Latest trends."
    },
    "updatedAt": "2026-08-06"
  },
  {
    "slug": "balasore",
    "name": "Jetking Balasore",
    "citySlug": "balasore",
    "addressLine": "FM college road, Azimabad near Jagannath petrol pump, Balasore, Odisha.",
    "locality": "Balasore",
    "state": "Odisha",
    "pincode": "756001",
    "phone": "07735701702",
    "helpline": "07666830000",
    "email": "balasore@jetking.com",
    "intro": "Advance your Skills and Career with Best Computer IT Training Institute in Balasore, Odisha and secure your future with Jetking top Cloud Computing courses with AI, Cyber Security Courses and CCNA, Server and Ethical Hacking courses in Odisha, Balasore Jetking Learning Centre.",
    "body": "Advance your Skills and Career with Best Computer IT Training Institute in Balasore, Odisha and secure your future with Jetking top Cloud Computing courses with AI, Cyber Security Courses and CCNA, Server and Ethical Hacking courses in Odisha, Balasore Jetking Learning Centre.\n\nJoin India's No.1 digital skills institute with over 78 years of legacy in Cloud Computing, Cyber Security, Gaming & Graphic design and BCA Degree programs, offering dedicated placement support.",
    "featuredProgrammes": [
      {
        "title": "Diploma In Cloud Computing with Artificial Intelligence",
        "subtitle": "Career programme",
        "duration": "12 Months",
        "mode": "Offline/Hybrid"
      },
      {
        "title": "Masters of Cloud Computing with Artificial Intelligence",
        "subtitle": "Career programme",
        "duration": "6 Months",
        "mode": "Offline/Hybrid"
      },
      {
        "title": "BCA In Cloud Computing & Cyber Security",
        "subtitle": "Degree programme",
        "duration": "36 Months",
        "mode": "Offline/Hybrid"
      }
    ],
    "faculty": [
      {
        "name": "Shershendu Mukherjee",
        "title": "Technical Faculty",
        "bio": "Graduate in Physics. Over 14+ years experience in IT industry with Global CCNA certification and cyber security. More than 5 leding IT based organisation experience.",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1016400/file/af39241fa782ccedcc52f2edb4dde920.png"
      },
      {
        "name": "Bhagyashree Biswal",
        "title": "Technical Faculty",
        "bio": "Over 6 +years experience with Advance Network Architecture certification .Qualified in Bsc and Education. Core technicality in network design and maintenance.",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1016402/file/aee02512bfc75e4886a169a61cba823c.png"
      },
      {
        "name": "Bharadwaj Mohanty",
        "title": "Technical Faculty",
        "bio": "Bachelors in Commerce qualified with 3+ years of IT exposure.CCNA certified. Qualfied in interview preparations for leading companies like WIPRO,TCS and HDFC.",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1016401/file/ddb421ff11ced16413abfed13aeb2cc6.png"
      }
    ],
    "placements": [
      {
        "name": "Suman Jena",
        "company": "HDFC Bank",
        "package": "Best In Industry",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1016439/file/eec0e63758331fc2175c49d20545f684.png"
      },
      {
        "name": "Bhabesh Giri",
        "company": "Dalmia Bharat",
        "package": "Best In Industry",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1016438/file/2eadd72246aac04586beb6249642c0b8.png"
      },
      {
        "name": "Abhisheka Mohanty",
        "company": "Siemens",
        "package": "Best In Industry",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1016436/file/4c6a9879384bcbfc4f957f823ceb25e4.png"
      },
      {
        "name": "Kabita Khanda",
        "company": "Axis Bank",
        "package": "Best In Industry",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1016434/file/a3c0086b407a324d079d8011aad8d075.png"
      },
      {
        "name": "Shyamranjan Das",
        "company": "Luminous Technology",
        "package": "Best In Industry",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1016433/file/18de683cd0adf69363f12490fd2b417d.png"
      },
      {
        "name": "Debabrata Das",
        "company": "Tata Steel",
        "package": "Best In Industry",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1016431/file/2cbf3cafb24ece38313287e207517a47.png"
      },
      {
        "name": "Pinkilata Giri",
        "company": "Havells",
        "package": "Best In Industry",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1016430/file/7fc638978a9c281d0bcaf740e7a7c859.png"
      },
      {
        "name": "Chandan Kumar",
        "company": "Lenovo",
        "package": "Best In Industry",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1016429/file/deb51b68f975f80b46ca0d2cab81b739.png"
      },
      {
        "name": "Arup Prakash Das",
        "company": "IBM",
        "package": "Best In Industry",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1016428/file/5d18fc426e6e35a7f138008c49255c2d.png"
      },
      {
        "name": "Rajib Kumar Patra",
        "company": "Bajaj",
        "package": "Best In Industry",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1016427/file/37099e9bc22598c0a6b67da8bc28c84f.png"
      }
    ],
    "faqs": [
      {
        "question": "Can a non IT person do Cloud computing Course?",
        "answer": "If you're not well-versed in technology, cloud computing can seem overwhelming. To navigate this fast-evolving field successfully, it's wise to first develop a solid grasp of IT basics. Building a strong foundation in IT will make your journey into cloud computing much smoother and more manageable."
      },
      {
        "question": "Is Cloud computing a good career?",
        "answer": "Launching your career in cloud computing in 2024 opens up incredible opportunities for growth, professional development, and job stability. By acquiring the right skills and expertise, you can dive into a rewarding career path in a dynamic industry that's driving the future of technology and global business."
      },
      {
        "question": "Who can do Ethical Hacking Courses?",
        "answer": "To enroll in this course, students need to have completed their 10+2 education in any stream. This program equips students with the essential technical knowledge and skills to safeguard computer networks against malicious attacks."
      },
      {
        "question": "Is cyber security a good Career?",
        "answer": "Yes! Careers in computing and information technology, especially in cybersecurity, are not only among the highest-paying but also in high demand across the industry."
      },
      {
        "question": "What is the salary of Cloud computing Engineer?",
        "answer": "The average salary for a Cloud Engineer typically falls between ₹3.0 Lakhs and ₹13.0 Lakhs per year, with the average annual pay being around ₹7.3 Lakhs."
      }
    ],
    "testimonials": [
      {
        "quote": "I would extend my gratitude to Jetking Balasore team for getting me placed as System Administrator and paving a path to embark a new journet in IT although I a, from Commerce background.",
        "name": "Om Prakash Sharma",
        "role": "Fujitsu Solutions"
      },
      {
        "quote": "The journey from a small town to Delhi’s biggest IT company-the credit goes to Jetking Balasore.Their fast track course helped me to complete my course practically and now I am working as Assistant IT Manager.The team also helped to complete my global certification of CCNA post placement.",
        "name": "Sandip Rout",
        "role": "C I Infotech"
      },
      {
        "quote": "Being from a non tech background but with interest in IT,I decided to get enrolled at Jetking.I have completed my JK DNA course in 2021 and during lockdown I have received placment from Balasore centre.Currently work as Application and Software Support Engineer with TOI group in Bangalore.",
        "name": "Paresh Ranjan Rout",
        "role": "Times Of India Group"
      }
    ],
    "coursesOffered": [
      "bca-cloud-cyber-security",
      "cloud-computing-engineer-ai",
      "cloud-computing-professional-ai",
      "cloud-cyber-security-engineer",
      "routing-switching-administrator",
      "pc-hardware-support"
    ],
    "seo": {
      "title": "Best Cloud Computing Courses & Training Institute in Balasor",
      "description": "Cloud Computing courses in Odisha, UG/Diploma in Cloud AI & Cybersecurity with strong placement support, Learn CCNA, AWS, Azure & more from Certified Professionals"
    },
    "updatedAt": "2026-08-06"
  },
  {
    "slug": "bhopal",
    "name": "Jetking Bhopal",
    "citySlug": "bhopal",
    "addressLine": "3rd Floor 212, Hare Govind Complex, Ram Gopal Maheswari Marg, Near Hotel Nissarga, MP Nagar, Zone-1, Bhopal, Madhya Pradesh",
    "locality": "MP Nagar",
    "state": "Madhya Pradesh",
    "pincode": "462001",
    "phone": "08819961234",
    "helpline": "07666830000",
    "email": "bhopal@jetking.com",
    "intro": "Cloud Computing course in Madhya Pradesh - UG/Diploma programs in Cloud AI & Cybersecurity with job placement, Learn CCNA, AWS, Azure from Certified Experts",
    "body": "Join India’s leading and most trusted digital skills institute, with over 79 years of legacy, offering industry-focused programs in Cloud Computing, Cybersecurity, and BCA Degrees, along with job assistance to launch your career.\n\nI am very happy with Jetking for the placement assistance, even after my first job. I am grateful for all the guidance and technical knowledge provided. At Jetking we are not only trained in the technical domain as well as I have also improved my communication skills and confidence in appearing for interviews.",
    "featuredProgrammes": [
      {
        "title": "Diploma In Cloud Computing with Artificial Intelligence",
        "subtitle": "Career programme",
        "duration": "12 Months",
        "mode": "Offline/Hybrid"
      },
      {
        "title": "Masters of Cloud Computing with Artificial Intelligence",
        "subtitle": "Career programme",
        "duration": "6 Months",
        "mode": "Offline/Hybrid"
      },
      {
        "title": "BCA In Cloud Computing & Cyber Security",
        "subtitle": "Degree programme",
        "duration": "36 Months",
        "mode": "Offline/Hybrid"
      }
    ],
    "faculty": [
      {
        "name": "Manu T Moxhan",
        "title": "Technical Faculty",
        "bio": "B Tech graduate with Certification in Certified Ethical hacking - EC Council. Diploma in Cyber Security approved by NASSCOM with 3+ years experience in teaching Hardware and Networking and handling lab.",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/442174/file/cfd00515781c397758e3087e4e4f4f8f.png"
      },
      {
        "name": "Sajith C",
        "title": "Technical Faculty",
        "bio": "B Sc computer science graduate and Certified in CCNA with teaching experience in MCSE and hardware. Total teaching experience of more than 3 years. Capable of handling classes and doubt clearing and engaging students throughout his class.",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/442182/file/f78c2ff8d15f4f40d3f1ec995d1b27bf.png"
      }
    ],
    "placements": [
      {
        "name": "Sanchit Dherange",
        "company": "Medline India",
        "package": "4.50 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/841724/file/c78b5481e1d7877d02c05371f1eaee80.png"
      },
      {
        "name": "Nayan Oval",
        "company": "Amazon",
        "package": "8.57 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/841722/file/9923b2b8af82b22d1c7ef1c2dc22ece1.png"
      },
      {
        "name": "Parag Petare",
        "company": "Wipro",
        "package": "3.50 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/841721/file/bc11463da155e63bbd7f5e9387103714.png"
      }
    ],
    "faqs": [
      {
        "question": "Can a non IT person do Cloud computing Course?",
        "answer": "If you're not well-versed in technology, cloud computing can seem overwhelming. To navigate this fast-evolving field successfully, it's wise to first develop a solid grasp of IT basics. Building a strong foundation in IT will make your journey into cloud computing much smoother and more manageable."
      },
      {
        "question": "Is Cloud computing a good career?",
        "answer": "Launching your career in cloud computing in 2024 opens up incredible opportunities for growth, professional development, and job stability. By acquiring the right skills and expertise, you can dive into a rewarding career path in a dynamic industry that's driving the future of technology and global business."
      },
      {
        "question": "Is cyber security a good career for freshers?",
        "answer": "Careers in computing and information technology, especially in cybersecurity, are not only among the highest-paying but also in high demand across the industry."
      },
      {
        "question": "Who is eligible for Cloud Computing Ai course?",
        "answer": "To enroll in this course, students need to have completed their HSC, 10+2 education in any stream. This program equips students with the essential technical knowledge."
      },
      {
        "question": "What is the salary of Cloud computing Engineer?",
        "answer": "The average salary for a Cloud Engineer in India typically falls between ₹3.0 Lakhs and ₹13.0 Lakhs per year, with the average annual pay being around ₹7.3 Lakhs."
      }
    ],
    "testimonials": [
      {
        "quote": "Before joining Jetking, I was not sure what to do with my career. But after completing the course, I got the right platform to start my career. It's been nearly 5 years and I have never looked back. I am very satisfied with my decision to join Jetking which has proved that there is no disadvantage of being a girl in technical domain.",
        "name": "Preeti Madan",
        "role": "Quatrro"
      },
      {
        "quote": "“Without Jetking, I don’t know where I would be. You made a major difference in my life. All those times that you have gone the extra mile for me, I really did notice. Your belief in me makes me believe in myself.”",
        "name": "Nikhil Pathare",
        "role": "Tata Consultancy Services"
      },
      {
        "quote": "I am very happy with Jetking for the placement assistance, even after my first job. I am grateful for all the guidance and technical knowledge provided. At Jetking we are not only trained in the technical domain as well as I have also improved my communication skills and confidence in appearing for interviews.",
        "name": "Abhishek",
        "role": "IBM-Collabera"
      }
    ],
    "coursesOffered": [
      "bca-cloud-cyber-security",
      "cloud-computing-engineer-ai",
      "cloud-computing-professional-ai",
      "cloud-cyber-security-engineer",
      "routing-switching-administrator",
      "pc-hardware-support"
    ],
    "seo": {
      "title": "Best Cloud Computing Courses & Training Institute in Bhopal",
      "description": "Cloud Computing course in Madhya Pradesh - UG/Diploma programs in Cloud AI & Cybersecurity with job placement, Learn CCNA, AWS, Azure from Certified Experts"
    },
    "updatedAt": "2026-08-06"
  },
  {
    "slug": "bhubaneshwar",
    "name": "Jetking Bhubaneshwar",
    "citySlug": "bhubaneswar",
    "addressLine": "4th Floor, Plot No. -A/167, Saheed Nagar Road , 751007, Saheed Nagar.",
    "locality": "Saheed Nagar",
    "state": "Odisha",
    "pincode": "751007",
    "phone": "07077707770",
    "helpline": "07666830000",
    "email": "bbn@jetking.com",
    "intro": "Boost your Skills and Career with Best Computer IT Training Institute in Bhubaneshwar, Odisha and secure your future with Jetking best Cloud Computing courses with AI, Top Cyber Security Courses and Ethical Hacking courses in Odisha, Bhubaneshwar Jetking Learning Centre.",
    "body": "Boost your Skills and Career with Best Computer IT Training Institute in Bhubaneshwar, Odisha and secure your future with Jetking best Cloud Computing courses with AI, Top Cyber Security Courses and Ethical Hacking courses in Odisha, Bhubaneshwar Jetking Learning Centre.\n\nJoin India’s leading and most trusted digital skills institute, with over 79 years of legacy, offering industry-focused programs in Cloud Computing, Cybersecurity, and BCA Degrees, along with job assistance to launch your career.",
    "featuredProgrammes": [
      {
        "title": "Diploma In Cloud Computing with Artificial Intelligence",
        "subtitle": "Career programme",
        "duration": "12 Months",
        "mode": "Offline/Hybrid"
      },
      {
        "title": "Masters of Cloud Computing with Artificial Intelligence",
        "subtitle": "Career programme",
        "duration": "6 Months",
        "mode": "Offline/Hybrid"
      },
      {
        "title": "BCA In Cloud Computing & Cyber Security",
        "subtitle": "Degree programme",
        "duration": "36 Months",
        "mode": "Offline/Hybrid"
      }
    ],
    "faculty": [
      {
        "name": "Priyanath Chandra",
        "title": "Centre Manager",
        "bio": "Experience:- 15 Years+ Qualificstions:- B.Sc, MBA, MCSA, CCNA, RHEL Certified",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/workspace/vnBgwv/image/2445864/file/032832ff71f62090982adad5185b0947.png"
      },
      {
        "name": "Prakash Kumar Jena",
        "title": "Centre Supervisor",
        "bio": "Experience:- 5+ Years of industry experience. Qualifications:- B.Tech-CS, CEH, CCNA, AWS Certified",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1039047/file/7b6a95d478cfde7627547842fd142fab.png"
      },
      {
        "name": "Sanjukta Prasad",
        "title": "Placement Officer / PD Trainer",
        "bio": "MA in Economics with more than 3+ experience in placement and in english, communication and soft skill training.",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1039049/file/895d528e652c32b86c2b706ef8dbc39d.png"
      },
      {
        "name": "Sumit Sagar Sahu",
        "title": "Technical Faculty",
        "bio": "Professional Qualification: Jetking certified Hardware and networking professional (JCHNP+) , Microsoft certified professional (MCP), Cisco certified Network Associate (CCNA), N+, A+ 8+ years of Experience.",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1039048/file/5ff1f9bc69918f2d1261593f20a3553b.png"
      }
    ],
    "placements": [
      {
        "name": "Ranjan samal",
        "company": "D&H Secheron",
        "package": "4.80 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1019210/file/4b64593021d339f45e4877c76bb2bf8e.png"
      },
      {
        "name": "Ajit Khandual",
        "company": "TPM Guru Pvt Ltd",
        "package": "5.2 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1039015/file/a90eb9fde47a54492ecd12db26e1460a.png"
      },
      {
        "name": "Nilamadhav Nahak",
        "company": "Wipro",
        "package": "5.5 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1039014/file/d4cc05552230c92d393d49e7443d4fce.png"
      },
      {
        "name": "Gopal Krushna Sahoo",
        "company": "Hyscaler Pvt Ltd",
        "package": "7.9 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1039013/file/53734ac119b4db1d6feef84c08379575.png"
      },
      {
        "name": "Debasis Panda",
        "company": "Filpkart",
        "package": "2.7 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1039012/file/bec8fffb2a2ad296e3f36185a4b7d0fa.png"
      },
      {
        "name": "Pratyush Pritimay",
        "company": "C3i Hub",
        "package": "6 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1039010/file/1b4e3b34ae8d02bed03c51750156afa3.png"
      },
      {
        "name": "S K Salim",
        "company": "Microsense Network",
        "package": "4.50 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1019216/file/3f7910a80a7a0d9d58213f38a7e9f560.png"
      },
      {
        "name": "Mrutynjaya Rout",
        "company": "Indian Oil",
        "package": "3.60 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1019208/file/768c06ffd6c1311eca98931418e5e21f.png"
      },
      {
        "name": "Suresh Kr. Sahoo",
        "company": "Bharat Financial",
        "package": "3.20 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1019218/file/7a830976895161c86acbfff255345669.png"
      },
      {
        "name": "Sudhanshu Sekhar",
        "company": "TCS",
        "package": "2.76 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1019215/file/dabe48099057c798eb949fba2319fd87.png"
      },
      {
        "name": "Rahul Mukherjee",
        "company": "Savior STJ Electronics",
        "package": "2.64 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1019211/file/286579802b0a9df1454f07b6dc2b944d.png"
      },
      {
        "name": "Duryodhan Das",
        "company": "Cinepolis",
        "package": "2.60 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1019206/file/8065f5c779baefe7e1a4037d304f22ef.png"
      },
      {
        "name": "Amresh Samal",
        "company": "Cinepolis",
        "package": "2.60 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1019219/file/0a631fef339f19a4fbe22c96412bf817.png"
      },
      {
        "name": "Kamal Kanta Sahoo",
        "company": "Intec Infonet",
        "package": "2.52 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1019207/file/3f91a62c80df98108d8972a435e6bdf2.png"
      },
      {
        "name": "Tapan Kumar Nayak",
        "company": "Cinepolis",
        "package": "2.40 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1019212/file/42575c1e4dd85ec65208f3456ab0f577.png"
      },
      {
        "name": "Anand Pandav",
        "company": "Bharat Financial",
        "package": "2.20 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1019221/file/a1cde54c5194a3537ae727b6dd18a3cd.png"
      },
      {
        "name": "Pradyumna Kumar",
        "company": "Innovative Fiber Sol.",
        "package": "2.10 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1019205/file/c1fbc8771921e25d9ac6e91ea040ef04.png"
      },
      {
        "name": "Himanshu Kr Sahoo",
        "company": "Sysnet",
        "package": "2.04 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1019220/file/fe53a66c3f7bd2d5736b31cc96dbf794.png"
      },
      {
        "name": "Santosh Nayak",
        "company": "ThinkApps",
        "package": "1.99 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1019213/file/17ce7567e08e7d0907f472683e01fd50.png"
      },
      {
        "name": "Chinmaya Behera",
        "company": "Microsense Networks",
        "package": "1.95 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1019217/file/2f7825cf7089ade4f692cd39f44070f8.png"
      },
      {
        "name": "Amit Kumar Biswal",
        "company": "Sysnet Technology",
        "package": "1.80 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1019209/file/44cdaa149df15859511578bbbb9d2bdd.png"
      }
    ],
    "faqs": [
      {
        "question": "Is Cloud computing a good career?",
        "answer": "Launching your career in cloud computing in 2024 opens up incredible opportunities for growth, professional development, and job stability. By acquiring the right skills and expertise, you can dive into a rewarding career path in a dynamic industry that's driving the future of technology and global business."
      },
      {
        "question": "Can a non IT person do Cloud computing Course?",
        "answer": "If you're not well-versed in technology, cloud computing can seem overwhelming. To navigate this fast-evolving field successfully, it's wise to first develop a solid grasp of IT basics. Building a strong foundation in IT will make your journey into cloud computing much smoother and more manageable."
      },
      {
        "question": "Who is eligible for cyber security?",
        "answer": "To enroll in this course, students need to have completed their 10+2 education in any stream. This program equips students with the essential technical knowledge and skills to safeguard computer networks against malicious attacks."
      },
      {
        "question": "Is cyber security a good career?",
        "answer": "Yes! Careers in computing and information technology, especially in cybersecurity, are not only among the highest-paying but also in high demand across the industry."
      },
      {
        "question": "What is the salary of Cloud computing Engineer in Odisha?",
        "answer": "In Odisha the average salary for a Cloud Engineer typically falls between ₹3.0 Lakhs and ₹13.0 Lakhs per year, with the average annual pay being around ₹7.3 Lakhs."
      }
    ],
    "testimonials": [
      {
        "quote": "Before joining Jetking, I was not sure what to do with my career. But after completing the course, I got the right platform to start my career. It's been nearly 5 years and I have never looked back. I am very satisfied with my decision to join Jetking which has proved that there is no disadvantage of being a girl in technical domain.",
        "name": "Preeti Madan",
        "role": "Quatrro"
      },
      {
        "quote": "“Without Jetking, I don’t know where I would be. You made a major difference in my life. All those times that you have gone the extra mile for me, I really did notice. Your belief in me makes me believe in myself.”",
        "name": "Nikhil Pathare",
        "role": "Tata Consultancy Services"
      },
      {
        "quote": "I am very happy with Jetking for the placement assistance, even after my first job. I am grateful for all the guidance and technical knowledge provided. At Jetking we are not only trained in the technical domain as well as I have also improved my communication skills and confidence in appearing for interviews.",
        "name": "Abhishek",
        "role": "IBM-Collabera"
      }
    ],
    "coursesOffered": [
      "bca-cloud-cyber-security",
      "cloud-computing-engineer-ai",
      "cloud-computing-professional-ai",
      "cloud-cyber-security-engineer",
      "routing-switching-administrator",
      "pc-hardware-support"
    ],
    "seo": {
      "title": "Cloud Computing Courses & Training Institute in Bhubaneshwar",
      "description": "Cloud Computing courses in Odisha, UG/Diploma in Cloud AI & Cybersecurity with strong placement support, Learn all modules in CCNA, AWS, Azure, Linux from Experts"
    },
    "updatedAt": "2026-08-06"
  },
  {
    "slug": "borivali",
    "name": "Jetking Borivali",
    "citySlug": "mumbai",
    "addressLine": "202, Laxmi Palace, 2nd floor, Above SonyMony Electronics, Opp Raymond Showroom, S V Road, Borivali (W), Mumbai, Maharashtra.",
    "locality": "Borivali West",
    "state": "Maharashtra",
    "pincode": "400092",
    "phone": "07021584939",
    "helpline": "07666830000",
    "email": "bor@jetking.com",
    "intro": "Cloud Computing courses in Mumbai, UG/Diploma in Cloud AI & Cybersecurity with strong placement support, Learn CCNA, AWS, Azure, Linux & more in IT-IMS from Experts",
    "body": "Boost your expertise and secure your future with Jetking's top Cloud Computing with AI ,  Cyber Security courses , Explore  BCA Cloud Computing & Cybersecurity (UGC Approved) 3 Year Degree program, Ethical Hacking c ourse , CCNA , Python Programing and many more trending courses at Borivali Learning Center, Mumbai.\n\nJoin India’s leading and most trusted digital skills institute, with over 79 years of legacy, offering industry-focused programs in Cloud Computing, Cybersecurity, and BCA Degrees, along with job assistance to launch your career.",
    "featuredProgrammes": [
      {
        "title": "Diploma In Cloud Computing with Artificial Intelligence",
        "subtitle": "Career programme",
        "duration": "12 Months",
        "mode": "Offline/Hybrid"
      },
      {
        "title": "Masters of Cloud Computing with Artificial Intelligence",
        "subtitle": "Career programme",
        "duration": "6 Months",
        "mode": "Offline/Hybrid"
      },
      {
        "title": "BCA In Cloud Computing & Cyber Security",
        "subtitle": "Degree programme",
        "duration": "36 Months",
        "mode": "Offline/Hybrid"
      }
    ],
    "faculty": [
      {
        "name": "Satyavir Sharma",
        "title": "Technical Faculty",
        "bio": "Qualification: BSC in Physics Experience: More than 10 years of teaching experience in IT, Capable of handling classes and doubt clearing and engaging students throughout his class.",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/901136/file/d3bd28256f609f03e862f10daae36c24.png"
      },
      {
        "name": "Suraj Sharma",
        "title": "Technical Faculty",
        "bio": "Qualification: Bachelor of Computer Application (Cloud Computing & Cyber Security) Experience: Total work experience of more than 6 years.",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/workspace/vnBgwv/image/7898028/file/db7f65c668b9650135a1a7764ad5fbc8.png"
      }
    ],
    "placements": [
      {
        "name": "Alison Rodrigues",
        "company": "Allied Diggital",
        "package": "Traniee Enginer",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/workspace/vnBgwv/image/5483518/file/aefaeab85edb8527b12203672bacffce.png"
      },
      {
        "name": "Ajay Gupta",
        "company": "Nettel Network",
        "package": "Best In Industry",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/901133/file/b94fff4a1f1b8ee9075460723c93e7d0.png"
      },
      {
        "name": "Sanchit Dherange",
        "company": "Medline India",
        "package": "4.50 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/841724/file/c78b5481e1d7877d02c05371f1eaee80.png"
      },
      {
        "name": "Ganalaksha Maria",
        "company": "Allied Diggital",
        "package": "Desktop Engineer",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/workspace/vnBgwv/image/5483305/file/a2a56155210e99b3bf8e70f2dcbf1681.png"
      },
      {
        "name": "Praveen Kalambe",
        "company": "Hi- Technic",
        "package": "Intern Enginer",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/workspace/vnBgwv/image/8675640/file/11d29b389852c3b3b078b37efa27f6de.png"
      },
      {
        "name": "Vineet Hirlekar",
        "company": "Hi- Technic",
        "package": "Intern Engineer",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/workspace/vnBgwv/image/8675738/file/af42f248bcce143c0dd8520afe2f85bc.png"
      },
      {
        "name": "Roopesh Tiwari",
        "company": "Bharat Diomnd Ltd.",
        "package": "Trainee Engineer",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/workspace/vnBgwv/image/8108073/file/8a340009e024cde6e06435b9ca10c050.png"
      },
      {
        "name": "Taj Ansari",
        "company": "Tech mahindra",
        "package": "Assest Executive",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/workspace/vnBgwv/image/5483500/file/3bfaf19d8697306cfdbb8437c94de451.png"
      },
      {
        "name": "Next You",
        "company": "Company Name",
        "package": "Your Salary",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/workspace/vnBgwv/image/5182624/file/911788bb7823a3365150f1c9e433ad99.png"
      }
    ],
    "faqs": [
      {
        "question": "Is Cloud computing a good career?",
        "answer": "Launching your career in cloud computing in 2024 opens up incredible opportunities for growth, professional development, and job stability. By acquiring the right skills and expertise, you can dive into a rewarding career path in a dynamic industry that's driving the future of technology and global business."
      },
      {
        "question": "Can a non IT person do Cloud computing Course?",
        "answer": "If you're not well-versed in technology, cloud computing can seem overwhelming. To navigate this fast-evolving field successfully, it's wise to first develop a solid grasp of IT basics. Building a strong foundation in IT will make your journey into cloud computing much smoother and more manageable."
      },
      {
        "question": "Who is eligible for cyber security?",
        "answer": "To enroll in this course, students need to have completed their 10+2 education in any stream in Mumbai. This program equips students with the essential technical knowledge and skills to safeguard computer networks against malicious attacks."
      },
      {
        "question": "What is the salary of Cloud computing courses?",
        "answer": "The average salary for a Cloud Engineer in India typically falls between ₹3.0 Lakhs and ₹13.0 Lakhs per year, with the average annual pay being around ₹7.3 Lakhs."
      },
      {
        "question": "Is Cyber security a good career?",
        "answer": "Absolutely! Careers in computing and information technology, especially in cybersecurity, are not only among the highest-paying but also in high demand across the industry."
      }
    ],
    "testimonials": [
      {
        "quote": "I like to learn new things and in Jetking I have gain a lot knowledge about all the thing which is mention in course.",
        "name": "Akshay Saroj",
        "role": "Insolution Global LTD"
      },
      {
        "quote": "Thank You Jetking For All Your Support from the staff and the placement officer and thanks for giving me this great opportunity for getting in this IT field.",
        "name": "Pawan Dhade",
        "role": "Micropoint Computers PVT LTD"
      },
      {
        "quote": "With the Jetking, I got job opportunities in line with my interest it also helps you in Cracking the Interviews for different Companies.",
        "name": "Ajay Gupta",
        "role": "Nettel Network System"
      }
    ],
    "coursesOffered": [
      "bca-cloud-cyber-security",
      "cloud-computing-engineer-ai",
      "cloud-computing-professional-ai",
      "cloud-cyber-security-engineer",
      "routing-switching-administrator",
      "pc-hardware-support"
    ],
    "seo": {
      "title": "Cloud Computing Courses & Training Institute in Borivali",
      "description": "Cloud Computing courses in Mumbai, UG/Diploma in Cloud AI & Cybersecurity with strong placement support, Learn CCNA, AWS, Azure, Linux & more in IT-IMS from Experts"
    },
    "updatedAt": "2026-08-06"
  },
  {
    "slug": "bhawanipore",
    "name": "Jetking Bhawanipore",
    "citySlug": "kolkata",
    "addressLine": "Elgin Apartments, 1 A, Ashutosh Mukherjee Road, Above ICICI Bank, Bhawanipore Kolkata, West Bengal.",
    "locality": "Bhawanipore",
    "state": "West Bengal",
    "pincode": "700020",
    "phone": "03340034602",
    "helpline": "07666830000",
    "email": "kol@jetking.com",
    "intro": "Boost your expertise and solidify your career with our Cloud Computing with AI and Cyber Security Courses, Graduation courses in Kolkata. Pursue a 3 year BCA degree program at Bhawanipore Jetking Learning Center in Kolkata, west bengal and secure a future in the IT & Tech Industry.",
    "body": "Boost your expertise and solidify your career with our Cloud Computing with AI and Cyber Security Courses, Graduation courses in Kolkata. Pursue a 3 year BCA degree program at Bhawanipore Jetking Learning Center in Kolkata, west bengal and secure a future in the IT & Tech Industry.\n\nJoin India’s leading and most trusted digital skills institute, with over 79 years of legacy, offering industry-focused programs in Cloud Computing, Cybersecurity, and BCA Degrees, along with job assistance to launch your career.",
    "featuredProgrammes": [
      {
        "title": "Diploma In Cloud Computing with Artificial Intelligence",
        "subtitle": "Career programme",
        "duration": "12 Months",
        "mode": "Offline/Hybrid"
      },
      {
        "title": "Masters of Cloud Computing with Artificial Intelligence",
        "subtitle": "Career programme",
        "duration": "6 Months",
        "mode": "Offline/Hybrid"
      },
      {
        "title": "BCA In Cloud Computing & Cyber Security",
        "subtitle": "Degree programme",
        "duration": "36 Months",
        "mode": "Offline/Hybrid"
      }
    ],
    "faculty": [
      {
        "name": "MD. Sabir Ansari",
        "title": "Centre Supervisor",
        "bio": "B.COM Experience : 13 Years Certification : COMPTIA N+ , H+ , CCNA(200-301) , MCSA 2K8 , MCSA 2K12 , MCSA 2K16 , CEHv10 , NETWORK SECURITY , CYBER SECURITY , CISCO COLLABORATION , VMWARE ESXI , KALI LINUX , CEIv2 , FCT , SLP 4.0",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/971913/file/ef927592f0dcb6590e6047c11c555c85.png"
      },
      {
        "name": "Krishanendu Das",
        "title": "Sr. Technical Faculty",
        "bio": "B.Sc. (Chemistry Hons) , MBA-IS Experience : 15 Years Certification : N+ , CCNA (200-301) , CCNP(300-401) , MCSA , MCSE , MCTS , MCDBA , MCITP , MESSAGING , TEST OUT(70-412) , ITIL , VOIP , CLOUD , MNA , FCT , SLP- 4.0, DATA SCIENCE",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/971918/file/461a9d4d45d8d9505e84e9d121ead4b8.png"
      },
      {
        "name": "Rajababu Santra",
        "title": "Technical Faculty",
        "bio": "B.Sc. (Math Hons) Experience : 6 Years Certification : CCNA (200-301) , AZURE-104 , CCNP (300-401) , WINDOWS SERVER 2K19 , N+ , CCNA SECURITY , MCSA 2K8 , MCSA 2K12 , MCSA 2K16 , STORAGE , VIRTUALIZATION , NETWORK SECURITY , FCT , SLP 4.0",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/971910/file/9caea5f55bbf4ddba3439a1698638ecf.png"
      },
      {
        "name": "Tania Mukherjee",
        "title": "PD Faculty",
        "bio": "B Tech graduate with Certification in Certified Ethical hacking - EC Council. Diploma in Cyber Security approved by NASSCOM with 3+ years experience in teaching Hardware and Networking and handling lab.",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/971905/file/3e1ca530c8be80a847eccae3d2e9b694.png"
      },
      {
        "name": "Bulbul Biswas",
        "title": "Technical Faculty",
        "bio": "B.Sc. (Computer Hardware) , M.Sc.(IT) , MBA (IS) Experience : 15 Years Certification : N+ , CCNA (200-301) , WINDOWS -10 , CCNP(ROUTE) , MCSA 2K3 , MCSA 2K8 , MCSA 2K12 , NETWORK SECURITY , CCNA SECURITY , FCT , SLP 3.0 , SLP 4.0 , CEH",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/971926/file/82b7278a5559a52944706242cebd4420.png"
      },
      {
        "name": "Rupak Sengupta",
        "title": "Sr. Technical Faculty",
        "bio": "M.Sc. , MBA (IS) Experience : 12 Years Certification : N+ , MCSA 2K3 , MCSA 2K8 , MCSA 2K16 , CCNA , CCNA SECURITY , CCNP (300-401) , CCNP SECURITY (350-710) , EXCHANGE SERVER 2013 & 2016 , VOIP ,ITIL , CLOUD , VIRTUALIZATION , MNA , FCT , SLP 4.0",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/971914/file/b7363621a49204dae6a8a3470eb175c0.png"
      },
      {
        "name": "Partha Pratim Hazari",
        "title": "Technical Faculty",
        "bio": "B.A (HONS) Experience : 7 Years Certification : A+ , N+ , RHEL 7 , RHEL8 , MCSA 2008 , MCSA 2012 , MCSA 2016 , AWS , CLOUD , FCT , FAT , AZURE , ITIL , EXCHANGE SERVER 2016 , SLP 4.0",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/971907/file/834d5f1507e0efd77f134cc3a84450c7.png"
      },
      {
        "name": "Amrita Guha",
        "title": "Technical Faculty",
        "bio": "M.Sc (Electronics Science) Experience: 4.7 Years Certification: MNA, FCT Certified, JQA 6.1, C, C++, C#, Advanced Python, Java, Solidity, Node JS, Web Designing (HTML, CSS, Java Script), Blockchain Technology Specialist, NFT Creator, SLP 5.0",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/971876/file/19f76f7e24e9db27d32cd1aafbcb154b.png"
      }
    ],
    "placements": [
      {
        "name": "Ayan Biswas",
        "company": "Ericsson Global",
        "package": "1.68 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/971925/file/9a7c385afcee01950980da45a32aab71.png"
      },
      {
        "name": "Souvik Mukherjee",
        "company": "Google",
        "package": "3.60 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/971917/file/8820e3841ba451f68c91e6b25e7c75a0.png"
      },
      {
        "name": "Vineet Purohit",
        "company": "Coforge Ltd.",
        "package": "5.40 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/971916/file/dbd536a3db66fdd573dbca12e429c55f.png"
      },
      {
        "name": "Shadab Khan",
        "company": "Bikanerwala",
        "package": "9.60 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/971915/file/2b188f11ac91a37ba0b220b58ff630bb.png"
      },
      {
        "name": "Vivek Kumar Jha",
        "company": "Infosys(Codezin Technology Solutions)",
        "package": "5.00 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/971912/file/060e46f5a4ad96a7ce6a43b9d2beaf45.png"
      },
      {
        "name": "Vivek Kumar",
        "company": "Medibuddy",
        "package": "3.60 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/971911/file/3235193b9e08b5bfa0ac260c030dd7fc.png"
      },
      {
        "name": "Poonalal Shaw",
        "company": "Capgemini",
        "package": "5.49 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/971909/file/0fd665dd202d6c6c58b49d9ff9b91c2b.png"
      },
      {
        "name": "Gautam Sarkar",
        "company": "Relaince Jio",
        "package": "3.50 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/971908/file/535814b4f8d63329e095c041519d4e4c.png"
      },
      {
        "name": "Gourab Chanda",
        "company": "Cognizant",
        "package": "12.0 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/971906/file/31f6d4a88b69226f0ff80d0c1363cbfd.png"
      },
      {
        "name": "Indira Ghosh",
        "company": "Klynveld Peat Marwick Goerdeler",
        "package": "5.49 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/971904/file/af5eef55c74754a15e76a15f559d2ff2.png"
      },
      {
        "name": "Jagadish Nayak",
        "company": "STL(STARLIGHT TECHNOLOGY)",
        "package": "8.00 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/971903/file/22c8dd27328c1ef3c18051b1208d63b5.png"
      },
      {
        "name": "Snehanshu Roy",
        "company": "Netgear",
        "package": "8.04 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/971901/file/8f129378a989856b2fe9d6851dbbdb08.png"
      },
      {
        "name": "Priyanka Chanda",
        "company": "Akamai Technologies Pvt Ltd.",
        "package": "6.12 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/971900/file/2c336488f703673c432fd1013ac02337.png"
      },
      {
        "name": "Sonu Kumar Ray",
        "company": "Accenture",
        "package": "11.40 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/971899/file/77802ca549a7e52144d56acfb0df359f.png"
      },
      {
        "name": "Somnath Mondal",
        "company": "TCS",
        "package": "5.29 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/971898/file/85fbccc0a3fbea3b05bd11e3f978a962.png"
      },
      {
        "name": "Deboparna Golder",
        "company": "Neudesic",
        "package": "4.59 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/971897/file/7b648d30b583d2aadd1b81ca3f7f13e1.png"
      },
      {
        "name": "Surajit Dhar",
        "company": "Mercer",
        "package": "7.20 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/971896/file/1caee3c8e5a26166178cbfae556f000f.png"
      },
      {
        "name": "Ritesh Mishra",
        "company": "CISCO Systems",
        "package": "27.00 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/971895/file/529080dbaea34a640acd4279767f4c24.png"
      },
      {
        "name": "Akshay Kumar Jha",
        "company": "BRILLIO",
        "package": "6.00 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/971875/file/e451263922f6b26b45d4a78964cb3e6e.png"
      },
      {
        "name": "Amarjit Das",
        "company": "JPMorgan Chase & Co.",
        "package": "36.00 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/971869/file/84e74e6f5be4c41758575155f2309a73.png"
      },
      {
        "name": "Anshuman Mishra",
        "company": "Google",
        "package": "3.60 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/971868/file/fce5c88b4448c0b25d43c063c687467c.png"
      },
      {
        "name": "Arghya Das",
        "company": "Tata Consultancy Services",
        "package": "3.96 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/971865/file/a8390b80a7761717dd54ac6d00a4a5d4.png"
      },
      {
        "name": "Asha Dubey",
        "company": "Sysnet Global Technologies",
        "package": "7.20 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/971863/file/56e2de6c42008ac210d0ebf500fae999.png"
      },
      {
        "name": "Shib shankar das",
        "company": "JW Marriott",
        "package": "5.00 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/971902/file/650f478b86b24d717d68efa5a377af2a.png"
      }
    ],
    "faqs": [
      {
        "question": "Can a non IT person do Cloud computing Course?",
        "answer": "If you're not well-versed in technology, cloud computing can seem overwhelming. To navigate this fast-evolving field successfully, it's wise to first develop a solid grasp of IT basics. Building a strong foundation in IT will make your journey into cloud computing much smoother and more manageable."
      },
      {
        "question": "Who is eligible for cyber security?",
        "answer": "To enroll in this course, students need to have completed their 10+2 education in any stream. This program equips students with the essential technical knowledge and skills to safeguard computer networks against malicious attacks."
      },
      {
        "question": "What is the Cost of Cloud computing courses in Kolkata?",
        "answer": "To find out the cost and duration of our cloud computing courses in Kolkata for freshers, please visit our official website at and submit an inquiry. Our team will provide you with detailed information on the course fees and other relevant details."
      },
      {
        "question": "Who is eligible for Cloud computing?",
        "answer": "Students 10+2 and Degrees in non-technical fields such as B.Com., B.A., or finance-related disciplines are also acceptable. Additionally, students who are in their final year of graduation are eligible for the course."
      },
      {
        "question": "What is the salary of Cloud Engineer in Kolkata, India?",
        "answer": "The average salary for a Cloud Engineer in Kolkata, India typically falls between ₹3.0 Lakhs and ₹13.0 Lakhs per year, with the average annual pay being around ₹7.3 Lakhs."
      }
    ],
    "testimonials": [
      {
        "quote": "Our institution has all the necessary infrastructure, facilities and equipment. Course Curriculum are designed excellently for better understanding and knowledge. The quality of teaching is very good. All the faculties were very supportive and friendly. The institute places the students in various reputed companies who do mass recruitment like HCL, Cognizant, Capgemini etc.",
        "name": "Ritesh Mishra",
        "role": "CISCO Systems"
      },
      {
        "quote": "Strong academic programs, provides students with a solid IT foundation of knowledge with a highly active placement unit. Critical thinking skills, Personality Development, Interviews etiquettes and various different activities are held which help the students to grow overall. I want to thank all my faculties who fostered me strongly also to the placement cell who helped me to get my dream job",
        "name": "Sonu Kumar Ray",
        "role": "Accenture"
      },
      {
        "quote": "It was an incredibly memorable experience with Jetking. In terms of academics, Jetking is known to be rigorous and fast-paced so it primarily depends on the student with the help of their faculties to adopt all the latest technical skills along with efficient time management skills and study methods to succeed. I want to thank all my faculties who fostered me strongly also to the placement cell who helped me to get m",
        "name": "Amarjit Das",
        "role": "JPMorgan Chase & Co."
      }
    ],
    "coursesOffered": [
      "bca-cloud-cyber-security",
      "cloud-computing-engineer-ai",
      "cloud-computing-professional-ai",
      "cloud-cyber-security-engineer",
      "routing-switching-administrator",
      "pc-hardware-support"
    ],
    "seo": {
      "title": "Best Cloud Computing Courses & Training Institute in Kolkata",
      "description": "Cloud Computing courses in Kolkata, UG/Diploma in Cloud AI & Cybersecurity with strong placement support, Learn CCNA, AWS, Azure, Linux & more in IT-IMS from Experts"
    },
    "updatedAt": "2026-08-06"
  },
  {
    "slug": "chandigarh",
    "name": "Jetking Chandigarh",
    "citySlug": "chandigarh",
    "addressLine": "Hyatt Centric Sector 17 Chandigarh",
    "locality": "Sector 34A",
    "state": "Punjab",
    "pincode": "160022",
    "phone": "0172-2608956",
    "helpline": "07666830000",
    "email": "chd@jetking.com",
    "intro": "Boost your skills with best IT Training Institute in Punjab, Chandigarh with Cloud Computing courses and Cyber Security courses, designed to boost your career prospects with job placement support. Jetking Smartlab plus teaching methods ensure you gain both exceptional knowledge and hands-on experience in these high-demand fields. Join Best Computer Course training Centre Jetking Chandigarh today, and secure your futu",
    "body": "Advanced your expertise and solidify your career with our Cloud Computing courses with A.I and Cyber Security courses in Punjab. Pursue a 3 year BCA degree at Chandigarh Jetking Learning Center in Punjab, and secure a future in the IT & Tech Industry.\n\nJoin Jetking, India's Leading IT Training Institute Enroll now in Top Cloud Computing Course, Cyber Security courses and BCA 3 years Degree programs from Chandigarh, Punjab Jetking Institute with flexible & easy EMIs. Gain hands-on practical experience on live projects and open doors to endless career opportunities!",
    "featuredProgrammes": [
      {
        "title": "Diploma In Cloud Computing with Artificial Intelligence",
        "subtitle": "Career programme",
        "duration": "12 Months",
        "mode": "Offline/Hybrid"
      },
      {
        "title": "Masters of Cloud Computing with Artificial Intelligence",
        "subtitle": "Career programme",
        "duration": "6 Months",
        "mode": "Offline/Hybrid"
      },
      {
        "title": "BCA In Cloud Computing & Cyber Security",
        "subtitle": "Degree programme",
        "duration": "36 Months",
        "mode": "Offline/Hybrid"
      }
    ],
    "faculty": [
      {
        "name": "Sudhir Kumar Pathania",
        "title": "(Center Manager)",
        "bio": "With 20+ years of excellence , industry expert has trained thousands across government institutions, private companies, and the Indian Defence Forces. A Microsoft Certified Professional and a proud member of Jetking Chandigarh family since 2005, has unmatched expertise in designing industry-focused training programs that prepare students for high-demand IT careers. The legacy includes driving transformative corporate projects, mentoring defense professionals, and delivering practical, industry-relevant training that bridges the gap between education and employment.",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/workspace/vnBgwv/image/22793596/file/e61f6801b8aa28758ff7ac7ce92da1cd.png"
      },
      {
        "name": "Deepak Sood",
        "title": "HOD (Head of Department)",
        "bio": "With a strong academic foundation in Electronics and a prestigious MCSA Certification, Having 15+ years of unmatched expertise in Teaching, Mentoring, and Hands-on Lab Training. Specializing in Cyber Security, Hardware, and Networking, has guided numerous students to step confidently into the IT industry equipped with practical expertise and industry-relevant skills.",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1039114/file/b9f4a4fd875d86e8ca9b091a2993de70.png"
      },
      {
        "name": "Arun Chadha",
        "title": "(Network Trainer and Web Developer)",
        "bio": "Armed with a Bachelor’s in Computer Applications with 12+ years of Teaching excellence , dedicated to shaping future-ready IT professionals. With a knack for simplifying complex concepts in Programming, Networking, and Emerging Technologies, inspired and guided countless students toward successful tech careers.",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1039113/file/8bc4c61f31afd23918bf613ce6a4aa9c.png"
      },
      {
        "name": "Ramjeevan",
        "title": "(Technical Faculty)",
        "bio": "Combining strong language proficiency with technical expertise, the training approach brings the best of both worlds to the classroom. Certified in Cloud V2 and trained under NIIT’s Swift Jyoti IT Program, with 10+ years of experience in hardware, networking, and enterprise systems. The methodology emphasizes practical lab sessions, scenario-based learning, and industry-aligned skills, enabling students to build confidence in both technical roles and professional communication.",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1039117/file/707fe5d28a6ab6121a0757a1f21387e5.png"
      },
      {
        "name": "Harpreet Singh",
        "title": "(PD Trainer)",
        "bio": "A dedicated Personality Development Trainer experienced in developing communication and interpersonal skills. He specializes in delivering impactful training sessions with a focus on clear communication, confidence building, and soft skills enhancement. Known for his approachable and articulate speaking style, he has successfully trained over 2,500 students , helping them grow both personally and professionally. He is committed to create engaging learning environments that drive real, measurable improvement.",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/workspace/vnBgwv/image/22716814/file/27599c3208a13f79fc77934706b69412.png"
      },
      {
        "name": "Sakshi",
        "title": "(Placement Officer)",
        "bio": "A dedicated Placement Officer, an MBA Graduate , passionate about guiding students toward successful career opportunities by bridging the gap between talent and industry requirements. With a strong understanding of financial principles and recruitment processes, Focusing on enhancing employability skills and supporting students in achieving their professional goals. Sheis committed to delivering efficient placement strategies and building strong industry connections.",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/workspace/vnBgwv/image/22716845/file/11056e071d240933cf8ee842da4ea74d.png"
      }
    ],
    "placements": [
      {
        "name": "Deepika Garg",
        "company": "Safe scaffoling limited",
        "package": "3 Crore PA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/workspace/vnBgwv/image/22742233/file/94b44f6231d440ae32d5edfc33b24ce5.png"
      },
      {
        "name": "Ranbir Singh",
        "company": "Vserv Infosystems",
        "package": "10 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1009348/file/f60ada913f2f3fac34df83fd80732fe7.png"
      },
      {
        "name": "Krishan Thakur",
        "company": "Quatrro Global Services",
        "package": "3.50 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1009347/file/af4fce7043abf9e7c99a05285c74cded.png"
      },
      {
        "name": "Gurdeep Singh Pathania",
        "company": "Times of India",
        "package": "87 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/workspace/vnBgwv/image/22742260/file/9623a74dac507ae5019fdd5a79be0f0e.png"
      },
      {
        "name": "Gaurav Dhingra",
        "company": "Mitsubishi Motors",
        "package": "18 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/workspace/vnBgwv/image/22742262/file/801e0394ddff11f7048785479909d2a8.png"
      },
      {
        "name": "Dr Ankur gupta",
        "company": "AICPL Education Council",
        "package": "18 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/workspace/vnBgwv/image/22742263/file/a75b28a9490030be9d2730da4d7c1c92.png"
      },
      {
        "name": "Sajeev Kumar",
        "company": "ICA Education Skills",
        "package": "15 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/workspace/vnBgwv/image/22742299/file/5562cf079fb45641e133c96d13edca70.png"
      },
      {
        "name": "Mukesh Kharti",
        "company": "Trade Solution",
        "package": "12 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/workspace/vnBgwv/image/22742301/file/6e701c48f1f8052b9603bc39e8bca08b.png"
      },
      {
        "name": "Gurucharan Bhatia",
        "company": "Wns global",
        "package": "9 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/workspace/vnBgwv/image/22742304/file/2c576ef670916ba2d5132f8da38be3d3.png"
      },
      {
        "name": "Hari Chand",
        "company": "LogicApt Informatics Ltd.",
        "package": "8 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/workspace/vnBgwv/image/22742333/file/56532eeb5b7efd12d7b57e47dc172248.png"
      },
      {
        "name": "Amanbeer sandhu",
        "company": "Baba Farid University, Faridkot",
        "package": "8 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/workspace/vnBgwv/image/22742336/file/b555c9add0e6142e0cb326778b9cb5ba.png"
      },
      {
        "name": "Ayudh Mehta",
        "company": "Tech Mahindra",
        "package": "5 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/workspace/vnBgwv/image/22742341/file/18424d82dfaf01d3532702a4a07ba104.png"
      },
      {
        "name": "Sahil Kumar",
        "company": "Net sure Solutions",
        "package": "3.2 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/workspace/vnBgwv/image/22742388/file/d07aea7a869604efe2326f7a12f8e999.png"
      },
      {
        "name": "Yashwant Kumar",
        "company": "Teach Mahindra",
        "package": "5.5 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/workspace/vnBgwv/image/22742382/file/c7050920d795ca24b913c38106e1bfb9.png"
      },
      {
        "name": "Simran",
        "company": "Avaso",
        "package": "3.2 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/workspace/vnBgwv/image/22742347/file/6cf8e2bcbbf600346785ecd1d55d5a12.png"
      },
      {
        "name": "Govind paul",
        "company": "Government of India",
        "package": "9 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/workspace/vnBgwv/image/22742344/file/4d9c72e3f47f5c6ee0f759a4193b3e62.png"
      }
    ],
    "faqs": [
      {
        "question": "Who is eligible for cyber security Courses?",
        "answer": "To enroll in this course, students need to have completed their 10+2 education in any stream. This program equips students with the essential technical knowledge and skills to safeguard computer networks against malicious attacks."
      },
      {
        "question": "Who is eligible for Cloud computing Courses?",
        "answer": "Students 10+2 and Degrees in non-technical fields such as B.Com., B.A., or finance-related disciplines are also acceptable. Additionally, students who are in their final year of graduation are eligible for the course."
      },
      {
        "question": "Can a non IT person do Cloud computing Course?",
        "answer": "If you're not well-versed in technology, cloud computing can seem overwhelming. To navigate this fast-evolving field successfully, it's wise to first develop a solid grasp of IT basics. Building a strong foundation in IT will make your journey into cloud computing much smoother and more manageable."
      },
      {
        "question": "What is the Cost of Cloud computing courses in Punjab?",
        "answer": "To find out the cost and duration of our cloud computing courses in Punjab for freshers, please visit our official website at jetking.com and submit an inquiry. Our team will provide you with detailed information on the course fees and other relevant details."
      },
      {
        "question": "What is the salary of Cloud Engineer in Punjab?",
        "answer": "The average salary for a Cloud Engineer in Chandigarh, Punjab typically falls between ₹3.0 Lakhs and ₹13.0 Lakhs per year, with the average annual pay being around ₹7.3 Lakhs."
      }
    ],
    "testimonials": [
      {
        "quote": "Best Networking institute in Chandigarh. I have done my DNA course from jetking. All thanks to Deepak sir and Pramod sir for providing practical and job oriented training.",
        "name": "Hayum Namberdar",
        "role": "Sandi's Sweets"
      },
      {
        "quote": "Best place to enhance your skills. I am pursuing Diploma in Cloud Computing and before the completion of course i got placed in Hyatt Chandigarh. I recommend all to enroll here to enhanced your skills and for better future.",
        "name": "Amit Kumar",
        "role": "Hyatt Centric Sector 17 Chandigarh"
      },
      {
        "quote": "Best Networking institute in Chandigarh. I have pursuing my DCC course from jetking. I strongly recommend Jetking Chandigarh for all those who want to make their career in IT.",
        "name": "Anmol",
        "role": "Abson"
      }
    ],
    "coursesOffered": [
      "bca-cloud-cyber-security",
      "cloud-computing-engineer-ai",
      "cloud-computing-professional-ai",
      "cloud-cyber-security-engineer",
      "routing-switching-administrator",
      "pc-hardware-support"
    ],
    "seo": {
      "title": "Best Cloud Computing Courses and Training Centre in Punjab",
      "description": "Cloud Computing course in Chandigarh, Punjab. UG/Diploma programs in Cloud AI & Cybersecurity with job placement, Learn AWS, Azure & more from experts"
    },
    "updatedAt": "2026-08-06"
  },
  {
    "slug": "dadar",
    "name": "Jetking Dadar",
    "citySlug": "mumbai",
    "addressLine": "605/606, 6th floor, Laxmi Commercial premises, co op.so. ltd, Senapati Bapat Marg, Dadar West, Mumbai, Maharashtra 400028",
    "locality": "Dadar West",
    "state": "Maharashtra",
    "pincode": "400028",
    "phone": "07400057895",
    "helpline": "07666830000",
    "email": "dadar.con3@jetking.com",
    "headline": "Best Cloud Computing with AI & Data Analytics Training Institute in Mumbai",
    "intro": "Best Cloud Computing with AI & Data Analytics Training Institute in Mumbai",
    "body": "Boost your career with the best Cloud Computing, IT Networking, Cyber Security, Ethical Hacking, Data Analytics, Animation, Graphics Design & UGC-Approved BCA Degree courses in Mumbai with placement-support programs at Jetking Dadar.\n\nJoin Jetking, India's Leading IT Training Institute Enroll today at Jetking Dadar, Mumbai’s leading Computer Training Institute, offering industry-focused Cloud Computing, Cyber Security, IT Networking and UGC-Approved BCA Degree programs with flexible EMI options. Gain hands-on experience through live projects and unlock exciting, high-paying career opportunities!",
    "featuredProgrammes": [
      {
        "title": "Diploma In Cloud Computing with Artificial Intelligence",
        "subtitle": "Career programme",
        "duration": "12 Months",
        "mode": "Offline/Hybrid"
      },
      {
        "title": "Masters of Cloud Computing with Artificial Intelligence",
        "subtitle": "Career programme",
        "duration": "6 Months",
        "mode": "Offline/Hybrid"
      },
      {
        "title": "BCA In Cloud Computing & Cyber Security",
        "subtitle": "Degree programme",
        "duration": "36 Months",
        "mode": "Offline/Hybrid"
      }
    ],
    "faculty": [
      {
        "name": "Naresh M Dhanwani",
        "title": "Sr Technical Trainer (Center Supervisor)",
        "bio": "Qualification: BE in Electronics,15+ Experiance in Training. Certified Ethical Hacker (CEH), Microsoft Certified Professional (MCP), EC Council Certified Instructor MCSA 2012/2016, Redhat RHCSA Version8 Experience: 17+ Years",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/993740/file/b16fd11deac06011b21119dd1f4a7d8a.png"
      },
      {
        "name": "Karuna S Dhamapurkar",
        "title": "Technical Faculty",
        "bio": "Qualification: Graduate, Diploma in System Engineer, Global Certification- RHCSA, RHCE, Juniper, Novell Netware, CCC, MCSA, Sun Solaris. Experience: 15+ Years",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/993741/file/343f456cd366604b75267f8820ed999f.png"
      },
      {
        "name": "Vishal Prasad",
        "title": "Technical Faculty",
        "bio": "Qualification: Bachelor of computer application, SLP Certified Trainer. Experience: 2+ years",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/workspace/vnBgwv/image/5820007/file/7fe8c1ec590d2d9eb02b69a854f2e295.png"
      },
      {
        "name": "Samreen khan",
        "title": "Technical Trainer",
        "bio": "Qualification: Bachelor of computer application, SLP Certified trainer. Experience: 2+ years",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/workspace/vnBgwv/image/5820352/file/d1c27a057e7eedf0a0e832d43df158aa.png"
      }
    ],
    "placements": [
      {
        "name": "Bhavesh Gokhale",
        "company": "Desktop Support Er.",
        "package": "Best In Industry",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/993738/file/4cfaa9ad739688cf8e611d84b6c61b07.png"
      },
      {
        "name": "Arbaz Satvikar",
        "company": "Junior Streaming Er.",
        "package": "Best In Industry",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/993737/file/e9553e45faa68d83d4de0053cf2bc7f4.png"
      },
      {
        "name": "Kaushik Kadam",
        "company": "Micropoint",
        "package": "2.29 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1783557/file/cdad7553b78ad31868c135579f322e6e.png"
      },
      {
        "name": "Mahtab Ahmed",
        "company": "Radisson Blu",
        "package": "1.92 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1783558/file/868496d4155ee9a07f94485e233de8b6.png"
      },
      {
        "name": "Saurabh Chaubey",
        "company": "Allied Digital",
        "package": "2.4 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1783559/file/b1dc20a06afee086903824fd99fd9045.png"
      },
      {
        "name": "Ismail Ansari",
        "company": "Teleperformance",
        "package": "2.48 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1783560/file/5d03a3c5a4b9636e50d89955f23b881e.png"
      },
      {
        "name": "Shruti Patil",
        "company": "Unicorn Limited",
        "package": "2.14 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/workspace/vnBgwv/image/5597667/file/9bf6bcec5211be7cffa6b526ed2b75e9.png"
      },
      {
        "name": "Aniket Gupta",
        "company": "Micropoint",
        "package": "2.40 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/workspace/vnBgwv/image/5597671/file/d12118d4485bd56f7b686fbb1180c1b1.png"
      },
      {
        "name": "Amol Vitthal Gadekar",
        "company": "Allied Digital",
        "package": "2.40 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/workspace/vnBgwv/image/5597674/file/b38d52c516f5827110ecbf38731412de.png"
      },
      {
        "name": "Deepika Pawar",
        "company": "Unicorn Limited",
        "package": "2.14 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/workspace/vnBgwv/image/5597705/file/74294a981f4788433f49900dc9180bbf.png"
      },
      {
        "name": "Akash Bargude",
        "company": "Allied Digital",
        "package": "2.4 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/workspace/vnBgwv/image/5597744/file/add65d0f0cc2e160af76da9e1ad29da9.png"
      },
      {
        "name": "Abhishek Mishra",
        "company": "Allied Digital",
        "package": "2.40 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/workspace/vnBgwv/image/5597773/file/46470f3691290dc0aa0bd3ec937792d4.png"
      },
      {
        "name": "Arfat Shaikh",
        "company": "Vibrant Securities",
        "package": "1.92 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/workspace/vnBgwv/image/5597835/file/63f5aa60c679a119dd5f70a376685da4.png"
      },
      {
        "name": "Manjiri Jayesh Avhad",
        "company": "Vakils",
        "package": "3.12 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/workspace/vnBgwv/image/5597840/file/00e774d0e27a0f17ca2acf05ee1cb75a.png"
      },
      {
        "name": "Manav Pillai",
        "company": "Essen Vision Ltd.",
        "package": "3.0 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/workspace/vnBgwv/image/5597842/file/b2e2967c1d593def08ee7903569fc567.png"
      },
      {
        "name": "Pratham Pusalkar",
        "company": "Springworld Ltd.",
        "package": "1.92 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/workspace/vnBgwv/image/5597853/file/b4f4711ec6c7bd33362a66dd0ab74363.png"
      },
      {
        "name": "Trishanu Raj",
        "company": "Microsense",
        "package": "2.04 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/workspace/vnBgwv/image/5597861/file/029a040431c3267098209606961209d0.png"
      },
      {
        "name": "Abdul Maroof",
        "company": "I-deas Infinite",
        "package": "1.92 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/workspace/vnBgwv/image/5597872/file/d428fe8947ebb607e070eb5732e8a7bc.png"
      },
      {
        "name": "Osama Ansari",
        "company": "Nexus Computers",
        "package": "1.92 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1783561/file/1ed10bb9ce7067cb4ff471823fd1cb2d.png"
      },
      {
        "name": "Niraj Gupta",
        "company": "Micropoint",
        "package": "2.37 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1783562/file/63bc195ea17e3dc3e1ba0395b6a4186a.png"
      },
      {
        "name": "Rehan Shaikh",
        "company": "Think360",
        "package": "1.92 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1783563/file/64782c0321614833c3f68a3b7eca6064.png"
      },
      {
        "name": "Kuldeep Jaiswal",
        "company": "Nexus Computers",
        "package": "1.92 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1783564/file/10cc5c84d1084ca59464adb53c2c33b2.png"
      },
      {
        "name": "Karan singh",
        "company": "Teleperformance",
        "package": "2.52 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/workspace/vnBgwv/image/9774600/file/b4481876cdae8b731e4b805718f3c094.png"
      }
    ],
    "faqs": [
      {
        "question": "What is Cloud computing and cyber security course?",
        "answer": "A Cloud Computing and Cyber Security course equips individuals with the knowledge and skills to manage cloud-based infrastructures and protect digital systems from cyber threats. The cloud computing component focuses on delivering services like storage, networking, and databases over the internet, while the cybersecurity part teaches how to safeguard data, networks, and systems from unauthorized access, attacks, and breaches. This course covers essential topics such as cloud architecture, encryption, threat detection, ethical hacking, and compliance, preparing students for high-demand roles in"
      },
      {
        "question": "Is AI used in cloud computing?",
        "answer": "Yes, AI is widely used in Cloud computing to enhance data processing, automate tasks, and improve efficiency. It helps in optimizing cloud resource management, enabling predictive analytics, and offering intelligent security solutions. AI-powered tools in the cloud also streamline operations like data storage, computing power allocation, and cost management, making cloud services smarter and more responsive."
      },
      {
        "question": "Who is eligible for Cyber security Courses in Mumbai?",
        "answer": "Anyone with a strong interest in technology, problem-solving skills, and a desire to protect digital systems can pursue a career in cybersecurity in Mumbai. Eligible candidates typically have a background in IT, computer science, or engineering, but many cybersecurity programs also accept graduates from other fields with relevant experience or certifications. Courses are available for beginners, and specialized training is available for professionals looking to upskill."
      },
      {
        "question": "Can a non IT person do Cloud computing Course?",
        "answer": "If you're not well-versed in technology, cloud computing can seem overwhelming. To navigate this fast-evolving field successfully, it's wise to first develop a solid grasp of IT basics. Building a strong foundation in IT will make your journey into cloud computing much smoother and more manageable."
      },
      {
        "question": "What is the salary of cloud computing AI Engineer?",
        "answer": "The salary for a Cloud Computing AI professional in India typically ranges from ₹6 lakh to ₹15 lakh per year for entry-level roles, while experienced professionals can earn between ₹20 lakh to ₹50 lakh* or more, depending on their expertise and the company."
      }
    ],
    "testimonials": [
      {
        "quote": "I just wanted to share a quick note and let you know that Jetking has changed my life. I'm glad I decided to join Jetking. It's really great that I got a job even after being an undergraduate. During my course duration, I also learned personality development which helped me develop my soft skills. The faculties are well trained and very supportive. Thank you Jetking",
        "name": "Bhavesh Gokhale",
        "role": "Quatrro"
      },
      {
        "quote": "I am working as a Junior Streaming Engineer at Jetking. I joined Jetking after completing my graduation and straight after completing my course, I was placed at 24 Frames. My journey at Jetking has been great as I got to enhance my technical skills and moreover, the environment of the institute is highly approachable and friendly. Would highly recommend Jetking to all those who are looking to make a career in IT Indu",
        "name": "Arbaz Satvikar",
        "role": "24 Frames"
      },
      {
        "quote": "I am very happy with Jetking for the placement assistance, even after my first job. I am grateful for all the guidance and technical knowledge provided. At Jetking we are not only trained in the technical domain as well as I have also improved my communication skills and confidence in appearing for interviews.",
        "name": "Abhishek",
        "role": "IBM-Collabera"
      }
    ],
    "coursesOffered": [
      "bca-cloud-cyber-security",
      "cloud-computing-engineer-ai",
      "cloud-computing-professional-ai",
      "cloud-cyber-security-engineer",
      "routing-switching-administrator",
      "pc-hardware-support"
    ],
    "seo": {
      "title": "Best Cloud Computing & Data Analytics Course in Mumbai",
      "description": "Jetking Dadar offers Cloud Computing, Cyber Security, Data Analytics, Multimedia & Animation, UGC-Approved BCA Degree courses in Mumbai with dedicated placement support."
    },
    "updatedAt": "2026-08-06"
  },
  {
    "slug": "dhanbad",
    "name": "Jetking Dhanbad",
    "citySlug": "dhanbad",
    "addressLine": "3rd Floor, Shri Durga Market, Near Pandit Clinic Road, Bus Stand, Bartand, Dhanbad, Jharkhand.",
    "locality": "Bartand",
    "state": "Jharkhand",
    "pincode": "826004",
    "phone": "07561994941",
    "helpline": "07666830000",
    "email": "dhanbad@jetking.com",
    "intro": "Cloud Computing course in Dhanbad, UG/Diploma programs in Cloud AI & Cybersecurity with strong placement support, Learn CCNA, AWS, Azure, Linux from Certified Experts",
    "body": "Join Jetking, India's Leading IT Training Institute Enroll now in Jetking Dhanbad, Jharkhand with Cloud Computing Courses, AI Cloud Courses, Cyber Security courses and BCA 3 years graduation programs with flexible and easy EMIs. Gain hands-on practical experience on live projects and open doors to endless career opportunities!\n\nJoin India’s leading and most trusted digital skills institute, with over 79 years of legacy, offering industry-focused programs in Cloud Computing, Cybersecurity, and BCA Degrees, along with job assistance to launch your career.",
    "featuredProgrammes": [
      {
        "title": "Diploma In Cloud Computing with Artificial Intelligence",
        "subtitle": "Career programme",
        "duration": "12 Months",
        "mode": "Offline/Hybrid"
      },
      {
        "title": "Masters of Cloud Computing with Artificial Intelligence",
        "subtitle": "Career programme",
        "duration": "6 Months",
        "mode": "Offline/Hybrid"
      },
      {
        "title": "BCA In Cloud Computing & Cyber Security",
        "subtitle": "Degree programme",
        "duration": "36 Months",
        "mode": "Offline/Hybrid"
      }
    ],
    "faculty": [
      {
        "name": "Nihal Singh",
        "title": "Technical Head",
        "bio": "Qualification – BCA Experience – 4+ year experience In Hardware Networking Field & AWS Certification – CCNA fromCisco, JNCIA from Juniper",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1055999/file/19df45d175130c354c5f31ed3e1384c0.png"
      },
      {
        "name": "Piyush Kumar",
        "title": "Placement Officer",
        "bio": "Qualification – P.hD Experience – 5+ Year experience in Hardware Networking Field & Placement Field.",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1055996/file/b143e1ca62fcfc0e6cdafb3bb8dcaad3.png"
      }
    ],
    "placements": [
      {
        "name": "MD Tabrej Ansari",
        "company": "Adani Groups",
        "package": "2.85 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1056000/file/a0e424296df91c059f24701acb21f5b0.png"
      },
      {
        "name": "Nishant Kumar",
        "company": "JK Papers",
        "package": "3.6 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1055998/file/b010a1662d155e8ea766407142542eed.png"
      },
      {
        "name": "Satyam Kumar Singh",
        "company": "Jindal Steel",
        "package": "2.64 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1055997/file/680e62a7b3c315f5c486a8177fe91fa6.png"
      },
      {
        "name": "MD Manjesar Ansari",
        "company": "Adani Group",
        "package": "4.50 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1055995/file/45fd9f6fd87649662c90f201e69f3fae.png"
      },
      {
        "name": "Umesh Kumar Srivastava",
        "company": "Oberoi Hotel",
        "package": "4 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1055994/file/61c1bfe5491d0de2ceec719a8375db52.png"
      },
      {
        "name": "Next You",
        "company": "Top IT Company",
        "package": "Best In Industry",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1042933/file/e82f85ee6944b37d5b896b065c240a97.png"
      }
    ],
    "faqs": [
      {
        "question": "Is Cloud computing with AI is good career option?",
        "answer": "Launching your career in cloud computing in today's opens up incredible opportunities for growth, professional development, and job stability. By acquiring the right skills and expertise, you can dive into a rewarding career path in a dynamic industry that's driving the future of technology and global business."
      },
      {
        "question": "Can a non IT person do Cloud computing Course?",
        "answer": "If you're not well-versed in technology, cloud computing can seem overwhelming. To navigate this fast-evolving field successfully, it's wise to first develop a solid grasp of IT basics. Building a strong foundation in IT will make your journey into cloud computing much smoother and more manageable."
      },
      {
        "question": "Who can do Ethical Hacking Courses with Jetking?",
        "answer": "To enroll in Ethical Hacking course with Jetking, students need to have completed their 10+2 education in any stream. This program equips students with the essential technical knowledge and skills to safeguard computer networks against malicious attacks."
      },
      {
        "question": "What is the salary of Cloud computing Engineer?",
        "answer": "The average salary for a Cloud Engineer in India typically falls between ₹3.0 Lakhs and ₹13.0 Lakhs per year, with the average annual pay being around ₹7.3 Lakhs."
      }
    ],
    "testimonials": [
      {
        "quote": "Before joining Jetking, I was not sure what to do with my career. But after completing the course, I got the right platform to start my career. It's been nearly 5 years and I have never looked back. I am very satisfied with my decision to join Jetking which has proved that there is no disadvantage of being a girl in technical domain.",
        "name": "Preeti Madan",
        "role": "Quatrro"
      },
      {
        "quote": "“Without Jetking, I don’t know where I would be. You made a major difference in my life. All those times that you have gone the extra mile for me, I really did notice. Your belief in me makes me believe in myself.”",
        "name": "Nikhil Pathare",
        "role": "Tata Consultancy Services"
      },
      {
        "quote": "I am very happy with Jetking for the placement assistance, even after my first job. I am grateful for all the guidance and technical knowledge provided. At Jetking we are not only trained in the technical domain as well as I have also improved my communication skills and confidence in appearing for interviews.",
        "name": "Abhishek",
        "role": "IBM-Collabera"
      }
    ],
    "coursesOffered": [
      "bca-cloud-cyber-security",
      "cloud-computing-engineer-ai",
      "cloud-computing-professional-ai",
      "cloud-cyber-security-engineer",
      "routing-switching-administrator",
      "pc-hardware-support"
    ],
    "seo": {
      "title": "Best Cloud Computing Courses & Training Institute in Jharkha",
      "description": "Cloud Computing course in Dhanbad, UG/Diploma programs in Cloud AI & Cybersecurity with strong placement support, Learn CCNA, AWS, Azure, Linux from Certified Experts"
    },
    "updatedAt": "2026-08-06"
  },
  {
    "slug": "durg",
    "name": "Jetking Durg",
    "citySlug": "durg",
    "addressLine": "Agrasen Chowk, Arya Nagar, Durg, Chhattisgarh",
    "locality": "Arya Nagar",
    "state": "Chhattisgarh",
    "pincode": "491001",
    "phone": "07389916337",
    "helpline": "07666830000",
    "email": "durg@jetking.com",
    "intro": "Boost your Career with Best Computer IT Training Institute in Durg, Chhattisgarh and secure your future with Jetking best Cloud Computing courses with A.I, Top Cyber Security Courses and Ethical Hacking courses in Durg Jetking Learning Centre.",
    "body": "Boost your Career with Best Computer IT Training Institute in Durg, Chhattisgarh and secure your future with Jetking best Cloud Computing courses with A.I, Top Cyber Security Courses and Ethical Hacking courses in Durg Jetking Learning Centre.\n\nJoin Jetking, India's Leading IT Training Institute Enroll now in Jetking Durg with Cloud Computing Courses, Cyber Security courses and BCA 3 years graduation degree programs with flexible & easy EMIs. Gain hands-on practical experience on live projects and open doors to endless career opportunities!",
    "featuredProgrammes": [
      {
        "title": "Diploma In Cloud Computing with Artificial Intelligence",
        "subtitle": "Career programme",
        "duration": "12 Months",
        "mode": "Offline/Hybrid"
      },
      {
        "title": "Masters of Cloud Computing with Artificial Intelligence",
        "subtitle": "Career programme",
        "duration": "6 Months",
        "mode": "Offline/Hybrid"
      },
      {
        "title": "BCA In Cloud Computing & Cyber Security",
        "subtitle": "Degree programme",
        "duration": "36 Months",
        "mode": "Offline/Hybrid"
      }
    ],
    "faculty": [
      {
        "name": "Sudhangshu Bag",
        "title": "Technical Head",
        "bio": "BCA graduate with more than 6 years of experience, with certification in redhat, ccna, comptia A+ , comptia N+, AWS.",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/954345/file/20546361b6d200f8c63830d000b8f7be.png"
      },
      {
        "name": "Jayanto Mukhopadhyay",
        "title": "Technical Trainer",
        "bio": "B.E (Electrical Engineering) Expert In Cyber Security",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1759689/file/c9a32e68a932960324013725420eed42.png"
      },
      {
        "name": "Abhishek Kumar",
        "title": "Placement officer",
        "bio": "Profile: B.Tech Engineer 4+ Years of Working Experience",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1759690/file/d95a3278e2d16ce3ce3965791a0be745.png"
      }
    ],
    "placements": [
      {
        "name": "Tomin Sahu",
        "company": "NSE IT",
        "package": "LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/954387/file/bbaa3f75e86cc5855b3ba8ca1bb38059.png"
      },
      {
        "name": "Paras Nirmalkar",
        "company": "Axis Bank",
        "package": "LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/954388/file/7acc9f90bc1707490a01f5f734184530.png"
      },
      {
        "name": "Mayank Sharma",
        "company": "IDFC Bank",
        "package": "LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/954389/file/cd8ebe5bb432300bf127044717dbd163.png"
      },
      {
        "name": "Sanchit Dherange",
        "company": "Medline India",
        "package": "4.50 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/841724/file/c78b5481e1d7877d02c05371f1eaee80.png"
      },
      {
        "name": "Nayan Oval",
        "company": "Amazon",
        "package": "8.57 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/841722/file/9923b2b8af82b22d1c7ef1c2dc22ece1.png"
      },
      {
        "name": "Parag Petare",
        "company": "Wipro",
        "package": "3.50 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/841721/file/bc11463da155e63bbd7f5e9387103714.png"
      }
    ],
    "faqs": [
      {
        "question": "Can a non IT person do Cloud computing Course?",
        "answer": "If you're not well-versed in technology, cloud computing can seem overwhelming. To navigate this fast-evolving field successfully, it's wise to first develop a solid grasp of IT basics. Building a strong foundation in IT will make your journey into cloud computing much smoother and more manageable."
      },
      {
        "question": "Who is eligible for Cloud computing with AI?",
        "answer": "Students 10+2 and Degrees in non-technical fields such as B. Com., B.A., or finance-related disciplines are also acceptable. Additionally, students who are in their final year of graduation are eligible for the course."
      },
      {
        "question": "What is the Cost of Cloud computing courses in Haryana?",
        "answer": "To find out the cost and duration of our cloud computing courses in Chhattisgarh, please visit our official website and submit an inquiry. Our team will provide you with detailed information on the course fees and other relevant details."
      },
      {
        "question": "Who can do cyber security courses?",
        "answer": "To enroll in this course, students need to have completed their 10+2 education in any stream. This program equips students with the essential technical knowledge and skills to safeguard computer networks against malicious attacks."
      },
      {
        "question": "What is the salary of Cloud Engineer in Haryana, India?",
        "answer": "The average salary for a Cloud Engineer in Chhattisgarh, India typically falls between ₹3.0 Lakhs and ₹13.0 Lakhs per year, with the average annual pay being around ₹7.3 Lakhs."
      }
    ],
    "testimonials": [
      {
        "quote": "The course is specially developed for today's IT field with all information regarding the current industry trends, and guidance that a student need. The placement and technical training provided here are just beyond comparison.",
        "name": "Tomin Sahu",
        "role": "NSE IT"
      },
      {
        "quote": "The ideal platform for anyone with a desire to work in IT industry, jetking has helped me and guided my entire path. The faculties and premises are fully equiped with latest technology, an excllent place for learning IT.",
        "name": "Paras Nirmalkar",
        "role": "Axis Bank"
      },
      {
        "quote": "The course is specially developed for today's IT field with all information regarding the current industry trends, and guidance that a student need. The placement and technical training provided here are just beyond comparison.",
        "name": "Mayank Sharma",
        "role": "IDFC Bank"
      }
    ],
    "coursesOffered": [
      "bca-cloud-cyber-security",
      "cloud-computing-engineer-ai",
      "cloud-computing-professional-ai",
      "cloud-cyber-security-engineer",
      "routing-switching-administrator",
      "pc-hardware-support"
    ],
    "seo": {
      "title": "Cloud Computing Courses & Training Institute in Chhattisgarh",
      "description": "Cloud Computing courses in Durg, UG/Diploma in Cloud AI & Cybersecurity with strong placement support, Learn CCNA, AWS, Azure, Linux & more in IT-IMS from Experts"
    },
    "updatedAt": "2026-08-06"
  },
  {
    "slug": "ghaziabad",
    "name": "Jetking Ghaziabad",
    "citySlug": "ghaziabad",
    "addressLine": "Jetking Ghaziabad Learning Centre, C, B, 3rd floor Sharnam Plaza RDC Raj Nagar Near Indian Oil Petrol pump Ghaziabad (UP) 201002.",
    "locality": "Raj Nagar",
    "state": "Uttar Pradesh",
    "pincode": "201002",
    "phone": "+91-9911027722",
    "helpline": "07666830000",
    "email": "ghz@jetking.com",
    "intro": "Join Best Computer Course training Centre Jetking Ghaziabad today, and secure your future with strong placement support on industry-leading IT courses, including Cloud Computing course, Cybersecurity course, Metaverse and Gaming Design, Graphic Design, Animation courses and a comprehensive 3 year BCA degree program in cloud computing & Cyber security in Ghaziabad. Elevate your career prospects with in-demand skills",
    "body": "Join Jetking, India's Leading IT Training Institute Enroll in our Cloud Computing, Cyber Security courses and BCA Degree programs with flexible and easy EMIs. Gain hands-on experience on live projects and open doors to endless career opportunities!\n\nJoin India’s leading and most trusted digital skills institute, with over 79 years of legacy, offering industry-focused programs in Cloud Computing, Cybersecurity, and BCA Degrees, along with job assistance to launch your career.",
    "featuredProgrammes": [
      {
        "title": "Diploma In Cloud Computing with Artificial Intelligence",
        "subtitle": "Career programme",
        "duration": "12 Months",
        "mode": "Offline/Hybrid"
      },
      {
        "title": "Masters of Cloud Computing with Artificial Intelligence",
        "subtitle": "Career programme",
        "duration": "6 Months",
        "mode": "Offline/Hybrid"
      },
      {
        "title": "BCA In Cloud Computing & Cyber Security",
        "subtitle": "Degree programme",
        "duration": "36 Months",
        "mode": "Offline/Hybrid"
      }
    ],
    "placements": [
      {
        "name": "Manish Kumar",
        "company": "Royal Bank of Scotland",
        "package": "1.80 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1004135/file/dc9822b5a8a04a483fb4b5175931b519.png"
      },
      {
        "name": "Ravi Singh",
        "company": "Securelynkx Network",
        "package": "1.84 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1004133/file/b0d80e5d12485b3aaf9ac65cf8fa3cce.png"
      },
      {
        "name": "Sanjay Maithani",
        "company": "Hindustan Systems",
        "package": "2.13 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1004115/file/70838b6888ff90950a1a8bdac12302d0.png"
      },
      {
        "name": "Mayank Tyagi",
        "company": "Royal Bank of Scotland",
        "package": "1.8 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1004130/file/cb2c12fe364fa9ac106ed6e8bcfab2fc.png"
      },
      {
        "name": "Gaurav",
        "company": "AVS Infotech",
        "package": "2.04 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1004128/file/6da437b1e28fa549f46b1e8f9b6b16dd.png"
      },
      {
        "name": "Renu Sharma",
        "company": "Hindustan Systems Co.",
        "package": "1.80 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1004125/file/27ff7c7cbd113582c16e63d99ab5ccb7.png"
      },
      {
        "name": "Vivek Bharti",
        "company": "Lemon Tree Hotel",
        "package": "1.84 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1004123/file/a09b8999afa86c5314c69f93397e4e3d.png"
      },
      {
        "name": "Tarun Kumar",
        "company": "Brandshine Radiance",
        "package": "2.04 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1004120/file/61ec3f65e195b762dd4d98d1e4b9e4fa.png"
      },
      {
        "name": "Sumit Kahshyap",
        "company": "Tech Mahindra",
        "package": "2.40 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1004119/file/a0605c1a9727b6f5250641ee9b35bb6f.png"
      },
      {
        "name": "Rohit Jindal",
        "company": "D-vois Communication",
        "package": "1.80 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1004117/file/d5b2e4b9c12914ee56f4069a6780c81a.png"
      }
    ],
    "faqs": [
      {
        "question": "Can a non IT person do Cloud computing Course?",
        "answer": "If you're not well-versed in technology, cloud computing can seem overwhelming. To navigate this fast-evolving field successfully, it's wise to first develop a solid grasp of IT basics. Building a strong foundation in IT will make your journey into cloud computing much smoother and more manageable."
      },
      {
        "question": "Is cyber security a good career?",
        "answer": "Absolutely! Careers in computing and information technology, especially in cybersecurity, are not only among the highest-paying but also in high demand across the industry."
      },
      {
        "question": "Who is eligible for cyber security?",
        "answer": "To enroll in this course, students need to have completed their 10+2 education in any stream. This program equips students with the essential technical knowledge and skills to safeguard computer networks against malicious attacks."
      },
      {
        "question": "Who is eligible for Cloud computing Courses?",
        "answer": "Students 10+2 and Degrees in non-technical fields such as B.Com., B.A., or finance-related disciplines are also acceptable. Additionally, students who are in their final year of graduation are eligible for the course."
      },
      {
        "question": "What is the salary of Cloud Engineer in India?",
        "answer": "The average salary for a Cloud Engineer in India typically falls between ₹3.0 Lakhs and ₹13.0 Lakhs per year, with the average annual pay being around ₹7.3 Lakhs."
      }
    ],
    "testimonials": [
      {
        "quote": "Before joining Jetking, I was not sure what to do with my career. But after completing the course, I got the right platform to start my career. It's been nearly 5 years and I have never looked back. I am very satisfied with my decision to join Jetking which has proved that there is no disadvantage of being a girl in technical domain.",
        "name": "Preeti Madan",
        "role": "Quatrro"
      },
      {
        "quote": "“Without Jetking, I don’t know where I would be. You made a major difference in my life. All those times that you have gone the extra mile for me, I really did notice. Your belief in me makes me believe in myself.”",
        "name": "Nikhil Pathare",
        "role": "Tata Consultancy Services"
      },
      {
        "quote": "I am very happy with Jetking for the placement assistance, even after my first job. I am grateful for all the guidance and technical knowledge provided. At Jetking we are not only trained in the technical domain as well as I have also improved my communication skills and confidence in appearing for interviews.",
        "name": "Abhishek",
        "role": "IBM-Collabera"
      }
    ],
    "coursesOffered": [
      "bca-cloud-cyber-security",
      "cloud-computing-engineer-ai",
      "cloud-computing-professional-ai",
      "cloud-cyber-security-engineer",
      "routing-switching-administrator",
      "pc-hardware-support"
    ],
    "seo": {
      "title": "Cloud Computing Courses & Training Institute in Ghaziabad",
      "description": "Cloud Computing course in Ghaziabad - UG/Diploma programs in Cloud AI & Cybersecurity with job placement, Learn AWS, Azure & more from Certified Professionals"
    },
    "updatedAt": "2026-08-06"
  },
  {
    "slug": "orai",
    "name": "Jetking Orai",
    "citySlug": "orai",
    "addressLine": "Address 4578, Arya Enclave, 1st Floor, DVC Chauraha, Jhansi Road, Orai, Uttar Pradesh.",
    "locality": "Orai",
    "state": "Uttar Pradesh",
    "pincode": "285001",
    "phone": "08004734968, 6387639978",
    "helpline": "07666830000",
    "email": "orai@jetking.com",
    "intro": "Best Cloud Computing course in Orai - UG/Diploma programs in Cloud AI & Cybersecurity with job placement, Learn AWS, Azure & more from Certified Professionals.",
    "body": "Advanced your Skills and secure your future with Jetking Top Cloud Computing Courses and Cyber Security courses, BCA 3-Year Degree program from Uttar Pradesh along with Ethical Hacking, CCNA, Python Programing and many more offerings at Jetking Orai learning center, Uttar Pradesh.\n\nJoin India’s leading and most trusted digital skills institute, with over 79 years of legacy, offering industry-focused programs in Cloud Computing, Cybersecurity, and BCA Degrees, along with job assistance to launch your career.",
    "featuredProgrammes": [
      {
        "title": "Diploma In Cloud Computing with Artificial Intelligence",
        "subtitle": "Career programme",
        "duration": "12 Months",
        "mode": "Offline/Hybrid"
      },
      {
        "title": "Masters of Cloud Computing with Artificial Intelligence",
        "subtitle": "Career programme",
        "duration": "6 Months",
        "mode": "Offline/Hybrid"
      },
      {
        "title": "BCA In Cloud Computing & Cyber Security",
        "subtitle": "Degree programme",
        "duration": "36 Months",
        "mode": "Offline/Hybrid"
      }
    ],
    "faculty": [
      {
        "name": "Name",
        "title": "Designation",
        "bio": "Qualification: Experience:",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/workspace/vnBgwv/image/12545191/file/e4d56021a3e42abb155f553e4b992264.jpg"
      }
    ],
    "placements": [
      {
        "name": "Sanchit Dherange",
        "company": "Medline India",
        "package": "4.50 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/841724/file/c78b5481e1d7877d02c05371f1eaee80.png"
      },
      {
        "name": "Nayan Oval",
        "company": "Amazon",
        "package": "8.57 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/841722/file/9923b2b8af82b22d1c7ef1c2dc22ece1.png"
      },
      {
        "name": "Parag Petare",
        "company": "Wipro",
        "package": "3.50 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/841721/file/bc11463da155e63bbd7f5e9387103714.png"
      }
    ],
    "faqs": [
      {
        "question": "Who is eligible for Cloud computing Courses?",
        "answer": "Students 10+2 and Degrees in non-technical fields such as B.Com., B.A., or finance-related disciplines are also acceptable. Additionally, students who are in their final year of graduation are eligible for the course."
      },
      {
        "question": "Can a non IT person do Cloud computing Course?",
        "answer": "If you're not well-versed in technology, cloud computing can seem overwhelming. To navigate this fast-evolving field successfully, it's wise to first develop a solid grasp of IT basics. Building a strong foundation in IT will make your journey into cloud computing much smoother and more manageable."
      },
      {
        "question": "Who is eligible for cyber security Courses?",
        "answer": "To enroll in this course, students need to have completed their 10+2 education in any stream. This program equips students with the essential technical knowledge and skills to safeguard computer networks against malicious attacks."
      },
      {
        "question": "Is cyber security a good career?",
        "answer": "Absolutely! Careers in computing and information technology, especially in cybersecurity, are not only among the highest-paying but also in high demand across the industry."
      },
      {
        "question": "What is the salary of Cloud Engineer in Orai, Uttar Pradesh?",
        "answer": "The average salary for a Cloud Engineer in India typically falls between ₹3.0 Lakhs and ₹13.0 Lakhs per year, with the average annual pay being around ₹7.3 Lakhs."
      }
    ],
    "testimonials": [
      {
        "quote": "Before joining Jetking, I was not sure what to do with my career. But after completing the course, I got the right platform to start my career. It's been nearly 5 years and I have never looked back. I am very satisfied with my decision to join Jetking which has proved that there is no disadvantage of being a girl in technical domain.",
        "name": "Preeti Madan",
        "role": "Quatrro"
      },
      {
        "quote": "“Without Jetking, I don’t know where I would be. You made a major difference in my life. All those times that you have gone the extra mile for me, I really did notice. Your belief in me makes me believe in myself.”",
        "name": "Nikhil Pathare",
        "role": "Tata Consultancy Services"
      },
      {
        "quote": "I am very happy with Jetking for the placement assistance, even after my first job. I am grateful for all the guidance and technical knowledge provided. At Jetking we are not only trained in the technical domain as well as I have also improved my communication skills and confidence in appearing for interviews.",
        "name": "Abhishek",
        "role": "IBM-Collabera"
      }
    ],
    "coursesOffered": [
      "bca-cloud-cyber-security",
      "cloud-computing-engineer-ai",
      "cloud-computing-professional-ai",
      "cloud-cyber-security-engineer",
      "routing-switching-administrator",
      "pc-hardware-support"
    ],
    "seo": {
      "title": "Best Cloud Computing Courses & Training Institute in Orai,UP",
      "description": "Best Cloud Computing course in Orai - UG/Diploma programs in Cloud AI & Cybersecurity with job placement, Learn AWS, Azure & more from Certified Professionals."
    },
    "updatedAt": "2026-08-06"
  },
  {
    "slug": "gorakhpur",
    "name": "Jetking Gorakhpur",
    "citySlug": "gorakhpur",
    "addressLine": "Jetking Gorakhpur Learning Center, 1st floor, Near Pratibha Complex, Buxipur, Gorakhpur ( U.P)",
    "locality": "Buxipur",
    "state": "Uttar Pradesh",
    "pincode": "273001",
    "phone": "9628896000",
    "helpline": "07666830000",
    "email": "gorakhpur@jetking.com",
    "intro": "Jetking Gorakhpur offers Degree & Diploma courses in Cloud, AI & Cybersecurity, Animation, Data Science with job placement. Learn from certified professionals.",
    "body": "Boost your Skills and secure your future with Jetking Top Cloud Computing Courses and Cyber Security courses, BCA 3-Year Degree program from Uttar Pradesh along with Ethical Hacking, CCNA, Python Programing and many more offerings at Jetking Gorakhpur learning center, Uttar Pradesh.\n\nJoin India’s leading and most trusted digital skills institute, with over 79 years of legacy, offering industry-focused programs in Cloud Computing, Cybersecurity, and BCA Degrees, along with job assistance to launch your career.",
    "featuredProgrammes": [
      {
        "title": "BCA In Cloud Computing & Cyber Security",
        "subtitle": "Degree programme",
        "duration": "36 Months",
        "mode": "Offline/Hybrid"
      }
    ],
    "faculty": [
      {
        "name": "Sandeep Gupta",
        "title": "Technical Faculty",
        "bio": "Certified in Hardware & Networking along with Diploma in Networking and CCNA certification. Having more than 4 years of teaching experience in MCSA and Network Essentials. Capable of handling classes, doubt-clearing sessions, and keeping students actively engaged throughout the sessions.",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/workspace/vnBgwv/image/20232303/file/7b4af4a49193b16cc5ea3a009ab60f8e.png"
      },
      {
        "name": "Naseeb Ali",
        "title": "Technical Faculty",
        "bio": "MBA in Information Technology. ADHNS (Advanced Diploma in Hardware, Networking & Information Security) from NIELIT, Gorakhpur (MMMUT Campus). Having 17 years of teaching experience in Hardware & Networking at Jetking with strong expertise in handling labs and advanced technical sessions.",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/workspace/vnBgwv/image/20232332/file/8e9711388b632abb4f74b9a8f3f96eff.png"
      },
      {
        "name": "Mukta Gupta",
        "title": "Personality Development Faculty & Placement Manager",
        "bio": "M.A. in English and B.Ed from D.D.U. Gorakhpur University. Having 15 years of teaching experience in Personality Development and Interview Skills training. Successfully guided and placed 1000+ students in various IT companies by preparing them for job interviews and corporate readiness.",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/workspace/vnBgwv/image/20232336/file/8f75ece8b2891f4d59b8ef7d286d8e46.png"
      }
    ],
    "placements": [
      {
        "name": "Sanchit Dherange",
        "company": "Medline India",
        "package": "4.50 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/841724/file/c78b5481e1d7877d02c05371f1eaee80.png"
      },
      {
        "name": "Nayan Oval",
        "company": "Amazon",
        "package": "8.57 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/841722/file/9923b2b8af82b22d1c7ef1c2dc22ece1.png"
      },
      {
        "name": "Parag Petare",
        "company": "Wipro",
        "package": "3.50 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/841721/file/bc11463da155e63bbd7f5e9387103714.png"
      }
    ],
    "faqs": [
      {
        "question": "Who is eligible for Cloud computing course?",
        "answer": "Students 10+2 and Degrees in non-technical fields such as B.Com., B.A., or finance-related disciplines are also acceptable. Additionally, students who are in their final year of graduation are eligible for the course."
      },
      {
        "question": "Can a non IT person do Cloud computing Course?",
        "answer": "If you're not well-versed in technology, cloud computing can seem overwhelming. To navigate this fast-evolving field successfully, it's wise to first develop a solid grasp of IT basics. Building a strong foundation in IT will make your journey into cloud computing much smoother and more manageable."
      },
      {
        "question": "Who is eligible for cyber security course?",
        "answer": "To enroll in this course, students need to have completed their 10+2 education in any stream. This program equips students with the essential technical knowledge and skills to safeguard computer networks against malicious attacks."
      },
      {
        "question": "Is cyber security a good career?",
        "answer": "Absolutely! Careers in computing and information technology, especially in cybersecurity, are not only among the highest-paying but also in high demand across the industry."
      },
      {
        "question": "What is the salary of Cloud Engineer in Uttar Pradesh?",
        "answer": "The average salary for a Cloud Engineer in India typically falls between ₹3.0 Lakhs and ₹13.0 Lakhs per year, with the average annual pay being around ₹7.3 Lakhs."
      }
    ],
    "testimonials": [
      {
        "quote": "Before joining Jetking, I was not sure what to do with my career. But after completing the course, I got the right platform to start my career. It's been nearly 5 years and I have never looked back. I am very satisfied with my decision to join Jetking which has proved that there is no disadvantage of being a girl in technical domain.",
        "name": "Preeti Madan",
        "role": "Quatrro"
      },
      {
        "quote": "“Without Jetking, I don’t know where I would be. You made a major difference in my life. All those times that you have gone the extra mile for me, I really did notice. Your belief in me makes me believe in myself.”",
        "name": "Nikhil Pathare",
        "role": "Tata Consultancy Services"
      },
      {
        "quote": "I am very happy with Jetking for the placement assistance, even after my first job. I am grateful for all the guidance and technical knowledge provided. At Jetking we are not only trained in the technical domain as well as I have also improved my communication skills and confidence in appearing for interviews.",
        "name": "Abhishek",
        "role": "IBM-Collabera"
      }
    ],
    "coursesOffered": [
      "bca-cloud-cyber-security",
      "cloud-computing-engineer-ai",
      "cloud-computing-professional-ai",
      "cloud-cyber-security-engineer",
      "routing-switching-administrator",
      "pc-hardware-support"
    ],
    "seo": {
      "title": "Best Cloud Computing, AI, CyberSecurity & IT Training Centre",
      "description": "Jetking Gorakhpur offers Degree & Diploma courses in Cloud, AI & Cybersecurity, Animation, Data Science with job placement. Learn from certified professionals."
    },
    "updatedAt": "2026-08-06"
  },
  {
    "slug": "gwalior",
    "name": "Jetking Gwalior",
    "citySlug": "gwalior",
    "addressLine": "T, 3rd Floor, On, Nandgiri Tower, Sai Baba Mandir Rd, above HDFC Bank, PhoolBagh, Lashkar, Gwalior, Madhya Pradesh 474002",
    "locality": "Lashkar",
    "state": "Madhya Pradesh",
    "pincode": "474002",
    "phone": "09039393444",
    "helpline": "07666830000",
    "email": "gwalior@jetking.com",
    "intro": "Cloud Computing courses in Gwalior M.P, UG/Diploma in Cloud AI & Cybersecurity with strong placement support, Learn CCNA, AWS, Azure, Linux from Industry Experts",
    "body": "Join India’s leading and most trusted digital skills institute, with over 79 years of legacy, offering industry-focused programs in Cloud Computing, Cybersecurity, and BCA Degrees, along with job assistance to launch your career.\n\nI am very happy with Jetking for the placement assistance, even after my first job. I am grateful for all the guidance and technical knowledge provided. At Jetking we are not only trained in the technical domain as well as I have also improved my communication skills and confidence in appearing for interviews.",
    "featuredProgrammes": [
      {
        "title": "Diploma In Cloud Computing with Artificial Intelligence",
        "subtitle": "Career programme",
        "duration": "12 Months",
        "mode": "Offline/Hybrid"
      },
      {
        "title": "Masters of Cloud Computing with Artificial Intelligence",
        "subtitle": "Career programme",
        "duration": "6 Months",
        "mode": "Offline/Hybrid"
      },
      {
        "title": "BCA In Cloud Computing & Cyber Security",
        "subtitle": "Degree programme",
        "duration": "36 Months",
        "mode": "Offline/Hybrid"
      }
    ],
    "placements": [
      {
        "name": "Sumit Rai",
        "company": "Hi Tech Informatic Pvt Ltd",
        "package": "4 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1042656/file/8f4a52160fe4b95f2f87a923220b850f.png"
      },
      {
        "name": "Dev Karan Sharma",
        "company": "iBus Technologies Pvt Ltd",
        "package": "8.57 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1042657/file/46d923977481832a85093081f6f5ee0b.png"
      },
      {
        "name": "Nitin Kumar",
        "company": "CSS",
        "package": "5.40 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1042658/file/079d7dce0e6dbcea3b34850c86c30661.png"
      },
      {
        "name": "Dharmesh Khushwah",
        "company": "WNS",
        "package": "2.40 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1042659/file/6392ddab4abe3a7fb44d510bd30d89d3.png"
      },
      {
        "name": "Harendra Singh",
        "company": "Optimal Telemedia Pvt Ltd",
        "package": "3.2 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1042660/file/067cfa643850809783c51f1f33ef828a.png"
      },
      {
        "name": "Suhil Khan",
        "company": "Quess",
        "package": "3 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1042661/file/6121edb3bd44d0dee47ae65eeb1ef337.png"
      },
      {
        "name": "Abhishek Rajawat",
        "company": "Mgashop",
        "package": "2.80 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1042662/file/59af486b84dda4b280718a1b38c0b067.png"
      },
      {
        "name": "Neetesh Mahor",
        "company": "Aforeserve",
        "package": "3.10 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1042663/file/7b997840522e119ef4674adb8682f29e.png"
      },
      {
        "name": "Prashant Sharma",
        "company": "Aujas Cybersecurity",
        "package": "9 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1042664/file/f55185ee1dba573c1919c16b5db612d8.png"
      },
      {
        "name": "Gaurav Tripathi",
        "company": "Aforeserve",
        "package": "3.10 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1042665/file/cb9a5e0470e5da926687920bb02ee376.png"
      },
      {
        "name": "Pratham Goyal",
        "company": "Trackit Consulting",
        "package": "8.57 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1042666/file/f05e855e40eac4781e4bd78478e9aceb.png"
      },
      {
        "name": "Jorawar Singh",
        "company": "Hi Tech Informatic",
        "package": "3.80 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1042667/file/c9e822dec8c04615c33629f751ed217a.png"
      },
      {
        "name": "Vijay Rathore",
        "company": "WNS",
        "package": "3.40 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1042668/file/a7dd7615f4c6dafde0fc1cc9028b0a14.png"
      },
      {
        "name": "Aman Yadav",
        "company": "Progressive Infotech Pvt Ltd",
        "package": "8.57 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1042669/file/4719ad4d54bbe20e2bdfb77cacd007a9.png"
      },
      {
        "name": "Atul Jha",
        "company": "Hi Tech Informatic Pvt Ltd",
        "package": "3.2 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1042670/file/a82998b6b102aa9fa4e5e45e5e6ecbf7.png"
      },
      {
        "name": "Abhishek Sharma",
        "company": "Corporate Infotech Pvt Ltd",
        "package": "4.50 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1042671/file/c6e1dffe6cda49a0f107c2c73324e7be.png"
      },
      {
        "name": "Neetesh Sigh Jadon",
        "company": "WNS",
        "package": "4 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1042672/file/42bf731933e279642029caa4e83cafaa.png"
      }
    ],
    "faqs": [
      {
        "question": "Who is eligible for Cloud Computing Ai course?",
        "answer": "To enroll in this course, students need to have completed their HSC, 10+2 education in any stream. This program equips students with the essential technical knowledge."
      },
      {
        "question": "Is cyber security a good career for freshers?",
        "answer": "Careers in computing and information technology, especially in cybersecurity, are not only among the highest-paying but also in high demand across the industry."
      },
      {
        "question": "Is Cloud computing a good career?",
        "answer": "Launching your career in cloud computing in 2024 opens up incredible opportunities for growth, professional development, and job stability. By acquiring the right skills and expertise, you can dive into a rewarding career path in a dynamic industry that's driving the future of technology and global business."
      },
      {
        "question": "Can a non IT person do Cloud computing Course?",
        "answer": "If you're not well-versed in technology, cloud computing can seem overwhelming. To navigate this fast-evolving field successfully, it's wise to first develop a solid grasp of IT basics. Building a strong foundation in IT will make your journey into cloud computing much smoother and more manageable."
      },
      {
        "question": "What is the salary of Cloud computing Engineer?",
        "answer": "The average salary for a Cloud Engineer in India typically falls between ₹3.3 Lakhs and ₹13.0 Lakhs per year, with the average annual pay being around ₹7.5 Lakhs."
      }
    ],
    "testimonials": [
      {
        "quote": "Before joining Jetking, I was not sure what to do with my career. But after completing the course, I got the right platform to start my career. It's been nearly 5 years and I have never looked back. I am very satisfied with my decision to join Jetking which has proved that there is no disadvantage of being a girl in technical domain.",
        "name": "Preeti Madan",
        "role": "Quatrro"
      },
      {
        "quote": "“Without Jetking, I don’t know where I would be. You made a major difference in my life. All those times that you have gone the extra mile for me, I really did notice. Your belief in me makes me believe in myself.”",
        "name": "Nikhil Pathare",
        "role": "Tata Consultancy Services"
      },
      {
        "quote": "I am very happy with Jetking for the placement assistance, even after my first job. I am grateful for all the guidance and technical knowledge provided. At Jetking we are not only trained in the technical domain as well as I have also improved my communication skills and confidence in appearing for interviews.",
        "name": "Abhishek",
        "role": "IBM-Collabera"
      }
    ],
    "coursesOffered": [
      "bca-cloud-cyber-security",
      "cloud-computing-engineer-ai",
      "cloud-computing-professional-ai",
      "cloud-cyber-security-engineer",
      "routing-switching-administrator",
      "pc-hardware-support"
    ],
    "seo": {
      "title": "Best Cloud Computing Courses & Training Institute in Gwalior",
      "description": "Cloud Computing courses in Gwalior M.P, UG/Diploma in Cloud AI & Cybersecurity with strong placement support, Learn CCNA, AWS, Azure, Linux from Industry Experts"
    },
    "updatedAt": "2026-08-06"
  },
  {
    "slug": "gurgaon",
    "name": "Jetking Gurgaon",
    "citySlug": "gurgaon",
    "addressLine": "C-1, 2nd Floor, Old DLF Colony, Sector 14, MG Road, Opposite Govt. ITI College, Gurgaon",
    "locality": "Sector 14",
    "state": "Haryana",
    "pincode": "122001",
    "phone": "09910053939 / 08800927999",
    "helpline": "07666830000",
    "email": "gur@jetking.com",
    "headline": "Best Cloud Computing and AI Training Institute In Gurgaon",
    "intro": "Best Cloud Computing and AI Training Institute In Gurgaon",
    "body": "Boost Your Technical Skills and secure your future with Jetking Gurgaon, Top Cloud Computing Courses with AI and Cyber Security courses, BCA 3 Year Degree program with placement support from Gurgaon along with Ethical Hacking, CCNA, Python Programing and many more offerings at Jetking Gurgaon learning center.\n\nJoin Jetking, India's Leading IT Training Institute Enroll now in Best IT Training institute and Courses in Gurgaon, Cyber Security courses and BCA Degree programs with flexible and easy EMIs. Gain hands-on experience on live projects and open doors to endless career opportunities!",
    "featuredProgrammes": [
      {
        "title": "Diploma In Cloud Computing with Artificial Intelligence",
        "subtitle": "Career programme",
        "duration": "12 Months",
        "mode": "Offline/Hybrid"
      },
      {
        "title": "Masters of Cloud Computing with Artificial Intelligence",
        "subtitle": "Career programme",
        "duration": "6 Months",
        "mode": "Offline/Hybrid"
      },
      {
        "title": "BCA In Cloud Computing & Cyber Security",
        "subtitle": "Degree programme",
        "duration": "36 Months",
        "mode": "Offline/Hybrid"
      }
    ],
    "faculty": [
      {
        "name": "Meenakshi Ahuja",
        "title": "Center Director",
        "bio": "Jetking Partner",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/workspace/vnBgwv/image/19344296/file/697a6b77a0f9b8a5a6f26c18ba278d4d.png"
      },
      {
        "name": "Ram Hans Singh",
        "title": "Center Manager",
        "bio": "Qualification: Graduate Experience: 17 years Specialisation: Good Leadership",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/workspace/vnBgwv/image/10282835/file/cc3e4813e1c2f7e39e5149cf2292c54b.png"
      },
      {
        "name": "Mushtaq Ali Khan",
        "title": "Technical Head",
        "bio": "Qualification: Electronics & Networking Engineer Experience: 20 Years Specialisation: Hardware, Operating Systems, Networking, CCNA, Server, Cyber Security, Linux, Red Hat, Python, AWS, AI, Ethical Hacking",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/workspace/vnBgwv/image/19344437/file/ac6be92538edc2550e1cb37e24aaf84e.png"
      },
      {
        "name": "Pooja Sharma",
        "title": "Technical Trainer",
        "bio": "Qualification: Graduate Experience: 17 Years of Experience Specialisation: Hardware, Operating Systems, Networking, CCNA, Linux, Red Hat, Python, AWS, Windows Server, MS-Outlook, Office365",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/workspace/vnBgwv/image/10282832/file/4cf447c35d6bb825587902dbfd9ab3be.png"
      },
      {
        "name": "Shivani Jha",
        "title": "Technical trainer",
        "bio": "Qualification: BCA, MCA Experience: 15 Years Specialisation: Operating Systems, Networking, CCNA, Server, Cyber security, Linux, Red Hat, Python, AWS, AI",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/workspace/vnBgwv/image/19344480/file/2a3ac082efcdf76682be0bdf9d39c52d.png"
      },
      {
        "name": "Shalu Singh",
        "title": "Counselor",
        "bio": "Qualification: Graduate Experience: 11 years in Placements and Counseling Specialisation: Communication Skills",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/workspace/vnBgwv/image/10282834/file/ff8e7006f2a9938b197dba7e3b98a740.png"
      },
      {
        "name": "Deepti Bisht",
        "title": "Placement & English/PD Executive",
        "bio": "Qualification: Mass. Communication Experience: 3 Years Specialisation: Good Communication",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/workspace/vnBgwv/image/19344514/file/d3cf21c4854f2bc3da09815332c9e449.png"
      },
      {
        "name": "Mahima",
        "title": "Front desk and telecaller",
        "bio": "Qualification: Graduate Experience: 3 Years Specialisation: Good Communication",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/workspace/vnBgwv/image/19344582/file/8b7536147492474a47440d70bd8c896a.png"
      }
    ],
    "placements": [
      {
        "name": "Aurobinda",
        "company": "Airtel",
        "package": "Engineer ORT",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/workspace/vnBgwv/image/19357416/file/d8df78191d494d8df05425d6a1659dde.png"
      },
      {
        "name": "Akhilesh Upadhyay",
        "company": "Inspace",
        "package": "IT Engineer",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1039308/file/974b235c5ac461c7937c2541cf48015d.png"
      },
      {
        "name": "Sumit Yadav",
        "company": "Rackspace",
        "package": "IT Engineer",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1039307/file/23d1f2995bbaa7ba952f92ebe3a01a8c.png"
      },
      {
        "name": "Manish Kumar Yadav",
        "company": "Citycart",
        "package": "Desktop Engineer",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1039306/file/df499e2a9509a03d25342d3d799abc01.png"
      },
      {
        "name": "Vaibhav Yadav",
        "company": "HP",
        "package": "Desktop Engineer",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1039305/file/1b63a972687514fdb4ac5615f9e4a99e.png"
      },
      {
        "name": "Devanshu Tongra",
        "company": "Elcamino Software",
        "package": "IT Engineer",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1039304/file/10262407efddb169a09757568adddc20.png"
      },
      {
        "name": "Harikesh Kumar",
        "company": "Airtel",
        "package": "Deputy Manager",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/workspace/vnBgwv/image/19357471/file/d567b08eef9effa9a2fb45e768e110ec.png"
      },
      {
        "name": "Vikki",
        "company": "WNS global services Pvt Ltd",
        "package": "Desktop Engineer",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/workspace/vnBgwv/image/19357482/file/6957e829986472ebd3a9cff5beed199d.png"
      },
      {
        "name": "Jitendra Kumar",
        "company": "Flipkart",
        "package": "Support Engineer",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/workspace/vnBgwv/image/19357489/file/fb560fbbbff1526161d8691d5b6be91e.png"
      },
      {
        "name": "Ravi Kumar",
        "company": "Delhivery Ltd",
        "package": "IT associate",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/workspace/vnBgwv/image/19357492/file/12a1f4185e5c56cfdf9e18f150910169.png"
      },
      {
        "name": "Surya Prakash Sharma",
        "company": "RedBus",
        "package": "SRE",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/workspace/vnBgwv/image/19357507/file/3d6dace09a2830b6ac7d953d9bad16c9.png"
      },
      {
        "name": "Rohit",
        "company": "Sysnet",
        "package": "4.25 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1039303/file/7cad99849feba92fe328da8ccb739884.png"
      },
      {
        "name": "Vikram Yadav",
        "company": "Tata Communications",
        "package": "Best In Industry",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1039302/file/db4c16d16dc16da6312ee834cf443951.png"
      },
      {
        "name": "Ajay Kumar",
        "company": "Final Search",
        "package": "Best In Industry",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1039301/file/8b363ac8a5a7716398a5eeb0d6f7645a.png"
      },
      {
        "name": "Sagar Kumar",
        "company": "Smart Systems Solution",
        "package": "1.68 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1039300/file/0f8c39eda70217ead8a78387ba78e24a.png"
      },
      {
        "name": "Sahil Sharma",
        "company": "Concentrix",
        "package": "Best In Industry",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1039297/file/ba213a7301fcbc31add5def24d33dd59.png"
      },
      {
        "name": "Yash Kumar",
        "company": "ITCones e-Solution",
        "package": "2.27 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1039296/file/fde2f42794a7f62f274e970115306a7c.png"
      },
      {
        "name": "Sahil",
        "company": "Kochar Tech",
        "package": "Best In Industry",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1039295/file/500fb7c63608d611a0a31497e0982f0a.png"
      },
      {
        "name": "Deepanshu",
        "company": "Ware System Connect",
        "package": "2.64 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1039294/file/c70d19c46985b8ca99a2e1e14b9aa78a.png"
      },
      {
        "name": "Mukesh Kumar",
        "company": "IP Biologicals Ltd",
        "package": "4.22 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1039293/file/d20674a6b55c952e6251ed32be803238.png"
      },
      {
        "name": "Sachin",
        "company": "Jetking Technologies",
        "package": "2.16 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1039292/file/9f3eb2da7de57765eade9497ade973c7.png"
      },
      {
        "name": "Jai Kumar",
        "company": "HP",
        "package": "2 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1039290/file/c352fc887787362c668595fc04ede67f.png"
      },
      {
        "name": "Pallav",
        "company": "Kochar Tech",
        "package": "Best In Industry",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1039287/file/2ef9b26d2256f1a250cffbfdf241c515.png"
      }
    ],
    "faqs": [
      {
        "question": "Can a non IT person do Cloud computing Course in Jetking Gurgaon?",
        "answer": "If you're not well-versed in technology, cloud computing can seem overwhelming. To navigate this fast-evolving field successfully, it's wise to first develop a solid grasp of IT basics. Building a strong foundation in IT will make your journey into cloud computing much smoother and more manageable."
      },
      {
        "question": "Who is eligible for cyber security in Gurgaon?",
        "answer": "To enroll in this course, students need to have completed their 10+2 education in any stream. This program equips students with the essential technical knowledge and skills to safeguard computer networks against malicious attacks."
      },
      {
        "question": "Who is eligible for Cloud computing?",
        "answer": "Students 10+2 and Degrees in non-technical fields such as B.Com., B.A., or finance-related disciplines are also acceptable. Additionally, students who are in their final year of graduation are eligible for the course."
      },
      {
        "question": "What is the salary of Cloud Engineer in Gurgaon?",
        "answer": "The average salary for a Freshers Cloud Engineer in India typically falls between ₹3.0 Lakhs and ₹13.0 Lakhs per year, with the average annual pay being around ₹7.3 Lakhs."
      }
    ],
    "testimonials": [
      {
        "quote": "Jetking, an institute makes me proud today in tech industry. This was a place where I joined a fresher and got a job. It was a long journey, but I can't forgot Jetking who made my technical carrier into future growth. At that time, I learned computer Hardware and Networking, Windows Server 2003, including CCNA, and RHEL 5. I can remember Kishore Sir who taught me CCNA. Thank you to my all mentors.",
        "name": "Aurobinda"
      },
      {
        "quote": "I have completed my JKDNA course from Gurgaon Jetking. They helped me a lot to grow my technical skills. Thank you 😊 डगमागाते कदमों को संभल जाने का हुनर सिखाता है जेटकिंग। राहों में कितनी भी मुश्किलें हो दिल में जुनून जागाता है जेटकिंग। लक्ष्य को पाने का हुनर तो कुछ भी नहीं शिखर पर जाने का हुनर सिखाता है जेटकिंग।",
        "name": "Rithil Bansal",
        "role": "Rackspace Technology"
      },
      {
        "quote": "I made the right decision for my career. I got the Job from Jetking Gurgaon, even before my final exam. I am grateful for all the guidance & technical knowledge provided to me in the last six months. I sincerely thank the Jetking Gurgaon placement department.",
        "name": "Sagar Kumar",
        "role": "Smart Systems Solution"
      }
    ],
    "coursesOffered": [
      "bca-cloud-cyber-security",
      "cloud-computing-engineer-ai",
      "cloud-computing-professional-ai",
      "cloud-cyber-security-engineer",
      "routing-switching-administrator",
      "pc-hardware-support"
    ],
    "seo": {
      "title": "Best Cloud Computing with AI Training in Gurgaon",
      "description": "Best Cloud Computing courses in Jetking Gurgaon, UG/Diploma in Cloud AI & Cybersecurity with strong placement support, Learn CCNA, AWS, Azure, Linux & more."
    },
    "updatedAt": "2026-08-06"
  },
  {
    "slug": "indore",
    "name": "Jetking Indore",
    "citySlug": "indore",
    "addressLine": "310, 3rd Floor, Tulsi Tower, South Tukoganj, A.B Road, Geeta Bhavan Square, Madhya Pradesh, 452001",
    "locality": "South Tukoganj",
    "state": "Madhya Pradesh",
    "pincode": "452001",
    "phone": "06262606077",
    "helpline": "07666830000",
    "email": "ind@jetking.com",
    "intro": "Cloud Computing courses in Madhya Pradesh, UG/Diploma in Cloud AI & Cybersecurity with strong placement support, Learn CCNA, AWS, Azure, Linux from Industry Experts",
    "body": "Join India’s leading and most trusted digital skills institute, with over 79 years of legacy, offering industry-focused programs in Cloud Computing, Cybersecurity, and BCA Degrees, along with job assistance to launch your career.\n\nI am very happy with Jetking for the placement assistance, even after my first job. I am grateful for all the guidance and technical knowledge provided. At Jetking we are not only trained in the technical domain as well as I have also improved my communication skills and confidence in appearing for interviews.",
    "featuredProgrammes": [
      {
        "title": "Diploma In Cloud Computing with Artificial Intelligence",
        "subtitle": "Career programme",
        "duration": "12 Months",
        "mode": "Offline/Hybrid"
      },
      {
        "title": "Masters of Cloud Computing with Artificial Intelligence",
        "subtitle": "Career programme",
        "duration": "6 Months",
        "mode": "Offline/Hybrid"
      },
      {
        "title": "BCA In Cloud Computing & Cyber Security",
        "subtitle": "Degree programme",
        "duration": "36 Months",
        "mode": "Offline/Hybrid"
      }
    ],
    "faculty": [
      {
        "name": "Varsha Rathore",
        "title": "Center Director",
        "bio": "Qualification: MSC, B.Ed, M.ed and PHD Holder Experience: 8 Years+",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/workspace/vnBgwv/image/16914361/file/f48a5a2b76972995f2d46c2e060b60c1.png"
      },
      {
        "name": "Mohit Sharma",
        "title": "Center Manager",
        "bio": "Qualification: B.Tech, M.Tech and PHD Experience: 10 Years+",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/workspace/vnBgwv/image/16914609/file/d15a66041c671eeb7bcac174dbdf4008.png"
      },
      {
        "name": "Deepak Kumar Vyas",
        "title": "Asst. Center Manager",
        "bio": "SCSA 9 ,10 (Sun Certified System Administrator 9 & 10.CCNA, Ethical hacking, Security, Network, PD, Windows, RedHat Linux (SME) BE & Linux Expert. Experience: 30 years + in field as well corporate trainings",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/workspace/vnBgwv/image/16914196/file/a429d13f2f8a1fcbb96facbfbd49a791.png"
      },
      {
        "name": "Dipendr awasthi",
        "title": "Cyber securty expert",
        "bio": "B.Tech in Computing Diploma in Advanced Computing CCNA Certified in Routing & Switching Certification in Cyber Security Experience: +10 years",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/workspace/vnBgwv/image/16914223/file/c5da50f1ea4d38e0ab5e4045e47a4eb9.png"
      },
      {
        "name": "Gaurav Dubey",
        "title": "Technical Faculty",
        "bio": "Master of Computer Application from RGPV University CCNA - Cisco Certified Network Associates Experience: 11 Years of Experience in the field of Computer Hardware & Networking",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/workspace/vnBgwv/image/9736844/file/c79d9dc3723a4be430884a82fed3898e.png"
      },
      {
        "name": "Lucky sen",
        "title": "Hardware and network expert",
        "bio": "Qulification: B.Tech M.Tech Experience: 5 years",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/workspace/vnBgwv/image/16914683/file/5e5a9dad20ba8ea888e8f13683787f0d.png"
      },
      {
        "name": "Kusum nagar",
        "title": "Marketing expert",
        "bio": "Qulifications: MbA Experience: 8 years",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/workspace/vnBgwv/image/16914645/file/cec351077b3f141e9bb8b1519512d1e0.png"
      },
      {
        "name": "Anjali Mukesh Dhakate",
        "title": "Academic Counselor",
        "bio": "Qualification: BSc, MCM Experience: 10+ years",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/workspace/vnBgwv/image/16916773/file/7a1ae3865c3f06987ea0b0f147950b8f.png"
      }
    ],
    "placements": [
      {
        "name": "Naman",
        "company": "Medline India",
        "package": "4.50 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/972832/file/4361737d2702062ac5a07b1d0b73b726.png"
      },
      {
        "name": "Dheeraj",
        "company": "Amazon",
        "package": "8.57 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/972830/file/a1f89a71d5e22cde06eb9ebd706118d2.png"
      },
      {
        "name": "Lokendra",
        "company": "Wipro",
        "package": "3.50 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/972825/file/c95fb546c3205f37347991443b586b81.png"
      },
      {
        "name": "Adarsh",
        "company": "Medline India",
        "package": "4.50 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/972824/file/ed3f496f7d647a6411f68a887ea92d09.png"
      },
      {
        "name": "Nayan Oval",
        "company": "Amazon",
        "package": "8.57 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/841722/file/9923b2b8af82b22d1c7ef1c2dc22ece1.png"
      },
      {
        "name": "Parag Petare",
        "company": "Wipro",
        "package": "3.50 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/841721/file/bc11463da155e63bbd7f5e9387103714.png"
      }
    ],
    "faqs": [
      {
        "question": "Who is eligible for cyber security?",
        "answer": "To enroll in this course, students need to have completed their HSC, 10+2 education in any stream. This program equips students with the essential technical knowledge and skills to safeguard computer networks against malicious attacks."
      },
      {
        "question": "Is Cloud computing a good career?",
        "answer": "Launching your career in cloud computing in 2024 opens up incredible opportunities for growth, professional development, and job stability. By acquiring the right skills and expertise, you can dive into a rewarding career path in a dynamic industry that's driving the future of technology and global business."
      },
      {
        "question": "Is cyber security a good career?",
        "answer": "Absolutely! Careers in computing and information technology, especially in cybersecurity, are not only among the highest-paying but also in high demand across the industry."
      },
      {
        "question": "Can a non IT person do Cloud computing Course?",
        "answer": "If you're not well-versed in technology, cloud computing can seem overwhelming. To navigate this fast-evolving field successfully, it's wise to first develop a solid grasp of IT basics. Building a strong foundation in IT will make your journey into cloud computing much smoother and more manageable."
      },
      {
        "question": "What is the salary of Cloud computing Engineer?",
        "answer": "The average salary for a Cloud Engineer in India typically falls between ₹3.0 Lakhs and ₹13.0 Lakhs per year, with the average annual pay being around ₹7.3 Lakhs."
      }
    ],
    "testimonials": [
      {
        "quote": "Before joining Jetking, I was not sure what to do with my career. But after completing the course, I got the right platform to start my career. It's been nearly 5 years and I have never looked back. I am very satisfied with my decision to join Jetking which has proved that there is no disadvantage of being a girl in technical domain.",
        "name": "Preeti Madan",
        "role": "Quatrro"
      },
      {
        "quote": "“Without Jetking, I don’t know where I would be. You made a major difference in my life. All those times that you have gone the extra mile for me, I really did notice. Your belief in me makes me believe in myself.”",
        "name": "Nikhil Pathare",
        "role": "Tata Consultancy Services"
      },
      {
        "quote": "I am very happy with Jetking for the placement assistance, even after my first job. I am grateful for all the guidance and technical knowledge provided. At Jetking we are not only trained in the technical domain as well as I have also improved my communication skills and confidence in appearing for interviews.",
        "name": "Abhishek",
        "role": "IBM-Collabera"
      }
    ],
    "coursesOffered": [
      "bca-cloud-cyber-security",
      "cloud-computing-engineer-ai",
      "cloud-computing-professional-ai",
      "cloud-cyber-security-engineer",
      "routing-switching-administrator",
      "pc-hardware-support"
    ],
    "seo": {
      "title": "Best Cloud Computing Courses & Training Institute in Indore",
      "description": "Cloud Computing courses in Madhya Pradesh, UG/Diploma in Cloud AI & Cybersecurity with strong placement support, Learn CCNA, AWS, Azure, Linux from Industry Experts"
    },
    "updatedAt": "2026-08-06"
  },
  {
    "slug": "jammu",
    "name": "Jetking Jammu",
    "citySlug": "jammu",
    "addressLine": "17 A/C Gandhi Nagar (Behind Spice Food Court Opp. Women College) Jammu",
    "locality": "Gandhi Nagar",
    "state": "Jammu and Kashmir",
    "pincode": "180004",
    "phone": "09797487448",
    "helpline": "07666830000",
    "email": "jammu@jetking.com",
    "intro": "Join Jetking, India's Leading IT Training Institute Enroll now in the Best IT training Institute in Jammu for Cloud Computing courses, Cyber Security courses and BCA Degree programs with flexible EMIs. Gain hands-on experience on live projects and open doors to endless career opportunities!",
    "body": "Advanced your expertise and secure your future with Jetking top notch Cloud Computing  with A.I and Cyber Security courses, BCA 3 Year Degree program, Ethical Hacking Course, CCNA, Python Programing and many more Top IT Courses offerings at Jammu Jetking Learning Center.\n\nJoin Jetking, India's Leading IT Training Institute Enroll now in the Best IT training Institute in Jammu for Cloud Computing courses, Cyber Security courses and BCA Degree programs with flexible EMIs. Gain hands-on experience on live projects and open doors to endless career opportunities!",
    "featuredProgrammes": [
      {
        "title": "Diploma In Cloud Computing with Artificial Intelligence",
        "subtitle": "Career programme",
        "duration": "12 Months",
        "mode": "Offline/Hybrid"
      },
      {
        "title": "Masters of Cloud Computing with Artificial Intelligence",
        "subtitle": "Career programme",
        "duration": "6 Months",
        "mode": "Offline/Hybrid"
      },
      {
        "title": "BCA In Cloud Computing & Cyber Security",
        "subtitle": "Degree programme",
        "duration": "36 Months",
        "mode": "Offline/Hybrid"
      }
    ],
    "faculty": [
      {
        "name": "Sumeet Kumar",
        "title": "Technical Faculty",
        "bio": "B Sc computer science graduate. Total teaching experience of more than 8 years. Capable of handling classes and doubt clearing and engaging students throughout his class.",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1011260/file/50eab894349e25c3dd566be76329e261.png"
      },
      {
        "name": "Jagdeep Singh",
        "title": "Technical Faculty",
        "bio": "BCA graduate and Certified in CCNA. Total teaching experience of more than 8 years. Capable of handling classes and doubt clearing and engaging students throughout his class.",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1011259/file/49df06c43ee3ed733f91487da68379f6.png"
      },
      {
        "name": "Vikas Dogra",
        "title": "Technical Faculty",
        "bio": "BCA graduate. Total teaching experience of more than 5 years. Capable of handling classes and doubt clearing and engaging students throughout his class.",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1011264/file/5f396c9c0cfce2665d7fde7e0b7420e1.png"
      }
    ],
    "placements": [
      {
        "name": "Anish Tikoo",
        "company": "Micronova Infotex",
        "package": "Best In Industry",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1011258/file/5d53b0d018d8f1d1bbed9b022e70e881.png"
      },
      {
        "name": "Aryan Dogra",
        "company": "Taj Vivanta",
        "package": "Best In Industry",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1011262/file/8aadb960047811fd063251e4843a81c0.png"
      },
      {
        "name": "Mayank Sundhan",
        "company": "Sun Pharma",
        "package": "Best In Industry",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1011261/file/138a53813f7f2e2ece03437bb5b18590.png"
      },
      {
        "name": "Paras Sharma",
        "company": "Jio",
        "package": "Best In Industry",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1011263/file/bb1a58a267b962cd6c4ed280dd9163d4.png"
      },
      {
        "name": "Vishal Koul",
        "company": "Amazon",
        "package": "Best In Industry",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1011374/file/2faf8d2e6a807c32859a23b757b01a5a.png"
      },
      {
        "name": "Dushant Mangotra",
        "company": "Apple Service",
        "package": "Best In Industry",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1011375/file/f20534800111f8e81c6670b61853b97d.png"
      }
    ],
    "faqs": [
      {
        "question": "Is Cloud computing a good career?",
        "answer": "Launching your career in cloud computing in 2024 opens up incredible opportunities for growth, professional development, and job stability. By acquiring the right skills and expertise, you can dive into a rewarding career path in a dynamic industry that's driving the future of technology and global business."
      },
      {
        "question": "Can a non IT person do Cloud computing Course?",
        "answer": "If you're not well-versed in technology, cloud computing can seem overwhelming. To navigate this fast-evolving field successfully, it's wise to first develop a solid grasp of IT basics. Building a strong foundation in IT will make your journey into cloud computing much smoother and more manageable."
      },
      {
        "question": "Who is eligible for cyber security?",
        "answer": "To enroll in this course, students need to have completed their 10+2 education in any stream. This program equips students with the essential technical knowledge and skills to safeguard computer networks against malicious attacks."
      },
      {
        "question": "What is the Salary of Cloud Computing Engineer in Jammu?",
        "answer": "The average salary for a Cloud Engineer in Jammu typically falls between ₹3.0 Lakhs and ₹13.0 Lakhs per year, with the average annual pay being around ₹7.3 Lakhs."
      },
      {
        "question": "Is cyber security a good career?",
        "answer": "Absolutely! Careers in computing and information technology, especially in cybersecurity, are not only among the highest-paying but also in high demand across the industry."
      }
    ],
    "testimonials": [
      {
        "quote": "Before joining Jetking, I was not sure what to do with my career. But after completing the course, I got the right platform to start my career. It's been nearly 5 years and I have never looked back. I am very satisfied with my decision to join Jetking which has proved that there is no disadvantage of being a girl in technical domain.",
        "name": "Preeti Madan",
        "role": "Quatrro"
      },
      {
        "quote": "“Without Jetking, I don’t know where I would be. You made a major difference in my life. All those times that you have gone the extra mile for me, I really did notice. Your belief in me makes me believe in myself.”",
        "name": "Nikhil Pathare",
        "role": "Tata Consultancy Services"
      },
      {
        "quote": "I am very happy with Jetking for the placement assistance, even after my first job. I am grateful for all the guidance and technical knowledge provided. At Jetking we are not only trained in the technical domain as well as I have also improved my communication skills and confidence in appearing for interviews.",
        "name": "Abhishek",
        "role": "IBM-Collabera"
      }
    ],
    "coursesOffered": [
      "bca-cloud-cyber-security",
      "cloud-computing-engineer-ai",
      "cloud-computing-professional-ai",
      "cloud-cyber-security-engineer",
      "routing-switching-administrator",
      "pc-hardware-support"
    ],
    "seo": {
      "title": "Best Cloud Computing Courses & Training Institute in Jammu",
      "description": "Cloud Computing course in Jammu Kashmir, UG/Diploma program in Cloud AI & Cybersecurity with job placement, Learn AWS, Azure & more from Certified Professionals"
    },
    "updatedAt": "2026-08-06"
  },
  {
    "slug": "kanpur",
    "name": "Jetking Kanpur",
    "citySlug": "kanpur",
    "addressLine": "3rd Floor, 117/N.M/16A OV Complex, KakaDeo, Near Ashoka Jewelers, Kanpur, Uttar pradesh.",
    "locality": "Kaka Deo",
    "state": "Uttar Pradesh",
    "pincode": "208025",
    "phone": "09161812838",
    "helpline": "07666830000",
    "email": "kanpur@jetking.com",
    "intro": "Cloud Computing course in Kanpur - UG/Diploma programs in Cloud AI & Cybersecurity with job placement, Learn AWS, Azure & more from Certified Professionals",
    "body": "Boost your Skills and secure your future with Jetking Top Cloud Computing Courses and Cyber Security courses, BCA 3-Year Degree program from Uttar Pradesh along with Ethical Hacking, CCNA, Python Programing and many more offerings at Jetking Kanpur learning center, Uttar Pradesh.\n\nJoin India’s leading and most trusted digital skills institute, with over 79 years of legacy, offering industry-focused programs in Cloud Computing, Cybersecurity, and BCA Degrees, along with job assistance to launch your career.",
    "featuredProgrammes": [
      {
        "title": "Diploma In Cloud Computing with Artificial Intelligence",
        "subtitle": "Career programme",
        "duration": "12 Months",
        "mode": "Offline/Hybrid"
      },
      {
        "title": "Masters of Cloud Computing with Artificial Intelligence",
        "subtitle": "Career programme",
        "duration": "6 Months",
        "mode": "Offline/Hybrid"
      },
      {
        "title": "BCA In Cloud Computing & Cyber Security",
        "subtitle": "Degree programme",
        "duration": "36 Months",
        "mode": "Offline/Hybrid"
      }
    ],
    "faculty": [
      {
        "name": "Manu T Moxhan",
        "title": "Technical Faculty",
        "bio": "B Tech graduate with Certification in Certified Ethical hacking - EC Council. Diploma in Cyber Security approved by NASSCOM with 3+ years experience in teaching Hardware and Networking and handling lab.",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/442174/file/cfd00515781c397758e3087e4e4f4f8f.png"
      },
      {
        "name": "Sajith C",
        "title": "Technical Faculty",
        "bio": "B Sc computer science graduate and Certified in CCNA with teaching experience in MCSE and hardware. Total teaching experience of more than 3 years. Capable of handling classes and doubt clearing and engaging students throughout his class.",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/442182/file/f78c2ff8d15f4f40d3f1ec995d1b27bf.png"
      }
    ],
    "placements": [
      {
        "name": "Sanchit Dherange",
        "company": "Medline India",
        "package": "4.50 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/841724/file/c78b5481e1d7877d02c05371f1eaee80.png"
      },
      {
        "name": "Nayan Oval",
        "company": "Amazon",
        "package": "8.57 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/841722/file/9923b2b8af82b22d1c7ef1c2dc22ece1.png"
      },
      {
        "name": "Parag Petare",
        "company": "Wipro",
        "package": "3.50 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/841721/file/bc11463da155e63bbd7f5e9387103714.png"
      }
    ],
    "faqs": [
      {
        "question": "Who is eligible for Cloud computing?",
        "answer": "Students 10+2 and Degrees in non-technical fields such as B.Com., B.A., or finance-related disciplines are also acceptable. Additionally, students who are in their final year of graduation are eligible for the course."
      },
      {
        "question": "Can a non IT person do Cloud computing Course?",
        "answer": "If you're not well-versed in technology, cloud computing can seem overwhelming. To navigate this fast-evolving field successfully, it's wise to first develop a solid grasp of IT basics. Building a strong foundation in IT will make your journey into cloud computing much smoother and more manageable."
      },
      {
        "question": "Who is eligible for cyber security?",
        "answer": "To enroll in this course, students need to have completed their 10+2 education in any stream. This program equips students with the essential technical knowledge and skills to safeguard computer networks against malicious attacks."
      },
      {
        "question": "Is cyber security a good career?",
        "answer": "Absolutely! Careers in computing and information technology, especially in cybersecurity, are not only among the highest-paying but also in high demand across the industry."
      },
      {
        "question": "What is the salary of Cloud Engineer in Kanpur?",
        "answer": "The average salary for a Cloud Engineer in India typically falls between ₹3.0 Lakhs and ₹13.0 Lakhs per year, with the average annual pay being around ₹7.3 Lakhs."
      }
    ],
    "testimonials": [
      {
        "quote": "Before joining Jetking, I was not sure what to do with my career. But after completing the course, I got the right platform to start my career. It's been nearly 5 years and I have never looked back. I am very satisfied with my decision to join Jetking which has proved that there is no disadvantage of being a girl in technical domain.",
        "name": "Preeti Madan",
        "role": "Quatrro"
      },
      {
        "quote": "“Without Jetking, I don’t know where I would be. You made a major difference in my life. All those times that you have gone the extra mile for me, I really did notice. Your belief in me makes me believe in myself.”",
        "name": "Nikhil Pathare",
        "role": "Tata Consultancy Services"
      },
      {
        "quote": "I am very happy with Jetking for the placement assistance, even after my first job. I am grateful for all the guidance and technical knowledge provided. At Jetking we are not only trained in the technical domain as well as I have also improved my communication skills and confidence in appearing for interviews.",
        "name": "Abhishek",
        "role": "IBM-Collabera"
      }
    ],
    "coursesOffered": [
      "bca-cloud-cyber-security",
      "cloud-computing-engineer-ai",
      "cloud-computing-professional-ai",
      "cloud-cyber-security-engineer",
      "routing-switching-administrator",
      "pc-hardware-support"
    ],
    "seo": {
      "title": "Best Cloud Computing Courses & Training Institute in Kanpur",
      "description": "Cloud Computing course in Kanpur - UG/Diploma programs in Cloud AI & Cybersecurity with job placement, Learn AWS, Azure & more from Certified Professionals"
    },
    "updatedAt": "2026-08-06"
  },
  {
    "slug": "kochi",
    "name": "Jetking Kochi",
    "citySlug": "kochi",
    "addressLine": "2nd Floor, Vellaparambil Building, Kaloor-Kadavanthra Road, Kaloor, Kochi, Ernakulam, Kerala",
    "locality": "Kaloor",
    "state": "Kerala",
    "pincode": "682017",
    "phone": "07902699777",
    "helpline": "07666830000",
    "email": "kochi@jetking.com",
    "intro": "Advanced your expertise and solidify your career with Top Cloud Computing and Cyber Security Institute Jetking Kerala. Pursue a 3 year BCA degree program at Jetking Kochi Learning Center in Kerala and secure a future in the IT & Tech Industry.",
    "body": "Advanced your expertise and solidify your career with Top Cloud Computing and Cyber Security Institute Jetking Kerala. Pursue a 3 year BCA degree program at Jetking Kochi Learning Center in Kerala and secure a future in the IT & Tech Industry.\n\nJoin Jetking, India's Leading IT Training Institute Enroll now in our Cloud Computing with AI course , Cyber Security courses and BCA 3 years Degree programs with flexible EMIs. Gain hands-on practical experience on live projects and open doors to endless career opportunities!",
    "featuredProgrammes": [
      {
        "title": "BCA In Cloud Computing & Cyber Security",
        "subtitle": "Degree programme",
        "duration": "36 Months",
        "mode": "Offline/Hybrid"
      }
    ],
    "faculty": [
      {
        "name": "Ebin P Sunny",
        "title": "Sr. Technical Faculty",
        "bio": "Experience coupled with Skills and Knowledge is what sets Ebin apart!! He is an IT Professional packed with more than 12 years experience and in-depth knowledge of Network Engineering, Training Methodology, IT Administration & Support. Expertise in the field of Cybersecurity, Ethical Hacking along with Cloud Computing is his speciality. His training skills in Networking, Cisco, Microsoft, Redhat, ITIL, Python, AWS, CEH, to name a few - blended with his experience in live environment will go a long way to nurture and train the students for a bright Career!!",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1015385/file/c033c6d3a1441eb1a10e0f158ac402d1.png"
      },
      {
        "name": "Sajith C",
        "title": "Technical Faculty",
        "bio": "B Sc computer science graduate and Certified in CCNA with teaching experience in MCSE and hardware. Total teaching experience of more than 3 years. Capable of handling classes and doubt clearing and engaging students throughout his class.",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1015373/file/f6e310822fd864363232f685b2d1c136.png"
      }
    ],
    "placements": [
      {
        "name": "Sanchit Dherange",
        "company": "Medline India",
        "package": "4.50 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/841724/file/c78b5481e1d7877d02c05371f1eaee80.png"
      },
      {
        "name": "Nayan Oval",
        "company": "Amazon",
        "package": "8.57 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/841722/file/9923b2b8af82b22d1c7ef1c2dc22ece1.png"
      },
      {
        "name": "Parag Petare",
        "company": "Wipro",
        "package": "3.50 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/841721/file/bc11463da155e63bbd7f5e9387103714.png"
      }
    ],
    "faqs": [
      {
        "question": "Can a non IT person do Cloud computing Course?",
        "answer": "If you're not well-versed in technology, cloud computing can seem overwhelming. To navigate this fast-evolving field successfully, it's wise to first develop a solid grasp of IT basics. Building a strong foundation in IT will make your journey into cloud computing much smoother and more manageable."
      },
      {
        "question": "Who is eligible for Cloud computing?",
        "answer": "Students 10+2 and Degrees in non-technical fields such as B.Com., B.A., or finance-related disciplines are also acceptable. Additionally, students who are in their final year of graduation are eligible for the course."
      },
      {
        "question": "What is the Cost of Cloud computing courses in Kerala?",
        "answer": "To find out the cost and duration of our cloud computing courses in Kerala, Kochi, please visit our official website at jetking.com and submit an inquiry. Our team will provide you with detailed information on the course fees and other relevant details."
      },
      {
        "question": "Who is eligible for cyber security?",
        "answer": "To enroll in this course, students need to have completed their 10+2 education in any stream. This program equips students with the essential technical knowledge and skills to safeguard computer networks against malicious attacks."
      },
      {
        "question": "What is the salary of Cloud Engineer?",
        "answer": "The average salary for a Cloud Engineer in India typically falls between ₹3.0 Lakhs and ₹13.0 Lakhs per year, with the average annual pay being around ₹7.3 Lakhs."
      }
    ],
    "testimonials": [
      {
        "quote": "Before joining Jetking, I was not sure what to do with my career. But after completing the course, I got the right platform to start my career. It's been nearly 5 years and I have never looked back. I am very satisfied with my decision to join Jetking which has proved that there is no disadvantage of being a girl in technical domain.",
        "name": "Preeti Madan",
        "role": "Quatrro"
      },
      {
        "quote": "“Without Jetking, I don’t know where I would be. You made a major difference in my life. All those times that you have gone the extra mile for me, I really did notice. Your belief in me makes me believe in myself.”",
        "name": "Nikhil Pathare",
        "role": "Tata Consultancy Services"
      },
      {
        "quote": "I am very happy with Jetking for the placement assistance, even after my first job. I am grateful for all the guidance and technical knowledge provided. At Jetking we are not only trained in the technical domain as well as I have also improved my communication skills and confidence in appearing for interviews.",
        "name": "Abhishek",
        "role": "IBM-Collabera"
      }
    ],
    "coursesOffered": [
      "bca-cloud-cyber-security",
      "cloud-computing-engineer-ai",
      "cloud-computing-professional-ai",
      "cloud-cyber-security-engineer",
      "routing-switching-administrator",
      "pc-hardware-support"
    ],
    "seo": {
      "title": "Best Cloud Computing Courses & Training Institute in Kerala",
      "description": "Cloud Computing course in Kerala Kochi, UG/Diploma programs in Cloud AI & Cybersecurity with job placement, Learn AWS, Azure & more from Certified Professionals"
    },
    "updatedAt": "2026-08-06"
  },
  {
    "slug": "kukatpally",
    "name": "Jetking Kukatpally",
    "citySlug": "hyderabad",
    "addressLine": "3rd Floor, Above Lenskart, MIG 42, Besides ICICI Bank, Opp. JNTU, Kukatpally, Hyderabad",
    "locality": "Kukatpally",
    "state": "Telangana",
    "pincode": "500072",
    "phone": "8008711500",
    "helpline": "07666830000",
    "email": "kukatpally@jetking.com",
    "intro": "Cloud Computing courses in Hyderabad, UG/Diploma in Cloud AI & Cybersecurity with strong placement support, Learn CCNA, AWS, Azure & more from Certified Professionals",
    "body": "Boost your skills and ensure a promising future with  Top Cloud Computing courses in Hyderabad, Cyber Security Courses, the BCA 3 Year Degree program, Ethical Hacking, CCNA, Python Programming, and many more placement-supported courses at our Kukatpally, Hyderabad Learning Center.\n\nJoin India’s leading and most trusted digital skills institute, with over 79 years of legacy, offering industry-focused programs in Cloud Computing, Cybersecurity, and BCA Degrees, along with job assistance to launch your career.",
    "featuredProgrammes": [
      {
        "title": "Diploma In Cloud Computing with Artificial Intelligence",
        "subtitle": "Career programme",
        "duration": "12 Months",
        "mode": "Offline/Hybrid"
      },
      {
        "title": "Masters of Cloud Computing with Artificial Intelligence",
        "subtitle": "Career programme",
        "duration": "6 Months",
        "mode": "Offline/Hybrid"
      },
      {
        "title": "BCA In Cloud Computing & Cyber Security",
        "subtitle": "Degree programme",
        "duration": "36 Months",
        "mode": "Offline/Hybrid"
      }
    ],
    "faculty": [
      {
        "name": "Mr. Anand Kumar",
        "title": "Technical Faculty",
        "bio": "Senior Trainer at Jetking - KP branch,Training the students since 6 yrs & can handle hardware,OS, network essentials,CCNA , server, Linux,aws, Certified in MCSA and Azure,can handle any batch effectively with special teaching techniques.",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1015413/file/f086a6325befb8254af04bb2c283e8d9.png"
      }
    ],
    "placements": [
      {
        "name": "Kartik Reddy",
        "company": "HRH",
        "package": "1.8 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1015545/file/153ccb745fcd85611658c937ebfd9b2b.png"
      },
      {
        "name": "Shree Ganesh",
        "company": "IT Company",
        "package": "2.4 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1015544/file/329338ea5326cbba27762586c68329f7.png"
      },
      {
        "name": "Jagdeesh",
        "company": "HRH",
        "package": "1.8 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1015543/file/d50a5d8dc43b21281cdcf1e550b90338.png"
      },
      {
        "name": "K Reddy",
        "company": "Metplace",
        "package": "2.1 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1015542/file/58fcc057afb8e9193e9c43b835faee0d.png"
      },
      {
        "name": "Sainath Reddy",
        "company": "HRH",
        "package": "1.8 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1015541/file/3e824102c8ab04c2a680d883011b8485.png"
      },
      {
        "name": "Next You",
        "company": "Dream Company",
        "package": "LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1009056/file/ccd0a662d898fe3d6bfde0d41f4a92d6.png"
      }
    ],
    "faqs": [
      {
        "question": "Can a non IT person do Cloud computing Course?",
        "answer": "If you're not well-versed in technology, cloud computing can seem overwhelming. To navigate this fast-evolving field successfully, it's wise to first develop a solid grasp of IT basics. Building a strong foundation in IT will make your journey into cloud computing much smoother and more manageable."
      },
      {
        "question": "Is Cloud computing a good career?",
        "answer": "Launching your career in cloud computing in 2024 opens up incredible opportunities for growth, professional development, and job stability. By acquiring the right skills and expertise, you can dive into a rewarding career path in a dynamic industry that's driving the future of technology and global business."
      },
      {
        "question": "Who is eligible for cyber security?",
        "answer": "To enroll in this course, students need to have completed their 10+2 education in any stream. This program equips students with the essential technical knowledge and skills to safeguard computer networks against malicious attacks."
      },
      {
        "question": "Is cyber security a good career in Kukatpally?",
        "answer": "Absolutely! Careers in computing and information technology, especially in cybersecurity, are not only among the highest-paying but also in high demand across the industry."
      },
      {
        "question": "What is the salary of Cloud computing courses in Hyderabad?",
        "answer": "The average salary for a Cloud Engineer in India typically falls between ₹3.0 Lakhs and ₹13.0 Lakhs per year, with the average annual pay being around ₹7.3 Lakhs."
      }
    ],
    "testimonials": [
      {
        "quote": "Before joining Jetking, I was not sure what to do with my career. But after completing the course, I got the right platform to start my career. It's been nearly 5 years and I have never looked back. I am very satisfied with my decision to join Jetking which has proved that there is no disadvantage of being a girl in technical domain.",
        "name": "Preeti Madan",
        "role": "Quatrro"
      },
      {
        "quote": "“Without Jetking, I don’t know where I would be. You made a major difference in my life. All those times that you have gone the extra mile for me, I really did notice. Your belief in me makes me believe in myself.”",
        "name": "Nikhil Pathare",
        "role": "Tata Consultancy Services"
      },
      {
        "quote": "I am very happy with Jetking for the placement assistance, even after my first job. I am grateful for all the guidance and technical knowledge provided. At Jetking we are not only trained in the technical domain as well as I have also improved my communication skills and confidence in appearing for interviews.",
        "name": "Abhishek",
        "role": "IBM-Collabera"
      }
    ],
    "coursesOffered": [
      "bca-cloud-cyber-security",
      "cloud-computing-engineer-ai",
      "cloud-computing-professional-ai",
      "cloud-cyber-security-engineer",
      "routing-switching-administrator",
      "pc-hardware-support"
    ],
    "seo": {
      "title": "Cloud Computing Courses & Training Institute in Kukatpally",
      "description": "Cloud Computing courses in Hyderabad, UG/Diploma in Cloud AI & Cybersecurity with strong placement support, Learn CCNA, AWS, Azure & more from Certified Professionals"
    },
    "updatedAt": "2026-08-06"
  },
  {
    "slug": "laxminagar",
    "name": "Jetking Laxminagar",
    "citySlug": "delhi",
    "addressLine": "6th Floor, Pragati Deep Building, Plot No. 8, Laxmi Nagar District Centre, Near Nirman Vihar Metro Station, Adjoining V3S Mall, Laxmi Nagar, Delhi",
    "locality": "Laxmi Nagar",
    "state": "Delhi",
    "pincode": "110092",
    "phone": "07827801701",
    "helpline": "07666830000",
    "email": "ln.cm@jetking.com",
    "headline": "Best Cloud Computing, BCA Degree Training Institute in Delhi",
    "intro": "Best Cloud Computing, BCA Degree Training Institute in Delhi",
    "body": "Boost your expertise and solidify your career with our Cloud Computing Courses  with AI & Cyber Security courses in Delhi. Pursue a 3 years BCA degree at Jetking Laxminagar Learning Center, Delhi and secure a future in the tech industry.\n\nJoin Jetking, India's Leading IT Training Institute Enroll now in our best IT Career Courses like Cloud Computing Course, AI & Cyber Security, Animation & Multimedia Courses and BCA Degree programs with flexible easy EMIs in Jetking Laxminagar learning Institute. Gain hands-on experience on live projects and open doors to endless career opportunities!",
    "featuredProgrammes": [
      {
        "title": "Diploma In Cloud Computing with Artificial Intelligence",
        "subtitle": "Career programme",
        "duration": "12 Months",
        "mode": "Offline/Hybrid"
      },
      {
        "title": "Masters of Cloud Computing with Artificial Intelligence",
        "subtitle": "Career programme",
        "duration": "6 Months",
        "mode": "Offline/Hybrid"
      },
      {
        "title": "BCA In Cloud Computing & Cyber Security",
        "subtitle": "Degree programme",
        "duration": "36 Months",
        "mode": "Offline/Hybrid"
      }
    ],
    "faculty": [
      {
        "name": "Balram singh",
        "title": "Senior Technical Trainer",
        "bio": "B.A and certified mcp with teaching experience in windows ,ccna,mcse more than 15 yrs. Cloud and o365 last 7yrs.and also capable to handling classes and doubt clearing and engaging students throughout his classes.",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/957848/file/30c5e42ac1b911f5b2a607d143f35976.png"
      },
      {
        "name": "Dev Narayan Kumar",
        "title": "Technical Faculty",
        "bio": "Graduate in BCA and Certified in CCNA ,MCSA and Cloud Computing (SAA-C03,AZ-900,AZ-104)with teaching experience in RHCSA and Server Hardware.Total teaching experience of more than 12 years. Capable of handling classes and doubt clearing and engaging students throughout his class.",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/957850/file/789c893a8cf960058768de23203ff552.png"
      },
      {
        "name": "Mohd Shoaib Ansari",
        "title": "Technical Faculty",
        "bio": "B.tech in (E&C), teaching experience in CCNA, windows 10, office 365, computer hardware, python",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/957843/file/21e21e96e57d2a1e6e21d2dd8e7d03b9.png"
      }
    ],
    "placements": [
      {
        "name": "Himanshu Mishar",
        "company": "Smart Systems",
        "package": "2.68 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1056341/file/0d25d21c4e50e76f82a2724f1bae7c4a.png"
      },
      {
        "name": "Salman",
        "company": "Innovative view",
        "package": "2.28 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1056340/file/77a129bac9a3e4f3db46f53d9cf39d34.png"
      },
      {
        "name": "Hemant Kumar",
        "company": "SST Infotech / D&G",
        "package": "1.96 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1056338/file/3982be71337752e0138cfdefaa95af6d.png"
      },
      {
        "name": "Vishal Sharma",
        "company": "Suprams Infosystems",
        "package": "2.4 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1056337/file/60269419705bfba6248f3d0df1e1591c.png"
      },
      {
        "name": "Vishnu Vishal",
        "company": "Energizer",
        "package": "2.8 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1056336/file/d353671776610bda35bd8ff86b1442be.png"
      },
      {
        "name": "Vijay Pratap Singh",
        "company": "ARI international",
        "package": "2.4 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1056333/file/8a32248d495cf82a46bb3517e91bf483.png"
      },
      {
        "name": "STJ Electronics Pvt Ltd",
        "company": "Rahul Kumar",
        "package": "4 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1056317/file/a821980a1e99c27ff0b03dcb12104309.png"
      },
      {
        "name": "Mohit Singh",
        "company": "Digitech Computer",
        "package": "2.16 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1056318/file/3874b84fbc85b6f733679be742976d0f.png"
      },
      {
        "name": "Karan Singh",
        "company": "Intigate Technologies",
        "package": "2.6 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1056332/file/bc13946b0b418991b046214f24092526.png"
      },
      {
        "name": "Vaidant Kumar",
        "company": "Deepak & co.",
        "package": "2 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1056331/file/219f6f97c5b290d256b4b67faaa1de06.png"
      },
      {
        "name": "Sourabh Shashank",
        "company": "Jetking Infotrain Ltd",
        "package": "Technical Trainer",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1056330/file/c617bc6f5792a3394ae5a854686df721.png"
      },
      {
        "name": "Sourav Kumar",
        "company": "Mindlance Outsourcing",
        "package": "3 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1056329/file/2930cdf4a5b52db25439c040b79bf1de.png"
      },
      {
        "name": "Sandeep Kumar",
        "company": "AV Global",
        "package": "1.92 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1056328/file/fd07c53b48ee4057aa2afea3efeb24c0.png"
      },
      {
        "name": "Rohan Kumar Naik",
        "company": "Smart Systems",
        "package": "2.28 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1056327/file/60affbc9712bd5715a0d5cd16d8af039.png"
      },
      {
        "name": "Abhijit Priyankar",
        "company": "STJ Electronics Pvt Ltd",
        "package": "3.17 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1056326/file/50c9b3712df79baaa9055303bb15ed3c.png"
      },
      {
        "name": "MD. Rahishu Deen",
        "company": "STJ Electronics",
        "package": "3.17 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1056325/file/f11fdefbb17e621c0e0e8ab9910fa492.png"
      },
      {
        "name": "Ravi Panchal",
        "company": "SVN Infotech",
        "package": "2.8 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1056323/file/8bf3e67477f2fea84fe9651371cd5dce.png"
      },
      {
        "name": "Dilpreet Singh",
        "company": "Aviso Infotech",
        "package": "2.16 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1056316/file/e70e6c12e8dba30d130b4c67f855b60e.png"
      },
      {
        "name": "Sahil Gautam",
        "company": "Innovative View",
        "package": "2.28 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1056321/file/13841f4b17f5ebc596f7f8d52afd4254.png"
      },
      {
        "name": "Deepak Sant",
        "company": "STJ Electronics",
        "package": "3.30 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1056320/file/5188ca2649bf731fdfb60266b4cca92d.png"
      },
      {
        "name": "Mohan",
        "company": "Innovative View",
        "package": "2.28 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1056319/file/f46463a4ede4487a2f40532ce61cf6b9.png"
      }
    ],
    "faqs": [
      {
        "question": "Why get Cloud computing training from Jetking Laxminagar Institute?",
        "answer": "Here at Jetking Laxminagar Institute, we provide the Best learning environment at affordable fees and training by Industry Experts. Jetking Institute is popular for its Cloud computing Training in Delhi with updated, high-tech gadgets and lab facility with dedicated placement support."
      },
      {
        "question": "Who is eligible for Cloud computing with AI?",
        "answer": "Students 10+2 and Degrees in non-technical fields such as B. Com., B.A., or finance-related disciplines are also acceptable. Additionally, students who are in their final year of graduation are eligible for the course in Delhi."
      },
      {
        "question": "Why Choose Jetking LaxmiNagar for Cloud Computing with AI?",
        "answer": "At Jetking LaxmiNagar, we provide IT training with a focus on Cloud and AI education. Our practical courses offer expertise in AI-driven cloud solutions, guided by experienced instructors. We also offer career-focused support with certifications and placement assistance. Join us to stay ahead in the tech industry."
      },
      {
        "question": "What is the annual average package of a Cloud computing professional?",
        "answer": "The average salary for a Cloud Computing Professional in India, typically falls between ₹3.0 Lakhs and ₹13.0 Lakhs per year."
      }
    ],
    "testimonials": [
      {
        "quote": "I m sure that I have to make carrier in Networking. But Don't know how And Which is the right place. Then I Hear about Jetking and research on the same. Now here I'm. I am very to be a part of a jetking. This is the best thing that happened in my life. Thank you Jetking & Spacial Thanks to my Trainer.",
        "name": "Sourabh Shashank",
        "role": "Jetking Infotrain Ltd"
      },
      {
        "quote": "When I started going to the Institute, I was inexperienced, so I was worried that I could do something like a professional skill,But when I started learning things , I was able to grow while always getting the power and motivation. I have been able to absorb not only interior changes but also various carrier changes in my life.It was a great decision of joining Jetking for my future.",
        "name": "Kalpana sharma",
        "role": "ARI SIMULATION"
      },
      {
        "quote": "Jetking Institute has been the catalyst for my success in the IT industry. As an aspiring professional, I was searching for a platform that could provide me with comprehensive knowledge, practical skills, and the confidence to thrive in the competitive IT world. Jetking surpassed all my expectations and transformed my dreams into a reality.",
        "name": "MD. Rahishu Deen",
        "role": "BSNL Telephone Exchange East Bangalore"
      }
    ],
    "coursesOffered": [
      "bca-cloud-cyber-security",
      "cloud-computing-engineer-ai",
      "cloud-computing-professional-ai",
      "cloud-cyber-security-engineer",
      "routing-switching-administrator",
      "pc-hardware-support"
    ],
    "seo": {
      "title": "Best Cloud Computing Courses & Training Institute in Delhi",
      "description": "Best Training Institute for Cloud Computing Course in Delhi. Learn AWS, Azure, Linux, Networking, CCNA, Cyber Security & dedicated placement support in Delhi."
    },
    "updatedAt": "2026-08-06"
  },
  {
    "slug": "lucknow-station-road",
    "name": "Jetking Lucknow — Station Road",
    "citySlug": "lucknow",
    "addressLine": "Boost your IT skills and ensure a promising future with Jetking Best IT courses in Cloud Computing, Cyber Security, the BCA 3 Year Degree program, Ethical Hacking, CCNA, Python Programming, and many more at our Lucknow Station Road Learning Center, Uttar Pradesh.",
    "locality": "Charbagh",
    "state": "Uttar Pradesh",
    "pincode": "226001",
    "phone": "08400693715",
    "helpline": "07666830000",
    "email": "lko@jetking.com",
    "intro": "Cloud Computing course in Lucknow - UG/Diploma programs in Cloud AI & Cybersecurity with job placement, Learn AWS, Azure & more from Certified Professionals",
    "body": "Boost your IT skills and ensure a promising future with Jetking Best IT courses in Cloud Computing, Cyber Security, the BCA 3 Year Degree program, Ethical Hacking, CCNA, Python Programming, and many more at our Lucknow Station Road Learning Center, Uttar Pradesh.\n\nJoin India’s leading and most trusted digital skills institute, with over 79 years of legacy, offering industry-focused programs in Cloud Computing, Cybersecurity, and BCA Degrees, along with job assistance to launch your career.",
    "featuredProgrammes": [
      {
        "title": "Diploma In Cloud Computing with Artificial Intelligence",
        "subtitle": "Career programme",
        "duration": "12 Months",
        "mode": "Offline/Hybrid"
      },
      {
        "title": "Masters of Cloud Computing with Artificial Intelligence",
        "subtitle": "Career programme",
        "duration": "6 Months",
        "mode": "Offline/Hybrid"
      },
      {
        "title": "BCA In Cloud Computing & Cyber Security",
        "subtitle": "Degree programme",
        "duration": "36 Months",
        "mode": "Offline/Hybrid"
      }
    ],
    "faculty": [
      {
        "name": "Manu T Moxhan",
        "title": "Technical Faculty",
        "bio": "B Tech graduate with Certification in Certified Ethical hacking - EC Council. Diploma in Cyber Security approved by NASSCOM with 3+ years experience in teaching Hardware and Networking and handling lab.",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/442174/file/cfd00515781c397758e3087e4e4f4f8f.png"
      },
      {
        "name": "Sajith C",
        "title": "Technical Faculty",
        "bio": "B Sc computer science graduate and Certified in CCNA with teaching experience in MCSE and hardware. Total teaching experience of more than 3 years. Capable of handling classes and doubt clearing and engaging students throughout his class.",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/442182/file/f78c2ff8d15f4f40d3f1ec995d1b27bf.png"
      }
    ],
    "placements": [
      {
        "name": "Abhishek Yadav",
        "company": "TCS",
        "package": "Best In Industry",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1019363/file/b91bb98410b499fe6533128febacd956.png"
      },
      {
        "name": "Amit Twari",
        "company": "Collabera",
        "package": "Best In Industry",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1019372/file/d3c8d95bea27729c654fbe7c6188732e.png"
      },
      {
        "name": "Arun Kumar",
        "company": "IMPS",
        "package": "Best In Industry",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1019371/file/90ec67cfc043bdf36150b776eedc7de5.png"
      },
      {
        "name": "Er. Babita",
        "company": "UFS",
        "package": "Best In Industry",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1019370/file/0637a3fb8470e9e358a11b05eaf5ae96.png"
      },
      {
        "name": "Er. Danish",
        "company": "Docket Care System",
        "package": "Best In Industry",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1019376/file/9ccc36dadbdde94eb88f2e6f79039461.png"
      },
      {
        "name": "Mohd. Faiz",
        "company": "Flipcart",
        "package": "Best In Industry",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1019375/file/fc1e4f096ae51843b254f9993a68f23f.png"
      },
      {
        "name": "Gyanendra Singh",
        "company": "Wipro",
        "package": "Best In Industry",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1019365/file/d251d370421167a188bd3e561f711e46.png"
      },
      {
        "name": "Er. Harsh",
        "company": "SRDT",
        "package": "Best In Industry",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1019374/file/76e0a0bfd2a1d274853cce96d670746a.png"
      },
      {
        "name": "Komal",
        "company": "HCL",
        "package": "Best In Industry",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1019367/file/6ccd3397238a84d097b7a44e1d0930cf.png"
      },
      {
        "name": "Nida Khan",
        "company": "HCL",
        "package": "Best In Industry",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1019368/file/db49c179b178e899e27707d25f390279.png"
      },
      {
        "name": "Muzzamil",
        "company": "Microsoft",
        "package": "Best In Industry",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1019364/file/536ee8e7ffa38e67e57406ed3a5f5692.png"
      }
    ],
    "faqs": [
      {
        "question": "Can a non IT person do Cloud computing Course?",
        "answer": "If you're not well-versed in technology, cloud computing can seem overwhelming. To navigate this fast-evolving field successfully, it's wise to first develop a solid grasp of IT basics. Building a strong foundation in IT will make your journey into cloud computing much smoother and more manageable."
      },
      {
        "question": "Is cyber security a good career?",
        "answer": "Absolutely! Careers in computing and information technology, especially in cybersecurity, are not only among the highest-paying but also in high demand across the industry."
      },
      {
        "question": "Who is eligible for cyber security?",
        "answer": "To enroll in this course, students need to have completed their 10+2 education in any stream. This program equips students with the essential technical knowledge and skills to safeguard computer networks against malicious attacks."
      },
      {
        "question": "Is Cloud computing a good career?",
        "answer": "Launching your career in cloud computing in 2024 opens up incredible opportunities for growth, professional development, and job stability. By acquiring the right skills and expertise, you can dive into a rewarding career path in a dynamic industry that's driving the future of technology and global business."
      },
      {
        "question": "What is the salary of Cloud computing Engineer?",
        "answer": "The average salary for a Cloud Engineer in India typically falls between ₹3.0 Lakhs and ₹13.0 Lakhs per year, with the average annual pay being around ₹7.3 Lakhs."
      }
    ],
    "testimonials": [
      {
        "quote": "Before joining Jetking, I was not sure what to do with my career. But after completing the course, I got the right platform to start my career. It's been nearly 5 years and I have never looked back. I am very satisfied with my decision to join Jetking which has proved that there is no disadvantage of being a girl in technical domain.",
        "name": "Preeti Madan",
        "role": "Quatrro"
      },
      {
        "quote": "“Without Jetking, I don’t know where I would be. You made a major difference in my life. All those times that you have gone the extra mile for me, I really did notice. Your belief in me makes me believe in myself.”",
        "name": "Nikhil Pathare",
        "role": "Tata Consultancy Services"
      },
      {
        "quote": "I am very happy with Jetking for the placement assistance, even after my first job. I am grateful for all the guidance and technical knowledge provided. At Jetking we are not only trained in the technical domain as well as I have also improved my communication skills and confidence in appearing for interviews.",
        "name": "Abhishek"
      }
    ],
    "coursesOffered": [
      "bca-cloud-cyber-security",
      "cloud-computing-engineer-ai",
      "cloud-computing-professional-ai",
      "cloud-cyber-security-engineer",
      "routing-switching-administrator",
      "pc-hardware-support"
    ],
    "seo": {
      "title": "Best Cloud Computing Courses & Training Institute in Lucknow",
      "description": "Cloud Computing course in Lucknow - UG/Diploma programs in Cloud AI & Cybersecurity with job placement, Learn AWS, Azure & more from Certified Professionals"
    },
    "updatedAt": "2026-08-06"
  },
  {
    "slug": "maninagar",
    "name": "Jetking Maninagar",
    "citySlug": "ahmedabad",
    "addressLine": "3rd Floor, Elegance Arcade, Opp. Maninagar Railway Station, Beside Satyam Towers, Maninagar, Ahmedabad, Gujarat",
    "locality": "Maninagar",
    "state": "Gujarat",
    "pincode": "380008",
    "phone": "07778036268",
    "helpline": "07666830000",
    "email": "mittal@jetking.com",
    "headline": "Best Cloud Computing & AI Course Institute in Ahmedabad, Gujrat",
    "intro": "Cloud Computing course in Ahmedabad - UG/Diploma programs in Cloud AI & Cybersecurity with job placement, Learn AWS, Azure & more from Certified Professionals",
    "body": "Advanced your expertise and solidify your career with our Cloud Computing and Cyber Security courses in Jetking Maninagar, Gujrat. Pursue a 3-year BCA degree at Maninagar, Ahmedabad, Jetking Learning Center and secure a future in the IT & Tech Industry.\n\nJoin India’s leading and most trusted digital skills institute, with over 79 years of legacy, offering industry-focused programs in Cloud Computing, Cybersecurity, and BCA Degrees along with placement support to launch your career.",
    "featuredProgrammes": [
      {
        "title": "Diploma In Cloud Computing with Artificial Intelligence",
        "subtitle": "Career programme",
        "duration": "12 Months",
        "mode": "Offline/Hybrid"
      },
      {
        "title": "Masters of Cloud Computing with Artificial Intelligence",
        "subtitle": "Career programme",
        "duration": "6 Months",
        "mode": "Offline/Hybrid"
      },
      {
        "title": "BCA In Cloud Computing & Cyber Security",
        "subtitle": "Degree programme",
        "duration": "36 Months",
        "mode": "Offline/Hybrid"
      }
    ],
    "faculty": [
      {
        "name": "Viral patel",
        "title": "Center Supervisor",
        "bio": "Qualification:- Diploma in computer science and engg. Exp. : 13 years Certification:- COMPTIA A+, N+, WINDOWS 10, OFFICE 365, CCNA, PYTHON, RHCSA, MCSA, AWS, FCT, SLP 4.0",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1086537/file/9b70f75fe958091c7815fbbe63608893.png"
      }
    ],
    "placements": [
      {
        "name": "Jay Patel",
        "company": "Amnex Infotech Technologies Pvt Ltd",
        "package": "3 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1039713/file/5aa1ae9d5e8dd478445b298d7191694b.png"
      },
      {
        "name": "Deep Patel",
        "company": "Top IT Company",
        "package": "Best In Industry",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1039712/file/f37051a16d2d8c480c5ef5df1ba90c74.png"
      },
      {
        "name": "Ronak Soni",
        "company": "Rapid Radio",
        "package": "2.64 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1039711/file/912113a1074093cc6704f775cdc201b6.png"
      },
      {
        "name": "Shrey Vasoya",
        "company": "Qx Global Services Pvt Ltd",
        "package": "3.36 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1039710/file/08485d5fb91d3f25d5931bc97633ef09.png"
      },
      {
        "name": "Prince Patel",
        "company": "Qx Global Services Pvt Ltd",
        "package": "3.36 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1039709/file/8c0af5eee765f10a1d89b37bb6e7d21e.png"
      },
      {
        "name": "Brijesh Kumar Patel",
        "company": "Nityo Infotech",
        "package": "2.6 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1039708/file/900bd41f5dea896757167aa6630d1495.png"
      },
      {
        "name": "Ravi Sharma",
        "company": "Azilen Technologies Pvt. Ltd.",
        "package": "12 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1039707/file/d8ba2cdd8309ae2e981da26fcff7c83b.png"
      },
      {
        "name": "Nigam Kumar Gupta",
        "company": "Amnex Infotech Technologies Pvt Ltd",
        "package": "3.24 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1039706/file/126b4077904c30621ddfc1a9186f74d2.png"
      },
      {
        "name": "Pratik Patel",
        "company": "Subham Infotech",
        "package": "4.44 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1039705/file/b8e60e06eda480669b8e278bec2107db.png"
      },
      {
        "name": "Harshil Kyada",
        "company": "Hitachi Systems Micro Clinic",
        "package": "3.25 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1039704/file/444a4d4a034135942d7e12ffd9f7b2a8.png"
      },
      {
        "name": "Sujal Bhatt",
        "company": "Etech",
        "package": "3.35 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1039703/file/2ce2936b64b91121e9daff8ba17544db.png"
      },
      {
        "name": "Dev Bhaskar",
        "company": "Top IT Company",
        "package": "Best In Industry",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1039702/file/41dae116474610a2d1354b9d14c70df8.png"
      }
    ],
    "faqs": [
      {
        "question": "Is Cloud computing a good career?",
        "answer": "Launching your career in cloud computing in 2024 opens up incredible opportunities for growth from Jetking Maninagar Best IT Training Institute, professional development, and job stability. By acquiring the right skills and expertise, you can dive into a rewarding career path in a dynamic industry that's driving the future of technology and global business."
      },
      {
        "question": "Can a non IT person do Cloud computing Course?",
        "answer": "If you're not well-versed in technology, cloud computing can seem overwhelming. To navigate this fast-evolving field successfully, it's wise to first develop a solid grasp of IT basics. Building a strong foundation in IT will make your journey into cloud computing much smoother and more manageable."
      },
      {
        "question": "Who is eligible for Cloud computing?",
        "answer": "Students 10+2 and Degrees in non-technical fields such as B.Com., B.A., or finance-related disciplines are also acceptable. Additionally, students who are in their final year of graduation are eligible for the course."
      },
      {
        "question": "Who is eligible for cyber security?",
        "answer": "To enroll in this course, students need to have completed their 10+2 education in any stream. This program equips students with the essential technical knowledge and skills to safeguard computer networks against malicious attacks."
      },
      {
        "question": "What is the salary of Cloud Engineer in Gujrat, India?",
        "answer": "The average salary for a Cloud Engineer in Gujrat and India typically falls between ₹3.0 Lakhs and ₹13.0 Lakhs per year, with the average annual pay being around ₹7.3 Lakhs."
      }
    ],
    "testimonials": [
      {
        "quote": "I Am Delighted To Share About The Incredible Journey With Jetking. A Renowned Institute That Has Played A Pivotal Role In Shaping My Career And Helped Me Find A Job In Alizen Technologies As A Software Engineer With 12 Lpa As My Salary",
        "name": "Ravi Sharma",
        "role": "Azilen Technologies Pvt. Ltd."
      },
      {
        "quote": "When I First Joined Jetking, I Had Limited Knowledge And Skills In The Field Of Networking. I Was Searching For An Institution That Could Provide Me With The Necessary Learnings And Guidance To Make A Successful Entry Into The It Industry. Currently I Am At Subham Infotech Working As Server Engineer 4.44 Lpa\".",
        "name": "Pratik Patel",
        "role": "Subham Infotech"
      },
      {
        "quote": "Thanks To Jetking’s Comprehensive Training And Unwavering Support, I Was Able To Secure A Job In A Reputable Company Shortly After Completing My Course. The Skills And Knowledge I Gained At Jetking Continue To Benefit Me In My Current Company Hitachi Systems Micro Clinic As A Network Engineer With 3.25 Lpa",
        "name": "Harshil Kyada",
        "role": "Hitachi Systems Micro Clinic"
      }
    ],
    "coursesOffered": [
      "bca-cloud-cyber-security",
      "cloud-computing-engineer-ai",
      "cloud-computing-professional-ai",
      "cloud-cyber-security-engineer",
      "routing-switching-administrator",
      "pc-hardware-support"
    ],
    "seo": {
      "title": "Cloud Computing Courses & Training Institute in Ahmedabad",
      "description": "Cloud Computing course in Ahmedabad - UG/Diploma programs in Cloud AI & Cybersecurity with job placement, Learn AWS, Azure & more from Certified Professionals"
    },
    "updatedAt": "2026-08-06"
  },
  {
    "slug": "mohali",
    "name": "Jetking Mohali",
    "citySlug": "mohali",
    "addressLine": "Second Floor, S.C.F. 91, Phase 3B-2, S.A.S. Nagar, SAS NAGAR, District Mohali Punjab,",
    "locality": "Sector 60",
    "state": "Punjab",
    "pincode": "160059",
    "phone": "07889149284",
    "helpline": "07666830000",
    "email": "mohali@jetking.com",
    "intro": "Boost your expertise and solidify your career with our best Cloud Computing courses and Cyber Security courses in mohali, Punjab. Pursue a 3 year BCA degree at Mohali Jetking Learning Center in Punjab, and secure a future in the IT & Tech Industry.",
    "body": "Boost your expertise and solidify your career with our best Cloud Computing courses and Cyber Security courses in mohali, Punjab. Pursue a 3 year BCA degree at Mohali Jetking Learning Center in Punjab, and secure a future in the IT & Tech Industry.\n\nJoin India’s leading and most trusted digital skills institute, with over 79 years of legacy, offering industry-focused programs in Cloud Computing, Cybersecurity, and BCA Degrees, along with job assistance to launch your career.",
    "featuredProgrammes": [
      {
        "title": "Diploma In Cloud Computing with Artificial Intelligence",
        "subtitle": "Career programme",
        "duration": "12 Months",
        "mode": "Offline/Hybrid"
      },
      {
        "title": "Masters of Cloud Computing with Artificial Intelligence",
        "subtitle": "Career programme",
        "duration": "6 Months",
        "mode": "Offline/Hybrid"
      },
      {
        "title": "BCA In Cloud Computing & Cyber Security",
        "subtitle": "Degree programme",
        "duration": "36 Months",
        "mode": "Offline/Hybrid"
      }
    ],
    "faculty": [
      {
        "name": "Samreen Nalwar",
        "title": "Personality Development trainer",
        "bio": "BSC in hospitality Management Studies.",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/993744/file/21c26c0076bea82556fd26b082d4e541.png"
      },
      {
        "name": "Vivek Singh",
        "title": "Technical Faculty",
        "bio": "B.Tech,/B.E.(Computers) eJPT in 2022 Web Developer HTML, CSS, JavaScripts Certified Ethical Hacker (CEH)",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/993743/file/c6904e76898f29707d0b80c22b4261a8.png"
      }
    ],
    "placements": [
      {
        "name": "Osama Ansari",
        "company": "Nexus Computers",
        "package": "1.92 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1783561/file/1ed10bb9ce7067cb4ff471823fd1cb2d.png"
      },
      {
        "name": "Niraj Gupta",
        "company": "Micropoint",
        "package": "2.37 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1783562/file/63bc195ea17e3dc3e1ba0395b6a4186a.png"
      },
      {
        "name": "Rehan Shaikh",
        "company": "Think360",
        "package": "1.92 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1783563/file/64782c0321614833c3f68a3b7eca6064.png"
      },
      {
        "name": "Kuldeep Jaiswal",
        "company": "Nexus Computers",
        "package": "1.92 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1783564/file/10cc5c84d1084ca59464adb53c2c33b2.png"
      },
      {
        "name": "Aniket Gupta",
        "company": "Micropoint",
        "package": "2.37 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1783565/file/2f625879584924503d561c8d4c4d4118.png"
      },
      {
        "name": "Next You",
        "company": "Dream Job",
        "package": "Best In Industry",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1783575/file/3f0836c8a72f081fab3d7b803ad25a99.png"
      }
    ],
    "faqs": [
      {
        "question": "Is this virtual or in-person?",
        "answer": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem dolore, alias, numquam enim ab voluptate id quam harum ducimus cupiditate similique quisquam et deserunt, recusandae."
      },
      {
        "question": "Is this virtual or in-person?",
        "answer": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem dolore, alias, numquam enim ab voluptate id quam harum ducimus cupiditate similique quisquam et deserunt, recusandae."
      },
      {
        "question": "Is this virtual or in-person?",
        "answer": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem dolore, alias, numquam enim ab voluptate id quam harum ducimus cupiditate similique quisquam et deserunt, recusandae."
      },
      {
        "question": "Is this virtual or in-person?",
        "answer": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem dolore, alias, numquam enim ab voluptate id quam harum ducimus cupiditate similique quisquam et deserunt, recusandae."
      },
      {
        "question": "Is this virtual or in-person?",
        "answer": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem dolore, alias, numquam enim ab voluptate id quam harum ducimus cupiditate similique quisquam et deserunt, recusandae."
      }
    ],
    "testimonials": [
      {
        "quote": "I just wanted to share a quick note and let you know that Jetking has changed my life. I'm glad I decided to join Jetking. It's really great that I got a job even after being an undergraduate. During my course duration, I also learned personality development which helped me develop my soft skills. The faculties are well trained and very supportive. Thank you Jetking",
        "name": "Bhavesh Gokhale",
        "role": "Quatrro"
      },
      {
        "quote": "I am working as a Junior Streaming Engineer at Jetking. I joined Jetking after completing my graduation and straight after completing my course, I was placed at 24 Frames. My journey at Jetking has been great as I got to enhance my technical skills and moreover, the environment of the institute is highly approachable and friendly. Would highly recommend Jetking to all those who are looking to make a career in IT Indu",
        "name": "Arbaz Satvikar",
        "role": "24 Frames"
      },
      {
        "quote": "I am very happy with Jetking for the placement assistance, even after my first job. I am grateful for all the guidance and technical knowledge provided. At Jetking we are not only trained in the technical domain as well as I have also improved my communication skills and confidence in appearing for interviews.",
        "name": "Abhishek",
        "role": "IBM-Collabera"
      }
    ],
    "coursesOffered": [
      "bca-cloud-cyber-security",
      "cloud-computing-engineer-ai",
      "cloud-computing-professional-ai",
      "cloud-cyber-security-engineer",
      "routing-switching-administrator",
      "pc-hardware-support"
    ],
    "seo": {
      "title": "Best Cloud Computing Courses & Training Institute in Punjab",
      "description": "Cloud Computing course in Punjab - UG/Diploma programs in Cloud AI & Cybersecurity with job placement, Learn AWS, Azure & more from Certified Professionals"
    },
    "updatedAt": "2026-08-06"
  },
  {
    "slug": "nagpurmahal",
    "name": "Jetking Nagpur Mahal",
    "citySlug": "nagpur",
    "addressLine": "Beside Maharashtra Bank, Opposite Gandhisagar Lake, Tilak Putla Sq., Mahal, Nagpur, Maharashtra",
    "locality": "Mahal",
    "state": "Maharashtra",
    "pincode": "440036",
    "phone": "9168108899",
    "helpline": "07666830000",
    "email": "nagpurmahal@jetking.com",
    "intro": "Cloud Computing course in Maharashtra - UG/Diploma programs in Cloud AI & Cybersecurity with job placement, Learn AWS, Azure & more from Certified Professionals",
    "body": "Enhance your skills and advance your career with Jetking's leading Cloud Computing and Cyber Security courses in Nagpur, Maharashtra. Explore Ethical Hacking, CCNA, Animation, Graphic Design, and pursue a 3-year BCA degree at Jetking Nagpur Learning Center. Secure your future in the IT and Tech industry today\n\nJoin Jetking, India's Leading IT Training Institute Enroll now with Best Cloud Computing courses in Nagpur, Cyber Security courses and BCA Degree programs with flexible & easy EMIs. Gain hands-on experience on live projects and open doors to endless career opportunities from Nagpur, Jetking learning center!",
    "featuredProgrammes": [
      {
        "title": "Diploma In Cloud Computing with Artificial Intelligence",
        "subtitle": "Career programme",
        "duration": "12 Months",
        "mode": "Offline/Hybrid"
      },
      {
        "title": "Masters of Cloud Computing with Artificial Intelligence",
        "subtitle": "Career programme",
        "duration": "6 Months",
        "mode": "Offline/Hybrid"
      },
      {
        "title": "BCA In Cloud Computing & Cyber Security",
        "subtitle": "Degree programme",
        "duration": "36 Months",
        "mode": "Offline/Hybrid"
      }
    ],
    "faculty": [
      {
        "name": "Mr. Shivendra Baghel",
        "title": "Center Manager, Senior Technical Trainer",
        "bio": "Qualification: BSC Graduate Certified in Hardware and Networking, CCNA, MCSA, RHEL,AWS,UIAD, Corporate Trainer 10 Years Experience IT-IMS Training",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1003796/file/50330baa027ed5715c5453fe8578e4ac.png"
      },
      {
        "name": "Mr. Atul Tiwaskar",
        "title": "Senior Technical Trainer",
        "bio": "Qualification: MCM Hardware and Networking Certified CISCO Certified MCSA, AWS, RHEL 12 years Experience IT-IMS Training",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1003755/file/1f5f67b413e303efc6d8db01a63f837f.png"
      },
      {
        "name": "Ms. Nikita keswani",
        "title": "Personality development Facilitator",
        "bio": "Total years of Experience 6+ MSC (Biotechnology) Certifications - English communication and Personality development Expertise of Subject English Communication ; Spoken English",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1003757/file/375252ec87fdb76c1937bad35eb7f109.png"
      }
    ],
    "placements": [
      {
        "name": "Sachin Bondre",
        "company": "IDC Technology - HCL",
        "package": "5 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1003710/file/d218fce33bf41a89085e3adbe0f55c2a.png"
      },
      {
        "name": "Vinit Nakhate",
        "company": "IMSI staffing ( Adani )",
        "package": "3.6 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/workspace/vnBgwv/image/10815724/file/2ca82c133b05b55c4b6241fee8a5f32c.png"
      },
      {
        "name": "Sejal Mekratwar",
        "company": "Sysnetglobal",
        "package": "2.16 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/workspace/vnBgwv/image/10821681/file/09abc325c1772886bb78f7145a399e59.png"
      },
      {
        "name": "Dhanshree Meshram",
        "company": "PC solution Pvt Ltd",
        "package": "3.0 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/workspace/vnBgwv/image/10816762/file/bd9c35ff9902d18536c02cb4600e7344.png"
      },
      {
        "name": "Niranjan Dakua",
        "company": "VservIT Infosystem",
        "package": "2.5 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/workspace/vnBgwv/image/10820402/file/842e9f32ed39ddabbbbf1bdba585b3df.png"
      },
      {
        "name": "Prathmesh Bhoge",
        "company": "Exotel India",
        "package": "4.5 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/workspace/vnBgwv/image/10822592/file/e60e140f73d62f91b338248d70bcc93f.png"
      },
      {
        "name": "Abhishekh shambharkar",
        "company": "Amazon",
        "package": "8.57 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1003819/file/ab1ac614d8810d39fa2e3f7910ca6c5d.png"
      },
      {
        "name": "Roshan Karokar",
        "company": "Quess Corporation",
        "package": "2.88 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/workspace/vnBgwv/image/10823994/file/c593d3c5fdfe1feff59450877aff245a.png"
      },
      {
        "name": "Ritesh Malewar",
        "company": "Lupin Pharmaceutical Ltd",
        "package": "2.16 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1003666/file/6f087cf10af85707f3f4906b9a89eb38.png"
      },
      {
        "name": "Piyush Deshmukh",
        "company": "Galaxy Industrial Pvt Ltd",
        "package": "1.80 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1003667/file/d5cfe131e65b5d8b09b02d0e0361f187.png"
      },
      {
        "name": "Yash Giradkar",
        "company": "Sysnet global",
        "package": "2.35 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/workspace/vnBgwv/image/10825148/file/20ed81d3a5f42eab7c221a1e2cea4de8.png"
      },
      {
        "name": "Tarun Sharma",
        "company": "Sysnet Global",
        "package": "2.70 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/workspace/vnBgwv/image/10827100/file/2e0bdce93c008e1cd3e72f1804ffec70.png"
      },
      {
        "name": "Yash Vairagade",
        "company": "Sysnet Global",
        "package": "2.28 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/workspace/vnBgwv/image/10828843/file/6c0b5bf99cd9ff626996170eadfc8942.png"
      },
      {
        "name": "Pratik Wasule",
        "company": "Vishwaraj Infrastructur Nagpur",
        "package": "1.97 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1003671/file/16ed5d4898ac54037f12daaa5e01db5a.png"
      },
      {
        "name": "Sweta Gedam",
        "company": "VDA Infosolution Pvt Ltd",
        "package": "2.94 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1003836/file/4e77b77f190f7043e1cb21d811ed7efb.png"
      },
      {
        "name": "Ravindra Gurve",
        "company": "Simence Factory, Nashik",
        "package": "2.01 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1003673/file/a72b2c3c670115715bd47694f921817f.png"
      },
      {
        "name": "Raunak Sethiya",
        "company": "Acute Informatic, Wipro Site",
        "package": "1.44 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1003675/file/c37fb78fedfcb1a496ae6e1ac89d3caa.png"
      },
      {
        "name": "Saurabh Shende",
        "company": "AGS, Pune",
        "package": "1.68 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1003674/file/f3e4fb13bf056b7bd8e97e3509c4153b.png"
      },
      {
        "name": "Mukesh Rai",
        "company": "Alchemy Tecsol India PVT LTD",
        "package": "2.09 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1003676/file/7cc921fe2f56664cff9c3b160624d388.png"
      },
      {
        "name": "Kiran Atmaram Menghare",
        "company": "IMSI Staffing Pvt Ltd",
        "package": "2.22 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1003838/file/8ff9940c6d5d07a3089de769c49c959b.png"
      },
      {
        "name": "Sakshat Shende",
        "company": "Bhavans Shool. Nagpur",
        "package": "1.80 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1003679/file/78fc5de8425134e707fcba820250d97a.png"
      },
      {
        "name": "Rashmi Pandey",
        "company": "Orient Tech. Nagpur",
        "package": "1.50 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1003734/file/6af86ca8f335795e6637b7df6ce9f901.png"
      },
      {
        "name": "Rina Nikalje",
        "company": "Instakart services pvt ltd",
        "package": "8.57 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1003833/file/3f0b35b377463bd983ea11b6355489fe.png"
      },
      {
        "name": "Nandini Bawane",
        "company": "Outbox Solutions Pvt Ltd",
        "package": "2.16 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1003835/file/1258d07a5adeb89287154afb1b40ea1c.png"
      }
    ],
    "faqs": [
      {
        "question": "Can a non IT person do Cloud computing Course?",
        "answer": "If you're not well-versed in technology, cloud computing can seem overwhelming. To navigate this fast-evolving field successfully, it's wise to first develop a solid grasp of IT basics. Building a strong foundation in IT will make your journey into cloud computing much smoother and more manageable."
      },
      {
        "question": "Who is eligible for Cloud computing?",
        "answer": "Students 10+2 and Degrees in non-technical fields such as B. Com., B.A., or finance-related disciplines are also acceptable. Additionally, students who are in their final year of graduation are eligible for the course."
      },
      {
        "question": "Who is eligible for cyber security?",
        "answer": "To enroll in this course, students need to have completed their 10+2 education in any stream. This program equips students with the essential technical knowledge and skills to safeguard computer networks against malicious attacks."
      },
      {
        "question": "What is the Cost of Cloud computing courses in Nagpur?",
        "answer": "To find out the cost and duration of our cloud computing courses in Nagpur, please visit our official website course page and submit an inquiry. Our team will provide you with detailed information on the course fees and other relevant details."
      },
      {
        "question": "What is the salary of Cloud Engineer in Maharashtra?",
        "answer": "The average salary for a Cloud Engineer in Maharashtra, India typically falls between ₹3.6 Lakhs and ₹13.9 Lakhs per year, with the average annual pay being around ₹7.6 Lakhs."
      }
    ],
    "testimonials": [
      {
        "quote": "Before joining Jetking, I was not sure what to do with my career. But after completing the course, I got the right platform to start my career. It's been nearly 5 years and I have never looked back. I am very satisfied with my decision to join Jetking which has proved that there is no disadvantage of being a girl in technical domain.",
        "name": "Preeti Madan",
        "role": "Quatrro"
      },
      {
        "quote": "“Without Jetking, I don’t know where I would be. You made a major difference in my life. All those times that you have gone the extra mile for me, I really did notice. Your belief in me makes me believe in myself.”",
        "name": "Nikhil Pathare",
        "role": "Tata Consultancy Services"
      },
      {
        "quote": "I am very happy with Jetking for the placement assistance, even after my first job. I am grateful for all the guidance and technical knowledge provided. At Jetking we are not only trained in the technical domain as well as I have also improved my communication skills and confidence in appearing for interviews.",
        "name": "Abhishek",
        "role": "IBM-Collabera"
      }
    ],
    "coursesOffered": [
      "bca-cloud-cyber-security",
      "cloud-computing-engineer-ai",
      "cloud-computing-professional-ai",
      "cloud-cyber-security-engineer",
      "routing-switching-administrator",
      "pc-hardware-support"
    ],
    "seo": {
      "title": "Best Cloud Computing Courses & Training Institute in Nagpur",
      "description": "Cloud Computing course in Maharashtra - UG/Diploma programs in Cloud AI & Cybersecurity with job placement, Learn AWS, Azure & more from Certified Professionals"
    },
    "updatedAt": "2026-08-06"
  },
  {
    "slug": "noida",
    "name": "Jetking Noida",
    "citySlug": "noida",
    "addressLine": "C, Sector 2, Opposite Nirulas Hotel, Sector 15 Metro Station Road, Noida, New Delhi",
    "locality": "Sector 2",
    "state": "Uttar Pradesh",
    "pincode": "201301",
    "phone": "01204294598, 9721044654",
    "helpline": "07666830000",
    "email": "noida@jetking.com",
    "intro": "Boost your expertise and solidify your career with Best Cloud Computing courses and Cyber Security courses in Noida, Uttar Pradesh. Learn Ethical Hacking, CCNA, Animation, Graphic design and Pursue a 3 year BCA degree at Noida Jetking top Learning Center in UP, and secure a future in the IT & Tech Industry.",
    "body": "Boost your expertise and solidify your career with Best Cloud Computing courses and Cyber Security courses in Noida, Uttar Pradesh. Learn Ethical Hacking, CCNA, Animation, Graphic design and Pursue a 3 year BCA degree at Noida Jetking top Learning Center in UP, and secure a future in the IT & Tech Industry.\n\nJoin India’s leading and most trusted digital skills institute, with over 79 years of legacy, offering industry-focused programs in Cloud Computing, Cybersecurity, and BCA Degrees, along with job assistance to launch your career.",
    "featuredProgrammes": [
      {
        "title": "Diploma In Cloud Computing with Artificial Intelligence",
        "subtitle": "Career programme",
        "duration": "12 Months",
        "mode": "Offline/Hybrid"
      },
      {
        "title": "Masters of Cloud Computing with Artificial Intelligence",
        "subtitle": "Career programme",
        "duration": "6 Months",
        "mode": "Offline/Hybrid"
      },
      {
        "title": "BCA In Cloud Computing & Cyber Security",
        "subtitle": "Degree programme",
        "duration": "36 Months",
        "mode": "Offline/Hybrid"
      }
    ],
    "faculty": [
      {
        "name": "Jitendar Kumar Yadav",
        "title": "Center Manager",
        "bio": "Experience: 11 Year In IT Training",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1042841/file/f2afec1ba36d6b6c43d4b4e7cb5bf42d.png"
      },
      {
        "name": "Ajit Singh",
        "title": "Technical Faculty",
        "bio": "Experience: 12 Year In IT Training",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1042842/file/40bb8b8df3ac7df83748f81ef4e9ba82.png"
      },
      {
        "name": "Tannu Singh",
        "title": "Career Counselor",
        "bio": "Experience: 2 Year In Career Conselling",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1042845/file/71b48e7b87fd545306d8ac36339bf775.png"
      },
      {
        "name": "Abhishek Singh",
        "title": "Technical Faculty",
        "bio": "Experience: 4 Year In IT Training",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1042844/file/2847bac665bb81593844f03692d89067.png"
      },
      {
        "name": "Shivangi Sharma",
        "title": "Placemnt Office",
        "bio": "Experience: 4 Year in Placements",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1042840/file/b1ec37b455124162179df8518467cd7c.png"
      }
    ],
    "placements": [
      {
        "name": "Yash Kandpal",
        "company": "Motherson Group",
        "package": "3.2 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1042843/file/99272aa39fd47b37ac6befdc1e47a500.png"
      },
      {
        "name": "Shubham Joshi",
        "company": "Colorplast Systems",
        "package": "2.5 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1042908/file/c13b52dbbc8afa584529c1375387cd3a.png"
      },
      {
        "name": "Akshat Chauhan",
        "company": "Reisnet Pvt Ltd",
        "package": "4.50 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1042907/file/7647983dc20f5b05919643f8595454b8.png"
      },
      {
        "name": "Rupak Ranjan",
        "company": "Digi Versal",
        "package": "3.6 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1042910/file/d6871d66e968f014e21b0312f0df819d.png"
      },
      {
        "name": "Pragyanand Kumar",
        "company": "Telus International",
        "package": "3.5 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1042909/file/aed20eb90c66a1575b65e77ed6ddc3e1.png"
      },
      {
        "name": "Next You?",
        "company": "Dream Job",
        "package": "Best in Industry",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1042933/file/e82f85ee6944b37d5b896b065c240a97.png"
      }
    ],
    "faqs": [
      {
        "question": "What is the Cost of Cloud computing courses?",
        "answer": "To find out the cost and duration of our cloud computing courses in Noida, please visit our official website course page and submit an inquiry. Our team will provide you with detailed information on the course fees and other relevant details."
      },
      {
        "question": "Who is eligible for cyber security?",
        "answer": "To enroll in this course, students need to have completed their 10+2 education in any stream. This program equips students with the essential technical knowledge and skills to safeguard computer networks against malicious attacks."
      },
      {
        "question": "Can a non IT person do Cloud computing Course?",
        "answer": "If you're not well-versed in technology, cloud computing can seem overwhelming. To navigate this fast-evolving field successfully, it's wise to first develop a solid grasp of IT basics. Building a strong foundation in IT will make your journey into cloud computing much smoother and more manageable."
      },
      {
        "question": "Who is eligible for Cloud computing?",
        "answer": "Students 10+2 and Degrees in non-technical fields such as B. Com., B.A., or finance-related disciplines are also acceptable. Additionally, students who are in their final year of graduation are eligible for the course in Pune."
      },
      {
        "question": "What is the salary of Cloud Engineer?",
        "answer": "The average salary for a Cloud Engineer in Noida, Uttar Pradesh typically falls between ₹3.6 Lakhs and ₹13.9 Lakhs per year, with the average annual pay being around ₹7.6 Lakhs."
      }
    ],
    "testimonials": [
      {
        "quote": "Before joining Jetking, I was not sure what to do with my career. But after completing the course, I got the right platform to start my career. It's been nearly 5 years and I have never looked back. I am very satisfied with my decision to join Jetking which has proved that there is no disadvantage of being a girl in technical domain.",
        "name": "Preeti Madan",
        "role": "Quatrro"
      },
      {
        "quote": "“Without Jetking, I don’t know where I would be. You made a major difference in my life. All those times that you have gone the extra mile for me, I really did notice. Your belief in me makes me believe in myself.”",
        "name": "Nikhil Pathare",
        "role": "Tata Consultancy Services"
      },
      {
        "quote": "I am very happy with Jetking for the placement assistance, even after my first job. I am grateful for all the guidance and technical knowledge provided. At Jetking we are not only trained in the technical domain as well as I have also improved my communication skills and confidence in appearing for interviews.",
        "name": "Abhishek",
        "role": "IBM-Collabera"
      }
    ],
    "coursesOffered": [
      "bca-cloud-cyber-security",
      "cloud-computing-engineer-ai",
      "cloud-computing-professional-ai",
      "cloud-cyber-security-engineer",
      "routing-switching-administrator",
      "pc-hardware-support"
    ],
    "seo": {
      "title": "Best Cloud Computing Courses & Training Institute in Noida",
      "description": "Cloud Computing course in Noida - UG/Diploma programs in Cloud AI & Cybersecurity with job placement, Learn AWS, Azure & more from Certified Professionals"
    },
    "updatedAt": "2026-08-06"
  },
  {
    "slug": "allahabad",
    "name": "Jetking Prayagraj",
    "citySlug": "prayagraj",
    "addressLine": "Vinayak Complex, 4th Floor 27/17, Elgin Road, Civil Lines, Elgin Road, Prayagraj, Uttar Pradesh 211001",
    "locality": "Civil Lines",
    "state": "Uttar Pradesh",
    "pincode": "211001",
    "phone": "09307022076",
    "helpline": "07666830000",
    "email": "albd@jetking.com",
    "intro": "Enhance your expertise and ensure a bright future with Jetking's premier Cloud Computing Courses and Cyber Security courses. Pursue a 3 year BCA degree program in Uttar Pradesh, along with specialized training in Ethical Hacking, CCNA, Python Programming, and a wide range of other courses at Jetking Prayagraj Learning Centre.",
    "body": "Join India’s leading and most trusted digital skills institute, with over 79 years of legacy, offering industry-focused programs in Cloud Computing, Cybersecurity, and BCA Degrees, along with job assistance to launch your career.\n\nI am very happy with Jetking for the placement assistance, even after my first job. I am grateful for all the guidance and technical knowledge provided. At Jetking we are not only trained in the technical domain as well as I have also improved my communication skills and confidence in appearing for interviews.",
    "featuredProgrammes": [
      {
        "title": "Diploma In Cloud Computing with Artificial Intelligence",
        "subtitle": "Career programme",
        "duration": "12 Months",
        "mode": "Offline/Hybrid"
      },
      {
        "title": "Masters of Cloud Computing with Artificial Intelligence",
        "subtitle": "Career programme",
        "duration": "6 Months",
        "mode": "Offline/Hybrid"
      },
      {
        "title": "BCA In Cloud Computing & Cyber Security",
        "subtitle": "Degree programme",
        "duration": "36 Months",
        "mode": "Offline/Hybrid"
      }
    ],
    "faculty": [
      {
        "name": "Manu T Moxhan",
        "title": "Technical Faculty",
        "bio": "B Tech graduate with Certification in Certified Ethical hacking - EC Council. Diploma in Cyber Security approved by NASSCOM with 3+ years experience in teaching Hardware and Networking and handling lab.",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/442174/file/cfd00515781c397758e3087e4e4f4f8f.png"
      },
      {
        "name": "Sajith C",
        "title": "Technical Faculty",
        "bio": "B Sc computer science graduate and Certified in CCNA with teaching experience in MCSE and hardware. Total teaching experience of more than 3 years. Capable of handling classes and doubt clearing and engaging students throughout his class.",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/442182/file/f78c2ff8d15f4f40d3f1ec995d1b27bf.png"
      }
    ],
    "placements": [
      {
        "name": "Sanchit Dherange",
        "company": "Medline India",
        "package": "4.50 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/841724/file/c78b5481e1d7877d02c05371f1eaee80.png"
      },
      {
        "name": "Nayan Oval",
        "company": "Amazon",
        "package": "8.57 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/841722/file/9923b2b8af82b22d1c7ef1c2dc22ece1.png"
      },
      {
        "name": "Parag Petare",
        "company": "Wipro",
        "package": "3.50 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/841721/file/bc11463da155e63bbd7f5e9387103714.png"
      }
    ],
    "faqs": [
      {
        "question": "Can a non IT person do Cloud computing Course?",
        "answer": "If you're not well-versed in technology, cloud computing can seem overwhelming. To navigate this fast-evolving field successfully, it's wise to first develop a solid grasp of IT basics. Building a strong foundation in IT will make your journey into cloud computing much smoother and more manageable."
      },
      {
        "question": "Who is eligible for cyber security Courses?",
        "answer": "To enroll in this course, students need to have completed their 10+2 education in any stream. This program equips students with the essential technical knowledge and skills to safeguard computer networks against malicious attacks."
      },
      {
        "question": "Who is eligible for Cloud computing Courses?",
        "answer": "Students 10+2 and Degrees in non-technical fields such as B.Com., B.A., or finance-related disciplines are also acceptable. Additionally, students who are in their final year of graduation are eligible for the course."
      },
      {
        "question": "Is Cyber security a good career scope?",
        "answer": "Absolutely! Careers in computing and information technology, especially in cybersecurity, are not only among the highest-paying but also in high demand across the industry."
      },
      {
        "question": "What is the salary of Cloud Engineer in Uttar Pradesh?",
        "answer": "The average salary for a Cloud Engineer in Uttar Pradesh, India typically falls between ₹3.3 Lakhs and ₹13.6 Lakhs per year, with the average annual pay being around ₹7.3 Lakhs."
      }
    ],
    "testimonials": [
      {
        "quote": "Before joining Jetking, I was not sure what to do with my career. But after completing the course, I got the right platform to start my career. It's been nearly 5 years and I have never looked back. I am very satisfied with my decision to join Jetking which has proved that there is no disadvantage of being a girl in technical domain.",
        "name": "Preeti Madan",
        "role": "Quatrro"
      },
      {
        "quote": "“Without Jetking, I don’t know where I would be. You made a major difference in my life. All those times that you have gone the extra mile for me, I really did notice. Your belief in me makes me believe in myself.”",
        "name": "Nikhil Pathare",
        "role": "Tata Consultancy Services"
      },
      {
        "quote": "I am very happy with Jetking for the placement assistance, even after my first job. I am grateful for all the guidance and technical knowledge provided. At Jetking we are not only trained in the technical domain as well as I have also improved my communication skills and confidence in appearing for interviews.",
        "name": "Abhishek",
        "role": "IBM-Collabera"
      }
    ],
    "coursesOffered": [
      "bca-cloud-cyber-security",
      "cloud-computing-engineer-ai",
      "cloud-computing-professional-ai",
      "cloud-cyber-security-engineer",
      "routing-switching-administrator",
      "pc-hardware-support"
    ],
    "seo": {
      "title": "Cloud Computing Courses in Prayagraj, CCNA, Cyber Security",
      "description": "Cloud Computing courses in Prayagraj, UG/Diploma in Cloud AI & Cybersecurity with strong placement support, Learn CCNA, AWS, Azure & more from Certified Professionals"
    },
    "updatedAt": "2026-08-06"
  },
  {
    "slug": "rajajinagar",
    "name": "Jetking Rajajinagar",
    "citySlug": "bengaluru",
    "addressLine": "NO. 12/69, 2nd Floor, 59th Cross, 4th Block, Opp MEI Polytechnic, Rajajinagar, Bangalore, Karnataka",
    "locality": "Rajajinagar",
    "state": "Karnataka",
    "pincode": "560010",
    "phone": "07676224400",
    "helpline": "07666830000",
    "email": "rjn@jetking.com",
    "intro": "Cloud Computing course in Bangalore - UG/Diploma programs in Cloud AI & Cybersecurity with job placement, Learn AWS, Azure & more from Certified Professionals",
    "body": "Join Jetking, India's Leading IT Training Institute Enroll in our Cloud Computing courses in Karnataka, Cyber Security courses and BCA Degree programs with flexible and easy EMIs. Gain hands-on experience on live projects and open doors to endless career opportunities from Rajajinagar, Jetking Bangalore center!\n\nJoin India’s leading and most trusted digital skills institute, with over 79 years of legacy, offering industry-focused programs in Cloud Computing, Cybersecurity, and BCA Degrees, along with job assistance to launch your career.",
    "featuredProgrammes": [
      {
        "title": "Diploma In Cloud Computing with Artificial Intelligence",
        "subtitle": "Career programme",
        "duration": "12 Months",
        "mode": "Offline/Hybrid"
      },
      {
        "title": "Masters of Cloud Computing with Artificial Intelligence",
        "subtitle": "Career programme",
        "duration": "6 Months",
        "mode": "Offline/Hybrid"
      },
      {
        "title": "BCA In Cloud Computing & Cyber Security",
        "subtitle": "Degree programme",
        "duration": "36 Months",
        "mode": "Offline/Hybrid"
      }
    ],
    "faculty": [
      {
        "name": "Manu T Moxhan",
        "title": "Technical Faculty",
        "bio": "B Tech graduate with Certification in Certified Ethical hacking - EC Council. Diploma in Cyber Security approved by NASSCOM with 3+ years experience in teaching Hardware and Networking and handling lab.",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/442174/file/cfd00515781c397758e3087e4e4f4f8f.png"
      },
      {
        "name": "Sajith C",
        "title": "Technical Faculty",
        "bio": "B Sc computer science graduate and Certified in CCNA with teaching experience in MCSE and hardware. Total teaching experience of more than 3 years. Capable of handling classes and doubt clearing and engaging students throughout his class.",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/442182/file/f78c2ff8d15f4f40d3f1ec995d1b27bf.png"
      }
    ],
    "placements": [
      {
        "name": "Vidyasagar",
        "company": "Network Support Er.",
        "package": "Best in Industry",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/947830/file/b2924a9867ba4ba83881506ad6c6f5cc.png"
      },
      {
        "name": "Vijay Kumar P",
        "company": "Linux System Er.",
        "package": "Best in Industry",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/947829/file/fba6bb495aa3e103b4461b24b6919853.png"
      },
      {
        "name": "Chethan R",
        "company": "Enterprise Associate",
        "package": "Best in Industry",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/947828/file/d853d30d01fa72e845e134335a0db0f4.png"
      },
      {
        "name": "Prashanth BN",
        "company": "Cloud Engineer",
        "package": "Best in Industry",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/947827/file/97424b016472f1e13f7804b75277ccd2.png"
      },
      {
        "name": "Kavana V",
        "company": "L1- Trainee Engineer",
        "package": "Best in Industry",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/947826/file/7e51dee9d11c63aeea48276b7a41a797.png"
      },
      {
        "name": "Vishal Muralidharan",
        "company": "Cloud Engineer",
        "package": "Best in Industry",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/947825/file/8d76ce5dfe6509b0e9eea3e995eceda6.png"
      },
      {
        "name": "Sushil Kumar Yadav",
        "company": "System Admin",
        "package": "Best in Industry",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/947824/file/789c57e748e99c6d0c6a8c5c842bbff3.png"
      },
      {
        "name": "Sushanth M",
        "company": "System Administraton",
        "package": "Best in Industry",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/947823/file/c14befcd80ace6efdbb3d425687aa2f3.png"
      },
      {
        "name": "Rakshitha K",
        "company": "Network Er.",
        "package": "Best in Industry",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/947822/file/38af2ed4c10a2946cfd804a29ac2278f.png"
      },
      {
        "name": "Ravi Kumar",
        "company": "Automation Er. Trainee",
        "package": "Best in Industry",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/947821/file/67924f87ae2c528658a464b41ef808cc.png"
      },
      {
        "name": "Darshan S Kurdekar",
        "company": "Cloud Engineer",
        "package": "Best in Industry",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/947820/file/277c84f431b6c6c8d351a95a2f91d28a.png"
      },
      {
        "name": "Prashanth MS",
        "company": "System Admin",
        "package": "Best in Industry",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/947819/file/58ad5872f8994e1a2890eaa8fb8e232b.png"
      },
      {
        "name": "Manjunath N",
        "company": "System Admin",
        "package": "Best in Industry",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/947818/file/ce34bf4544671f06302120acdf4fb5dd.png"
      },
      {
        "name": "Keerthan SB",
        "company": "Cloud Engineer",
        "package": "Best in Industry",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/947817/file/e9465a5852648c55cfabcb828c9d8421.png"
      },
      {
        "name": "Mubashir Ahmed Biradar",
        "company": "Network Engineer",
        "package": "Best in Industry",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/947816/file/ca02a3ba7bee42d8de73906300a8990f.png"
      },
      {
        "name": "Lekhana C",
        "company": "Associate Engineer",
        "package": "Best in Industry",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/947815/file/4e7f5001930d95d9537996e95a4d8f57.png"
      },
      {
        "name": "Chiranjeevi KM",
        "company": "Enterprise Associate",
        "package": "Best in Industry",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/947814/file/e4ef5644b041cd79eb2a8a1bcbba55fe.png"
      },
      {
        "name": "Parag Petare",
        "company": "Associate",
        "package": "Best in Industry",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/947813/file/e815115ffb615f808521ae612722408e.png"
      },
      {
        "name": "Balraj Naik M",
        "company": "Enterprise Associate",
        "package": "Best in Industry",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/947812/file/2624646de332b4a8c68e190bbeb8e040.png"
      },
      {
        "name": "Karthik S",
        "company": "NOC",
        "package": "Best in Industry",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/947811/file/0e90f4b53a63c9f8e5a9e81eb8f85990.png"
      },
      {
        "name": "Karthik B",
        "company": "IT Operational Specialist",
        "package": "Best in Industry",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/947810/file/bbc77f8142cf180c22c0206664a66ac0.png"
      },
      {
        "name": "Bharath Kumar HS",
        "company": "System Administrator",
        "package": "Best in Industry",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/947809/file/ca6b1711c2b10b09861a9e29e7016c9e.png"
      },
      {
        "name": "Ananda Kumara",
        "company": "Cloud Engineer",
        "package": "Best in Industry",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/947808/file/ffb73d8043ac9f439d3c127487bcc58d.png"
      },
      {
        "name": "Abhishek Hugar",
        "company": "System Admin",
        "package": "Best in Industry",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/947807/file/4d071281df4b8d28a6b2119708459c0f.png"
      }
    ],
    "faqs": [
      {
        "question": "Who is eligible for Cloud computing?",
        "answer": "Students 10+2 and Degrees in non-technical fields such as B.Com., B.A., or finance-related disciplines are also acceptable. Additionally, students who are in their final year of graduation are eligible for the course."
      },
      {
        "question": "Can a non IT person do Cloud computing Course?",
        "answer": "If you're not well-versed in technology, cloud computing can seem overwhelming. To navigate this fast-evolving field successfully, it's wise to first develop a solid grasp of IT basics. Building a strong foundation in IT will make your journey into cloud computing much smoother and more manageable."
      },
      {
        "question": "What is the Cost of Cloud computing courses?",
        "answer": "To find out the cost and duration of our cloud computing courses in Bangalore, please visit our official website and submit an inquiry. Our team will provide you with detailed information on the course fees and other relevant details."
      },
      {
        "question": "Who is eligible for cyber security?",
        "answer": "To enroll in this course, students need to have completed their 10+2 education in any stream. This program equips students with the essential technical knowledge and skills to safeguard computer networks against malicious attacks."
      },
      {
        "question": "What is the salary of Cloud Engineer in Bangalore?",
        "answer": "The average salary for a Cloud Engineer in Bangalore, Karnataka typically falls between ₹3.6 Lakhs and ₹13.5 Lakhs per year, with the average annual pay being around ₹7.5 Lakhs."
      }
    ],
    "testimonials": [
      {
        "quote": "Before joining Jetking, I was not sure what to do with my career. But after completing the course, I got the right platform to start my career. It's been nearly 5 years and I have never looked back. I am very satisfied with my decision to join Jetking which has proved that there is no disadvantage of being a girl in technical domain.",
        "name": "Preeti Madan",
        "role": "Quatrro"
      },
      {
        "quote": "“Without Jetking, I don’t know where I would be. You made a major difference in my life. All those times that you have gone the extra mile for me, I really did notice. Your belief in me makes me believe in myself.”",
        "name": "Nikhil Pathare",
        "role": "Tata Consultancy Services"
      },
      {
        "quote": "I am very happy with Jetking for the placement assistance, even after my first job. I am grateful for all the guidance and technical knowledge provided. At Jetking we are not only trained in the technical domain as well as I have also improved my communication skills and confidence in appearing for interviews.",
        "name": "Abhishek",
        "role": "IBM-Collabera"
      }
    ],
    "coursesOffered": [
      "bca-cloud-cyber-security",
      "cloud-computing-engineer-ai",
      "cloud-computing-professional-ai",
      "cloud-cyber-security-engineer",
      "routing-switching-administrator",
      "pc-hardware-support"
    ],
    "seo": {
      "title": "Cloud Computing Courses & Training Institute in Bangalore",
      "description": "Cloud Computing course in Bangalore - UG/Diploma programs in Cloud AI & Cybersecurity with job placement, Learn AWS, Azure & more from Certified Professionals"
    },
    "updatedAt": "2026-08-06"
  },
  {
    "slug": "shivajinagar",
    "name": "Jetking Shivajinagar",
    "citySlug": "bengaluru",
    "addressLine": "491/1, 2nd Floor, Above V M Hardware, Jumma Masjid Road, Beside Kamat Hotel, Bangalore – 560051",
    "locality": "Shivajinagar",
    "state": "Karnataka",
    "pincode": "560051",
    "phone": "09845339311",
    "helpline": "07666830000",
    "email": "shn@jetking.com",
    "intro": "Cloud Computing course in Shivajinagar - UG/Diploma program in Cloud AI & Cybersecurity with job placement, Learn AWS, Azure & more from Certified Professionals",
    "body": "Explore your Career and secure future with Jetking Shivajinagar Top Cloud Computing Courses and Cyber Security courses in bangalore, BCA 3 Year Degree program, Ethical Hacking Course, CCNA, Python Programing and many more with best IT Courses offerings at Shivajinagar Jetking Learning Center, Bangalore Karnataka.\n\nJoin Jetking, India's Leading IT Training Institute Enroll now in Jetking Shivajinagar, Bangalore best IT Career Courses like Cloud Computing course, Cyber Security courses and BCA Degree programs, CCNA, Linux and Data Analyst program with flexible easy EMIs in Shivajinagar, Bangalore learning Institute. Gain hands-on experience on live projects and open doors to endless career opportunities!",
    "featuredProgrammes": [
      {
        "title": "BCA In Cloud Computing & Cyber Security",
        "subtitle": "Degree programme",
        "duration": "36 Months",
        "mode": "Offline/Hybrid"
      }
    ],
    "faculty": [
      {
        "name": "Salman Shariff",
        "title": "Senior Technical Trainer",
        "bio": "7+ Years Experience in Hardware, Operating System, Networking, Server, CCNA, Exchange Server and 1+Year Experience in AWS",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/947717/file/254d1ae7ff3358159b74c6cd7ece081c.png"
      },
      {
        "name": "Vinod M",
        "title": "Senior Technical Trainer",
        "bio": "16+ Years Experience in Hardware, Operating System, Networking, Server, CCNA, Exchange Server, Linux and AWS",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/947718/file/65d60cdde3948dd1c164824c9b708794.png"
      },
      {
        "name": "Khaja Khizar",
        "title": "Technical Trainer",
        "bio": "5+ Years Experience in Hardware, Operating System, Networking, Server",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/947719/file/428bfeef19f5e16be04bd6097c6a0206.png"
      }
    ],
    "placements": [
      {
        "name": "Nagaraj Gangavath",
        "company": "Getronics",
        "package": "Best In Industry",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1387092/file/7adc10b23efb4fb0fccf74e7d8f610b9.png"
      },
      {
        "name": "Mohsin Taher",
        "company": "Chipset Computers",
        "package": "Best In Industry",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1387070/file/367ee042bc2617f30375c2e59a897f2e.png"
      },
      {
        "name": "Chenna Keshav",
        "company": "Microland Limited",
        "package": "Best In Industry",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1387091/file/91816e046854a851e125ec77e59b7881.png"
      },
      {
        "name": "S.Sendhil Prasath",
        "company": "Microsoft",
        "package": "Best In Industry",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1387097/file/c1783b02ed0edc7b66d13d4d2ac72eda.png"
      },
      {
        "name": "Jupiter Alappat",
        "company": "Microsoft",
        "package": "Best In Industry",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1387095/file/65e17b7a087c4e9979effa680af88eeb.png"
      },
      {
        "name": "Ajay Kumar Mishra",
        "company": "Soft Tek",
        "package": "Best In Industry",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1387068/file/4c62eff2871742143816c55ebf4ad153.png"
      },
      {
        "name": "Solomond D",
        "company": "Lenovo",
        "package": "Best In Industry",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1387069/file/addad8c11f1991548ea03527f82fdd51.png"
      },
      {
        "name": "Rekha Goeda",
        "company": "Happiest Mind",
        "package": "Best In Industry",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1387071/file/9764b5e6f11b631e2a3d051507051181.png"
      },
      {
        "name": "Mohammed Yunus",
        "company": "Motorola",
        "package": "Best In Industry",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1387089/file/0755336c31be8075d7cf417106f38668.png"
      },
      {
        "name": "Anil P.V",
        "company": "TCS",
        "package": "Best In Industry",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1387077/file/c66e3c6892f6fcbce9f386913d1df891.png"
      },
      {
        "name": "Arun Kumar S",
        "company": "QOS",
        "package": "Best In Industry",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1387088/file/44ec4737f3a71c176d737acd43bcae7c.png"
      },
      {
        "name": "Pooja",
        "company": "Nxtgen",
        "package": "Best In Industry",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1387087/file/446882265f5c33e5d9dccbdb104f627a.png"
      },
      {
        "name": "Priyanka",
        "company": "Nxtgen",
        "package": "Best In Industry",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1387094/file/9680bb954bbf62177001a0794cd9d935.png"
      },
      {
        "name": "Sudheer Kumar",
        "company": "Nxt Gen",
        "package": "Best In Industry",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1387074/file/4bac68a7e1292e77a43c25dced78b4e6.png"
      },
      {
        "name": "Soudamini Mallik",
        "company": "Nxt Gen",
        "package": "Best In Industry",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1387078/file/6cad8504e35dee83e646b14604ade0f7.png"
      },
      {
        "name": "Bijay Mohanty",
        "company": "Dhaanus",
        "package": "Best In Industry",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1387079/file/334c22145a480159133d8215de3de27c.png"
      },
      {
        "name": "Rakesh Kumar",
        "company": "Foresight Soft Solution",
        "package": "Best In Industry",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1387075/file/7e4a4c01ee760fc41b052d025696d79d.png"
      },
      {
        "name": "Uday Kiran Reddy",
        "company": "Materials India Ltd",
        "package": "Best In Industry",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1387073/file/6310ccf5fac4ba80c8cb4e28a8dd8c82.png"
      },
      {
        "name": "Sharan",
        "company": "Results Services",
        "package": "Best In Industry",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1387083/file/1b594f4b848db2de58e1f1ecdc457cb4.png"
      },
      {
        "name": "Manjunath D",
        "company": "Blue Yonder",
        "package": "Best In Industry",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1387085/file/86795bf38711e9b0b732bdc554fe1b45.png"
      },
      {
        "name": "Rimitha",
        "company": "Ahana Systems",
        "package": "Best In Industry",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1387076/file/bb52907a146e765486b04d71e25e77c8.png"
      },
      {
        "name": "Vinay UD",
        "company": "Trijit",
        "package": "Best In Industry",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1387084/file/fba9438408b3b6de1d0476a093786552.png"
      },
      {
        "name": "Uday Bhaskar M",
        "company": "Trijit",
        "package": "Best In Industry",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1387081/file/d3974972974a9a651bc4a04b52d2e928.png"
      }
    ],
    "faqs": [
      {
        "question": "Can a non IT person do Cloud computing Course?",
        "answer": "If you're not well-versed in technology, Cloud computing can seem overwhelming. To navigate this fast-evolving field successfully, it's wise to first develop a solid grasp of IT basics. Building a strong foundation in IT will make your journey into cloud computing much smoother and more manageable."
      },
      {
        "question": "Is Cloud computing a good career?",
        "answer": "Launching your career in cloud computing in 2024 opens up incredible opportunities for growth, professional development, and job stability. By acquiring the right skills and expertise, you can dive into a rewarding career path in a dynamic industry that's driving the future of technology and global business."
      },
      {
        "question": "Who is eligible for cyber security?",
        "answer": "To enroll in this course, students need to have completed their 10+2 education in any stream in Bangalore. This program equips students with the essential technical knowledge and skills to safeguard computer networks against malicious attacks."
      },
      {
        "question": "Is cyber security a good career?",
        "answer": "Absolutely! Careers in computing and information technology, especially in cybersecurity, are not only among the highest-paying but also in high demand across the industry"
      },
      {
        "question": "What is the salary of Cloud computing courses?",
        "answer": "The projected annual compensation for a Cloud Engineer in Bangalore is approximately ₹900,000, while the average salary stands at around ₹6,20,000 per year. This figure reflects the median salary, which serves as the midpoint derived from our exclusive Total Pay Estimate model, based on data gathered from our user base."
      }
    ],
    "testimonials": [
      {
        "quote": "I am a BCA Graduate after bca i have done a MCC( master's in cloud computing) i am happy to jetking shivajinagar because i haven't to get job in Nxtgen been working as a Cloud Engineering. i am Really greatful to all the teachers like , salman sir, khizar sir and my HR. thankyou for giving me great oppertunity and i am really happy decsion i make here. thankyou",
        "name": "Soudamini Mallik",
        "role": "Cloud Engineer"
      },
      {
        "quote": "I completed MCA in 2012 and i have workedin bpo sector concentrix pvt ltd their i worked 7 years because of i completed mca my goal was to work in IT domin to fullfill i searched which insitiute is best in envroment i got know the jetking shivaijinagar is the best instiute to fullfill my goals after that i contact to jetking managemnt and placement manager also and they sujested ther good opion i joined as a mna cour",
        "name": "Sudheer Kumar",
        "role": "Cloud Engineer"
      },
      {
        "quote": "I done my engineering BRINDAVAN INSTITUTE OF TECHNOLOGY i got know about Jetking through my uncle he is been a student hear few years ago and that how i choose networking as profession and good future of myself in networking domain that why i choose JKMNA in Jetking Shivajinagar. i am happy to jetking shivajinagar because i haven't to get job in CISCO been working as a network Support Engineering. i am Really greatfu",
        "name": "Amina Sadiya",
        "role": "Cameo Global (Resident Of CISCO)"
      }
    ],
    "coursesOffered": [
      "bca-cloud-cyber-security",
      "cloud-computing-engineer-ai",
      "cloud-computing-professional-ai",
      "cloud-cyber-security-engineer",
      "routing-switching-administrator",
      "pc-hardware-support"
    ],
    "seo": {
      "title": "Cloud Computing Courses & Training Institute in Shivajinagar",
      "description": "Cloud Computing course in Shivajinagar - UG/Diploma program in Cloud AI & Cybersecurity with job placement, Learn AWS, Azure & more from Certified Professionals"
    },
    "updatedAt": "2026-08-06"
  },
  {
    "slug": "swargate",
    "name": "Jetking Swargate",
    "citySlug": "pune",
    "addressLine": "433, Patil Plaza, Swargate Chowk, Mitra Mandal Colony, Parvati Paytha, Pune, Maharashtra 411009",
    "locality": "Swargate",
    "state": "Maharashtra",
    "pincode": "411009",
    "phone": "9890056565",
    "helpline": "07666830000",
    "email": "swargate@jetking.com",
    "intro": "Boost your expertise and secure your future with Jetking Top Cloud Computing courses and Cyber Security courses in Pune. Learn BCA 3 Year Degree program, Ethical Hacking Course, CCNA, Python Programing and many more offerings by Best IT Training Institute in Pune, Jetking Swargate Learning Center.",
    "body": "Boost your expertise and secure your future with Jetking Top Cloud Computing courses and Cyber Security courses in Pune. Learn BCA 3 Year Degree program, Ethical Hacking Course, CCNA, Python Programing and many more offerings by Best IT Training Institute in Pune, Jetking Swargate Learning Center.\n\nJoin Jetking, India's Leading IT Training Institute Enroll now in Jetking Swargate Cloud Computing Course, Cyber Security courses and BCA 3 Years Degree programs with flexible and easy EMIs in Pune. Gain hands-on experience on live projects and open doors to endless career opportunities!",
    "featuredProgrammes": [
      {
        "title": "Diploma In Cloud Computing with Artificial Intelligence",
        "subtitle": "Career programme",
        "duration": "12 Months",
        "mode": "Offline/Hybrid"
      },
      {
        "title": "Masters of Cloud Computing with Artificial Intelligence",
        "subtitle": "Career programme",
        "duration": "6 Months",
        "mode": "Offline/Hybrid"
      },
      {
        "title": "BCA In Cloud Computing & Cyber Security",
        "subtitle": "Degree programme",
        "duration": "36 Months",
        "mode": "Offline/Hybrid"
      }
    ],
    "faculty": [
      {
        "name": "Rushikesh Velhal",
        "title": "Technical Faculty",
        "bio": "Qualification: BCS Total Experience: 10+ Years of experience in IT, Specialization in Hardware & Networking, Windows 10, CCNA, Windows Server, Linux (REDHAT), AWS, Cloud computing, E-Mail client, Microsoft office 365.",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/workspace/vnBgwv/image/8511600/file/e22246dabac4fe26b0cfe57ac5aff8f3.png"
      },
      {
        "name": "Vipin Kumar",
        "title": "Technical Faculty",
        "bio": "Qualification: Graduate Total Experience: 15+ Years of experience in IT, Specialization in CCNA /CCNP (Router/Switching), Server 2012,2016,Server 2019 , Redhat Linux , Ubuntu Vigrant, Docker, Kubernets, maven, Jenkins, Ansible Security+, Pen Tester, CEH,CEI,CCSA, VmWare Vsphere , Hyper V, Aws Security, Azure Security, Python , Advance Excel , Power BI.",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/workspace/vnBgwv/image/8511811/file/c616e2c3ffe18360ab13f4d12ff98e7e.png"
      }
    ],
    "placements": [
      {
        "name": "Onkar Sanas",
        "company": "NR Technoserve",
        "package": "2.1 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/workspace/vnBgwv/image/17621328/file/5ac80c28740f21bdf41a1e3b7f2e449c.png"
      },
      {
        "name": "Nikita rode",
        "company": "IT Point",
        "package": "2.0 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/workspace/vnBgwv/image/17621324/file/63896bd97043ecd944dd0243f42e86e0.png"
      },
      {
        "name": "Ashok Gaikwad",
        "company": "NR Technoserve Pvt Ltd",
        "package": "2.0 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/workspace/vnBgwv/image/17621314/file/d3fd5e1738cee832b78bb2a2e2b8bee8.png"
      },
      {
        "name": "Aditya R Hankare",
        "company": "NR Technoserve Pvt Ltd",
        "package": "2.0 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/workspace/vnBgwv/image/17621311/file/21e11b82739b484901e30a8122b940f4.png"
      },
      {
        "name": "Rushikesh Yadav",
        "company": "Brentwood Infoscribe Ltd.",
        "package": "2.1 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/workspace/vnBgwv/image/17621120/file/f156bb69d58cfd68c882c35cc9bbd6a9.png"
      },
      {
        "name": "Harshad Mankoskar",
        "company": "Digitide Solutions Limited",
        "package": "2.7 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/workspace/vnBgwv/image/17621097/file/ee3b3fee22cae16390cf2803d40f239b.png"
      },
      {
        "name": "Satesh Rasal",
        "company": "TAKNEK AUTOMATION SYSTEM PVT LTD.",
        "package": "3.7 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/workspace/vnBgwv/image/17621357/file/4a3e6766bf577e7ad135eb21f6249222.png"
      }
    ],
    "faqs": [
      {
        "question": "Who is eligible for Cloud computing Courses?",
        "answer": "Students 10+2 and Degrees in non-technical fields such as B.Com., B.A., or finance-related disciplines are also acceptable. Additionally, students who are in their final year of graduation are eligible for the course"
      },
      {
        "question": "Can a non IT person do Cloud computing Course?",
        "answer": "If you're not well-versed in technology, cloud computing can seem overwhelming. To navigate this fast-evolving field successfully, it's wise to first develop a solid grasp of IT basics. Building a strong foundation in IT will make your journey into cloud computing much smoother and more manageable."
      },
      {
        "question": "What is the Cost of Cloud computing courses in Pune?",
        "answer": "To find out the cost and duration of our cloud computing courses in Pune, please visit our official website at jetking.com and submit an inquiry. Our team will provide you with detailed information on the course fees and other relevant details."
      },
      {
        "question": "Who is eligible for Cyber security?",
        "answer": "To enroll in this course, students need to have completed their 10+2 education in any stream. This program equips students with the essential technical knowledge and skills to safeguard computer networks against malicious attacks."
      },
      {
        "question": "What is the salary of Cloud Engineer?",
        "answer": "The average salary for a Cloud Engineer in India typically falls between ₹3.0 Lakhs and ₹13.0 Lakhs per year, with the average annual pay being around ₹7.3 Lakhs."
      }
    ],
    "testimonials": [
      {
        "quote": "Before joining Jetking, I was not sure what to do with my career. But after completing the course, I got the right platform to start my career. It's been nearly 5 years and I have never looked back. I am very satisfied with my decision to join Jetking which has proved that there is no disadvantage of being a girl in technical domain.",
        "name": "Preeti Madan",
        "role": "Quatrro"
      },
      {
        "quote": "“Without Jetking, I don’t know where I would be. You made a major difference in my life. All those times that you have gone the extra mile for me, I really did notice. Your belief in me makes me believe in myself.”",
        "name": "Nikhil Pathare",
        "role": "Tata Consultancy Services"
      },
      {
        "quote": "I am very happy with Jetking for the placement assistance, even after my first job. I am grateful for all the guidance and technical knowledge provided. At Jetking we are not only trained in the technical domain as well as I have also improved my communication skills and confidence in appearing for interviews.",
        "name": "Abhishek",
        "role": "IBM-Collabera"
      }
    ],
    "coursesOffered": [
      "bca-cloud-cyber-security",
      "cloud-computing-engineer-ai",
      "cloud-computing-professional-ai",
      "cloud-cyber-security-engineer",
      "routing-switching-administrator",
      "pc-hardware-support"
    ],
    "seo": {
      "title": "Best Cloud Computing Courses & Training Institute in Pune",
      "description": "Cloud Computing course in Pune - UG/Diploma programs in Cloud AI & Cybersecurity with job placement, Learn AWS, Azure & more from Certified Professionals"
    },
    "updatedAt": "2026-08-06"
  },
  {
    "slug": "south-extension",
    "name": "Jetking South Extension",
    "citySlug": "delhi",
    "addressLine": "F, Second Floor, Infront of McDonald Part 1, South Extension I, Block F, New Delhi, Delhi 110049",
    "locality": "South Extension",
    "state": "Delhi",
    "pincode": "110049",
    "phone": "09643627334",
    "helpline": "07666830000",
    "email": "southex@jetking.com",
    "headline": "Best Cloud Computing Training Institute in Delhi",
    "intro": "Best Cloud Computing Training Institute in Delhi Excellence your expertise and solidify your career with Jetking top Cloud Computing courses & Cyber Security courses in South extension Delhi. Pursue a 3 year BCA degree program and secure a future in the tech industry.",
    "body": "Excellence your expertise and solidify your career with Jetking top Cloud Computing courses & Cyber Security courses in South extension Delhi. Pursue a 3 year BCA degree program and secure a future in the tech industry.\n\nJoin Jetking, India's Leading IT Training Institute Enroll in our Cloud Computing courses in Delhi, Cyber Security courses and BCA Degree programs with flexible easy EMIs. Gain hands-on experience on live projects and open doors to endless career opportunities from Delhi, South Ex learning center!",
    "featuredProgrammes": [
      {
        "title": "Diploma In Cloud Computing with Artificial Intelligence",
        "subtitle": "Career programme",
        "duration": "12 Months",
        "mode": "Offline/Hybrid"
      },
      {
        "title": "Masters of Cloud Computing with Artificial Intelligence",
        "subtitle": "Career programme",
        "duration": "6 Months",
        "mode": "Offline/Hybrid"
      },
      {
        "title": "BCA In Cloud Computing & Cyber Security",
        "subtitle": "Degree programme",
        "duration": "36 Months",
        "mode": "Offline/Hybrid"
      }
    ],
    "faculty": [
      {
        "name": "Abhishek Pathak",
        "title": "Senior Tech Faculty (MCT)",
        "bio": "Graduate with B.A (Bachelor of Arts), 12+ Years Teaching experience in IT-IMS Industry. Globally Certified in MCSA, RHCSA(Red Hat Certified System Administrator), AWS ( SAA-C02), Certified A 'Level approved by Nielit. Expertise in IT Training (Cloud Computing , Windows Server, Office 365, Networking, VMware, Linux Server, CCNA (Cisco Certified Network Associate).",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1043759/file/f9aa04fb91326955520a933fc045c5eb.png"
      },
      {
        "name": "Neeraj Pathak",
        "title": "Tech Head",
        "bio": "Master in Computer Science/Application, with 8+ Years experience in IT-IMS Industry. Certified Microsoft Azure(Az-900 & Az-104), Microsoft Security Compliance(SC-900) & Cybersecurity Certified (Network Security Associate & Professional) by Fortinet. Certified NSE-1, NSE-2, NSE-3, NSE-4 by Fortinet Firewall Security.[DLP, UTM, Checkpoint, Wireshark] Certified O’Level approved by Nielit, Certified TCS NQT & Java Certification. Expertise in IT Training ( Cloud computing & Cyber Security, Office365, MCSA, CCNA, RHCSA, AWS, MS-Azure, Firewall, Endpoint Security, Vcentre, Vmware, Citrix, Kali Linux, Python, Java, C, CPP, DBMS, SQL, MySQL, DAA, DSA)",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1043760/file/299112a6ceaa03f67a15d8d779c40a1f.png"
      },
      {
        "name": "Jaiveer Singh",
        "title": "Technical Faculty",
        "bio": "Graduate with Bachelor in Computer Application, 4 + years Teaching experience in IT-IMS. Certified CCNA(Cisco Certified Network Associate) and Certified Master in Network Administrator. Expertise in IT Training ( Windows, Networking, CCNA, Windows-Server, Office365) with manage Real life scenario (lab infrastructure).",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1043762/file/2d6234b8a3fbde10dc73d0cb2cb56bcc.png"
      },
      {
        "name": "Rahul Jha",
        "title": "Technical Faculty",
        "bio": "Graduate with Bachelor in Computer Application, with Certified CCNA(Cisco Certified Network Associate), Certified Basics of Data Analytics – Masai. Expertise in Kali Linux, Android, Social Media, Windows Hacking, CCNA, Windows, Office365, Server. 4 + years Teaching experience in IT-IMS with handling Lab infra.",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1043758/file/88084139658d3abe4e8bbce3c6ae2c42.png"
      },
      {
        "name": "Sunny Kumar",
        "title": "Technical Faculty",
        "bio": "Graduate in B.Sc. (Bachelor of Science) with 6+ years Teaching experience in IT-IMS. Certified AWS (Practitioner), Ms-Azure (Az-900), Certified Diploma in Cloud Computing. Expertise in 6+ years IT Training ( CCNA, Windows-Server, Linux-Server, AWS, Networking, Windows, Office365) with handling Cisco Lab infra.",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1043757/file/b58ab602671ebcbc9aaadc8f912cccb9.png"
      }
    ],
    "placements": [
      {
        "name": "Gulshan Chauhan",
        "company": "TCS",
        "package": "3 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1774279/file/4417db914584b112f87520579aed5a13.png"
      },
      {
        "name": "Smile Mehta",
        "company": "HCL Technologies",
        "package": "6 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1774269/file/08059347cf7e36a25597a5054d97df2c.png"
      },
      {
        "name": "Ashwani Kumar",
        "company": "Thoughtsol Infotech",
        "package": "2.5 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1774286/file/c103278373826865787992fbfbf72dd6.png"
      },
      {
        "name": "Nitish Kumar",
        "company": "Hitachi Systems",
        "package": "2.98 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1774276/file/6a90111686e87c7fd760128d5b87d519.png"
      },
      {
        "name": "Mintu Kumar",
        "company": "Thoughtsol Infotech",
        "package": "2.5 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1774271/file/35e6e23f4e1f9f01535c5b2c21ca9964.png"
      },
      {
        "name": "Vikrant Senger",
        "company": "Globetier Infotech",
        "package": "4.8 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1774274/file/181bb8d5b4ebb3b218b668a311348a1a.png"
      },
      {
        "name": "Bharat Dagar",
        "company": "JNR Management",
        "package": "2.8 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1774275/file/023bea3f999ba602f44dfc75c1c1d8ed.png"
      },
      {
        "name": "Deepak Kumar",
        "company": "NEC Corporation",
        "package": "9 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1774280/file/ccae187f53409fad49503e55754fc074.png"
      },
      {
        "name": "Pankaj Singh",
        "company": "Microland Ltd",
        "package": "2.78 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1774273/file/610fb0ac2246890089b78d362242bbe9.png"
      },
      {
        "name": "MD Shanu Ali",
        "company": "System 3 Net",
        "package": "2.40 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1774285/file/82df430724f7083f339d9fe35ac71ebb.png"
      },
      {
        "name": "Saurabh Singh",
        "company": "HCL",
        "package": "3.16 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1774284/file/500c1c9335a33596cb02e42cbb2afb83.png"
      },
      {
        "name": "Abhinendra Singh",
        "company": "Source Dot Com",
        "package": "7.2 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1774270/file/873814ed955de64fceb9f57737e92c23.png"
      },
      {
        "name": "Sanjay Mishra",
        "company": "Reliance Reatils Ltd",
        "package": "4 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1774278/file/3e969786b5d475755c4f16f0c64febfe.png"
      },
      {
        "name": "Sachin Gupta",
        "company": "Radio Mirchi 98.3",
        "package": "2.9 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1774267/file/24687b38c187874e71a4ea63a1a07375.png"
      },
      {
        "name": "Amit Bisht",
        "company": "Entertainment Network",
        "package": "3 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1774310/file/e728041cc5b4fea2d1eac9e5e802b811.png"
      },
      {
        "name": "Vansh Chaudhary",
        "company": "Ascent Wellness Pvt.ltd",
        "package": "2.4 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1774281/file/431e62a165b27017e5511b16c19df1a3.png"
      },
      {
        "name": "Vipin Kumar",
        "company": "ANI Technologies",
        "package": "2.4 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1774277/file/d6242aa4ca9b878c378ff78a51296258.png"
      },
      {
        "name": "Manoj",
        "company": "LRS",
        "package": "2.4 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1774282/file/a47f785901f13b695ca486cf6a839dd1.png"
      },
      {
        "name": "Jai Shree Pandey",
        "company": "ITS",
        "package": "2.53 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1774287/file/e6c9e98e76c3ba9537afa4bdec2bdb80.png"
      },
      {
        "name": "Yash Kandpal",
        "company": "Motherson Group",
        "package": "3.2 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1774283/file/e9d21030a6e51323123e8d7c17f4eea6.png"
      },
      {
        "name": "Anujeet",
        "company": "ITS",
        "package": "2.53 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1774268/file/dc23576587e1d4cb9f8db7ec12ad8741.png"
      },
      {
        "name": "Kanchan Negi",
        "company": "Deutsche Bahn",
        "package": "3 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1774377/file/63820c8d9f3974f72d2bef4047375b0d.png"
      },
      {
        "name": "Aakansha Srivastwa",
        "company": "Aditya Infotech Ltd",
        "package": "2.8 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1774379/file/99cb2f634538924ed4f3fa682ffd2624.png"
      },
      {
        "name": "Anchal Gupta",
        "company": "Hevells",
        "package": "3 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1774378/file/86a1de4be38839529cd3d0ff0f58cf2c.png"
      }
    ],
    "faqs": [
      {
        "question": "Who is eligible for Cloud computing?",
        "answer": "Students 10+2 and Degrees in non-technical fields such as B. Com., B.A., or finance-related disciplines are also acceptable. Additionally, students who are in their final year of graduation are eligible for the course in Delhi."
      },
      {
        "question": "Can a non IT person do Cloud computing Course in Delhi?",
        "answer": "If you're not well-versed in technology, cloud computing can seem overwhelming. To navigate this fast-evolving field successfully, it's wise to first develop a solid grasp of IT basics. Building a strong foundation in IT will make your journey into cloud computing much smoother and more manageable."
      },
      {
        "question": "What is the Cost of Cloud computing courses in Delhi?",
        "answer": "To find out the cost and duration of our cloud computing courses in Delhi, please visit our official website and submit an inquiry. Our team will provide you with detailed information on the course fees and other relevant details."
      },
      {
        "question": "Who is eligible for cyber security?",
        "answer": "To enroll in this course, students need to have completed their 10+2 education in any stream. This program equips students with the essential technical knowledge and skills to safeguard computer networks against malicious attacks."
      },
      {
        "question": "What is the salary of Cloud Engineer in Delhi, India?",
        "answer": "The average salary for a Cloud Engineer in Delhi, India typically falls between ₹3.0 Lakhs and ₹13.0 Lakhs per year, with the average annual pay being around ₹7.3 Lakhs."
      }
    ],
    "testimonials": [
      {
        "quote": "Before joining Jetking, I was not sure what to do with my career. But after completing the course, I got the right platform to start my career. It's been nearly 5 years and I have never looked back. I am very satisfied with my decision to join Jetking which has proved that there is no disadvantage of being a girl in technical domain.",
        "name": "Preeti Madan",
        "role": "Quatrro"
      },
      {
        "quote": "“Without Jetking, I don’t know where I would be. You made a major difference in my life. All those times that you have gone the extra mile for me, I really did notice. Your belief in me makes me believe in myself.”",
        "name": "Nikhil Pathare",
        "role": "Tata Consultancy Services"
      },
      {
        "quote": "I am very happy with Jetking for the placement assistance, even after my first job. I am grateful for all the guidance and technical knowledge provided. At Jetking we are not only trained in the technical domain as well as I have also improved my communication skills and confidence in appearing for interviews.",
        "name": "Abhishek",
        "role": "IBM-Collabera"
      }
    ],
    "coursesOffered": [
      "bca-cloud-cyber-security",
      "cloud-computing-engineer-ai",
      "cloud-computing-professional-ai",
      "cloud-cyber-security-engineer",
      "routing-switching-administrator",
      "pc-hardware-support"
    ],
    "seo": {
      "title": "Best Cloud Computing Courses & Training Institute in SouthEx",
      "description": "Cloud Computing course in SouthEx - UG/Diploma programs in Cloud AI & Cybersecurity with job placement, Learn AWS, Azure & more from Certified Professionals"
    },
    "updatedAt": "2026-08-06"
  },
  {
    "slug": "varanasi",
    "name": "Jetking Varanasi",
    "citySlug": "varanasi",
    "addressLine": "Plot No 6, Opposite Vinayak Plaza, Lajpat Nagar Colony, Maldahiya, Varanasi, Uttar Pradesh",
    "locality": "Maldahiya",
    "state": "Uttar Pradesh",
    "pincode": "221001",
    "phone": "096510 55333",
    "helpline": "07666830000",
    "email": "varanasi@jetking.com",
    "intro": "Cloud Computing course in Varanasi - UG/Diploma programs in Cloud AI & Cybersecurity with job placement, Learn AWS, Azure & more from Certified Professionals",
    "body": "Boost your Skills and secure your future with Jetking Top notch Cloud Computing Courses and Cyber Security courses, BCA 3 Year Degree program from Uttar Pradesh along with Ethical Hacking, CCNA, Python Programing and many more offerings at Jetking Varanasi learning center, Uttar Pradesh.\n\nJoin India’s leading and most trusted digital skills institute, with over 79 years of legacy, offering industry-focused programs in Cloud Computing, Cybersecurity, and BCA Degrees, along with job assistance to launch your career.",
    "featuredProgrammes": [
      {
        "title": "Diploma In Cloud Computing with Artificial Intelligence",
        "subtitle": "Career programme",
        "duration": "12 Months",
        "mode": "Offline/Hybrid"
      },
      {
        "title": "Masters of Cloud Computing with Artificial Intelligence",
        "subtitle": "Career programme",
        "duration": "6 Months",
        "mode": "Offline/Hybrid"
      },
      {
        "title": "BCA In Cloud Computing & Cyber Security",
        "subtitle": "Degree programme",
        "duration": "36 Months",
        "mode": "Offline/Hybrid"
      }
    ],
    "faculty": [
      {
        "name": "Mr. Gaurav Singhal",
        "title": "Centre Director",
        "bio": "Total Industry Experience 18 years . Running Jetking Varanasi Centre from 5 years . Qualification - Chartered Accountant (Int.)",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1019591/file/5139fd4577527ed42f61a4ba01257615.png"
      },
      {
        "name": "Mr. Hemant Agarwal",
        "title": "Centre Director",
        "bio": "Total Industry Experience 18 years. Running Jetking Varanasi Centre from 5 years . Qualification - MCA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1019594/file/0f5664b22e3a98b4405a1505e5193e63.png"
      },
      {
        "name": "Mr. Mayank Singh",
        "title": "Centre Director",
        "bio": "Total Industry Experience 18 years. Running Jetking Varanasi Centre from 5 years . Qualification - MCA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1019593/file/55eefa286f5995a958df359931269951.png"
      },
      {
        "name": "Mr. Tushar Tiwari",
        "title": "Center Manager",
        "bio": "Industry Experience - 8 Years. Working with Jetking Varanasi from 6 years. Certifications- Cisco certified (CCNA), Red Hat training certified RHCSA; RHCE, AWS (Training certified), CEH (training certified)",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1019592/file/e256929171565ca5c8757184a79522e5.png"
      }
    ],
    "placements": [
      {
        "name": "Rohit Chauhan",
        "company": "Unicorn Infosolution Pvt. Ltd.",
        "package": "Best In Industry",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1019683/file/1182c76b2d3494e6629392c94dc2db66.png"
      },
      {
        "name": "Shivam Sahu",
        "company": "Posist",
        "package": "Best In Industry",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1019682/file/e15cd2ac64b6fcb573131dec367f9045.png"
      },
      {
        "name": "Shamim Ahmad",
        "company": "Mi3 Infotech (Sun Pharma)",
        "package": "Best In Industry",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1019681/file/689614055aedbc54dbac77dbbf2a4ef9.png"
      },
      {
        "name": "Vikrant Khanna",
        "company": "IDC Technologies",
        "package": "Best In Industry",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1019680/file/654ccb9501aa8bb45e9cb0b61adf2deb.png"
      },
      {
        "name": "Ranjan Kumar",
        "company": "Unicorn Infosolution Pvt. Ltd.",
        "package": "Best In Industry",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1019679/file/675fd31e35671451c1cae2dca0ddf68c.png"
      },
      {
        "name": "Abhinav Pal",
        "company": "Quaere eTechnologies",
        "package": "Best In Industry",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1019678/file/a61047f3c1c8493e08faa1e4e04ef8b3.png"
      },
      {
        "name": "Shiva Kumar",
        "company": "ICA Edu Skills Pvt. Ltd",
        "package": "Best In Industry",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1019677/file/0096a578627a4bf1f1a38002ddd25222.png"
      },
      {
        "name": "Neeraj Maurya",
        "company": "Microlink Solution pvt. Ltd",
        "package": "Best In Industry",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1019676/file/c9f0c4c2ff159c8dc858a661d00cda64.png"
      },
      {
        "name": "Pooja Patel",
        "company": "Indovision Services Pvt. Ltd.",
        "package": "Best In Industry",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1019675/file/e6ce19e653da65f04929c5fe27c7e931.png"
      },
      {
        "name": "Abhishek Kr. Maurya",
        "company": "Dell Store (Aditya Sales)",
        "package": "Best In Industry",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1019674/file/8d6cd9c8891b5faf9c1f7779cb025561.png"
      },
      {
        "name": "Divesh Sharma",
        "company": "Hotel Taj Ganges Varanasi",
        "package": "Best In Industry",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1019673/file/0989dc8161cb4a02aed0a921e0ce32b9.png"
      },
      {
        "name": "Rohit Yadav",
        "company": "Quaere eTechnologies",
        "package": "Best In Industry",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1019672/file/e92031c7d291960ae450b509b81b70a2.png"
      },
      {
        "name": "Aman Jaiswal",
        "company": "SHEAT College Varanasi",
        "package": "Best In Industry",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1019671/file/18afcae42885e462cbfe6b552b10f326.png"
      },
      {
        "name": "Ankit Kr. Yadav",
        "company": "IDC Technologies (Wipro)",
        "package": "Best In Industry",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1019670/file/8bd65dfa03a87f72a320fd02f2e82a31.png"
      },
      {
        "name": "Suraj Singh",
        "company": "Tech Care Office Solutions",
        "package": "Best In Industry",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1019669/file/68bf26d8df1ef8fbcb010f19ac5ea27c.png"
      },
      {
        "name": "Adil Afshan",
        "company": "Microlink Solutions Pvt. Ltd.",
        "package": "Best In Industry",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1019668/file/40cd74e25d29ad5f046679c3205934ae.png"
      },
      {
        "name": "Mohd Sajid Ansari",
        "company": "Kashi Institute of Technology",
        "package": "Best In Industry",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1019667/file/d391b9eff50197e5a261a8fdc43a13c0.png"
      },
      {
        "name": "Abhishek Prajapati",
        "company": "Hotel Radisson",
        "package": "Best In Industry",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1019666/file/e2b58aa61e1314208da4cdbb4b020f2d.png"
      },
      {
        "name": "Himanshu Maurya",
        "company": "Hazelnut Service Solution",
        "package": "Best In Industry",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1019665/file/450eecb11989a920b0c7b966c75c3bf9.png"
      },
      {
        "name": "Om Prakash Singh",
        "company": "Vaidya",
        "package": "Best In Industry",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1019664/file/0b563f438f4596d0880269cf88d6f3ca.png"
      },
      {
        "name": "Harsh Singh",
        "company": "Core Integra (TCS)",
        "package": "Best In Industry",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1019663/file/c0da0643221ac4e739d22bbcf5ed5c26.png"
      },
      {
        "name": "Surbhi Singh",
        "company": "Jay Dayal Hitex Pvt Ltd",
        "package": "Best In Industry",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1019661/file/47b55a71223d79a1906f96b97114d651.png"
      },
      {
        "name": "Prashant Singh",
        "company": "SHEAT College Varanasi",
        "package": "Best In Industry",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1019660/file/f5e1a19a1d3eccc4402253c5fc41a6c6.png"
      }
    ],
    "faqs": [
      {
        "question": "Who is eligible for Cloud computing Courses?",
        "answer": "Students 10+2 and Degrees in non-technical fields such as B.Com., B.A., or finance-related disciplines are also acceptable. Additionally, students who are in their final year of graduation are eligible for the course."
      },
      {
        "question": "Who is eligible for cyber security Courses?",
        "answer": "To enroll in this course, students need to have completed their 10+2 education in any stream. This program equips students with the essential technical knowledge and skills to safeguard computer networks against malicious attacks."
      },
      {
        "question": "Is Cyber security a good career?",
        "answer": "Absolutely! Careers in computing and information technology, especially in cybersecurity, are not only among the highest-paying but also in high demand across the industry."
      },
      {
        "question": "Can a non IT person do Cloud computing Course?",
        "answer": "If you're not well-versed in technology, cloud computing can seem overwhelming. To navigate this fast-evolving field successfully, it's wise to first develop a solid grasp of IT basics. Building a strong foundation in IT will make your journey into cloud computing much smoother and more manageable."
      },
      {
        "question": "What is the salary of Cloud Engineer?",
        "answer": "The average salary for a Cloud Engineer in India typically falls between ₹3.0 Lakhs and ₹13.0 Lakhs per year, with the average annual pay being around ₹7.3 Lakhs."
      }
    ],
    "testimonials": [
      {
        "quote": "Before joining Jetking, I was not sure what to do with my career. But after completing the course, I got the right platform to start my career. It's been nearly 5 years and I have never looked back. I am very satisfied with my decision to join Jetking which has proved that there is no disadvantage of being a girl in technical domain.",
        "name": "Preeti Madan",
        "role": "Quatrro"
      },
      {
        "quote": "“Without Jetking, I don’t know where I would be. You made a major difference in my life. All those times that you have gone the extra mile for me, I really did notice. Your belief in me makes me believe in myself.”",
        "name": "Nikhil Pathare",
        "role": "Tata Consultancy Services"
      },
      {
        "quote": "I am very happy with Jetking for the placement assistance, even after my first job. I am grateful for all the guidance and technical knowledge provided. At Jetking we are not only trained in the technical domain as well as I have also improved my communication skills and confidence in appearing for interviews.",
        "name": "Abhishek",
        "role": "IBM-Collabera"
      }
    ],
    "coursesOffered": [
      "bca-cloud-cyber-security",
      "cloud-computing-engineer-ai",
      "cloud-computing-professional-ai",
      "cloud-cyber-security-engineer",
      "routing-switching-administrator",
      "pc-hardware-support"
    ],
    "seo": {
      "title": "Cloud Computing Courses & Training Institute in Varanasi",
      "description": "Cloud Computing course in Varanasi - UG/Diploma programs in Cloud AI & Cybersecurity with job placement, Learn AWS, Azure & more from Certified Professionals"
    },
    "updatedAt": "2026-08-06"
  },
  {
    "slug": "thane",
    "name": "Jetking Thane",
    "citySlug": "mumbai",
    "addressLine": "A wing 506/5th floor, Krishna plaza building, above Krishna sweets, Shivaji path, opp railway station, Thane (west), Mumbai, Maharashtra",
    "locality": "Thane West",
    "state": "Maharashtra",
    "pincode": "400601",
    "phone": "09594151000",
    "helpline": "07666830000",
    "email": "thane@jetking.com",
    "intro": "Boost your skills with Best Computer Training Institute in Thane, Mumbai and secure your future with Jetking best Cloud Computing course with AI courses, Cyber Security, Ethical Hacking and CCNA, Server, AWS, Azure courses in Thane, Mumbai, Maharashtra.",
    "body": "Boost your skills with Best Computer Training Institute in Thane, Mumbai and secure your future with Jetking best Cloud Computing course with AI courses, Cyber Security, Ethical Hacking and CCNA, Server, AWS, Azure courses in Thane, Mumbai, Maharashtra.\n\nJoin Jetking, India's Leading IT Training Institute Enroll now in Jetking Thane for Cloud Computing and Cyber Security courses, BCA degree 3 Years graduation programs with flexible and easy EMIs. Gain hands-on practical experience on live projects and open doors to endless career opportunities!",
    "featuredProgrammes": [
      {
        "title": "Diploma In Cloud Computing with Artificial Intelligence",
        "subtitle": "Career programme",
        "duration": "12 Months",
        "mode": "Offline/Hybrid"
      },
      {
        "title": "Masters of Cloud Computing with Artificial Intelligence",
        "subtitle": "Career programme",
        "duration": "6 Months",
        "mode": "Offline/Hybrid"
      },
      {
        "title": "BCA In Cloud Computing & Cyber Security",
        "subtitle": "Degree programme",
        "duration": "36 Months",
        "mode": "Offline/Hybrid"
      }
    ],
    "faculty": [
      {
        "name": "Pallav Kundu",
        "title": "PD Trainer",
        "bio": "Qualification: - BSc IT Graduate RHCSA and RHCE Certified on RHEL 7 Experience: - 9 years of experience in I.T. with hands on experience on servers, firewall, wireless network, routers and switches, access points, load balancers.",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/workspace/vnBgwv/image/5458838/file/52c18148203bb6e48df2ec0160ac4feb.png"
      },
      {
        "name": "Asmita Sakpal",
        "title": "Technical Faculty",
        "bio": "Qualification: - Graduate in B.Com LLB. Completed Certification in comptia security + and Certified Ethical Hacking v10 - EC Council. Experience: - 7+ years of experience Subject matter expert in hardware and networking. Also, 1+ years of experience in SOC Analyst. Actively participated with pune university for developing cyber security module video content.",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/968131/file/8709bc3fc282b312fffdaae68ec2bd83.png"
      },
      {
        "name": "Rashmi Telore",
        "title": "Technical Faculty",
        "bio": "Qualification – 4 years Engineering Diploma in Digital Electronics from S.B.M Polytechnic Bachelor Of Arts from Mumbai University Experience – Total 10 years Experience CMS Computers Ltd. , Mumbai as a Trainee Faculty and Technical consultant, Tata Institute Of Fundamental Research ,Colaba, Mumbai as a Scientific Assistant (B), Podar International School (ICSE) ,Kalyan as a Computer Teacher, ASP Convent English High School , Ghansoli as a Computer Teacher.",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/workspace/vnBgwv/image/5458928/file/79aba0f884c872c549a2dce5029df371.png"
      }
    ],
    "placements": [
      {
        "name": "Nikita Pandhare",
        "company": "Unicorn Infosolutions Pvt Ltd",
        "package": "2.10 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/workspace/vnBgwv/image/5524173/file/4ad8f04885bbad2dd3db5ad8cd45a233.png"
      },
      {
        "name": "Mayuresh Zade",
        "company": "Outworx Solutions Pvt Ltd",
        "package": "2.64 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/workspace/vnBgwv/image/5524181/file/1814fc751acd530acfdbe424aa46b922.png"
      },
      {
        "name": "Rajashree sakpal",
        "company": "I-4 Transformation Pvt Ltd",
        "package": "2.40 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/workspace/vnBgwv/image/5524205/file/ddca960fef7fd642e5dc201eab00d1fc.png"
      },
      {
        "name": "Niketan damane",
        "company": "Advanced enzymes Technologies Ltd",
        "package": "3.24 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/workspace/vnBgwv/image/5728925/file/40b5f5651012cd3f8f367fe6b22accbf.png"
      },
      {
        "name": "Imran Khan",
        "company": "NCR ATLEOS Pvt. Ltd",
        "package": "5.65 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/workspace/vnBgwv/image/5524263/file/fc18df95363450405ad9e51e8d9ea477.png"
      },
      {
        "name": "Pawan Kumar",
        "company": "Adhar Housing Finance Ltd",
        "package": "2.40 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/workspace/vnBgwv/image/5524289/file/11d29c47a144ba33e3964ce79178c5a0.png"
      },
      {
        "name": "Shahab surve",
        "company": "Stallion One Byte Pvt. Ltd",
        "package": "2.70 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/workspace/vnBgwv/image/5524304/file/897618e9038732c0af352cdd77c7de36.png"
      },
      {
        "name": "Soham Pednekar",
        "company": "Unicorn Infosolutions Pvt. Ltd",
        "package": "2.14 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/workspace/vnBgwv/image/5524321/file/ba6517a77449332709362d465d00e1be.png"
      },
      {
        "name": "Tanishq Sontakke",
        "company": "Unicorn Infosolutions Pvt. Ltd",
        "package": "2.14 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/workspace/vnBgwv/image/5524363/file/2a54b23c3234fa479117505040d8aba6.png"
      },
      {
        "name": "Prathamesh Nayak",
        "company": "Unicorn Infosolutions Pvt. Ltd",
        "package": "2.14 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/workspace/vnBgwv/image/5524408/file/8a98fe4913ed0ffe42bfd67b7e4c4b10.png"
      },
      {
        "name": "Nayan Oval",
        "company": "Amazon India",
        "package": "8.57 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/841722/file/9923b2b8af82b22d1c7ef1c2dc22ece1.png"
      },
      {
        "name": "Parag Petare",
        "company": "Wipro India",
        "package": "3.50 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/841721/file/bc11463da155e63bbd7f5e9387103714.png"
      }
    ],
    "faqs": [
      {
        "question": "Can a non IT person do Cloud computing Course?",
        "answer": "If you're not well-versed in technology, cloud computing can seem overwhelming. To navigate this fast-evolving field successfully, it's wise to first develop a solid grasp of IT basics. Building a strong foundation in IT will make your journey into cloud computing much smoother and more manageable."
      },
      {
        "question": "Who is eligible for cyber security?",
        "answer": "To enroll in this course, students need to have completed their 10+2 education in any stream. This program equips students with the essential technical knowledge and skills to safeguard computer networks against malicious attacks."
      },
      {
        "question": "Is Cloud computing a good career?",
        "answer": "Launching your career in cloud computing in 2024 opens up incredible opportunities for growth, professional development, and job stability. By acquiring the right skills and expertise, you can dive into a rewarding career path in a dynamic industry that's driving the future of technology and global business."
      },
      {
        "question": "Is cyber security a good career?",
        "answer": "Absolutely! Careers in computing and information technology, especially in cybersecurity, are not only among the highest-paying but also in high demand across the industry."
      },
      {
        "question": "What is the salary of Cloud computing Engineer?",
        "answer": "The average salary for a Cloud Engineer in Mumbai, India typically falls between ₹3.0 Lakhs and ₹13.0 Lakhs per year, with the average annual pay being around ₹7.3 Lakhs."
      }
    ],
    "testimonials": [
      {
        "quote": "Jetking thane came out as my own guardian angel and gave me a way to success . With the help of Jetking I am able to complete Hardware and Networking. Due to which I am able to serve as IT Executive at Imperative Business Ventures Ltd . This made me put faith in myself.",
        "name": "Parth Bhagore",
        "role": "Imperative Business Ventures Ltd"
      },
      {
        "quote": "Learning at Jetking started building my career just like a successful business. I claimed my CCNA and Networking degree with the help of Jetking . Which earned me a job as an IT Analyst at NCR . It increased my knowledge regarding Networking And Technology. I would say believing in them builds a belief in ourselves.",
        "name": "Akshaya Kunal",
        "role": "IT Analyst"
      },
      {
        "quote": "It seemed to be impossible to perceive my goal . But Jetking made it seem possible and pretty easy. Because of Jetking life gave me a chance , a golden opportunity of becoming a network engineer which gave a turn to my life in an optimistic way and helped me work at Teleperformance as IT Helpdesk .",
        "name": "Kaushik Mishra",
        "role": "Top IT Company"
      }
    ],
    "coursesOffered": [
      "bca-cloud-cyber-security",
      "cloud-computing-engineer-ai",
      "cloud-computing-professional-ai",
      "cloud-cyber-security-engineer",
      "routing-switching-administrator",
      "pc-hardware-support"
    ],
    "seo": {
      "title": "Best Cloud Computing Courses & Training Institute in Thane",
      "description": "Cloud Computing course in Mumbai - UG/Diploma programs in Cloud AI & Cybersecurity with job placement, Learn AWS, Azure & more from Certified Professionals"
    },
    "updatedAt": "2026-08-06"
  },
  {
    "slug": "vashi",
    "name": "Jetking Vashi",
    "citySlug": "mumbai",
    "addressLine": "Fantasia Business Park, G, Next to Inorbit Mall, Near Railway Station, Sector 30A, Vashi, Navi Mumbai, Maharashtra 400708",
    "locality": "Vashi",
    "state": "Maharashtra",
    "pincode": "400708",
    "phone": "9930208257",
    "helpline": "07666830000",
    "email": "vashi.cm@jetking.com",
    "headline": "Best Cloud Computing with AI, Data Analytics, Graphic design, Animation & VFX Institute in Navi Mumbai",
    "intro": "Jetking Vashi offers Cloud Computing, Cyber Security, Data Analytics, Multimedia & Animation, UGC-Approved BCA Degree courses in Navi Mumbai with dedicated placement support.",
    "body": "Top IT Training Institute in Mumbai & Navi Mumbai offering placement-supported courses in Cloud Computing, IT Networking, Cyber Security, Ethical Hacking, Data Analytics, Animation, Graphic Design & UGC-Approved BCA Degree Program at Jetking Vashi.\n\nGet Job-Ready in 6 Months!* Jetking Vashi Institute, Navi Mumbai offers industry-focused Hardware & Networking and cloud Computing & Data Analysis courses including CCNA Cisco Specialization, Router & Switches Management, Windows Server, RedHat Linux, Ethical Hacking, Cyber Security, Gaming & Design, Graphics Design, and 2D & 3D Animation, Data Analytics program and BCA Degree course with strong placement support.",
    "featuredProgrammes": [
      {
        "title": "BCA In Cloud Computing & Cyber Security",
        "subtitle": "Degree programme",
        "duration": "36 Months",
        "mode": "Offline/Hybrid"
      }
    ],
    "faculty": [
      {
        "name": "Priya Sawant",
        "title": "Center Supervisor",
        "bio": "Qualification: Graduate, AWS, MCSA, Redhat & CCNA Certified. Experience: 18+ Years Of Experience in Training.",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/workspace/vnBgwv/image/1987142/file/8b9fcea97dbaa5d373c77430de505039.png"
      },
      {
        "name": "Omkar Surve",
        "title": "Senior Technical Trainer",
        "bio": "Qualification: Graduate, CCNA, MCSA, AWS & RedHat Certified. Experience: 12+ Years Of Experience in Training.",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/workspace/vnBgwv/image/5090928/file/a9ce1ada1538cccfa07a9a584060061c.png"
      },
      {
        "name": "Pradnya Shelar",
        "title": "Senior Technical Trainer",
        "bio": "Qualification: Graduate, Certified & Experience In MCSA & CCNA. Experience: 10+ Years Of Experience in Training.",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/workspace/vnBgwv/image/1987146/file/d48feb0e8772fea784b0085de3bf5207.png"
      },
      {
        "name": "Faisal Qureshi",
        "title": "PD Trainer",
        "bio": "Qualification: Graduate, Expertise In Delivery of Behavioral Training Programs, Communication Skills, Personality Development & Instructional Designing. Experience: 13+ Year Of Experience in Training & Development.",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/workspace/vnBgwv/image/5091598/file/97d3f7ecc4fa76c032759f3c33f14d46.png"
      },
      {
        "name": "Shubham Bawankar",
        "title": "Software Trainer",
        "bio": "Qualification: MBA In Business Analytics, Expertise In Full Stack Developer, Java , Python, HTML, CSS, JavaScript, Machine Learning & React.JS Experience: 3+ Years Of Experience in Training.",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/workspace/vnBgwv/image/5091616/file/64da7fcdf0e7ac140ff12a85694174de.png"
      }
    ],
    "faqs": [
      {
        "question": "Is Cloud computing a good career for fresher graduates?",
        "answer": "Yes, cloud computing is an excellent career choice. With the increasing demand for scalable and cost-effective IT solutions, companies across industries are adopting cloud technologies. This has created a high demand for skilled cloud professionals, offering lucrative salaries, diverse job roles (like Cloud Engineer, Architect, and DevOps), and significant growth opportunities. As businesses continue to shift towards digital transformation, cloud computing will remain a vital and rewarding field."
      },
      {
        "question": "Can I learn Cloud computing in 6 months from Navi Mumbai?",
        "answer": "Yes, you can learn the basics and advance tools of cloud computing in 6 months with the right focus and dedication with Jetking Vashi institute. Many beginner courses cover essential topics like cloud services (AWS, Azure), storage, networking, and virtualization within this timeframe. However, mastering advanced concepts may take longer depending on your pace and prior IT knowledge."
      },
      {
        "question": "Can a fresher get job in AI and Cloud computing?",
        "answer": "Yes, a fresher can definitely get a job in AI and cloud computing. Many companies value skills and knowledge over experience, especially in these rapidly evolving fields. By taking relevant courses, working on projects, and building a solid understanding of the fundamentals, freshers can enhance their employability. Internships and certifications in AI and cloud technologies can also significantly boost job prospects. Networking and staying updated on industry trends further increase the chances of landing a role in these exciting areas."
      },
      {
        "question": "Can a non IT person do Cloud computing Course?",
        "answer": "Yes, a non-IT person can definitely pursue a cloud computing course! Many courses are designed for beginners and provide foundational knowledge. With dedication and a willingness to learn, individuals from various backgrounds can successfully transition into cloud computing careers. It's essential to choose a course that offers clear explanations and hands-on practice to build confidence and skills in this field."
      },
      {
        "question": "What is the salary of Cloud computing Engineer in mumbai?",
        "answer": "The projected annual compensation for a Cloud Engineer in Mumbai is approximately ₹6,99,000, while the average salary stands at around ₹6,19,000 per year. This figure reflects the median salary, which serves as the midpoint derived from our exclusive Total Pay Estimate model, based on data gathered from our user base."
      }
    ],
    "testimonials": [
      {
        "quote": "Faculty is great and great place for learning. The Good thing about Jetking is Lifetime placement and career support.",
        "name": "Shantanu Chavan",
        "role": "Insight Business Machine Pvt Ltd"
      },
      {
        "quote": "I had a positive experience with Jetking Vashi learning centre. Great environment for study. The staff and faculty are also very supportive.",
        "name": "Akash Vandre",
        "role": "Nxtgen Infinite Datacenter"
      },
      {
        "quote": "Jetking in one of the best institute to do technical courses and get placed it IT. PD lectures were really beneficial to increase my communication and confidence. I cleared my interview in first attempt and got placed on NOC at a very good salary.",
        "name": "Mohammad Aftab Ansari",
        "role": "ESDS Software Solutions"
      }
    ],
    "coursesOffered": [
      "bca-cloud-cyber-security",
      "cloud-computing-engineer-ai",
      "cloud-computing-professional-ai",
      "cloud-cyber-security-engineer",
      "routing-switching-administrator",
      "pc-hardware-support"
    ],
    "seo": {
      "title": "Best Cloud Computing & Data Analyst Institute in Navi Mumbai",
      "description": "Jetking Vashi offers Cloud Computing, Cyber Security, Data Analytics, Multimedia & Animation, UGC-Approved BCA Degree courses in Navi Mumbai with dedicated placement support."
    },
    "updatedAt": "2026-08-06"
  },
  {
    "slug": "vasai",
    "name": "Jetking Vasai",
    "citySlug": "mumbai",
    "addressLine": "3rd Floor, Shyam Kunj, Behind Neelam E Punjab Restaurant, Opposite Navghar ST Bus Stand, Vasai(W), Mumbai, Maharashtra",
    "locality": "Vasai West",
    "state": "Maharashtra",
    "pincode": "401202",
    "phone": "09322323344",
    "helpline": "07666830000",
    "email": "vasai@jetking.com",
    "intro": "Welcome to Jetking IT training institute in Vasai Road. Accelerate your career with courses in cloud computing, cyber security, CCNA & IT IMS technology.",
    "body": "Advance your Skills and ensure a promising future with Jetking Top IT Courses in Cloud Computing, Cyber Security, Ethical Hacking, CCNA courses, Python Programming, BCA 3 Year Degree and MCA post graduation program from Jetking Vasai/Virar Mumbai Learning Center.\n\nEnroll now in Jetking Best IT Career Courses with flexible easy EMIs. Gain hands-on Practical experience on live projects and open doors to endless career opportunities!",
    "featuredProgrammes": [
      {
        "title": "Diploma In Cloud Computing with Artificial Intelligence",
        "subtitle": "Career programme",
        "duration": "12 Months",
        "mode": "Offline/Hybrid"
      },
      {
        "title": "Masters of Cloud Computing with Artificial Intelligence",
        "subtitle": "Career programme",
        "duration": "6 Months",
        "mode": "Offline/Hybrid"
      },
      {
        "title": "BCA In Cloud Computing & Cyber Security",
        "subtitle": "Degree programme",
        "duration": "36 Months",
        "mode": "Offline/Hybrid"
      }
    ],
    "faculty": [
      {
        "name": "Shangrila Kamble",
        "title": "Centre Supervisor cum Technical Faculty",
        "bio": "Graduate with Jetking Certified Hardware and Networking Professional (JCHNP) Global Certification of MICROSOFT CERTIFIED PROFESSIONAL (MCP), MICROSOFT CERTIFIED SOLUTIONS ASSOCIATE (MCSA), CISCO CERTIFIED NETWORK ASSOCIATE (CCNA), CERTIFIED ETHICAL HACKER (CEH :- USA EC Council), RED HAT CERTIFIED SYSTEM ADMINISTRATOR (RHCSA), SMART LAB PLUS (SLP) GURU CERTIFICATE, TEACHER APPRECIATION CERTIFICATE, FACULTY CERTIFICATION TEST (FCT), 12+ years Experience",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/901249/file/e1614cb3d1440c5f5d03cb2d68ca49e7.png"
      },
      {
        "name": "Rishikesh Pandey",
        "title": "Technical Faculty",
        "bio": "Graduate with Jetking Certified Hardware and Networking Professional (JCHNP), MICROSOFT CERTIFIED PROFESSIONAL (MCP), CISCO CERTIFIED NETWORK ASSOCIATE (CCNA), CERTIFIED ETHICAL HACKER (CEH :- USA EC Council) 9+ years Experience",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/901245/file/3348b6aafcad0b49148339c7fde0acdf.png"
      },
      {
        "name": "Roshan Singh",
        "title": "Technical Faculty",
        "bio": "Graduate with JCHNE (Jetking Certified Hardware and Networking Engineer) 7+ years of Experience",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/901251/file/2e833c857a0ee9394f75255d719a3ca8.png"
      }
    ],
    "placements": [
      {
        "name": "Swarupa Sarvankar",
        "company": "Amazon",
        "package": "8.57 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/workspace/vnBgwv/image/2735949/file/e0241943a043a2cdfe4cb1e98c43c0d4.png"
      },
      {
        "name": "Mehul Salunkhe",
        "company": "Amazon",
        "package": "9 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/workspace/vnBgwv/image/23199976/file/2aa3451cd415722e6f7e7a286765b8fc.png"
      },
      {
        "name": "Shawn Pereira",
        "company": "Anunta Technologies",
        "package": "3.27 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/workspace/vnBgwv/image/2736011/file/b8cc10f1cd04e0f591d5f901d7e891df.png"
      },
      {
        "name": "Savinia Urva",
        "company": "Amazon",
        "package": "8.57 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/workspace/vnBgwv/image/2736023/file/e56ecbbaad9a6c1d8962ca7107033143.png"
      },
      {
        "name": "Saurabh Mourya",
        "company": "Orient Technolgy",
        "package": "2.8 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/workspace/vnBgwv/image/2736035/file/728f1098f33268849b3f9cde99b5ee2e.png"
      },
      {
        "name": "Ratan choudhary",
        "company": "CDP INDIA",
        "package": "2.52 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/workspace/vnBgwv/image/2736080/file/9294c49af42f9e9c6ae1a857d95caef9.png"
      },
      {
        "name": "Dilip Pasi",
        "company": "MUMBAI AIRPORT",
        "package": "3.6 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/workspace/vnBgwv/image/2736323/file/46f3260bee654e6c4fde494b67c9fc5e.png"
      },
      {
        "name": "Jayesh Tiwari",
        "company": "Rahul Internation",
        "package": "3.6 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/workspace/vnBgwv/image/2736386/file/b1f0078fad3bc4dbd8c3896ec1ba65af.png"
      },
      {
        "name": "Prasanna Jadhav",
        "company": "D.S INFOTECH",
        "package": "12 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/workspace/vnBgwv/image/2736418/file/47f5374e3d0212ac0d892d59c4a871fc.png"
      },
      {
        "name": "Arjun Choursiya",
        "company": "Ayushman Bharat",
        "package": "7.2 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/workspace/vnBgwv/image/2736436/file/6fde5fa428fdd7b8f5ec701941fa687f.png"
      },
      {
        "name": "Anwar Kazi",
        "company": "SVKM",
        "package": "4.92 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/workspace/vnBgwv/image/2736442/file/e21bbdb7e0c81ec74c73b65c18564201.png"
      },
      {
        "name": "Devendra Singh",
        "company": "MBH/ARCH",
        "package": "5.07 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/workspace/vnBgwv/image/2736478/file/3a55fff7e484412806cda30c351183db.png"
      },
      {
        "name": "Rakesh Parmar",
        "company": "Reliance",
        "package": "3.29 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/workspace/vnBgwv/image/2736111/file/6d93dfcc319e3666f675bd4230320082.png"
      },
      {
        "name": "Shubham Ringe",
        "company": "Pentagon",
        "package": "3.35 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/workspace/vnBgwv/image/2736122/file/0be7d307cfffb9adcbb926874d656442.png"
      },
      {
        "name": "Vaibhav Patil",
        "company": "Allied Digital",
        "package": "4.85 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/workspace/vnBgwv/image/23171883/file/5717f98f8d07c561fe3abb22aaedb101.jpg"
      },
      {
        "name": "Anup Vartak",
        "company": "ASUS INDIA PVT LTD",
        "package": "7.05 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/workspace/vnBgwv/image/2736287/file/58e91e6f92a0f4e13de4a060483ada25.png"
      },
      {
        "name": "Hiren Markana",
        "company": "Ruaaleo llp",
        "package": "3.6 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/workspace/vnBgwv/image/2736291/file/ca6e4526eae6f9a65778bb6c3615a1bf.png"
      },
      {
        "name": "Hiral Purabia",
        "company": "Mahindra & Mahindra",
        "package": "3.6 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/workspace/vnBgwv/image/2736293/file/dbc2c5063981248ce36d589af2dad018.png"
      },
      {
        "name": "Aviraj Richard",
        "company": "Royal Caribbean Int'l",
        "package": "Best In Industry",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/901242/file/670cde483ccbb056847219f176204a81.png"
      },
      {
        "name": "Suraj Uday Singh",
        "company": "E Clinical Work",
        "package": "Best In Industry",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/901243/file/66826a7b89bd593c6d4b01adfbe88819.png"
      },
      {
        "name": "Vishakha garate",
        "company": "Teleperformance",
        "package": "3 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/workspace/vnBgwv/image/23171928/file/0c12ed2faf0a2f2ffa8f0764fb1e7539.png"
      },
      {
        "name": "Lance Machado",
        "company": "CDP INDIA PVT LTD",
        "package": "3.0 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/workspace/vnBgwv/image/23171923/file/d72b04ff39a66fac3f7f8cc5d6177dcb.png"
      },
      {
        "name": "Deepak Guppi",
        "company": "Infinity Fincorp",
        "package": "3.26 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/workspace/vnBgwv/image/5658843/file/d394a784424cb25e7b870d3698ee466a.png"
      }
    ],
    "faqs": [
      {
        "question": "Is Cloud computing a good career?",
        "answer": "Launching your career in cloud computing in 2024 opens up incredible opportunities for growth, professional development, and job stability. By acquiring the right skills and expertise, you can dive into a rewarding career path in a dynamic industry that's driving the future of technology and global business."
      },
      {
        "question": "Can a non IT person do Cloud computing Course?",
        "answer": "If you're not well-versed in technology, cloud computing can seem overwhelming. To navigate this fast-evolving field successfully, it's wise to first develop a solid grasp of IT basics. Building a strong foundation in IT will make your journey into cloud computing much smoother and more manageable."
      },
      {
        "question": "Who is eligible for cyber security?",
        "answer": "To enroll in this course, students need to have completed their 10+2 education in any stream. This program equips students with the essential technical knowledge and skills to safeguard computer networks against malicious attacks."
      },
      {
        "question": "What is the salary of Cloud Engineer in Mumbai?",
        "answer": "The average salary for a Cloud Engineer in Mumbai typically falls between ₹3.6 Lakhs and ₹13.6 Lakhs per year, with the average annual pay being around ₹7.5 Lakhs."
      },
      {
        "question": "Is cyber security a good career?",
        "answer": "Absolutely! Careers in computing and information technology, especially in cybersecurity, are not only among the highest-paying but also in high demand across the industry."
      }
    ],
    "testimonials": [
      {
        "quote": "Great Extended learning classroom. This place has a superb and original trainer teaching approach. They clear up all the doubts. I got placed as promised at the time of admission. I got a great platform to perform. All thanks to Jetking Vasai",
        "name": "Aviraj Richard Moraes",
        "role": "Royal Caribbean International"
      },
      {
        "quote": "I got very good support from teacher and centre. Was beautiful and satisfied life in Jetking. Overall a great learning experience with a lot of practical knowledge. The best placement preparation process followed.And yess....i got placed with a very good salary package. All thanks to Jetking Vasai Team",
        "name": "Prasanna Jadhav",
        "role": "D.S. Infotech"
      },
      {
        "quote": "I would like to extend my heartfelt gratitude to the teaching and placement teams for their exceptional support and guidance. Additionally, the placement team's relentless efforts in connecting me with valuable career opportunities have been instrumental in shaping my professional path.",
        "name": "Suraj Uday Singh",
        "role": "E Clinical Work"
      }
    ],
    "coursesOffered": [
      "bca-cloud-cyber-security",
      "cloud-computing-engineer-ai",
      "cloud-computing-professional-ai",
      "cloud-cyber-security-engineer",
      "routing-switching-administrator",
      "pc-hardware-support"
    ],
    "seo": {
      "title": "Jetking Vasai | Cloud Computing, CCNA,Cyber Security Courses",
      "description": "Welcome to Jetking IT training institute in Vasai Road. Accelerate your career with courses in cloud computing, cyber security, CCNA & IT IMS technology."
    },
    "updatedAt": "2026-08-06"
  },
  {
    "slug": "vikaspuri",
    "name": "Jetking Vikaspuri",
    "citySlug": "delhi",
    "addressLine": "C-8 New Krishna Park, Near Janakpuri West Metro Station, Vikaspuri, New Delhi",
    "locality": "Vikaspuri",
    "state": "Delhi",
    "pincode": "110018",
    "phone": "09818019409",
    "helpline": "07666830000",
    "email": "vkp@jetking.com",
    "intro": "Cloud Computing course in Vikaspuri - UG/Diploma programs in Cloud AI & Cybersecurity with job placement, Learn AWS, Azure & more from Certified Professionals",
    "body": "Boost your skills and secure your career with our Best Cloud Computing Institute in Delhi with Cyber Security courses and Ethical Hacking courses in Jetking Vikaspuri/Janakpuri, Near Delhi.\n\nJoin Jetking, India's Leading IT Training Institute Enroll now in our Cloud Computing, Cyber Security courses and BCA Degree programs with flexible EMIs. Gain hands-on experience on live projects and open doors to endless career opportunities!",
    "featuredProgrammes": [
      {
        "title": "Diploma In Cloud Computing with Artificial Intelligence",
        "subtitle": "Career programme",
        "duration": "12 Months",
        "mode": "Offline/Hybrid"
      },
      {
        "title": "Masters of Cloud Computing with Artificial Intelligence",
        "subtitle": "Career programme",
        "duration": "6 Months",
        "mode": "Offline/Hybrid"
      },
      {
        "title": "BCA In Cloud Computing & Cyber Security",
        "subtitle": "Degree programme",
        "duration": "36 Months",
        "mode": "Offline/Hybrid"
      }
    ],
    "faculty": [
      {
        "name": "Raghunandan Singh Parihar",
        "title": "Center Manager",
        "bio": "Graduation : B.SC Work Experience: 32 Year in INDIAN Army 20 Year (Center Manager)",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1016110/file/2d1554bc88cfb77f61dfb4c1a4f0cdef.png"
      },
      {
        "name": "Anil Kr. Roy",
        "title": "Technical Faculty",
        "bio": "Graduate MCSE CERTIFIED CCNA CERTIFIED IGET CERTIFIED, C LANGUAGE FROM IETE CERTIFIED Work Experience: 25+years experience in training of operating system windows linux, Network Basics, CCNA, MCSE, RHCSA, python, AWS& CEH.",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1016106/file/98ec581e0191a63b75a1169c5e1ad0c2.png"
      },
      {
        "name": "Jitender kaushik",
        "title": "Technical Faculty",
        "bio": "Qualification : Graduate with IT Work experience : 24 Year",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1016108/file/494448c7fc8d07e4929587ab5a46c8ce.png"
      },
      {
        "name": "Shikha Khandelwal",
        "title": "Technical Faculty",
        "bio": "M.Sc.(Maths) and MCA post graduate with certification in MCSA, JUNIPER CERTIFIED (ROUTING AND SWITCHES) ALSO SDI CERTIFIED, AWS TRAINED ITI DIPLOMA IN COMPUTER APPLICATIONE CERTIFIED Work Experience: 20+ years experience in training of operating system windows linux, Network Basics, CCNA, MCSE, RHCSA, python & AWS.",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/workspace/vnBgwv/image/21601096/file/0fa92aaa6b831b8b730cf16c45d3fce7.png"
      },
      {
        "name": "Sunita Maithani",
        "title": "Technical Faculty",
        "bio": "M.Sc.(Electronics) MCSE, CCNA, CNE Work Experience: 20+ years experience in training of operating system windows linux, Network Basics, CCNA, MCSE, RHCSA, python & AWS.",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/workspace/vnBgwv/image/21601255/file/492a00ea3e66d68f6a920ef6c63ca426.png"
      },
      {
        "name": "Jaspreet Kaur",
        "title": "PD Trainer",
        "bio": "MBA(HR), MA(ENG), BCA ,BA( ENG) Work experience: 10 years of experience as Management faculty and PD Trainer in multiple universities like jamia humdard , jamia milia aslamiya, SMU , MGU, GURUJAMBESHVER , IGNOU, PONDICHERRY.",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/workspace/vnBgwv/image/21601258/file/f2668ad684f1c61ef9d933200a111bed.png"
      },
      {
        "name": "Seema Singh",
        "title": "Academic Counsellor",
        "bio": "MBA( HR & IT ) Work experience: 8 year experience as placement cell and counseling at JETKING",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/workspace/vnBgwv/image/21601097/file/6074df193c609610a4e31e4899cf5c79.png"
      },
      {
        "name": "Rinki Verma",
        "title": "Academic Counsellor",
        "bio": "Graduate (BA) University of Delhi Work experience: 5 years experience as Academic Counsellor at jetking vikaspuri",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/workspace/vnBgwv/image/21601199/file/6af6dd603ad4b0176ede1e05505a352d.png"
      }
    ],
    "placements": [
      {
        "name": "Chetan Kattarmal",
        "company": "Mondelez UK",
        "package": "Best In Industry",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/workspace/vnBgwv/image/10246667/file/73848803637a9c3c4593c28d415a4b69.png"
      },
      {
        "name": "Kunal Kumar Sinha",
        "company": "DOMO Chemicals",
        "package": "Best In Industry",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/workspace/vnBgwv/image/10246661/file/1550514704e2dc79180a1ca82bfe227c.png"
      },
      {
        "name": "Hira Singh",
        "company": "SoftwareOne",
        "package": "Best In Industry",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/workspace/vnBgwv/image/10246659/file/75484b5a7de636424b451190db5a70df.png"
      },
      {
        "name": "Preeti",
        "company": "HCL",
        "package": "Best In Industry",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/workspace/vnBgwv/image/10246662/file/d0ea6141185818881faac961b1672332.png"
      },
      {
        "name": "Mukul Kumar Singh",
        "company": "Shree Technocrat",
        "package": "Best In Industry",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/workspace/vnBgwv/image/10246664/file/d44ea83e892200ecb660bd5300b955f3.png"
      },
      {
        "name": "Sudhanshu Shekhar",
        "company": "NAB Innovation India",
        "package": "Best In Industry",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/workspace/vnBgwv/image/10246665/file/f10d56184f685ecbb33c537ce2b2249e.png"
      },
      {
        "name": "Akash Dubey",
        "company": "Trigyn Technologies",
        "package": "Best In Industry",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/workspace/vnBgwv/image/10246666/file/2ec78a7c9e27078887a7e613139c2013.png"
      },
      {
        "name": "Gagan Sharma",
        "company": "HCL",
        "package": "Best In Industry",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/workspace/vnBgwv/image/10246658/file/888b36cb3086525c303768a5bf4644c9.png"
      },
      {
        "name": "Mohit Dahiya",
        "company": "Binaery Semantic INC",
        "package": "Best In Industry",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/workspace/vnBgwv/image/10246663/file/107f0fe0ec274679299d40757fba3b3f.png"
      },
      {
        "name": "Rajeev Kumar Sharma",
        "company": "Wipro Ltd",
        "package": "Best In Industry",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/workspace/vnBgwv/image/10246660/file/c3a975d1d3849486261aaba86eb4dd39.png"
      },
      {
        "name": "Sachin Kumar",
        "company": "Gandalf IT Services LLP",
        "package": "Best In Industry",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/workspace/vnBgwv/image/10246657/file/809f29eae4775fad76ffe48dd68569b5.png"
      },
      {
        "name": "Prabhat",
        "company": "Startek",
        "package": "IT Executive",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/workspace/vnBgwv/image/21654982/file/9135e097ac0ef3d49df9ba1a775a2f9f.png"
      },
      {
        "name": "Babbi Gupta",
        "company": "IBM",
        "package": "Best In Industry",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1016171/file/b511a06f8690629c2ec49ef722907a61.png"
      },
      {
        "name": "Saurabh",
        "company": "System Support",
        "package": "Best In Industry",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1016168/file/8a6f8049cde39df0ee3aea6e94b00a3d.png"
      },
      {
        "name": "Priyesh Kumar",
        "company": "System Support",
        "package": "Best In Industry",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1016169/file/48a97d3d6d6e815d59a88acb08fe1ef1.png"
      },
      {
        "name": "Deepak Kashyap",
        "company": "Microsoft",
        "package": "Best In Industry",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1016166/file/df51ed20482734f2831b6256b637c0a5.png"
      },
      {
        "name": "Aditya Ranjan",
        "company": "CBSL Group",
        "package": "IT Engineer",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/workspace/vnBgwv/image/21655086/file/e28feb88d3c6c215945074acc8e6f246.png"
      },
      {
        "name": "Harsh",
        "company": "SP Solutions Point",
        "package": "IT Engineer",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/workspace/vnBgwv/image/21655082/file/cb1b3058c80e16e06564fd8c21f3e605.png"
      },
      {
        "name": "Himanshu",
        "company": "Dexterous Consultants",
        "package": "IT Executive",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/workspace/vnBgwv/image/21655079/file/11d7c48800b4b8d5aa6b9d0b1d179a35.png"
      },
      {
        "name": "Akash Rastogi",
        "company": "Startek",
        "package": "IT Executive",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/workspace/vnBgwv/image/21655074/file/b504fb7b04d88e107f92475aca63d12d.png"
      },
      {
        "name": "Ashmit Jha",
        "company": "Cogent E services",
        "package": "IT Executive",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/workspace/vnBgwv/image/21655056/file/e23b555ce97780ce7263b80c8554430a.png"
      },
      {
        "name": "Nitesh Kumar",
        "company": "Rusk Media Pvt Ltd",
        "package": "IT Associate",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/workspace/vnBgwv/image/21655017/file/9f2ed212eea907378a2704e6cec5d0fc.png"
      }
    ],
    "faqs": [
      {
        "question": "Is Cloud computing a good career?",
        "answer": "Launching your career in cloud computing in 2024 opens up incredible opportunities for growth, professional development, and job stability. By acquiring the right skills and expertise, you can dive into a rewarding career path in a dynamic industry that's driving the future of technology and global business."
      },
      {
        "question": "Who is eligible for cyber security?",
        "answer": "To enroll in this course, students need to have completed their 10+2 education in any stream. This program equips students with the essential technical knowledge and skills to safeguard computer networks against malicious attacks."
      },
      {
        "question": "Can a non IT person do Cloud computing Course?",
        "answer": "If you're not well-versed in technology, cloud computing can seem overwhelming. To navigate this fast-evolving field successfully, it's wise to first develop a solid grasp of IT basics. Building a strong foundation in IT will make your journey into cloud computing much smoother and more manageable."
      },
      {
        "question": "Is cyber security a good career?",
        "answer": "Absolutely! Careers in computing and information technology, especially in cybersecurity, are not only among the highest-paying but also in high demand across the industry."
      },
      {
        "question": "What is the salary of Cloud computing Engineers?",
        "answer": "The average salary for a Cloud Engineer in India typically falls between ₹3.0 Lakhs and ₹13.0 Lakhs per year, with the average annual pay being around ₹7.3 Lakhs."
      }
    ],
    "testimonials": [
      {
        "quote": "Before joining Jetking, I was not sure what to do with my career. But after completing the course, I got the right platform to start my career. It's been nearly 5 years and I have never looked back. I am very satisfied with my decision to join Jetking which has proved that there is no disadvantage of being a girl in technical domain.",
        "name": "Preeti Madan",
        "role": "Quatrro"
      },
      {
        "quote": "“Without Jetking, I don’t know where I would be. You made a major difference in my life. All those times that you have gone the extra mile for me, I really did notice. Your belief in me makes me believe in myself.”",
        "name": "Nikhil Pathare",
        "role": "Tata Consultancy Services"
      },
      {
        "quote": "I am very happy with Jetking for the placement assistance, even after my first job. I am grateful for all the guidance and technical knowledge provided. At Jetking we are not only trained in the technical domain as well as I have also improved my communication skills and confidence in appearing for interviews.",
        "name": "Abhishek",
        "role": "IBM-Collabera"
      }
    ],
    "coursesOffered": [
      "bca-cloud-cyber-security",
      "cloud-computing-engineer-ai",
      "cloud-computing-professional-ai",
      "cloud-cyber-security-engineer",
      "routing-switching-administrator",
      "pc-hardware-support"
    ],
    "seo": {
      "title": "Cloud Computing Courses & Training Institute in Vikaspuri",
      "description": "Cloud Computing course in Vikaspuri - UG/Diploma programs in Cloud AI & Cybersecurity with job placement, Learn AWS, Azure & more from Certified Professionals"
    },
    "updatedAt": "2026-08-06"
  },
  {
    "slug": "wakad-chinchwad",
    "name": "Jetking Wakad / Chinchwad",
    "citySlug": "pune",
    "addressLine": "Office 4, 1st Floor, Kunal Plaza, Old Mumbai Pune Highway, Near Chinchwad Railway Station, Chinchwad, Pune, Maharashtra",
    "locality": "Chinchwad",
    "state": "Maharashtra",
    "pincode": "411019",
    "phone": "9822206272",
    "helpline": "07666830000",
    "email": "wakad@jetking.com",
    "intro": "Boost your expertise and solidify your career with Jetking Best Cloud Computing courses and Cyber Security courses in Pune, Chinchwad. Learn Ethical Hacking, CCNA, Animation, Graphic design and Pursue a 3 year BCA degree at Pune Jetking Wakad Learning Center in Chinchwad, and secure a future in the IT & Tech Industry.",
    "body": "Boost your expertise and solidify your career with Jetking Best Cloud Computing courses and Cyber Security courses in Pune, Chinchwad. Learn Ethical Hacking, CCNA, Animation, Graphic design and Pursue a 3 year BCA degree at Pune Jetking Wakad Learning Center in Chinchwad, and secure a future in the IT & Tech Industry.\n\nJoin Jetking, India's Leading IT Training Institute Enroll with Jetking Best Cloud Computing courses in Chinchwad Pune, Cyber Security courses and BCA Degree programs with flexible EMIs. Gain hands-on experience on live projects and open doors to endless career opportunities from Pune, Jetking Wakad learning center!",
    "featuredProgrammes": [
      {
        "title": "Diploma In Cloud Computing with Artificial Intelligence",
        "subtitle": "Career programme",
        "duration": "12 Months",
        "mode": "Offline/Hybrid"
      },
      {
        "title": "Masters of Cloud Computing with Artificial Intelligence",
        "subtitle": "Career programme",
        "duration": "6 Months",
        "mode": "Offline/Hybrid"
      },
      {
        "title": "BCA In Cloud Computing & Cyber Security",
        "subtitle": "Degree programme",
        "duration": "36 Months",
        "mode": "Offline/Hybrid"
      }
    ],
    "faculty": [
      {
        "name": "Priti Chaudhari",
        "title": "Sr. Technical Trainer",
        "bio": "B.E. in Computer from NMU D.N. Patel College of Engineering Shahada Certified in Masters in Nework Administration from Jeking 7+ Years of Experience",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/841723/file/5daa704099bc1aa25dbedcdb05295baf.png"
      },
      {
        "name": "Sandip Gulhane",
        "title": "Trainer – English and Personality Development",
        "bio": "Bachelor of Arts (Major in English) with first class from IGNOU, New Delhi Bachelor of Laws (LL.B.) with distinction from RTM Nagpur University, Nagpur Diploma in Mechanical Engineering with first class from BTE, Mumbai 5+ Year Experience in English, Communication and Soft Skills Training",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/841726/file/cb882916dc3b6e3816ab0c60ef413e2e.png"
      },
      {
        "name": "Tejas A. Palaspagar",
        "title": "Technical Faculty",
        "bio": "Certified Ethical Hacking V11: - STR19EHE00057935 Certified in Cloud Computing: - STR20CLD00145884 Certified in Computer Hardware A+: - COMP001021506062 Certified in Star CyberSecure User: - STR18SCU00044767 Certified Forensic InvestigatorStar Penetration Testing Experts (SPTE) CompTIA N+, A+",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/841768/file/cf49aa0e08f1da005dcca4b9cdb8e9f3.png"
      }
    ],
    "placements": [
      {
        "name": "Sanchit Dherange",
        "company": "Medline India",
        "package": "4.90 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/841724/file/c78b5481e1d7877d02c05371f1eaee80.png"
      },
      {
        "name": "Nayan Oval",
        "company": "Amazon",
        "package": "9.2 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1220112/file/709b91f8b8d1f791359ccb7da93a8795.png"
      },
      {
        "name": "Apurva Sarad",
        "company": "Amazon",
        "package": "8.57 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1220053/file/a77eb033b61d7e414f1c84cdb923681c.png"
      },
      {
        "name": "Chinmay Chatar",
        "company": "Amazon",
        "package": "8.57 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1220037/file/5d4e77d8e70aa5772761c3c76bc6e150.png"
      },
      {
        "name": "Pratibha Balasure",
        "company": "Amazon",
        "package": "9.50 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1220030/file/156ff75fb190ca1b1d062023f558a943.png"
      },
      {
        "name": "Sreejit Nair",
        "company": "Dassault Systems",
        "package": "8.0 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1220033/file/1e9c755aa3fe3faa5a83834283f2b63f.png"
      },
      {
        "name": "Avinash Gavale",
        "company": "All Script",
        "package": "5.60 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1220059/file/88a6c160c257a87f550ed242ef0dc9a7.png"
      },
      {
        "name": "Aijaz Shaikh",
        "company": "Concentrix",
        "package": "4.70 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1220045/file/854d6c8a3ffd723a3f69de6b963b0a09.png"
      },
      {
        "name": "Akshay More",
        "company": "Medline",
        "package": "5.50 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1220026/file/1b909949caaf5c77e05e46b7cb05a2fc.png"
      },
      {
        "name": "Kirthi Munghal",
        "company": "Medline",
        "package": "4.50 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1220032/file/71fc7549631bdb913e948576389f6087.png"
      },
      {
        "name": "Atharva Dhongade",
        "company": "Medline",
        "package": "8.25 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1220051/file/3d5e42fa4836adff2a462679d810a3e8.png"
      },
      {
        "name": "Arka Sur",
        "company": "Medline",
        "package": "5.40 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1220028/file/a1b520d737a6df14a230f9659df60692.png"
      },
      {
        "name": "Monika Sarphale",
        "company": "Medline",
        "package": "5.00 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1220036/file/7330f8c4104b9ec9ba080cbf9c83ae8f.png"
      },
      {
        "name": "Atharva Kulkarni",
        "company": "NCR Corporation",
        "package": "4.30 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1220035/file/7fafdafb89d9fb403df00b55a0feb8ed.png"
      },
      {
        "name": "Ashitosh Shinde",
        "company": "NSEIT",
        "package": "4.00 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1220061/file/9c3bf640fd76acbf988925e2f1cf0bef.png"
      },
      {
        "name": "Rohan Maurya",
        "company": "Wipro",
        "package": "6.00 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1220066/file/86d792e05682b13a6a7feec94c40c3ea.png"
      },
      {
        "name": "Gaurav Kamble",
        "company": "NSEIT",
        "package": "4.00 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1220060/file/2e123351cd995be5e89d37eadbe08c66.png"
      },
      {
        "name": "Shruti Sharma",
        "company": "NSEIT",
        "package": "4.00 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1220020/file/86e6de3d9a79cbc0e1516594ad4358af.png"
      },
      {
        "name": "Sharhukh Pathan",
        "company": "NSEIT",
        "package": "4.00 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1220039/file/fbd3674403d88ec0d7f24f791c516c87.png"
      },
      {
        "name": "Neeraj Arde",
        "company": "NSEIT",
        "package": "4.00 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1220012/file/38fca1e19e7468c07cc56a78ce6b9f4e.png"
      },
      {
        "name": "Aniket Titare",
        "company": "NSEIT",
        "package": "4.00 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1220054/file/72df698c698e5caa125ead0b859a59fc.png"
      },
      {
        "name": "Mohd. Junej",
        "company": "Unipart",
        "package": "4.50 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1220108/file/ac08685a1e8c154398e577ccbe20f20e.png"
      },
      {
        "name": "Tabrej Shaikh",
        "company": "Concentrix",
        "package": "4.50 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1220029/file/2520cceeeaade8cb482a910c8fe08498.png"
      },
      {
        "name": "Sangharsh More",
        "company": "Teleperformance",
        "package": "3.50 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/image/1220031/file/b702098d61e4a1333bdd086b0654d982.png"
      }
    ],
    "faqs": [
      {
        "question": "What is the Cost of Cloud computing courses in Pune?",
        "answer": "To find out the cost and duration of our cloud computing courses in Pune, please visit our official website course page and submit an inquiry. Our team will provide you with detailed information on the course fees and other relevant details."
      },
      {
        "question": "Who is eligible for cyber security?",
        "answer": "To enroll in this course, students need to have completed their 10+2 education in any stream. This program equips students with the essential technical knowledge and skills to safeguard computer networks against malicious attacks."
      },
      {
        "question": "Can a non IT person do Cloud computing Course in Pune?",
        "answer": "If you're not well-versed in technology, cloud computing can seem overwhelming. To navigate this fast-evolving field successfully, it's wise to first develop a solid grasp of IT basics. Building a strong foundation in IT will make your journey into cloud computing much smoother and more manageable."
      },
      {
        "question": "Who is eligible for Cloud computing?",
        "answer": "Students 10+2 and Degrees in non-technical fields such as B. Com., B.A., or finance-related disciplines are also acceptable. Additionally, students who are in their final year of graduation are eligible for the course in Pune."
      },
      {
        "question": "What is the salary of Cloud Engineer in Pune, Maharashtra?",
        "answer": "The average salary for a Cloud Engineer in Pune, Maharashtra typically falls between ₹3.6 Lakhs and ₹13.9 Lakhs per year, with the average annual pay being around ₹7.6 Lakhs."
      }
    ],
    "testimonials": [
      {
        "quote": "I always dreamt about working in the IT sector. So when I came across this industry-synced certification program at Jetking, I decided to enroll for the same. My educational journey has been fantastic and I am now working at Medline India as Linux Administrator Engineer. I thank my faculty and placement officers who patiently guided me through the placement process, and made my dream come true!",
        "name": "Sanchit Dherange",
        "role": "Medline India - 4.50 LPA"
      },
      {
        "quote": "I was always captivated with IT, which is why I decided to pursue Cloud Computing Course from Jetking Institute, The exposure I received at Jetking Institute through high-tech labs, experienced faculty, and an innovative teaching techniques paved the way towards multiple job offers from MNC’s. Thanks to my professors and the placement officers I have narrowed down my decision to join Amazon.",
        "name": "Nayan Oval",
        "role": "Amazon - 8.57 LPA"
      },
      {
        "quote": "Choosing Jetking to pursue professional certification was an obvious choice. Holding a certification from a recognised institute helped me bag multiple job offers from various companies. I am truly grateful for the exposure I have received during my educational journey. I have landed my dream job because of the support, guidance, and encouragement of the Placement Cell & Faculties of Jetking.",
        "name": "Parag Petare",
        "role": "Wipro - 3.50 LPA"
      }
    ],
    "coursesOffered": [
      "bca-cloud-cyber-security",
      "cloud-computing-engineer-ai",
      "cloud-computing-professional-ai",
      "cloud-cyber-security-engineer",
      "routing-switching-administrator",
      "pc-hardware-support"
    ],
    "seo": {
      "title": "Cloud Computing Courses & Training Institute in Chinchwad",
      "description": "Cloud Computing courses in Pune, UG/Diploma in Cloud AI & Cybersecurity with strong placement support, Learn CCNA, AWS, Azure, Linux & more in IT-IMS from Experts"
    },
    "updatedAt": "2026-08-06"
  },
  {
    "slug": "wardha",
    "name": "Jetking Wardha",
    "citySlug": "wardha",
    "addressLine": "Jetking Wardha Learning Cetre DT complex, 3rd floor, near Shankar super market, Agnihotri college road, Ram Nagar, Wardha, Maharashtra 442001",
    "locality": "Ram Nagar",
    "state": "Maharashtra",
    "pincode": "442001",
    "phone": "09420208716",
    "helpline": "07666830000",
    "email": "wardha@jetking.com",
    "headline": "Best Cloud Computing with AI and Cyber security Courses Institute",
    "intro": "Cloud Computing course in Wardha Maharashtra, UG/Diploma in Cloud AI & Cybersecurity with strong placement support, Learn CCNA, Linux, AWS, gain from Industry Experts",
    "body": "Boost your IT Technical Skills with our placement-supported IT courses and secure your Career with Jetking best Cloud Computing with AI Courses & Cyber Security Courses in Wardha, Maharashtra.\n\nJoin Jetking, India's Leading IT Training Institute Enroll now in our best IT Career Courses like Cloud Computing course, Cyber Security courses and BCA Degree programs with flexible easy EMIs in Jetking Wardha learning Institute. Gain hands-on experience on live projects and open doors to endless career opportunities!",
    "featuredProgrammes": [
      {
        "title": "Diploma In Cloud Computing with Artificial Intelligence",
        "subtitle": "Career programme",
        "duration": "12 Months",
        "mode": "Offline/Hybrid"
      },
      {
        "title": "Masters of Cloud Computing with Artificial Intelligence",
        "subtitle": "Career programme",
        "duration": "6 Months",
        "mode": "Offline/Hybrid"
      },
      {
        "title": "BCA In Cloud Computing & Cyber Security",
        "subtitle": "Degree programme",
        "duration": "36 Months",
        "mode": "Offline/Hybrid"
      }
    ],
    "faculty": [
      {
        "name": "Priya Sawant",
        "title": "Designation",
        "bio": "Qualification: Experience:",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/workspace/vnBgwv/image/1987142/file/8b9fcea97dbaa5d373c77430de505039.png"
      },
      {
        "name": "Shubham Bawankar",
        "title": "Software Trainer",
        "bio": "Qualification: MBA In Business Analytics, Expertise In Full Stack Developer, Java , Python, HTML, CSS, JavaScript, Machine Learning & React.JS Experience: 3+ Years Of Experience in Training.",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/workspace/vnBgwv/image/5091616/file/64da7fcdf0e7ac140ff12a85694174de.png"
      }
    ],
    "placements": [
      {
        "name": "Bhim Nepali",
        "company": "Idea4T Pvt. Limited",
        "package": "2.16 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/workspace/vnBgwv/image/5437407/file/d4921e3ead610a22b96ab416bbe1dacc.png"
      },
      {
        "name": "Akshay Gitte",
        "company": "Allied Digital Services Ltd.",
        "package": "2.0 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/workspace/vnBgwv/image/5437475/file/6c41492dd83ed0d6a32775ba144310a5.png"
      },
      {
        "name": "Krish Jadhav",
        "company": "Tikona Infinet Limited",
        "package": "2.13 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/workspace/vnBgwv/image/5437486/file/f379aa238eed0c3f235b355893e65a21.png"
      },
      {
        "name": "Shantanu Chavan",
        "company": "Insite Pvt. Limited",
        "package": "4.0 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/workspace/vnBgwv/image/6870621/file/d8aff8ab3ccf4dda88742a4cf2941add.png"
      },
      {
        "name": "Akash Vandre",
        "company": "NextGen Infinity Data Center",
        "package": "9.2 LPA",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/workspace/vnBgwv/image/6870538/file/82ad83fb36703f6973db8aa0e7cf8c63.png"
      },
      {
        "name": "Your Name",
        "company": "Company name",
        "package": "Salary",
        "photoUrl": "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/workspace/vnBgwv/image/5182624/file/911788bb7823a3365150f1c9e433ad99.png"
      }
    ],
    "faqs": [
      {
        "question": "Is Cloud computing a good career for fresher graduates?",
        "answer": "Yes, cloud computing is an excellent career choice. With the increasing demand for scalable and cost-effective IT solutions, companies across industries are adopting cloud technologies. This has created a high demand for skilled cloud professionals, offering lucrative salaries, diverse job roles (like Cloud Engineer, Architect, and DevOps), and significant growth opportunities. As businesses continue to shift towards digital transformation, cloud computing will remain a vital and rewarding field."
      },
      {
        "question": "Can I learn Cloud computing in 6 months from Navi Mumbai?",
        "answer": "Yes, you can learn the basics and advance tools of cloud computing in 6 months with the right focus and dedication with Jetking Wardha institute. Many beginner courses cover essential topics like cloud services (AWS, Azure), storage, networking, and virtualization within this timeframe. However, mastering advanced concepts may take longer depending on your pace and prior IT knowledge."
      },
      {
        "question": "Can a fresher get job in AI and Cloud computing?",
        "answer": "Yes, a fresher can definitely get a job in AI and cloud computing. Many companies value skills and knowledge over experience, especially in these rapidly evolving fields. By taking relevant courses, working on projects, and building a solid understanding of the fundamentals, freshers can enhance their employability. Internships and certifications in AI and cloud technologies can also significantly boost job prospects. Networking and staying updated on industry trends further increase the chances of landing a role in these exciting areas."
      },
      {
        "question": "What is the salary of Cloud computing Engineer in mumbai?",
        "answer": "The projected annual compensation for a Cloud Engineer in Maharashtra is approximately ₹6,99,000, while the average salary stands at around ₹6,19,000 per year. This figure reflects the median salary, which serves as the midpoint derived from our exclusive Total Pay Estimate model, based on data gathered from our user base."
      }
    ],
    "testimonials": [
      {
        "quote": "Faculty is great and great place for learning. The Good thing about Jetking is Lifetime placement and career support.",
        "name": "Shantanu Chavan",
        "role": "Insight Business Machine Pvt Ltd"
      },
      {
        "quote": "I had a positive experience with Jetking Vashi learning centre. Great environment for study. The staff and faculty are also very supportive.",
        "name": "Akash Vandre",
        "role": "Nxtgen Infinite Datacenter"
      },
      {
        "quote": "Jetking in one of the best institute to do technical courses and get placed it IT. PD lectures were really beneficial to increase my communication and confidence. I cleared my interview in first attempt and got placed on NOC at a very good salary.",
        "name": "Mohammad Aftab Ansari",
        "role": "ESDS Software Solutions"
      }
    ],
    "coursesOffered": [
      "bca-cloud-cyber-security",
      "cloud-computing-engineer-ai",
      "cloud-computing-professional-ai",
      "cloud-cyber-security-engineer",
      "routing-switching-administrator",
      "pc-hardware-support"
    ],
    "seo": {
      "title": "Cloud Computing Training Institute in Wardha, Maharashtra",
      "description": "Cloud Computing course in Wardha Maharashtra, UG/Diploma in Cloud AI & Cybersecurity with strong placement support, Learn CCNA, Linux, AWS, gain from Industry Experts"
    },
    "updatedAt": "2026-08-06"
  },
  {
    "slug": "khar-mumbai",
    "name": "Jetking Khar",
    "citySlug": "mumbai",
    "addressLine": "Jetking Khar Learning Centre, 5th Floor, Amore Commercial Premises, Hasnabad Lane, Ram Krishna Nagar, Khar (West), Mumbai.",
    "locality": "Khar West",
    "state": "Maharashtra",
    "pincode": "400052",
    "phone": "91 9967665675",
    "helpline": "07666830000",
    "email": "info@jetking.com",
    "headline": "Best BCA Degree Courses Institute in Mumbai, Maharashtra",
    "intro": "Jetking Khar Learning Centre offers UGC-approved, government-certified BCA Degree and MCA Postgraduate programs in Mumbai with dedicated placement support.",
    "body": "Jetking Khar Learning Center is a top institute in Mumbai offering BCA in Cloud Computing & Cyber Security , MCA in Cloud Technology & Cyber Security , and career-focused programs in Artificial Intelligence, AWS, Azure, Python, Linux, Ethical Hacking, Machine Learning, and Cyber Forensics. Our industry-oriented degree programs combine practical training, live projects, internships, and certifications to help students build in-demand IT skills. With placement support, expert trainers, advanced labs, and strong industry partnerships, Jetking Khar prepares students for high-growth careers in Cloud computing, cyber security, Ethical hacking, and emerging technologies.\n\nJoin India’s leading and most trusted digital skills institute with over 79 years of legacy, offering an industry-focused BCA in Cloud Computing & Cyber Security program with training in AWS, Azure, Python, Linux, AI, and Ethical Hacking, plus job assistance to help launch your IT career.",
    "featuredProgrammes": [
      {
        "title": "BCA (Bachelor of Computer Applications)",
        "subtitle": "In Cloud Computing & Cyber Security",
        "duration": "36 Months",
        "mode": "Offline/Hybrid"
      },
      {
        "title": "MCA (Master of Computer Applications)",
        "subtitle": "In Cloud Computing & Cyber Security",
        "duration": "24 Months",
        "mode": "Offline/Hybrid"
      }
    ],
    "eligibility": [
      {
        "title": "Eligibility (BCA)",
        "items": [
          "Pass in the (10+2) examination from State Board / CBSE / NIOS / IGCSE/ IB / ICSE recognized by the State or Central Government.",
          "Candidates who are due to appear in the (10+2) examination are also eligible to apply for an Online BCA in Computer Science and IT Program."
        ]
      },
      {
        "title": "Eligibility (MCA)",
        "items": [
          "Pass in an Undergraduate (Bachelor) Program of a minimum duration of three (3) years in any stream from a UGC Recognized University, with a minimum aggregate of 50% or an equivalent letter/numerical grade. A relaxation of 5% shall be given to SC/ST candidates.",
          "Students who are in the final semester of their Bachelor’s degree may apply provisionally. Final admission is granted only after successful completion of the qualifying degree and submission of all required documents."
        ]
      }
    ],
    "journey": [
      {
        "title": "Year 1 – Foundation + Exposure",
        "items": [
          "IT fundamentals & networking basics",
          "Introduction to cloud & security",
          "Internship exposure"
        ]
      },
      {
        "title": "Year 2 – Skill Building",
        "items": [
          "Cloud platforms (AWS/Linux)",
          "Cyber security concepts",
          "Hands-on labs & projects"
        ]
      },
      {
        "title": "Year 3 – Advanced + Job Ready",
        "items": [
          "Advanced security",
          "Real-world projects",
          "Placement preparation"
        ]
      }
    ],
    "faqs": [
      {
        "question": "What is the eligibility for BCA admission?",
        "answer": "Students who have completed 12th grade from a recognized board are eligible to apply for BCA admission."
      },
      {
        "question": "Is BCA in Cyber Security a good career option?",
        "answer": "Yes, cyber security professionals are in high demand across IT companies, banks, startups, and government sectors."
      },
      {
        "question": "Does Jetking provide placement support after BCA?",
        "answer": "Yes, Jetking offers placement support, internship opportunities, and career guidance."
      },
      {
        "question": "What jobs can I get after BCA?",
        "answer": "You can become a Cloud Engineer, Cyber Security Analyst, Network Engineer, System Administrator, Python Developer, or IT Support Specialist."
      },
      {
        "question": "What is the salary after one year?",
        "answer": "The salary for a Cloud Computing AI professional in India typically ranges from ₹3 lakh to ₹7 lakh per year for entry-level roles, while experienced professionals can earn between ₹9 lakh to ₹20 lakh* or more, depending on their expertise and the company."
      }
    ],
    "testimonials": [
      {
        "quote": "I just wanted to share a quick note and let you know that Jetking has changed my life. I'm glad I decided to join Jetking. It's really great that I got a job even after being an undergraduate. During my course duration, I also learned personality development which helped me develop my soft skills. The faculties are well trained and very supportive. Thank you Jetking",
        "name": "Bhavesh Gokhale",
        "role": "Quatrro"
      },
      {
        "quote": "I am working as a Junior Streaming Engineer at Jetking. I joined Jetking after completing my graduation and straight after completing my course, I was placed at 24 Frames. My journey at Jetking has been great as I got to enhance my technical skills and moreover, the environment of the institute is highly approachable and friendly. Would highly recommend Jetking to all those who are looking to make a career in IT Indu",
        "name": "Arbaz Satvikar",
        "role": "24 Frames"
      },
      {
        "quote": "I am very happy with Jetking for the placement assistance, even after my first job. I am grateful for all the guidance and technical knowledge provided. At Jetking we are not only trained in the technical domain as well as I have also improved my communication skills and confidence in appearing for interviews.",
        "name": "Abhishek",
        "role": "IBM-Collabera"
      }
    ],
    "coursesOffered": [
      "bca-cloud-cyber-security",
      "cloud-computing-engineer-ai",
      "cloud-computing-professional-ai",
      "cloud-cyber-security-engineer",
      "routing-switching-administrator",
      "pc-hardware-support"
    ],
    "seo": {
      "title": "Jetking Khar BCA & MCA Degree courses Institute in Mumbai",
      "description": "Jetking Khar Learning Centre offers UGC-approved, government-certified BCA Degree and MCA Postgraduate programs in Mumbai with dedicated placement support."
    },
    "updatedAt": "2026-08-06"
  }
];
