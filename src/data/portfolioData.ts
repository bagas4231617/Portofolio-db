import React from 'react';

export interface Skill {
  readonly name: string;
  readonly verified: boolean;
}

export interface SkillCategory {
  readonly category: string;
  readonly items: readonly Skill[];
}

export interface Experience {
  readonly year: string;
  readonly title: string;
  readonly institution: string;
  readonly desc: string;
}

export interface Certificate {
  readonly title: string;
  readonly meta: string;
  readonly desc: string;
  readonly tasks?: readonly string[];
}

export interface Project {
  readonly title: string;
  readonly desc: string;
  readonly icon?: React.ReactNode;
  readonly image: string;
  readonly category: string;
  readonly tech: readonly string[];
  readonly challenge: string;
  readonly solution: string;
  readonly link: string;
}

export const portfolioData = {
  personal: {
    name: "Muhammad Bagas Malik Albani",
    role: "Junior IT Infrastructure & Network Engineer",
    tagline: "Network Engineer | Server Admin | IT Infra",
    location: "Depok, Indonesia",
    status: "Available for Work",
    email: "muhammadbagasmalikalbani@gmail.com",
    phone: "+62-812-3456-7890",
    cvUrl: "/cv_bagas.pdf",
    formspreeEndpoint: "https://formspree.io/f/your-id-here", // GANTI_DENGAN_ID_FORMSPREE_ANDA
  },

  about: {
    short:
      "Siswa SMK Kelas 12 jurusan Teknik Komputer dan Jaringan (TKJ). Antusias dalam merancang topologi jaringan yang efisien, mengelola server, dan menjaga keamanan infrastruktur IT.",
    stats: [
      {
        label: "Lokasi",
        value: "Depok, Indonesia",
      },
      {
        label: "Status",
        value: "SMK Kelas 12 (Fresh Graduate soon)",
      },
      {
        label: "Fokus",
        value: "Network & Infrastructure",
      },
    ],
  },

  skills: [
    {
      category: "Networking",
      items: [
        { name: "Cisco Networking", verified: true },
        { name: "Advanced MikroTik", verified: false },
        { name: "Routing (OSPF, BGP)", verified: false },
        { name: "VLAN & Trunking", verified: false },
      ],
    },
    {
      category: "Server Administration",
      items: [
        { name: "Linux (Debian/Ubuntu)", verified: true },
        { name: "Web & DB Server", verified: false },
        { name: "Proxmox / VirtualBox", verified: false },
        { name: "Shell Scripting", verified: false },
      ],
    },
    {
      category: "Tools & Security",
      items: [
        { name: "Wireshark", verified: false },
        { name: "Nmap", verified: false },
        { name: "PuTTY / SSH", verified: false },
        { name: "Firewalls (UFW/MikroTik)", verified: false },
      ],
    },
  ] as SkillCategory[],

  experiences: [
    {
      year: "2023 - Sekarang",
      title: "Junior IT Infrastructure & Network Engineer",
      institution: "SMK (Sekolah Menengah Kejuruan)",
      desc: "Mempelajari dan mendalami arsitektur jaringan, administrasi server Linux, serta dasar-dasar keamanan siber dalam kurikulum SMK Kelas 12.",
    },
    {
      year: "2023 (Periode PKL)",
      title: "IT Support & Operator ANBK",
      institution: "Sekolah Alam Depok",
      desc: "Mengelola infrastruktur jaringan sekolah, melakukan pemeliharaan hardware/software komputer, serta mengamankan kelancaran teknis asesmen ANBK.",
    },
  ] as Experience[],

  certificates: [
    {
      title: "Cisco Certified Network Associate (CCNA)",
      meta: "[Diperoleh saat kelas 11]",
      desc: "Sertifikasi profesional dari Cisco yang memvalidasi kemampuan dalam instalasi, konfigurasi, dan pengoperasian jaringan skala menengah.",
      tasks: undefined,
    },
    {
      title: "MikroTik Certified Network Associate (MTCNA)",
      meta: "[Sedang dalam tahap persiapan ujian]",
      desc: "Fokus pada manajemen trafik, routing, dan troubleshooting menggunakan RouterOS MikroTik.",
      tasks: undefined,
    },
    {
      title: "Praktik Kerja Lapangan - Sekolah Alam Depok",
      meta: "Pengalaman Kerja",
      desc: "Tugas meliputi:",
      tasks: [
        "Perawatan komputer dan infrastruktur jaringan.",
        "Bertugas sebagai Operator ANBK bersama rekan dan pembimbing.",
        "Administrasi ATK dan pengelolaan arsip kepegawaian/kesiswaan.",
        "Rekapitulasi keuangan sekolah.",
      ],
    },
  ] as Certificate[],

  projects: [
    {
      title: "Desain & Implementasi Topologi Jaringan Skala Sekolah",
      desc: "Merancang dan melakukan konfigurasi jaringan kompleks tingkat lanjut dengan menerapkan routing protocol, VLAN, trunking, dan EtherChannel.",
      image:
        "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=1200&auto=format&fit=crop",
      category: "Jaringan",
      tech: ["Cisco Packet Tracer", "VLAN/Trunking", "OSPF/EIGRP"],
      challenge:
        "Manajemen broadcast domain pada jaringan skala besar dan kebutuhan ketersediaan link (redundancy) antar gedung.",
      solution:
        "Menerapkan skema VLAN terpusat menggunakan switch Layer 3 dan mengatur EtherChannel/STP untuk mencegah looping serta meningkatkan bandwidth.",
      link: "https://github.com/bagasmalikalbani",
    },
    {
      title: "Konfigurasi & Manajemen Server Linux",
      desc: "Membangun infrastruktur server menggunakan sistem operasi Debian dan Ubuntu, mencakup instalasi Web Server, Database Server, serta WordPress Server.",
      image:
        "https://images.unsplash.com/photo-1629654297299-c8506221ca97?q=80&w=1200&auto=format&fit=crop",
      category: "Server",
      tech: ["Debian/Ubuntu", "Apache/Nginx", "MySQL/MariaDB"],
      challenge:
        "Optimalisasi resource server virtual dan keamanan basis data untuk web dinamis.",
      solution:
        "Melakukan instalasi LAMP/LEMP stack dengan best practices hardening, memisahkan environment web dan database, dan menerapkan backup otomatis.",
      link: "https://github.com/bagasmalikalbani",
    },
    {
      title: "Perawatan Infrastruktur IT & Operator ANBK",
      desc: "Menjaga stabilitas infrastruktur jaringan dan hardware komputer, serta mengelola kelancaran teknis sebagai Operator pada pelaksanaan Asesmen Nasional Berbasis Komputer (ANBK).",
      image:
        "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1200&auto=format&fit=crop",
      category: "Keamanan",
      tech: ["Troubleshooting", "LAN/WLAN", "Windows Server"],
      challenge:
        "Memastikan uptime jaringan 100% dan zero error hardware selama ujian nasional berlangsung serentak.",
      solution:
        "Melakukan preventive maintenance H-7, konfigurasi load balancing pada router Mikrotik, dan menyiapkan skenario failover backup link.",
      link: "https://github.com/bagasmalikalbani",
    },
  ],

  social: {
    linkedin: "https://linkedin.com/in/bagasmalikalbani",
    github: "https://github.com/bagasmalikalbani",
    whatsapp: "https://wa.me/6281234567890",
  },

  footer: "Built with React, Vite, TypeScript & Terminal Aesthetics.",
};
