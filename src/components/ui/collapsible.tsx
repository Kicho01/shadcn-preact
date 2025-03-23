import { type HTMLAttributes, type PropsWithChildren, createContext, forwardRef } from "preact/compat";
import { useContext, useEffect, useState } from "preact/hooks";
import { cn } from "./share/cn";
import { Show } from "./show";

type CollapsibleContextT = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  disabled: boolean;
};

const CollapsibleContext = createContext<CollapsibleContextT | null>(null);

type CollapsibleProps = PropsWithChildren<HTMLAttributes<HTMLDivElement>> & {
  asChild?: boolean;
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (o: boolean) => void;
  disabled?: boolean;
};

export const Collapsible = forwardRef<HTMLDivElement, CollapsibleProps>(
  ({
    children,
    open: controlledOpen,
    onOpenChange,
    defaultOpen,
    class: classNative,
    className,
    disabled,
    ...props
  }: CollapsibleProps) => {
    const [isOpen, setIsOpen] = useState(
      defaultOpen !== undefined ? defaultOpen : controlledOpen !== undefined ? controlledOpen : false
    );

    // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
    useEffect(() => {
      if (onOpenChange && isOpen !== controlledOpen) {
        onOpenChange(isOpen);
      }
    }, [isOpen]);

    useEffect(() => {
      if (controlledOpen !== undefined) {
        setIsOpen(controlledOpen);
      }
    }, [controlledOpen]);

    const open = () => setIsOpen(true);
    const close = () => setIsOpen(false);

    return (
      <CollapsibleContext.Provider value={{ isOpen, open, close, disabled: Boolean(disabled) }}>
        <div
          data-state={isOpen ? "open" : "closed"}
          data-disabled={disabled}
          className={cn("", className, classNative)}
          {...props}
        >
          {children}
        </div>
      </CollapsibleContext.Provider>
    );
  }
);

function useCollapsible() {
  const context = useContext(CollapsibleContext);
  if (!context) {
    throw new Error("useCollapsible should be used within CollapsibleProvider");
  }
  return context;
}

export function CollapsibleTrigger({ children }: PropsWithChildren & { asChild?: boolean }) {
  const { open, close, isOpen, disabled } = useCollapsible();

  return (
    <div
      onClick={() => (isOpen ? close() : open())}
      data-state={isOpen ? "open" : "closed"}
      data-disabled={disabled}
      className="group relative m-0 w-fit border-0 border-none bg-transparent p-0 outline-none"
    >
      {children}
    </div>
  );
}

export const CollapsibleContent = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ children, className, class: classNative, ...props }) => {
    const { isOpen, disabled } = useCollapsible();

    return (
      <Show when={isOpen}>
        <div
          data-state={isOpen ? "open" : "closed"}
          data-disabled={disabled}
          className={cn(className, classNative)}
          {...props}
        >
          {children}
        </div>
      </Show>
    );
  }
);
