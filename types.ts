
import React from 'react';

export interface ExperienceItem {
  company: string;
  role: string;
  period: string;
  description: string;
}

export interface EducationItem {
  institution: string;
  course: string;
  period: string;
}

export interface ServiceItem {
  title: string;
  description: string;
  icon: React.ReactNode;
}

export interface ProjectItem {
  id: number;
  title: string;
  category: string;
  image: string;
  thumbnail: string;
  videoUrl?: string;
  colSpan?: string; // Tailwind class for grid column span
  client?: string;
  year?: string;
  description: string;
  challenge: string;
  solution: string;
  result: string;
  gallery?: string[];
}

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

export interface TestimonialItem {
  name: string;
  role: string;
  company: string;
  content: string;
  result: string;
  image?: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}
