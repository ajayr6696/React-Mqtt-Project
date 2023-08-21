const express = require('express');
import staffsRoutes from "./routes/staffs.js";
import periodsRoutes from "./routes/periods.js";
import schedulesRoutes from "./routes/schedules.js";

const app = express();


app.use("/api/staffs", staffsRoutes);
app.use("/api/periods", periodsRoutes);
app.use("/api/schedules", schedulesRoutes);

const PORT = process.env.PORT || 8800;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));