import { AppRoutes } from "@/routes/AppRoutes";
import { Button } from "@ui/button";
import { A } from "preact-hashish-router";

export default function NavRoutesLinks() {
  return (
    <>
      <div className="flex w-full flex-col gap-[2px]">
        <span className="flex h-9 w-full flex-row items-center justify-start p-1 font-semibold text-sm">
          Getting Started
        </span>
        <A href={AppRoutes.DOCS.INTRO} className="group w-full">
          <Button
            variant="link"
            size="sm"
            className="w-full justify-start px-2 py-1 font-normal text-muted-foreground capitalize group-data-[route-active=true]:text-foreground"
          >
            Introduction
          </Button>
        </A>

        <A href={AppRoutes.DOCS.INSTALLATION} className="group w-full">
          <Button
            variant="link"
            size="sm"
            className="w-full justify-start px-2 py-1 font-normal text-muted-foreground capitalize group-data-[route-active=true]:text-foreground"
          >
            Installation
          </Button>
        </A>

        <A href={AppRoutes.DOCS.THEMING} className="group w-full">
          <Button
            variant="link"
            size="sm"
            className="w-full justify-start px-2 py-1 font-normal text-muted-foreground capitalize group-data-[route-active=true]:text-foreground"
          >
            Theming
          </Button>
        </A>

        <A href={AppRoutes.EXAMPLES} className="group w-full">
          <Button
            variant="link"
            size="sm"
            className="w-full justify-start px-2 py-1 font-normal text-muted-foreground capitalize group-data-[route-active=true]:text-foreground"
          >
            Examples
          </Button>
        </A>
      </div>

      <div className="flex w-full flex-col gap-[2px]">
        <span className="flex h-9 w-full flex-row items-center justify-start p-1 font-semibold text-sm">
          Installation
        </span>

        <A href={AppRoutes.DOCS.INSTALLATION_VITE} className="group w-full">
          <Button
            variant="link"
            size="sm"
            className="w-full justify-start px-2 py-1 font-normal text-muted-foreground capitalize group-data-[route-active=true]:text-foreground"
          >
            Vite
          </Button>
        </A>

        <A href={AppRoutes.DOCS.INSTALLATION_ASTRO} className="group w-full">
          <Button
            variant="link"
            size="sm"
            className="w-full justify-start px-2 py-1 font-normal text-muted-foreground capitalize group-data-[route-active=true]:text-foreground"
          >
            Astro
          </Button>
        </A>
      </div>

      <div className="flex w-full flex-col gap-[2px] pb-4">
        <span className="flex h-9 w-full flex-row items-center justify-start p-1 font-semibold text-sm">
          Components
        </span>

        {Object.entries(AppRoutes.COMPONENTS)
          .sort()
          .map(([name, route]) => {
            return (
              <A href={route} className="group w-full" key={name}>
                <Button
                  variant="link"
                  size="sm"
                  className="w-full justify-start px-2 py-1 font-normal text-muted-foreground capitalize group-data-[route-active=true]:text-foreground"
                >
                  {name.split("_").join(" ").toLocaleLowerCase()}
                </Button>
              </A>
            );
          })}
      </div>
    </>
  );
}
