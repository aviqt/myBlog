import request from '../util/request.js'

export const state = () => ({
})
export const mutations = {
}
export const actions = {
  // 教师获取所有实验室信息
  GET_LABS({ commit }, { data, cb }) {
    request.$get('/api/teacher/getLabs', data, (response) => {
      cb && cb(response)
    })
  },
  // 教师获取课程信息
  GET_COURSES({ commit }, { data, cb }) {
    request.$get('/api/teacher/getCourses', data, (response) => {
      cb && cb(response)
    })
  },
  // 教师查询所有年级
  GET_ALL_GRADES({ commit }, { data, cb }) {
    request.$get('/api/teacher/allGrades', data, (response) => {
      cb && cb(response)
    })
  },
  // 教师根据年级id查询班级
  GET_CLASS({ commit }, { data, cb }) {
    request.$get('/api/teacher/getClass', data, (response) => {
      cb && cb(response)
    })
  },
  // 教师获取自己执教班级信息
  GET_CLASS_BY_TEACHER({ commit }, { data, cb }) {
    request.$get('/api/teacher/getClassByTeacher', data, (response) => {
      cb && cb(response)
    })
  },
  // 教师安排实验
  ADD_EXPERIMENT({ commit }, { data, cb }) {
    request.$post('/api/teacher/addExperimentSchedule', data, (response) => {
      cb && cb(response)
    })
  },
  // 教师点击开始上课
  START_INVIGILATE({ commit }, { data, cb }) {
    request.$get('/api/teacher/start', data, (response) => {
      cb && cb(response)
    })
  },
  // 教师查看一个班级学生
  GET_STUDENT_BY_CLASSID({ commit }, { data, cb }) {
    request.$get('/api/teacher/getStudentByClassId', data, (response) => {
      cb && cb(response)
    })
  },
  // 教师评卷查看所有课程列表
  TRAIN_SCHEDULE_LIST({ commit }, { data, cb }) {
    request.$get('/api/teacher/trainScheduleList', data, (response) => {
      cb && cb(response)
    })
  },
  // 教师评卷查看未开始课程列表
  UNDONE_SCHEDULE_LIST({ commit }, { data, cb }) {
    request.$get('/api/teacher/getUnDoneScheduleList', data, (response) => {
      cb && cb(response)
    })
  },
  // 教师评卷 
  GET_NEXT_EXAM({ commit }, { data, cb }) {
    request.$get('/api/teacher/getNextStudentExam', data, (response) => {
      cb && cb(response)
    })
  },
  // 教师查看某个实验安排成绩 
  GET_SCHEDULE_SCORE({ commit }, { data, cb }) {
    request.$get('/api/teacher/getScheduleScoreDetail', data, (response) => {
      cb && cb(response)
    })
  },
  // 教师查看某个学生实验 
  GET_STUDENT_EXAM({ commit }, { data, cb }) {
    request.$get('/api/teacher/getStudentExamDetail', data, (response) => {
      cb && cb(response)
    })
  },
  // 教师提交评卷 
  SUBMIT_MARK({ commit }, { data, cb }) {
    request.$post('/api/teacher/submitMark', data, (response) => {
      cb && cb(response)
    })
  },
}
