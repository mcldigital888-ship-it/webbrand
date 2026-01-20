import Link from "next/link";

export default function CtaButton({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="ds-btn ds-btn-primary"
    >
      {children}
    </Link>
  );
}
