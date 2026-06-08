import { Temporal } from "@js-temporal/polyfill";

export interface Course {
    readonly id: string;
    title: string;
    capacity: number;
    startDate?: Temporal.PlainDate;
}

export type CourseStatus =
    | { status: "DRAFT"; createdBy: string; createdAt: Temporal.Instant }
    | { status: "PUBLISHED"; publishedAt: Temporal.Instant; syllabus: string }
    | {
        status: "ACTIVE";
        enrolledCount: number;
        startDate: Temporal.PlainDate;
    }
    | {
        status: "ARCHIVED";
        archivedAt: Temporal.Instant;
        finalEnrollmentCount: number;
    }
    | { status: "CANCELLED"; reason: string; cancelledAt: Temporal.Instant };

    export function describeCourse(course: CourseStatus): string {
    switch (course.status) {
        case "DRAFT":
            return `Course is a draft created by ${course.createdBy} on ${course.createdAt.toString()}`;
        
        case "PUBLISHED":
            return `Course published on ${course.publishedAt.toString()}. Syllabus snippet: ${course.syllabus.substring(0, 30)}...`;
        
        case "ACTIVE":
            return `Course is active with ${course.enrolledCount} students enrolled. Started on ${course.startDate.toString()}`;
        
        case "ARCHIVED":
            return `Course archived on ${course.archivedAt.toString()} with a final count of ${course.finalEnrollmentCount} students`;
        
        case "CANCELLED":
            return `Course was CANCELLED on ${course.cancelledAt.toString()}. Reason: ${course.reason}`;
        
        default: {
            // 🛡️ Safe guard compile-time check
            const _exhaustiveCheck: never = course;
            throw new Error(`Unhandled course status: ${JSON.stringify(_exhaustiveCheck)}`);
        }
    }
}