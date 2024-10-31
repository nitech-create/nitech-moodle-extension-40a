import { useEffect, useState } from "preact/hooks";

import type { Course } from "~/common/model/course.ts";
import { getCourses } from "~/common/newStorage/courses/index.ts";

export const useCourses = function () {
  const [courses, setCourses] = useState<Course[] | null>(null);

  useEffect(() => {
    getCourses().then(setCourses);
  }, []);

  return courses;
};
