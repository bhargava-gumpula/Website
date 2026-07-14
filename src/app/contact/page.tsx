import { ContactForm } from "@/components/ContactForm";
import { SectionHeader } from "@/components/SectionHeader";
import { contactPageContent, externalLinks } from "@/data/siteContent";

export default function ContactPage() {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-10 md:py-16">
      <SectionHeader
        eyebrow={contactPageContent.eyebrow}
        title={contactPageContent.title}
        description={contactPageContent.description}
      />
      <ContactForm />
      <p className="text-center text-base text-slate-300 md:text-lg">
        Prefer to talk? Call me at{" "}
        <a href={`tel:${externalLinks.phone}`} className="font-medium text-brand-400 hover:text-brand-300">
          {externalLinks.phoneDisplay}
        </a>
        .
      </p>
    </div>
  );
}
