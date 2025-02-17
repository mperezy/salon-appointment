const DELAY_ENABLED = process.env.DELAY_ENABLED === 'true';

export default (time: number = 500) =>
  new Promise((resolve) => setTimeout(resolve, DELAY_ENABLED ? time : 0));
