import * as storage from "./storage.ts";
import { Course } from "../course.ts";

const storageCourseKey = "courses";

const mergeCourseList = function (value: Course[], source: Course[]) {
  const map = new Map<string, Course>();
  source.forEach((course) => map.set(course.fullName, course));
  value.forEach((course) => map.set(course.fullName, course));

  return Array.from(map.values());
};

const getCourses = async function () {
  return await storage.get(storageCourseKey);
};

const storeCourseByMerge = async function (courses: Course[]) {
  await storage.update(storageCourseKey, (prevCourses) => {
    return mergeCourseList(courses, prevCourses);
  });
};

export { getCourses, mergeCourseList, storeCourseByMerge };
