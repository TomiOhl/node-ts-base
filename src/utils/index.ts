import { Router } from "express";

function useRouter(app: Router, prefix: string, router: Router) {
  app.use(
    prefix,
    (_req, res, next) => {
      res.locals.fullRoute = `${res.locals?.fullRoute ?? ""}${prefix}`;
      next();
    },
    router
  );
}

export { useRouter };
