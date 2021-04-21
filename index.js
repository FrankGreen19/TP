const express = require('express');
const { port } = require('./config');

const app = express();
app.use(express.json());

const doctorRouter = require('./routers/doctorRouter');
const scheduleRouter = require('./routers/scheduleRouter');
const medicineRouter = require('./routers/medicineRouter');

app.use('/doctor', doctorRouter);
app.use('/schedule', scheduleRouter);
app.use('/medicine', medicineRouter);

app.listen(port, () => console.log(`App listening on http://localhost:${port}!`));