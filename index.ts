import { Temporal } from "@js-temporal/polyfill";
import { Student, isStudent, parseStudent } from "./models/student.model";

console.log("=============================================");
console.log("   EXERCISE 3: SAFE API PARSING SANDBOX     ");
console.log("=============================================\n");

// 1. Your existing safe test object using the Temporal Polyfill
const student: Student = {
  id: "STU-001",
  name: "Hana Tadesse",
  enrollmentDate: Temporal.Now.instant().toString(), // Stored as a string timestamp
};

console.log("--- Initial Safe Student Check ---");
console.log(`Student Profile: ${student.name} (${student.id})`);
console.log(`Enrolled On: ${student.enrollmentDate}`);
console.log(`GPA Status: ${student.gpa?.toFixed(2) ?? "Not yet graded"}\n`);


// =========================================================================
// PART A: TESTING THE TYPE GUARD (isStudent)
// =========================================================================
console.log("--- Part A: Type Guard Verification ---");

function processStudent(raw: unknown) {
  if (isStudent(raw)) {
    const gpaDisplay = raw.gpa?.toFixed(2) ?? "Not yet graded";
    console.log(`✅ Success: Student "${raw.name}" parsed. GPA: ${gpaDisplay}`);
  } else {
    console.error("❌ Error: Invalid student data payload received!");
  }
}

// Test Call 1: Valid object structure (Should succeed)
processStudent({ id: "STU-002", name: "Hana", gpa: 3.7 });

// Test Call 2: Broken primitive data (Should fail gracefully without crashing)
processStudent(42);


// =========================================================================
// PART B: TESTING THE PARSE FUNCTION (parseStudent)
// =========================================================================
console.log("\n--- Part B: Throwing Parse Function Verification ---");

try {
  // Test Call 3: Valid object parsing
  const validParsed = parseStudent({ id: "STU-003", name: "Dawit" });
  console.log("✅ Parsed Object successfully:", validParsed);

  // Test Call 4: Dangerous broken object structure (Will deliberately throw an error)
  console.log("\nFeeding corrupt data into parseStudent()...");
  parseStudent({ id: 42, name: "Test Fail" }); 
} catch (error: any) {
  console.error(`💥 Caught expected runtime exception: ${error.message}`);
}

console.log("\n=============================================");