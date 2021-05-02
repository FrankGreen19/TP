const express = require('express');
const { port } = require('./config');

const app = express();
app.use(express.json());

const doctorRouter = require('./routers/doctorRouter');
const scheduleRouter = require('./routers/scheduleRouter');
const medicineRouter = require('./routers/medicineRouter');
const patientRouter = require('./routers/patientRouter');
const pharmacyRouter = require('./routers/pharmacyRouter');

app.use('/doctor', doctorRouter);
app.use('/schedule', scheduleRouter);
app.use('/medicine', medicineRouter);
app.use('/patient', patientRouter);
app.use('/pharmacy', pharmacyRouter);

app.listen(port, () => console.log(`App listening on http://localhost:${port}!`));