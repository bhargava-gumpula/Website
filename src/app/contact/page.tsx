import { ContactForm } from "@/components/ContactForm";
import { SectionHeader } from "@/components/SectionHeader";
import { contactPageContent } from "@/data/siteContent";

export default function ContactPage() {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-10 md:py-16">
      <SectionHeader
        eyebrow={contactPageContent.eyebrow}
        title={contactPageContent.title}
        description={contactPageContent.description}
      />
      <ContactForm />
    </div>
  );
}
