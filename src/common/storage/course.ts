import * as storage from './storage.ts';
import { Course } from '../course.ts';

const storageCourseKey = 'courses';

const getCourses = async function () {
  return await storage.get(storageCourseKey);
};

const storeCourseByMerge = async function (courses: Course[]) {
  await storage.update(storageCourseKey, (prevCourses) => {
    const map = new Map<string, Course>();
    prevCourses.forEach((course) => map.set(course.fullName, course));
    courses.forEach((course) => map.set(course.fullName, course));

    return Array.from(map.values());
  });
};

export { getCourses, storeCourseByMerge };
