import express from "express";
import * as Sentry from "@sentry/node";
import log from "./middleware/logMiddleware.js";
import usersRouter from "./routes/users.js";
import amenitiesRouter from "./routes/amenities.js";
import bookingsRouter from "./routes/bookings.js";
import hostsRouter from "./routes/hosts.js";
import propertiesRouter from "./routes/properties.js";
import reviewsRouter from "./routes/reviews.js";
import generalErrorHandler from "./middleware/generalErrorHandler.js";
import loginRouter from "./routes/login.js";

const app = express();
app.use(express.json());
app.use(log);

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  integrations: [
    // enable HTTP calls tracing
    new Sentry.Integrations.Http({
      tracing: true,
    }),
    // enable Express.js middleware tracing
    new Sentry.Integrations.Express({
      app,
    }),
  ],
  // Performance Monitoring
  tracesSampleRate: 1.0, // Capture 100% of the transactions, reduce in production!,
});

app.use("/users", usersRouter);
app.use("/amenities", amenitiesRouter);
app.use("/bookings", bookingsRouter);
app.use("/hosts", hostsRouter);
app.use("/properties", propertiesRouter);
app.use("/reviews", reviewsRouter);
app.use("/login", loginRouter);
app.use("/docs", express.static("docs"));

app.use(Sentry.Handlers.errorHandler());

app.use(generalErrorHandler);

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});

// Please the feedback in English.
// Thank you.