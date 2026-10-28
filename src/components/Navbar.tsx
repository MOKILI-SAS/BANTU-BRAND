"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X, ArrowUpRight } from "lucide-react";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bantu-glass border-b border-white/10 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-18 flex items-center justify-between">
        {/* Logo épuré Bantu Brand */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="relative w-9 h-9 rounded-lg overflow-hidden border border-bantu-yellow/60 shadow-sm group-hover:border-bantu-yellow transition-colors flex-shrink-0">
            <Image
              src="/images/logo-bantu-brand.jpg"
              alt="Bantu Brand"
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-sm sm:text-base tracking-widest text-bantu-cream group-hover:text-bantu-yellow transition-colors leading-tight">
              BANTU BRAND
            </span>
            <span className="text-[9px] font-semibold tracking-widest text-bantu-yellow/90 uppercase">
              Média & Studio
            </span>
          </div>
        </Link>

        {/* Navigation Desktop épurée */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-xs sm:text-sm font-medium text-bantu-cream/80">
          <Link
            href="#podcast"
            className="hover:text-bantu-yellow transition-colors"
          >
            Épisodes
          </Link>
          <Link
            href="#creatifs"
            className="hover:text-bantu-yellow transition-colors"
          >
            Showcase
          </Link>
          <Link
            href="#offres"
            className="hover:text-bantu-yellow transition-colors"
          >
            Offre
          </Link>
          <Link
            href="#solution"
            className="hover:text-bantu-yellow transition-colors"
          >
            Solution
          </Link>
          <Link
            href="#contact"
            className="hover:text-bantu-yellow transition-colors"
          >
            Contact
          </Link>
        </nav>

        {/* CTA Desktop sans icône IA */}
        <div className="hidden md:flex items-center">
          <Link
            href="#contact"
            className="relative group overflow-hidden rounded-full p-px text-xs font-bold tracking-wider uppercase transition-transform active:scale-95"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-bantu-red via-bantu-orange to-bantu-yellow group-hover:opacity-100 transition-opacity"></span>
            <span className="relative block px-5 py-2 rounded-full bg-[#111116] text-white group-hover:bg-transparent group-hover:text-black transition-colors flex items-center gap-1.5 font-bold">
              <span>Propulser un projet</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </span>
          </Link>
        </div>

        {/* Bouton Menu Mobile */}
        <div className="flex md:hidden items-center">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-bantu-cream hover:bg-white/10 transition-colors focus:outline-none"
            aria-label="Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Tiroir Mobile responsive */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-white/10 bg-[#0E0E14]/98 backdrop-blur-2xl px-6 py-6 space-y-4 animate-in fade-in duration-200">
          <nav className="flex flex-col space-y-3.5 text-sm font-semibold text-bantu-cream">
            <Link
              href="#podcast"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1.5 hover:text-bantu-yellow transition-colors"
            >
              Épisodes
            </Link>
            <Link
              href="#creatifs"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1.5 hover:text-bantu-yellow transition-colors"
            >
              Showcase
            </Link>
            <Link
              href="#offres"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1.5 hover:text-bantu-yellow transition-colors"
            >
              Offre
            </Link>
            <Link
              href="#solution"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1.5 hover:text-bantu-yellow transition-colors"
            >
              Solution
            </Link>
            <Link
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1.5 hover:text-bantu-yellow transition-colors"
            >
              Contact
            </Link>
          </nav>

          <div className="pt-3 border-t border-white/10">
            <Link
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-1.5 py-3 rounded-full bg-gradient-to-r from-bantu-red via-bantu-orange to-bantu-yellow text-black font-black text-xs uppercase tracking-wider shadow-lg"
            >
              <span>Propulser un projet</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-black" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
