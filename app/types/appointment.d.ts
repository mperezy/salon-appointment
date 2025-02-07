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

type AppointmentForm = {
  service_id: number;
} & Pick<Appointment, 'customerName' | 'appointmentTime'>;

type AppointmentUpdateForm = { id: number } & AppointmentForm;
