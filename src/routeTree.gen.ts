import { Route as IndexImport } from "./routes";
import { Route as rootRoute } from "./routes/__root";
import { Route as EditorIndexImport } from "./routes/editor";

const IndexRoute = IndexImport.update({
  path: "/",
  getParentRoute: () => rootRoute,
} as any);

const EditorIndexRoute = EditorIndexImport.update({
  path: "/editor/",
  getParentRoute: () => rootRoute,
} as any);

declare module "@tanstack/react-router" {
  interface FileRoutesByPath {
    "/": {
      preLoaderRoute: typeof IndexImport;
      parentRoute: typeof rootRoute;
    };
    "/editor/": {
      preLoaderRoute: typeof EditorIndexImport;
      parentRoute: typeof rootRoute;
    };
  }
}

export const routeTree = rootRoute.addChildren([IndexRoute, EditorIndexRoute]);
