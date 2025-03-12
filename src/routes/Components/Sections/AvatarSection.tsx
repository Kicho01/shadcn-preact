import { CodePreviewTabs } from "@/components/CodePreview/CodePreviewTabs";
import HighlightCode from "@/components/CodePreview/HighlightCode";
import { AppRoutes } from "@/routes/AppRoutes";
import { Avatar, AvatarFallback, AvatarImage } from "@ui/avatar";
import { Button } from "@ui/button";
import { Pagination, PaginationContent, PaginationItem } from "@ui/pagination";
import { ChevronLeft, ChevronRight } from "lucide-preact";
import { A } from "preact-hashish-router";

export function AvatarSection() {
  return (
    <div className="flex w-full flex-col gap-6">
      <CodePreviewTabs
        codeString={`
  import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from "@ui/avatar"

  export function AvatarDemo() {
    return (
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    )
  }

`}
        previewElement={
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        }
      />

      <h2 className="w-full border-b-2 pb-2 font-semibold text-2xl">Usage</h2>

      <HighlightCode
        lang="tsx"
        codeString={`
  import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

`}
      />

      <HighlightCode
        lang="tsx"
        codeString={`
  <Avatar>
    <AvatarImage src="https://github.com/shadcn.png" />
    <AvatarFallback>CN</AvatarFallback>
  </Avatar>

`}
      />

      <Pagination className="mt-10">
        <PaginationContent className="flex w-full flex-row justify-between">
          <PaginationItem>
            <A href={AppRoutes.COMPONENTS.ALERT_DIALOG}>
              <Button className="gap-1 pl-1" variant="outline">
                <ChevronLeft />
                Alert Dialog
              </Button>
            </A>
          </PaginationItem>
          <PaginationItem>
            <A href={AppRoutes.COMPONENTS.BADGE}>
              <Button className="gap-1 pr-1 capitalize" variant="outline">
                Badge
                <ChevronRight />
              </Button>
            </A>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
