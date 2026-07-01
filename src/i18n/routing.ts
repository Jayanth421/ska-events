import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "te"],
  defaultLocale: "en",
  localePrefix: "always",
  pathnames: {
    "/": "/",
    "/services": "/services",
    "/packages": "/packages",
    "/venues": "/venues",
    "/gallery": "/gallery",
    "/about": "/about",
    "/contact": "/contact",
    "/blog": "/blog",
    "/booking": "/booking",
    "/dashboard": "/dashboard",
    "/admin": "/admin",
    "/admin/translations": "/admin/translations",
    "/admin/languages": "/admin/languages",
  },
});
