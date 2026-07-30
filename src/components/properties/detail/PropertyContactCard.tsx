import Image from "next/image";
import { Mail, Phone } from "lucide-react";
import { LOGO_ASSETS } from "@/components/branding/logo/logo-assets";
import { COMPANY_CONTACT } from "@/constants/contact";
import { cn } from "@/lib/utils";

export default function PropertyContactCard({
  className,
}: {
  readonly className?: string;
}) {
  return (
    <aside
      className={cn(
        "border border-border-l bg-bgSecondary-l p-5 dark:border-border-d dark:bg-bgSecondary-d",
        className,
      )}
    >
      <div className="flex items-center gap-3.5">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden bg-Bghover-l dark:bg-Bghover-d">
          <Image
            src={LOGO_ASSETS.mark.src}
            alt=""
            aria-hidden="true"
            width={LOGO_ASSETS.mark.width}
            height={LOGO_ASSETS.mark.height}
            sizes="26px"
            className="h-6 w-6 object-contain"
          />
        </span>
        <div>
          <p className="text-[15px] font-semibold">
            Unser Team berät Sie gerne
          </p>
          <p className="text-[12.5px] text-card-text-l dark:text-card-text-d">
            {COMPANY_CONTACT.name}
          </p>
        </div>
      </div>

      <div className="mt-3.5 flex flex-col gap-2 text-[13.5px]">
        <a
          href={COMPANY_CONTACT.phoneHref}
          className="flex items-center gap-2 hover:text-primary"
        >
          <Phone className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
          {COMPANY_CONTACT.phoneLabel}
        </a>
        <a
          href={COMPANY_CONTACT.emailHref}
          className="flex items-center gap-2 break-all hover:text-primary"
        >
          <Mail className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
          {COMPANY_CONTACT.emailLabel}
        </a>
      </div>
    </aside>
  );
}
