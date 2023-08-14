import { DefaultOptionType } from "antd/es/select";
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

interface MultiSelectProps {
  uniqueItems: DefaultOptionType[];
  selectedValues: DefaultOptionType[];
  onChange: (values: DefaultOptionType[]) => void;
  layout: "col" | "row";
  wrapperClassName: string;
  className: string;
  title: string;
  testId: string;
  multipleCount: number;
}

export function MultiSelect({
  uniqueItems,
  selectedValues,
  onChange,
  layout = "col",
  wrapperClassName,
  className,
  title,
  testId,
  multipleCount = 1,
}: MultiSelectProps) {
  
}
