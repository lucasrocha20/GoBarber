import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

// Import Controllers
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import FileController from './app/controllers/FileController';
import ProviderController from './app/controllers/ProviderController';
import AppointmentController from './app/controllers/AppointmentController';
import ScheduleController from './app/controllers/ScheduleController';
import NotificationController from './app/controllers/NotificationController';
import AvailableController from './app/controllers/AvailableController';

// Import Middlewares
import authMiddleware from './app/middlewares/auth';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/users', UserController.store); // Create User
routes.post('/sessions', SessionController.store); // Login User

routes.use(authMiddleware);

routes.put('/users', UserController.update); // Update User

routes.get('/providers', ProviderController.index); // List Users Providers
routes.get('/providers/:providerId/available', AvailableController.index);

// List, Create and Cancel Appointment
routes.get('/appointments', AppointmentController.index);
routes.post('/appointments', AppointmentController.store);
routes.delete('/appointments/:id', AppointmentController.delete);

// List schedules from user provider
routes.get('/schedules', ScheduleController.index);

// List and set read from notifications user provider
routes.get('/notifications', NotificationController.index);
routes.put('/notifications/:id', NotificationController.update);

// Upload avatar user
routes.post('/files', upload.single('file'), FileController.store);

export default routes;
