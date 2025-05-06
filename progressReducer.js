const initialState = {
    completedLessons: {}  };
  
  export function progressReducer(state = initialState, action) {
    switch (action.type) {
      case 'LESSON_COMPLETED':
        const { courseId, lessonId } = action.payload;
        const completed = state.completedLessons[courseId] || [];
        if (completed.includes(lessonId)) return state;
        return {
          ...state,
          completedLessons: {
            ...state.completedLessons,
            [courseId]: [...completed, lessonId]
          }
        };
      default:
        return state;
    }
  }
  
  export const markLessonCompleted = (courseId, lessonId) => ({
    type: 'LESSON_COMPLETED',
    payload: { courseId, lessonId }
  });
  