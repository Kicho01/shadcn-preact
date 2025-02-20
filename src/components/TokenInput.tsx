import { Badge, BadgeProps } from "@ui/badge";
import { cn } from "@ui/share/cn";
import { forwardRef, InputHTMLAttributes, useEffect, useRef, useState } from "preact/compat";
import { Show } from "./ui/show";

type TokenInputProps = Omit<InputHTMLAttributes, "value"> & {
  onTokensChange?: (tokens: string[]) => void;
  value?: string[];
  variant?: BadgeProps["variant"] | "intercalate";
};

const SPLITTER_CHARACTER = " ";

/**
 * Input for tokens
 * You can pass a ref to the input element to dispatch focus manually
 * */
export const TokenInput = forwardRef<HTMLInputElement, TokenInputProps>(
  ({ className, onInput, onFocus, onFocusOut, value, ...props }, ref) => {
    const [raw, setRaw] = useState(value ? value.join(SPLITTER_CHARACTER) : "");
    const [tokens, setTokens] = useState([]);
    const [isFocus, setIsFocus] = useState(false);

    const contentRef = useRef<HTMLDivElement>();

    useEffect(() => {
      if (isFocus) {
        const newTokens = raw.split(SPLITTER_CHARACTER);
        setTokens(newTokens);
      } else {
        setRaw(
          raw
            .split(SPLITTER_CHARACTER)
            .filter((v) => v !== "")
            .join(SPLITTER_CHARACTER)
        );
        setTokens(raw.split(SPLITTER_CHARACTER).filter((v) => v !== ""));
      }
    }, [raw, isFocus]);

    useEffect(() => {
      if (props.onTokensChange) {
        props.onTokensChange(tokens);
      }
    }, [tokens]);

    return (
      <div
        ref={contentRef}
        onClick={() => {
          contentRef.current?.querySelector("input")?.focus();
        }}
        onFocus={() => {
          contentRef.current?.querySelector("input")?.focus();
        }}
        className={cn(
          "flex min-h-9 flex-wrap cursor-text w-full flex-row gap-2 rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          isFocus ? "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring " : ""
        )}
      >
        {tokens.map((t, i) => (
          <>
            <Badge variant={props.variant === "intercalate" ? (i % 2 === 0 ? "default" : "outline") : props.variant}>
              {t}
              <Show when={isFocus}>
                <span
                  className={cn(
                    "animate-caret-blink",
                    props.variant === "secondary"
                      ? "text-primary"
                      : props.variant === "intercalate"
                        ? i % 2 === 0
                          ? "text-primary-foreground"
                          : "text-primary"
                        : props.variant === "outline"
                          ? "text-primary"
                          : "text-primary-foreground"
                  )}
                >
                  {i === tokens.length - 1 || tokens.length === 0 ? "|" : ""}
                </span>
              </Show>
            </Badge>
          </>
        ))}
        <input
          className="fixed -top-[9999999px] -z-50 select-none"
          // className="block text-primary-foreground w-full select-none"
          ref={ref}
          onFocus={() => {
            setIsFocus(true);
            // This is for fix bug when label focus the input, select all input text and erase the previous input value when user write.
            // TODO: Test all corner cases in all browsers
            contentRef.current?.querySelector("input")?.setSelectionRange(raw.length, raw.length, "none");
          }}
          onFocusOut={() => setIsFocus(false)}
          onBlur={() => setIsFocus(false)}
          value={raw}
          onInput={(e) => {
            setRaw(e.currentTarget.value);
          }}
          {...props}
        />
      </div>
    );
  }
);
