import { Container } from "@components/ui";

export function Copyright() {
  return (
    <Container className="flex max-w-[1500px] flex-col gap-1 py-5 font-heading text-[9px] font-bold uppercase tracking-[0.14em] sm:flex-row sm:items-center sm:justify-between">
      <span>© {new Date().getFullYear()} Amir Seraj</span>
      <span>Designed and built in Genova, Italy</span>
    </Container>
  );
}
