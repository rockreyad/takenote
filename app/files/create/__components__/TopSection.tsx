type Section = {
  title: string;
  description: string;
};
export const TopSection = ({ title, description }: Section) => {
  return (
    <div className="mt-6 space-y-2">
      <h2 className="text-3xl font-semibold tracking-tight">{title}</h2>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
};
