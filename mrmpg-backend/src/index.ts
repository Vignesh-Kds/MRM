import app from "./app";
import { ENV } from "./config/env";

app.listen(ENV.PORT, "0.0.0.0", () => {
  console.log(`Server running on http://0.0.0.0:${ENV.PORT} in ${ENV.NODE_ENV} mode`);
});
