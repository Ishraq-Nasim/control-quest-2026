import { icons, ICON_STROKE, type IconName } from "./icons";

type Props = {
  icon: IconName;
  children: React.ReactNode;
  className?: string;
  /** Icon colour: inherits the text colour, or takes the lime accent. */
  tone?: "ink" | "accent";
};

/** An inline icon placed before its text, sized to the text it sits in. */
export function Label({ icon, children, className = "", tone = "ink" }: Props) {
  const Icon = icons[icon];
  return (
    <span className={`cq-label ${className}`}>
      <Icon
        aria-hidden="true"
        focusable="false"
        strokeWidth={ICON_STROKE}
        className={tone === "accent" ? "cq-ico cq-ico--accent" : "cq-ico"}
      />
      <span>{children}</span>
    </span>
  );
}
