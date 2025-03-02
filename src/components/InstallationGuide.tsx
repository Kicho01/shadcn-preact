import HighlightCode from "@/components/CodePreview/HighlightCode";
import { Alert, AlertDescription, AlertTitle } from "@ui/alert";
import { AlertCircle } from "lucide-preact";

export default function Installation() {
  return (
    <div className="flex w-full flex-col gap-6">
      <h1 className="font-bold text-2xl">Vite:</h1>

      <section className="flex flex-col gap-4">
        <h2 className="font-semibold text-xl">1- Create project</h2>
        <p>Start by creating a new Preact project using Vite:</p>

        <HighlightCode
          codeString={`
  bun create vite@latest

`}
          lang="bash"
        />
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="font-semibold text-xl">2- Add Tailwind and its configuration</h2>
        <Alert className="border-yellow-400">
          <AlertCircle className="h-4 w-4" color="#facc15" />
          <AlertTitle>TailwindCSS version</AlertTitle>
          <AlertDescription>
            For now only supports TailwindCSS 3. In the future will support TailwindCSS 4.
          </AlertDescription>
        </Alert>

        <p>Install tailwindcss and its peer dependencies.</p>

        <HighlightCode
          codeString={`
  bun add -D tailwindcss@3.4.17 postcss autoprefixer

`}
          lang="bash"
        />

        <p>
          Add this import header in your main css file,
          <code className="mx-2 rounded-sm bg-accent px-2">src/index.css</code> in our case:
        </p>

        <HighlightCode
          codeString={`
  @tailwind base;
  @tailwind components;
  @tailwind utilities;

  /* ... */

`}
          lang="css"
        />

        <p>
          Configure template paths in <code className="mx-2 rounded-sm bg-accent px-2">tailwind.config.js</code>:
        </p>

        <HighlightCode
          codeString={`
  /** @type {import('tailwindcss').Config} */
  module.exports = {
    content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
    theme: {
      extend: {},
    },
    plugins: [],
  };

`}
          lang="js"
        />
        <p>
          Configure the postcss file <code className="mx-2 rounded-sm bg-accent px-2">postcss.config.js</code>:
        </p>
        <HighlightCode
          codeString={`
  export default {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  };

`}
          lang="js"
        />
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="font-semibold text-xl">
          3- Edit
          <code className="mx-2 rounded-sm bg-accent px-2">tsconfig.json</code>
          file
        </h2>

        <HighlightCode
          codeString={`
  {
    "compilerOptions": {
      "baseUrl": "./",
      "paths": {
        "@/*": ["./src/*"],
        "@ui/*": ["./src/components/ui/*"]
      }
    }
  }

`}
          lang="json"
        />
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="font-semibold text-xl">
          4- Update
          <code className="mx-2 rounded-sm bg-accent px-2">vite.config.ts</code>
        </h2>

        <HighlightCode
          codeString={`
  bun add -D @types/node

`}
          lang="bash"
        />

        <HighlightCode
          codeString={`
  import { resolve } from "node:path";
  import preact from "@preact/preset-vite";
  import { defineConfig } from "vite";

  // https://vitejs.dev/config/
  export default defineConfig({
    plugins: [preact()],
    server: {
      host: true,
    },
    resolve: {
      alias: {
        "@ui": resolve(resolve(__dirname), "./src/components/ui/"),
        "@": resolve(resolve(__dirname), "./src/"),
      },
    },
    define: {
      "process.env.IS_PREACT": JSON.stringify("true"),
    },
  });

`}
          lang="js"
        />
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="font-semibold text-xl">Add UI components</h2>
        <p>For now this guide its for the installation of all components at once.</p>

        <p>Install all components dependencies:</p>

        <HighlightCode
          codeString={`
  bun add class-variance-authority clsx cmdk date-fns dayjs embla-carousel-react input-otp lucide-preact react-day-picker react-hot-toast recharts tailwind-merge tailwindcss-animate vaul @floating-ui/react-dom  

`}
          lang="bash"
        />

        <p>Copy the folder:</p>

        <p>
          Copy the folder of this repo
          <code className="mx-2 rounded-sm bg-accent px-2">src/components/ui</code> into your ui path If you dont change
          the config guide should be in <code className="mx-2 rounded-sm bg-accent px-2">src/components/ui</code>
        </p>

        <HighlightCode
          codeString={`
  bunx degit https://github.com/LiasCode/shadcn-preact/src/components/ui ./src/components/ui  

`}
          lang="bash"
        />

        <p>Adding custom CSS variables:</p>

        <HighlightCode
          codeString={`
  @layer base {
    :root {
      --background: 0 0% 100%;
      --foreground: 240 10% 3.9%;
      --card: 0 0% 100%;
      --card-foreground: 240 10% 3.9%;
      --popover: 0 0% 100%;
      --popover-foreground: 240 10% 3.9%;
      --primary: 240 5.9% 10%;
      --primary-foreground: 0 0% 98%;
      --secondary: 240 4.8% 95.9%;
      --secondary-foreground: 240 5.9% 10%;
      --muted: 240 4.8% 95.9%;
      --muted-foreground: 240 3.8% 46.1%;
      --accent: 240 4.8% 95.9%;
      --accent-foreground: 240 5.9% 10%;
      --destructive: 0 84.2% 60.2%;
      --destructive-foreground: 0 0% 98%;
      --border: 240 5.9% 90%;
      --input: 240 5.9% 90%;
      --ring: 240 5.9% 10%;
      --radius: 0.5rem;
      --chart-1: 12 76% 61%;
      --chart-2: 173 58% 39%;
      --chart-3: 197 37% 24%;
      --chart-4: 43 74% 66%;
      --chart-5: 27 87% 67%;
    }

    .dark {
      --background: 240 10% 3.9%;
      --foreground: 0 0% 98%;
      --card: 240 10% 3.9%;
      --card-foreground: 0 0% 98%;
      --popover: 240 10% 3.9%;
      --popover-foreground: 0 0% 98%;
      --primary: 0 0% 98%;
      --primary-foreground: 240 5.9% 10%;
      --secondary: 240 3.7% 15.9%;
      --secondary-foreground: 0 0% 98%;
      --muted: 240 3.7% 15.9%;
      --muted-foreground: 240 5% 64.9%;
      --accent: 240 3.7% 15.9%;
      --accent-foreground: 0 0% 98%;
      --destructive: 0 62.8% 30.6%;
      --destructive-foreground: 0 0% 98%;
      --border: 240 3.7% 15.9%;
      --input: 240 3.7% 15.9%;
      --ring: 240 4.9% 83.9%;
      --chart-1: 220 70% 50%;
      --chart-2: 160 60% 45%;
      --chart-3: 30 80% 55%;
      --chart-4: 280 65% 60%;
      --chart-5: 340 75% 55%;
    }
  }

  * {
    @apply border-border;
  }

  body {
    @apply bg-background text-foreground;
  }

`}
          lang="css"
        />

        <p>
          Updating <code className="mx-2 rounded-sm bg-accent px-2">tailwind.config.js</code>:
        </p>

        <HighlightCode
          codeString={`
  /** @type {import('tailwindcss').Config} */
  export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    darkMode: ["class"],
    theme: {
      extend: {
        colors: {
          background: "hsl(var(--background))",
          foreground: "hsl(var(--foreground))",
          card: {
            DEFAULT: "hsl(var(--card))",
            foreground: "hsl(var(--card-foreground))",
          },
          popover: {
            DEFAULT: "hsl(var(--popover))",
            foreground: "hsl(var(--popover-foreground))",
          },
          primary: {
            DEFAULT: "hsl(var(--primary))",
            foreground: "hsl(var(--primary-foreground))",
          },
          secondary: {
            DEFAULT: "hsl(var(--secondary))",
            foreground: "hsl(var(--secondary-foreground))",
          },
          muted: {
            DEFAULT: "hsl(var(--muted))",
            foreground: "hsl(var(--muted-foreground))",
          },
          accent: {
            DEFAULT: "hsl(var(--accent))",
            foreground: "hsl(var(--accent-foreground))",
          },
          destructive: {
            DEFAULT: "hsl(var(--destructive))",
            foreground: "hsl(var(--destructive-foreground))",
          },
          border: "hsl(var(--border))",
          input: "hsl(var(--input))",
          ring: "hsl(var(--ring))",
          chart: {
            1: "hsl(var(--chart-1))",
            2: "hsl(var(--chart-2))",
            3: "hsl(var(--chart-3))",
            4: "hsl(var(--chart-4))",
            5: "hsl(var(--chart-5))",
          },
        },
        fontSize: {},
        borderRadius: {
          "2xl": "calc(var(--radius) + 4px)",
          xl: "calc(var(--radius) + 2px)",
          lg: "var(--radius)",
          md: "calc(var(--radius) - 2px)",
          sm: "calc(var(--radius) - 4px)",
        },
        keyframes: {},
      },
    },
    plugins: [require("tailwindcss-animate")],
  };

`}
          lang="js"
        />
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="font-semibold text-xl">5- Done</h2>
        <p>Setup is complete, and your environment is ready.</p>
      </section>
    </div>
  );
}
