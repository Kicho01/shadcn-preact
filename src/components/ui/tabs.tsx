import { createContext } from "preact";
import {
  type HTMLAttributes,
  type PropsWithChildren,
  forwardRef,
  useContext,
  useEffect,
  useState,
} from "preact/compat";
import { cn } from "./share/cn";
import { Show } from "./show";

type TabsProps = PropsWithChildren & {
  /** The value for the selected tab, if controlled */
  value?: string;
  /** The value of the tab to select by default, if uncontrolled */
  defaultValue?: string;
  /** A function called when a new tab is selected */
  onValueChange?: (value: string) => void;
  /**
   * The orientation the tabs are layed out.
   * Mainly so arrow navigation is done accordingly (left & right vs. up & down)
   * @defaultValue horizontal
   */
  orientation?: "vertical" | "horizontal";
  /**
   * Whether a tab is activated automatically or manually.
   * @defaultValue automatic
   * */
  activationMode?: "automatic" | "manual";
};

const TabContext = createContext<{
  value: string;
  onValueChange: (value: string) => void;
  orientation: "vertical" | "horizontal";
  activationMode?: "automatic" | "manual";
} | null>(null);

const Tabs = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement> & TabsProps>(
  (
    { value: controlledValue, defaultValue, onValueChange, activationMode, orientation, children, className, ...props },
    ref
  ) => {
    const [value, setValue] = useState(controlledValue !== undefined ? controlledValue : defaultValue || "");

    // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
    useEffect(() => {
      if (onValueChange) {
        onValueChange(value);
      }
    }, [value]);

    useEffect(() => {
      if (controlledValue) {
        setValue(controlledValue);
      }
    }, [controlledValue]);

    return (
      <TabContext.Provider
        value={{ onValueChange: setValue, value, orientation: orientation || "horizontal", activationMode }}
      >
        <div ref={ref} className={cn("", className)} {...props}>
          {children}
        </div>
      </TabContext.Provider>
    );
  }
);

function useTabs() {
  const context = useContext(TabContext);
  if (!context) {
    throw new Error("useTabs should be used within Tabs");
  }
  return context;
}

const TabsList = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => {
  const { orientation } = useTabs();

  return (
    <div
      ref={ref}
      data-orientation={orientation}
      className={cn(
        "inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground",
        className
      )}
      {...props}
    />
  );
});
TabsList.displayName = "TabsList";

const TabsTrigger = forwardRef<HTMLButtonElement, HTMLAttributes<HTMLButtonElement> & { value?: string }>(
  ({ className, ...props }, ref) => {
    const { value, onValueChange, orientation } = useTabs();
    return (
      <button
        ref={ref}
        data-state={value === props.value ? "active" : "inactive"}
        data-orientation={orientation}
        onClick={() => onValueChange(props.value || "")}
        type="button"
        className={cn(
          "inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 font-medium text-sm ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow",
          className
        )}
        {...props}
      />
    );
  }
);
TabsTrigger.displayName = "TabsTrigger";

const TabsContent = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement> & { value?: string }>(
  ({ className, ...props }, ref) => {
    const { value, orientation } = useTabs();

    return (
      <Show when={value === props.value}>
        <div
          ref={ref}
          data-orientation={orientation}
          data-state="active"
          className={cn(
            "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
            className
          )}
          {...props}
        />
      </Show>
    );
  }
);
TabsContent.displayName = "TabsContent";

export { Tabs, TabsList, TabsTrigger, TabsContent };
