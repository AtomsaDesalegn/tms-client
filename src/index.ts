import { Temporal } from "@js-temporal/polyfill";
import { EnrollmentStatus, describeEnrollment } from "./models/enrollment.model";

// =========================================================
// 📝 LAB EXERCISE 5: Enrollment Lifecycle State Machine
// =========================================================
console.log("\n--- 🏃‍♂️ Running Exercise 5: Enrollment Lifecycle ---");

// Step 3: Test and Break It
const pending: EnrollmentStatus = {
  status: "PENDING",
  requestedAt: Temporal.Now.instant(),
  studentId: "STU-001",
  courseId: "CRS-101",
};

console.log(describeEnrollment(pending));