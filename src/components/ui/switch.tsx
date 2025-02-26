import { type ButtonHTMLAttributes, forwardRef, useEffect, useState } from "preact/compat";
import { cn } from "./share/cn";

type SwitchProps = ButtonHTMLAttributes & {
  onCheckedChange?: (checked: boolean) => void;
  checked?: boolean;
  defaultChecked?: boolean;
};

const Switch = forwardRef<HTMLButtonElement, SwitchProps>(({ className, ...props }, ref) => {
  const [checked, setChecked] = useState(props.checked !== undefined ? props.checked : props.defaultChecked || false);

  useEffect(() => {
    if (props.onCheckedChange) {
      props.onCheckedChange(checked);
    }
  }, [checked]);

  useEffect(() => {
    setChecked(props.checked);
  }, [props.checked]);

  return (
    <button
      data-state={checked ? "checked" : "unchecked"}
      onClick={() => {
        setChecked((prev) => !prev);
      }}
      className={cn(
        "peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input",
        className
      )}
      {...props}
      ref={ref}
    >
      <span
        data-state={checked ? "checked" : "unchecked"}
        className={cn(
          "pointer-events-none block h-4 w-4 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0"
        )}
      ></span>
    </button>
  );
});
Switch.displayName = "Switch";

export { Switch };
