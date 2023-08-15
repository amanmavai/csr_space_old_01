import { Select, Tag, Tooltip } from "antd";
import type { DefaultOptionType } from "antd/es/select";
import classNames from "classnames";
const { Option } = Select;

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

export function CustomTag({ children }) {
  return (
    <Tag color={"#108ee9"} style={{ marginTop: "5px" }}>
      {children}
    </Tag>
  );
}

export const defaultOptionType = { label: "All", value: "all" };
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
  const selectClassName = classNames(
    "tw-flex",
    layout === "col" ? "tw-flex-col" : "tw-flex-row tw-items-center tw-space-x-4",
    wrapperClassName
  );

  const tagRender = ({ label, value, closable, onClose }) => {
    const index = selectedValues.findIndex((item) => item.value === value);
    if (index < multipleCount) {
      return (
        <Tag closable={closable} onClose={onClose} key={value}>
          {label}
        </Tag>
      );
    }
    if (index === multipleCount) {
      const remainingCount = selectedValues.length - multipleCount;
      const remainingLabels = selectedValues.slice(multipleCount).map((item) => item.label);

      const remainingElements = (
        <div className="tw-p-1">
          {remainingLabels.map((x) => (
            <CustomTag key={x}>{x}</CustomTag>
          ))}
        </div>
      );

      return (
        <Tooltip title={remainingElements} key="remaining-tooltip" color={"geekblue"}>
          <span className="tw-ml-2 tw-cursor-pointer">+{remainingCount} more</span>
        </Tooltip>
      );
    }
    return null;
  };

  return (
    <div data-testid={testId} className={selectClassName}>
      {title && <div>{title}</div>}
      <Select
        defaultValue={selectedValues}
        value={selectedValues}
        placeholder={defaultOptionType.label}
        style={{ minWidth: 144 }}
        className={className}
        onChange={(_values, options) => {
          onChange(options);
        }}
        mode="multiple"
        getPopupContainer={(node) => node.parentNode}
        showArrow
        tagRender={tagRender}
      >
        {uniqueItems.map((item) => (
          <Option key={item.value} {...item}>
            {item.label}
          </Option>
        ))}
      </Select>
    </div>
  );
}
