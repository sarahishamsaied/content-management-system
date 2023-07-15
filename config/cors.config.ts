const acceptedOrigins = [
  "http://localhost:4200",
  "http://localhost:3000",
  "https://www.google.com",
  "http://localhost:8080",
];
const corsOptions = {
  origin: (origin: any, callback: any) => {
    if (acceptedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Origin not allowed by CORS"));
    }
  },
  optionsSuccessStatus: 200,
};
// const corsOptions = {
//   origin: "*",
//   optionsSuccessStatus: 200,
// };
export default corsOptions;
