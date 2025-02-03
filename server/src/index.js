import express from 'express';
import cors from 'cors';
// import appointments from './data/appointments';
// import salons from './data/salons';
// import services from './data/services';

const app = express();
// const corsOptions = {
//     origin: '*',
    
// };

// app.use(cors({
//     origin: '*'
// }));
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); // Allow requests from any origin
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.get('/appointments', (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Methods', '*');
    
    return res.json([{
        id: 1,
        salon_id: 1,
        customerName: 'Xavier',
        serviceName: 'Service 1 for Salon 1',
        appointments: 200,
    }, {
        id: 1,
        salon_id: 1,
        customerName: 'Mabel',
        serviceName: 'Service 2 for Salon 1',
        appointments: 200,
    }]);
});

app.listen(4000, () => {
 console.log("I'm running the server at http://localhost:4000");
})