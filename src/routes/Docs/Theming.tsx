import ContentLayout from "@/components/ContentLayout";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@ui/breadCrumb";
import { Card, CardDescription, CardHeader, CardTitle } from "@ui/card";
import { A } from "preact-hashish-router";
import { Header } from "../../components/Header";
import { AppRoutes } from "../AppRoutes";

export default function ThemingPage() {
  return (
    <div className="flex flex-1 min-h-screen h-auto w-full flex-col items-center justify-start relative bg-background">
      <Header />

      <div className="w-full flex flex-1 flex-col items-center justify-start p-0 mt-0 relative border-b border-accent border-dashed">
        <div className="max-w-screen-2xl md:border-x border-accent border-dashed *:max-w-[100vw] *:overflow-auto flex md:px-1 flex-col w-full md:pt-2 gap-4">
          <ContentLayout>
            <Card className="w-full flex flex-col border-none shadow-none pt-0 max-md:*:px-2 border border-primary">
              <CardHeader>
                <Breadcrumb>
                  <BreadcrumbList>
                    <BreadcrumbItem>
                      <BreadcrumbLink asChild>
                        <A href={AppRoutes.DOCS.INTRO}>Docs</A>
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <BreadcrumbPage>Theming</BreadcrumbPage>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>

                <CardTitle className="text-3xl">Theming</CardTitle>

                <CardDescription className="text-md">Using CSS Variables or Tailwind CSS for theming.</CardDescription>
              </CardHeader>
            </Card>
          </ContentLayout>
        </div>
      </div>
    </div>
  );
}
