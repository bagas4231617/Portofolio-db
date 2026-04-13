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
    role: "Junior Network & Cloud Engineer",
    tagline: "Merancang Infrastruktur Andal & Jaringan yang Aman",
    location: "Depok, Indonesia",
    status: "Terbuka untuk Peluang",
    email: "muhammadbagasmalikalbani@gmail.com",
    phone: "+62 851-5692-4916", // Example formatting for realism if dummy
    cvUrl: "/cv_bagas.pdf",
    formspreeEndpoint: "https://formspree.io/f/xyzgqkno", // Keep simple placeholder
  },

  about: {
    short:
      "Seorang antusias Network and Infrastructure yang berfokus pada perancangan, implementasi, dan pemeliharaan sistem yang andal. Memiliki dasar yang kuat dalam topologi jaringan, routing/switching, dan administrasi server Linux, dengan tekad untuk terus beradaptasi dengan praktik cloud engineering modern.",
    stats: [
      {
        label: "Bidang",
        value: "Network & Cloud Engineering",
      },
      {
        label: "Fokus Utama",
        value: "Keandalan Infrastruktur",
      },
      {
        label: "Lokasi",
        value: "Depok, ID (Remote/Hybrid)",
      },
    ],
  },

  skills: [
    {
      category: "Network Engineering",
      items: [
        { name: "Cisco Routing & Switching", verified: true },
        { name: "Desain Jaringan (Topologi)", verified: false },
        { name: "OSPF, EIGRP, BGP", verified: false },
        { name: "VLAN, STP, EtherChannel", verified: false },
      ],
    },
    {
      category: "System & Cloud Admin",
      items: [
        { name: "Linux (Debian/Ubuntu/CentOS)", verified: true },
        { name: "Proxmox / Virtualization", verified: false },
        { name: "Web Server & Database", verified: false },
        { name: "Cloud Fundamentals", verified: false },
      ],
    },
    {
      category: "Security & Observability",
      items: [
        { name: "Wireshark / Packet Analysis", verified: false },
        { name: "Firewall (MikroTik/UFW)", verified: false },
        { name: "Monitoring Sistem", verified: false },
        { name: "Troubleshooting", verified: false },
      ],
    },
  ] as SkillCategory[],

  experiences: [
    {
      year: "2023 - Sekarang",
      title: "Spesialisasi Jaringan & Sistem Infrastruktur",
      institution: "Sekolah Menengah Kejuruan (TKJ)",
      desc: "Mempelajari dan memperdalam arsitektur jaringan skala kompleks, administrasi server Linux, serta protokol keamanan infrastruktur sebagai bagian dari pelatihan vokasi teknis berkelanjutan.",
    },
    {
      year: "2023",
      title: "IT Support & Teknisi Jaringan",
      institution: "Sekolah Alam Depok",
      desc: "Mengelola infrastruktur jaringan lokal (LAN) dan memastikan 100% uptime untuk pelaksanaan Asesmen Nasional Berbasis Komputer (ANBK) melalui pengaturan skenario failover dan tindakan preventive maintenance.",
    },
  ] as Experience[],

  certificates: [
    {
      title: "Pelatihan Cisco Certified Network Associate (CCNA)",
      meta: "Cisco Networking Academy",
      desc: "Menyelesaikan pelatihan mendalam terkait fundamental jaringan, konektivitas IP, dasar-dasar keamanan jaringan, serta otomatisasi.",
      tasks: undefined,
    },
    {
      title: "Persiapan MikroTik Certified Network Associate (MTCNA)",
      meta: "MikroTik Academy",
      desc: "Mempelajari kapabilitas RouterOS, mulai dari konfigurasi routing dasar, bandwidth management, hingga jaringan nirkabel (wireless).",
      tasks: undefined,
    },
    {
      title: "Pengalaman Deployment Infrastruktur Lapangan",
      meta: "Implementasi Sistem - Sekolah Alam",
      desc: "Pengalaman praktik penerapan infrastruktur dan pemeliharaan lapangan:",
      tasks: [
        "Melakukan instalasi dan pemeliharaan perangkat switching dan routing jaringan lokal.",
        "Mendemonstrasikan ketersediaan tautan cadangan (redundant link) untuk mengamankan periode ujian kritis.",
        "Mengeksekusi audit perangkat keras dan lunak di lebih dari 50 komputer klien (endpoints).",
      ],
    },
  ] as Certificate[],

  projects: [
    {
      title: "Desain Topologi Jaringan Enterprise Skala Makro",
      desc: "Merancang fondasi bagi jaringan tingkat enterprise yang dapat diskalakan, termasuk skema redundancy dan segmentasi keamanan dengan menggunakan Cisco Packet Tracer.",
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1200&auto=format&fit=crop",
      category: "Arsitektur Jaringan",
      tech: ["Cisco", "VLAN/Trunking", "OSPF", "STP"],
      challenge: "Membangun sebuah jaringan high-availability antargedung dengan pemisahan wilayah broadcast (broadcast domain) secara ketat.",
      solution: "Menerapkan rancangan jaringan sistem yang berhierarki (Core-Distribution-Access), memanfaat fungsionalitas EtherChannel untuk agragasi port/link, sera mengonfigurasi rute dinamik menggunakan OSPF.",
      link: "https://github.com/bagasmalikalbani",
    },
    {
      title: "Perancangan Server Linux High Availability",
      desc: "Mem-provisioning dan melakukan hardening komprehensif pada tumpukan server berbasis Linux (LAMP Stack) yang dioptimasi untuk penayangan konten web dinamis.",
      image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1200&auto=format&fit=crop",
      category: "Administrasi Sistem",
      tech: ["Ubuntu Server", "Apache", "MySQL", "UFW"],
      challenge: "Mengamankan tumpukan infrastruktur terhadap kerentanan keamanan server web umum dengan memastiian alokasi sumber daya tetap terjaga efisien.",
      solution: "Menerapkan serangkaian aturan firewall yang ketat melalui UFW, melakukan segmentasi logis pada server basis data, serta mengintegrasikan skrip cron job harian dengan proses otomatis.",
      link: "https://github.com/bagasmalikalbani",
    },
    {
      title: "Implementasi Otomatisasi Failover Jaringan WAN",
      desc: "Merancang sebuah sistem WAN failover responsif untuk meminimalisasi downtime serta menjamin kelancaran koneksi secara berkesinambungan terutama saat momen ujian berskala nasional.",
      image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=1200&auto=format&fit=crop",
      category: "Keandalan Jaringan",
      tech: ["MikroTik RouterOS", "Load Balancing", "Failover Routing"],
      challenge: "Sasaran utamanya difokuskan pada ketahanan jaringan dalam menghadapi kegagalan ISP tanpa mengurangi kualitas layanan bagi lebih dari 100 perangkat pengguna tes serentak.",
      solution: "Memerintahkan dan mengatur strategi load balancing bersanding dengan fitur recursive gateway di lingkungan MikroTik; kebijakan lalu lintas jaringan akan diarahkan pada secondary LTE link tatkala status utama dipastikan mati (down).",
      link: "https://github.com/bagasmalikalbani",
    },
  ],

  social: {
    linkedin: "https://linkedin.com/in/bagasmalikalbani",
    github: "https://github.com/bagasmalikalbani",
    whatsapp: "https://wa.me/6285156924916",
  },

  footer: "Dibangun dengan React & Nuansa Arsitektur Cloud Modern.",
};

