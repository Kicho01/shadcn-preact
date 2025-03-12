import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { AppRoutes } from "@/routes/AppRoutes";
import { BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@ui/breadCrumb";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@ui/card";
import { type VNode, createRef } from "preact";
import { A } from "preact-hashish-router";
import { type PropsWithChildren, useEffect } from "preact/compat";
import NavRoutesLinks from "../NavRoutesLinks";

export type DocsLayoutProps = PropsWithChildren & { breadcrumbs?: VNode<any>; title: string; description: string };

export function DocsLayout(props: DocsLayoutProps) {
  return (
    <div className="flex h-auto min-h-screen w-full flex-1 flex-col items-center justify-start bg-background">
      <Header />

      <div className="mt-0 mb-1 flex w-full flex-1 flex-col items-center justify-start border-accent border-b border-dashed p-0">
        <div className="flex w-full max-w-screen-2xl flex-col gap-4 border-accent border-dashed pb-4 *:max-w-[100vw] md:border-x md:px-1 md:pt-2">
          <ContentLayout>
            <Card className="flex w-full flex-col border border-primary border-none pt-0 shadow-none max-md:*:px-2">
              <CardHeader>
                {props.breadcrumbs !== undefined ? (
                  props.breadcrumbs
                ) : (
                  <BreadcrumbList>
                    <BreadcrumbItem>
                      <BreadcrumbLink asChild>
                        <A href={AppRoutes.DOCS.INTRO}>Docs</A>
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <BreadcrumbPage className="capitalize">{props.title.toLowerCase()}</BreadcrumbPage>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                )}
                <CardTitle className="text-3xl capitalize">{props.title.toLowerCase()}</CardTitle>

                <CardDescription className="text-md">{props.description}</CardDescription>
              </CardHeader>

              <CardContent>{props.children}</CardContent>
            </Card>
          </ContentLayout>
        </div>
      </div>
      <Footer />
    </div>
  );
}

function ContentLayout(props: PropsWithChildren) {
  const asideRef = createRef<HTMLElement>();

  useEffect(() => {
    if (asideRef.current === null) return;
    const link = asideRef.current.querySelector("a[data-route-active=true]");

    if (!link) return;

    link.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  }, [asideRef.current]);

  useEffect(() => {
    window.scroll({
      behavior: "smooth",
      left: 0,
      top: 0,
    });
  }, []);

  return (
    <div className="flex h-auto w-full flex-col p-0 md:grid md:grid-cols-[1fr,5fr] md:grid-rows-1">
      <aside
        ref={asideRef}
        className="fixed top-0 z-30 hidden h-[calc(100vh-4.3rem)] w-full shrink-0 overflow-auto border-grid border-r md:sticky md:z-auto md:block"
      >
        <div className="h-full w-full px-1 py-2 md:p-4 md:px-6">
          <NavRoutesLinks />
        </div>
      </aside>
      <main className="flex w-full flex-col items-start justify-start overflow-y-auto px-1 md:border-l md:border-l-accent md:border-dashed">
        {props.children}
      </main>
    </div>
  );
}
