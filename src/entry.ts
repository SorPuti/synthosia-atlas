// Vercel serves 404.html with HTTP 404. The dev server uses this tiny route
// fallback, and legacy /about links still lead to the actual career section.
const path = location.pathname.replace(/\/+$/, "") || "/";
if (path === "/about") location.replace("/#trajetoria");
else if (path === "/" || path === "/index.html") void import("./main");
else location.replace("/404.html");
