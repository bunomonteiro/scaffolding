import dayjs from "dayjs";

export default {
  // eslint-disable-next-line no-unused-vars
  install(app, options) {
    app.provide("dayjs", dayjs);
  },
};
