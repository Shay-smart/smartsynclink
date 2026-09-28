import type { GlobalContent } from "@/content/global";
import { Wordmark } from "./header";
import { NewsletterForm } from "./newsletter-form";
import { Container, PhoneIcon, SocialIcon, Tick } from "./ui";

export default function Footer({
  brand,
  data,
}: {
  brand: GlobalContent["brand"];
  data: GlobalContent["footer"];
}) {
  return (
    <footer className="pb-10 pt-4">
      <Container>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4">
            <Wordmark brand={brand} />
            <p className="mt-5 max-w-[46ch] text-[16px] leading-[1.8] text-[#1e1e1e]">
              {data.about}
            </p>

            <ul className="mt-6 flex items-center gap-4">
              {data.socials.map((social) => {
                const socialLinks: Record<string, string> = {
                  facebook:
                    "https://www.facebook.com/people/Smart-SyncLink/61588999561627/",
                  instagram: "https://www.instagram.com/smartsynclink/",
                };

                return (
                  <li key={social}>
                    <a
                      href={socialLinks[social.toLowerCase()] || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social}
                      className="block text-ink transition-colors hover:text-brand"
                    >
                      <SocialIcon name={social} className="size-[18px]" />
                    </a>
                  </li>
                );
              })}
            </ul>

            {/* the sign-up: into GHL as a contact tagged newsletter + newsletter-footer */}
            <div className="mt-8 max-w-[380px] rounded-2xl bg-page p-6">
              <h3 className="text-[16px] font-medium leading-snug text-[#1e1e1e]">
                {data.newsletter.heading}
              </h3>
              <p className="mt-2 text-[16px] leading-[1.7] text-[#1e1e1e]">
                {data.newsletter.body}
              </p>
              <NewsletterForm
                where="footer"
                namePlaceholder={data.newsletter.namePlaceholder}
                emailPlaceholder={data.newsletter.placeholder}
                cta={data.newsletter.cta.label}
                success={data.newsletter.success}
                className="mt-4"
              />
            </div>
          </div>

          <div className="grid gap-10 sm:grid-cols-2 lg:col-span-8 lg:grid-cols-4">
            {data.columns.map((column) => (
              <nav key={column.title} aria-label={column.title}>
                <h3 className="text-[16px] font-medium text-[#1e1e1e]">{column.title}</h3>
                <ul className="mt-5 space-y-3">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-[16px] text-[#1e1e1e] transition-colors hover:text-brand"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        {/* one tap each: dial, open a WhatsApp chat, write an email */}
        <ul className="mt-14 grid gap-3 sm:grid-cols-3">
          {[
            {
              key: "phone",
              href: `tel:${data.contact.phone.replace(/[^+\d]/g, "")}`,
              label: "Call us",
              value: data.contact.phone,
              icon: <PhoneIcon className="size-5" />,
              tone: "bg-brand-soft text-brand",
            },
            {
              key: "whatsapp",
              href: whatsappLink(data.contact.whatsapp),
              label: "Chat on WhatsApp",
              value: data.contact.whatsapp,
              icon: <SocialIcon name="WhatsApp" className="size-5" />,
              tone: "bg-[#25D366] text-white",
              external: true,
            },
            {
              key: "email",
              href: `mailto:${data.contact.email}`,
              label: "Email us",
              value: data.contact.email,
              icon: <MailIcon className="size-5" />,
              tone: "bg-brand-soft text-brand",
            },
          ]
            .filter((item) => item.value)
            .map((item) => (
              <li key={item.key}>
                <a
                  href={item.href}
                  {...(item.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="group flex items-center gap-3 rounded-2xl border border-line bg-white p-3 pr-4 transition-[border-color,box-shadow] hover:border-brand/40 hover:shadow-card"
                >
                  <span className={`grid size-11 shrink-0 place-items-center rounded-full ${item.tone}`}>
                    {item.icon}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-[13px] text-muted">{item.label}</span>
                    <span className="block truncate text-[16px] font-medium text-ink">{item.value}</span>
                  </span>
                  <svg
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    className="size-4 shrink-0 text-muted transition-transform group-hover:translate-x-0.5 group-hover:text-brand"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </a>
              </li>
            ))}
        </ul>

        <ul className="mt-8 grid divide-line rounded-xl border border-line sm:grid-cols-2 sm:divide-x lg:grid-cols-4">
          {data.badges.map((badge) => (
            <li
              key={badge}
              className="flex items-center justify-center gap-2 px-4 py-3.5 text-[16px] font-normal text-[#1e1e1e]"
            >
              <Tick className="size-3.5 text-brand" />
              {badge}
            </li>
          ))}
        </ul>

        <p className="mt-10 text-center text-[16px] text-[#1e1e1e]">{data.copyright}</p>
      </Container>
    </footer>
  );
}

/**
 * A wa.me chat link for a number as the editor typed it. wa.me wants the full
 * international number, digits only; a bare ten-digit number is taken as a US
 * one, which is where this business is.
 */
function whatsappLink(number: string) {
  const digits = number.replace(/\D/g, "");
  return `https://wa.me/${digits.length === 10 ? `1${digits}` : digits}`;
}

function MailIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="3" y="5" width="18" height="14" rx="2.5" />
      <path d="m4 7 8 6 8-6" />
    </svg>
  );
}
