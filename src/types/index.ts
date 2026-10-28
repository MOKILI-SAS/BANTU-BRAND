export interface Episode {
  id: string;
  slug: string;
  title: string;
  youtubeUrl: string;
  youtubeId: string;
  thumbnailUrl: string;
  duration?: string;
  guestName: string;
  guestRole: string;
  guestAvatar?: string;
  category: string;
  description: string;
  publishedAt: string;
  status: "published" | "draft";
  isFeaturedHero?: boolean;
}

export interface CreativeProject {
  id: string;
  slug: string;
  name: string;
  creatorName: string;
  category: string;
  description: string;
  details?: string;
  coverImage: string;
  galleryImages?: string[];
  externalLink?: string;
  tags: string[];
  status: "published" | "draft";
  featured?: boolean;
}

export interface ServiceOffer {
  id: string;
  key: "consultance" | "accompagnement";
  title: string;
  subtitle: string;
  tagline: string;
  description: string;
  coverImage: string;
  pillars: {
    title: string;
    description: string;
  }[];
  deliverables: string[];
  targetAudience: string[];
  ctaLabel: string;
  contactEmail?: string;
}

export interface MessageInquiry {
  id: string;
  createdAt: string;
  profileType: "creatif" | "marque" | "auditeur";
  fullName: string;
  email: string;
  phone?: string;
  organization?: string;
  projectType?: string;
  message: string;
  status: "unread" | "read" | "replied";
}

export interface BantuBrandSiteData {
  episodes: Episode[];
  creatives: CreativeProject[];
  services: ServiceOffer[];
  messages: MessageInquiry[];
  settings: {
    heroFeaturedEpisodeId: string;
    contactEmail: string;
    contactPhone: string;
    socials: {
      instagram: string;
      facebook: string;
      linkedin: string;
      youtube: string;
    };
  };
}
