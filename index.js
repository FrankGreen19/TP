const express = require('express');
const passport = require('passport');
const multer  = require("multer");
const cors = require('cors');

const { port } = require('./config');
const fileRouter = require('./routers/fileRouter');

const app = express();
app.use(express.json());
app.use(cors());

const doctorRouter = require('./routers/doctorRouter');
const scheduleRouter = require('./routers/scheduleRouter');
const medicineRouter = require('./routers/medicineRouter');
const patientRouter = require('./routers/patientRouter');
const pharmacyRouter = require('./routers/pharmacyRouter');
const authRouter = require('./routers/authRouter');
const recordRouter = require('./routers/recordRouter');
const medicalStoryRouter = require('./routers/medicalStoryRouter');
const analysisRouter  = require('./routers/analysisRouter');
const medicalstorymedicineRouter = require('./routers/medicalStoryMedicineRouter');
const imageRouter = fileRouter.imageRouter;

app.use('/doctor', doctorRouter);
app.use('/schedule', scheduleRouter);
app.use('/medicine', medicineRouter);
app.use('/patient', patientRouter);
app.use('/pharmacy', pharmacyRouter);
app.use('/record', recordRouter);
app.use('/medical_story', medicalStoryRouter);
app.use('/auth', authRouter);
app.use('/analysis', analysisRouter);
app.use('/medical_story_medicine', medicalstorymedicineRouter);


app.use(passport.initialize());
require('./middleware/passport')(passport); //passport for jwt

app.use(multer({storage: fileRouter.storageConfig,fileFilter: fileRouter.fileFilter}).single("filedata")); //multer image uploading
app.use("/image", imageRouter);

app.listen(port, () => console.log(`App listening on http://localhost:${port}!`));