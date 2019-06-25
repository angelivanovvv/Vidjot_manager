if (process.env.NODE_ENV === "production") {
  module.exports = {
    mongoURL:
      "mongodb+srv://AngelIvanov:qazwsxedc@vidjot-dev-ujdjd.mongodb.net/test?retryWrites=true&w=majority"
  };
} else {
  module.exports = {
    mongoURL: "mongodb://localhost/vidjod-dev"
  };
}
