import mongoose from "mongoose";

const clientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  applicationNumber: { type: String, required: true, unique: true },
  dateOfRegistration: { type: Date },
  licenseDate: { type: Date },
  licenseExpiry: { type: Date },
  vehicleClass: { type: String },
  isLicenseHolder: { type: Boolean },
  testDate: { type: Date },
  retestDate: { type: Date },
  payments: {
    total: Number,
    advance: Number,
    middle: Number,
    final: Number,
    advanceDate: Date,
    middleDate: Date,
    finalDate: Date,
  }
});

const Client = mongoose.model("Client", clientSchema);
export default Client;
