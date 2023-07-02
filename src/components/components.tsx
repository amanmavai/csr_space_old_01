import classNames from "classnames";

interface Props {
  label: React.ReactNode;
  value: React.ReactNode;
  uom?: string;
  className?: string;
  labelClassName?: string;
  valueClassName?: string;
}

export function LabelValue({ label, value, uom, className, labelClassName, valueClassName }: Props) {
  return (
    <div className={classNames("flex items-baseline", className)}>
      <div className={classNames("text-sm font-medium uppercase", labelClassName)}>{label}</div>
      <div className={classNames("ml-2 text-lg font-semibold", valueClassName)}>{value}</div>
      {uom && <div className="ml-1 text-xs">{uom}</div>}
    </div>
  );
}
