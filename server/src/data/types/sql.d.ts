type SalonSQL = {
  id: number;
  name: string;
  location: string;
};

type ServiceSQL = {
  id: number;
  salon_id: number;
  name: stirng;
  price: number;
};

type AppointmentSQL = {
  id: number;
  service_id: number;
  customerName: string;
  appointmentTime: number;
  isDeleted: boolean;
};

type Salon = {
  id: number;
  name: string;
  location: string;
};

type Service = {
  id: number;
  name: string;
  price: number;
  salons: Salon[];
};

type Appointment = {
  id: number;
  customerName: string;
  appointmentTime: number;
  services: Service[];
};
