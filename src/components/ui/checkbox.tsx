import { Check } from "lucide-preact";
import { type HTMLAttributes, forwardRef, useLayoutEffect, useState } from "preact/compat";
import { cn } from "./share/cn";

type CheckedState = boolean;

type CheckboxProps = HTMLAttributes<HTMLButtonElement> & {
  checked?: CheckedState;
  defaultChecked?: CheckedState;
  required?: boolean;
  onCheckedChange?(checked: CheckedState): void;
  disabled?: boolean;
};

const Checkbox = forwardRef<HTMLButtonElement, CheckboxProps>(
  ({ className, checked: controlledChecked, defaultChecked, required, onCheckedChange, ...props }, ref) => {
    const [internalIsChecked, setIsChecked] = useState<CheckedState>(
      controlledChecked !== undefined ? controlledChecked : defaultChecked || false
    );

    // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
    useLayoutEffect(() => {
      if (onCheckedChange && controlledChecked !== internalIsChecked) {
        onCheckedChange(internalIsChecked);
      }
    }, [internalIsChecked]);

    useLayoutEffect(() => {
      setIsChecked(controlledChecked);
    }, [controlledChecked]);

    return (
      <>
        <button
          disabled={props.disabled || false}
          className={cn(
            "flex h-4 w-4 flex-row items-center justify-center rounded-sm border border-primary shadow disabled:cursor-not-allowed",
            `${internalIsChecked ? "bg-primary text-primary-foreground" : ""}`,
            className
          )}
          type="button"
          ref={ref}
          aria-checked={internalIsChecked}
          // biome-ignore lint/a11y/useSemanticElements: <explanation>
          role={"checkbox"}
          value={internalIsChecked ? "on" : "off"}
          onClick={() => setIsChecked((prev) => !prev)}
          {...props}
        >
          {internalIsChecked ? <Check className="h-4 w-4" /> : null}
        </button>

        <input
          type="checkbox"
          aria-hidden="true"
          style="transform: translateX(-100%); position: absolute; pointer-events: none; opacity: 0; margin: 0px; width: 25px; height: 25px;"
          tabIndex={-1}
          value={internalIsChecked ? "on" : "off"}
          checked={internalIsChecked}
        />
      </>
    );
  }
);

Checkbox.displayName = "Checkbox";

export { Checkbox };
