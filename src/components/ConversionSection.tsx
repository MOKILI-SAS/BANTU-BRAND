"use client";

import React, { useState } from "react";
import {
  Send,
  Mail,
  Phone,
  MapPin,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Palette,
  Briefcase,
  Headphones,
} from "lucide-react";
import { BantuPattern } from "./BantuPattern";

export function ConversionSection() {
  const [profileType, setProfileType] = useState<"creatif" | "marque" | "auditeur">("marque");
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    organization: "",
    projectType: "Consultance en Stratégie",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);

    try {
      const res = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          profileType,
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          organization: formData.organization,
          projectType: formData.projectType,
          message: formData.message,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Une erreur est survenue lors de l'envoi.");
      }

      setSubmitted(true);
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        organization: "",
        projectType: "",
        message: "",
      });
    } catch (err: any) {
      setErrorMsg(err.message || "Erreur de connexion. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-20 lg:py-28 bg-[#0E0E14] relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Colonne de gauche : Coordonnées & Présentation de contact */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-bantu-yellow/15 border border-bantu-yellow/30 text-bantu-yellow text-xs font-bold uppercase tracking-wider mb-4">
                <Sparkles className="w-3.5 h-3.5 text-bantu-red" />
                <span>Prendre Contact</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-black text-bantu-cream tracking-tight mb-4">
                Construisons ensemble votre{" "}
                <span className="bantu-gradient-text">empreinte culturelle</span>.
              </h2>

              <p className="text-sm sm:text-base text-bantu-cream/70 font-light leading-relaxed">
                Que vous soyez une marque en quête d&apos;impact, un créateur avec une histoire forte à partager ou un auditeur engagé, nous sommes à votre écoute.
              </p>
            </div>

            {/* Coordonnées directes réelles */}
            <div className="space-y-4 p-6 rounded-2xl bg-bantu-dark-card border border-white/10">
              <h3 className="text-xs font-bold uppercase tracking-widest text-bantu-yellow mb-3">
                Coordonnées Directes
              </h3>

              <a
                href="mailto:bantu.brand@gmail.com"
                className="flex items-center gap-3 text-sm text-bantu-cream hover:text-bantu-yellow transition-colors group"
              >
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-bantu-yellow group-hover:bg-bantu-yellow group-hover:text-black transition-colors">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[11px] text-bantu-muted uppercase">Email</div>
                  <div className="font-semibold">bantu.brand@gmail.com</div>
                </div>
              </a>

              <a
                href="tel:+243971245105"
                className="flex items-center gap-3 text-sm text-bantu-cream hover:text-bantu-yellow transition-colors group"
              >
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-bantu-orange group-hover:bg-bantu-orange group-hover:text-white transition-colors">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[11px] text-bantu-muted uppercase">Téléphone & WhatsApp</div>
                  <div className="font-semibold">+243 97 12 45 105</div>
                </div>
              </a>

              <div className="flex items-center gap-3 text-sm text-bantu-cream">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-bantu-red">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[11px] text-bantu-muted uppercase">Localisation</div>
                  <div className="font-semibold">Kinshasa, République Démocratique du Congo</div>
                </div>
              </div>
            </div>

            {/* Engagement Bantu Brand */}
            <div className="p-4 rounded-xl bg-bantu-red/10 border border-bantu-red/30 text-xs text-bantu-cream/80">
              <strong className="text-bantu-red font-bold block mb-1">
                Engagement Bantu Brand :
              </strong>
              Chaque proposition de projet ou candidature créative est examinée personnellement par notre équipe de direction sous 48 heures.
            </div>
          </div>

          {/* Colonne de droite : Formulaire tri-profils */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl bg-bantu-dark-card border border-white/10 p-6 sm:p-10 shadow-2xl relative">
              {/* Sélecteur de profil (Tri-Profils) */}
              <div className="mb-8">
                <label className="block text-xs font-bold uppercase tracking-wider text-bantu-yellow mb-3">
                  Vous êtes :
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  <button
                    type="button"
                    onClick={() => {
                      setProfileType("marque");
                      setFormData((p) => ({ ...p, projectType: "Consultance en Stratégie" }));
                    }}
                    className={`flex items-center gap-2 p-3 rounded-xl border text-xs font-bold transition-all ${
                      profileType === "marque"
                        ? "bg-gradient-to-r from-bantu-orange to-bantu-yellow text-black border-bantu-yellow shadow-md shadow-bantu-yellow/20"
                        : "bg-white/5 text-bantu-cream/70 border-white/10 hover:border-white/20"
                    }`}
                  >
                    <Briefcase className="w-4 h-4" />
                    <span>Marque / Entreprise</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setProfileType("creatif");
                      setFormData((p) => ({ ...p, projectType: "Proposer un Projet Créatif" }));
                    }}
                    className={`flex items-center gap-2 p-3 rounded-xl border text-xs font-bold transition-all ${
                      profileType === "creatif"
                        ? "bg-bantu-red text-white border-bantu-red shadow-md shadow-bantu-red/20"
                        : "bg-white/5 text-bantu-cream/70 border-white/10 hover:border-white/20"
                    }`}
                  >
                    <Palette className="w-4 h-4" />
                    <span>Créatif Africain</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setProfileType("auditeur");
                      setFormData((p) => ({ ...p, projectType: "Auditeur / Communauté" }));
                    }}
                    className={`flex items-center gap-2 p-3 rounded-xl border text-xs font-bold transition-all ${
                      profileType === "auditeur"
                        ? "bg-white/20 text-white border-white/40 shadow-md"
                        : "bg-white/5 text-bantu-cream/70 border-white/10 hover:border-white/20"
                    }`}
                  >
                    <Headphones className="w-4 h-4" />
                    <span>Auditeur / Fan</span>
                  </button>
                </div>
              </div>

              {/* Message de confirmation de succès */}
              {submitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-green-500/20 text-green-400 mx-auto flex items-center justify-center">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Merci pour votre message !</h3>
                  <p className="text-sm text-bantu-cream/70 max-w-md mx-auto">
                    Votre demande a bien été transmise au studio Bantu Brand. Nous reviendrons vers vous très prochainement.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-6 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold uppercase tracking-wider text-white"
                  >
                    Envoyer un autre message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {errorMsg && (
                    <div className="p-3.5 rounded-xl bg-bantu-red/20 border border-bantu-red/40 text-xs text-red-200 flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 flex-shrink-0" />
                      <span>{errorMsg}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-bantu-cream/80 mb-1.5">
                        Nom complet *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Ex: Doris Kabemba"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-bantu-yellow transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-bantu-cream/80 mb-1.5">
                        Email professionnel *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="contact@entreprise.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-bantu-yellow transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-bantu-cream/80 mb-1.5">
                        Téléphone / WhatsApp
                      </label>
                      <input
                        type="tel"
                        placeholder="+243..."
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-bantu-yellow transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-bantu-cream/80 mb-1.5">
                        {profileType === "marque"
                          ? "Entreprise ou Marque"
                          : profileType === "creatif"
                          ? "Nom du projet ou Studio"
                          : "Organisation (facultatif)"}
                      </label>
                      <input
                        type="text"
                        placeholder={profileType === "marque" ? "Nom de votre marque" : "Votre projet"}
                        value={formData.organization}
                        onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-bantu-yellow transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-bantu-cream/80 mb-1.5">
                      Nature de la demande
                    </label>
                    <select
                      value={formData.projectType}
                      onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#1A1A22] border border-white/10 text-white text-sm focus:outline-none focus:border-bantu-yellow transition-colors"
                    >
                      {profileType === "marque" ? (
                        <>
                          <option value="Consultance en Stratégie">Offre 1 : Consultance en Stratégie de Marque</option>
                          <option value="Accompagnement Opérationnel">Offre 2 : Accompagnement Opérationnel Continu</option>
                          <option value="Production Média & Podcast">Partenariat / Épisode Podcast Dédié</option>
                          <option value="Autre demande">Autre collaboration</option>
                        </>
                      ) : profileType === "creatif" ? (
                        <>
                          <option value="Proposer un Projet Créatif">Proposer mon projet pour le Showcase</option>
                          <option value="Interview Podcast">Être interviewé sur le Podcast Bantu</option>
                          <option value="Rejoindre le Réseau">Rejoindre le réseau des créateurs Bantu</option>
                        </>
                      ) : (
                        <>
                          <option value="Suggérer un Invité">Suggérer un invité ou une thématique</option>
                          <option value="Rejoindre la Communauté">Rejoindre la communauté des auditeurs</option>
                          <option value="Autre">Message d&apos;encouragement / Autre</option>
                        </>
                      )}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-bantu-cream/80 mb-1.5">
                      Votre message ou pitch *
                    </label>
                    <textarea
                      required
                      rows={4}
                      placeholder={
                        profileType === "marque"
                          ? "Décrivez brièvement votre marque, vos défis actuels et vos objectifs..."
                          : profileType === "creatif"
                          ? "Présentez votre travail, votre vision et vos liens vers vos réalisations..."
                          : "Votre message..."
                      }
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-bantu-yellow transition-colors"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-gradient-to-r from-bantu-red via-bantu-orange to-bantu-yellow text-black font-black text-xs uppercase tracking-wider transition-all shadow-xl hover:scale-[1.01] active:scale-95 disabled:opacity-50"
                  >
                    {loading ? (
                      <span>Envoi en cours...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4 text-black" />
                        <span>Envoyer ma demande à l&apos;équipe</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
