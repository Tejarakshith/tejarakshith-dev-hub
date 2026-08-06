import { createFileRoute } from "@tanstack/react-router";
import Portfolio from "@/components/portfolio/Portfolio";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Pagadala Tejarakshith — Software Engineer & Java Developer" },
      {
        name: "description",
        content:
          "Portfolio of Pagadala Tejarakshith — Java, Spring and Full-Stack developer pursuing M.Tech, with research documentation experience.",
      },
      { property: "og:title", content: "Pagadala Tejarakshith — Software Engineer" },
      {
        property: "og:description",
        content:
          "Java, Spring and Full-Stack developer. Projects in secure cloud storage, React, and more.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Portfolio,
});
