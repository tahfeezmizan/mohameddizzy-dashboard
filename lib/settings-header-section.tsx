export function SectionHeader({
  icon,
  title,
  iconBg,
  iconColor,
}: {
  icon: React.ReactNode;
  title: string;
  iconBg: string;
  iconColor: string;
}) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <div
        className={`h-9 w-9 rounded-lg ${iconBg} flex items-center justify-center shrink-0`}
      >
        <span className={iconColor}>{icon}</span>
      </div>
      <h2 className="text-base font-semibold text-slate-900">{title}</h2>
    </div>
  );
}
