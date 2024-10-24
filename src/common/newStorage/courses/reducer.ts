import type { CourseJson } from '~/common/model/course.ts';
import type { CoursesAction } from './actions.ts';

export const coursesReducer = function (
  courses: CourseJson[],
  action: CoursesAction,
): CourseJson[] {
  const { payload } = action;

  if (action.type === 'saveCourses') {
    return payload.courses;
  } else if (action.type === 'mergeAndSaveCourses') {
    return [
      ...courses,
      ...payload.courses,
    ];
  }

  const _: never = action;
  throw Error(`Unknown action type: ${(action as CoursesAction).type}`);
};
