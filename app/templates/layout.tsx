import { PublicNav } from "../components/public-nav";

export default function TemplatesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <PublicNav />
      {children}
    </>
  );
}
