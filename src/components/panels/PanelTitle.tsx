export default function PanelTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-6 flex items-center gap-3">
      <h2 className="text-lg font-semibold">{children}</h2>
      <span className="h-px flex-1 bg-border" />
    </div>
  );
}
