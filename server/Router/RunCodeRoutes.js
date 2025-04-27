import {Router} from 'express'
import GetCode from '../Controllers/Compile/GetCode.js';
import AIHelper from '../Controllers/Compile/Aihelper.js';

const ProgrammingRoutes = Router();

ProgrammingRoutes.post("/run",GetCode);
ProgrammingRoutes.post("/ai_helper",AIHelper);

export default ProgrammingRoutes;