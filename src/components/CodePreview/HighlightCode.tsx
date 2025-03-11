import { Button } from "@ui/button";
import { Show } from "@ui/show";
import { Skeleton } from "@ui/skeleton";
import { Check, Copy } from "lucide-preact";
import { useLayoutEffect, useState } from "preact/hooks";
import { type BundledLanguage, type BundledTheme, codeToHtml } from "shiki/bundle/web";

export default function HighlightCode(props: { codeString: string; lang: BundledLanguage; theme?: BundledTheme }) {
  const [htmlCode, setHtmlCode] = useState("");
  const [copied, setCopied] = useState(false);
  const [isProcessing, setIsProcessing] = useState(true);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(props.codeString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useLayoutEffect(() => {
    // TODO: add CATCH for not recompute in all initial render
    (async () => {
      const html = await codeToHtml(props.codeString, {
        lang: props.lang,
        theme: props.theme ?? "github-dark-dimmed",
      });

      setHtmlCode(html);
      setIsProcessing(false);
    })();
  }, []);

  return (
    <div className="group relative w-full max-w-full overflow-hidden rounded-lg bg-background">
      <Button
        onClick={copyToClipboard}
        className="absolute top-2 right-2 hidden h-7 w-7 p-1 group-hover:flex"
        size="icon"
      >
        {!copied && <Copy className="" />}
        {copied && <Check className="" />}
      </Button>

      <Show when={isProcessing}>
        <Skeleton
          className="w-full"
          style={{
            height: `${props.codeString.split("\n").length + 2}em`,
          }}
        />
      </Show>

      <Show when={!isProcessing}>
        <div
          className="max-w-full text-sm *:overflow-auto"
          // biome-ignore lint/security/noDangerouslySetInnerHtml:
          dangerouslySetInnerHTML={{
            __html: htmlCode,
          }}
        />
      </Show>
    </div>
  );
}
