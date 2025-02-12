type UseAppointmentsResult = {
  appointments?: Appointment[];
  loading: boolean;
  // eslint-disable  @typescript-eslint/no-explicit-any
  refetch: (() => Promise<void>) | ((variables?: Partial<never>) => Promise<never>);
};

type UseCreateAppointmentResult = {
  appointment?: AppointmentSQL;
  loading: boolean;
  mutation: (data: AppointmentForm) => Promise<AppointmentSQL>;
};

type UseUpdateAppointmentResult = {
  appointment?: AppointmentSQL;
  loading: boolean;
  mutation: (data: AppointmentUpdateForm) => Promise<AppointmentSQL>;
};

type UseDeleteAppointmentResult = {
  appointment?: AppointmentSQL;
  loading: boolean;
  mutation: (id: number) => Promise<AppointmentSQL>;
};

type UseServicesResult = {
  services?: Service[];
  loading: boolean;
};
