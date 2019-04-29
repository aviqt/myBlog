import request from '../util/request.js'

export const state = () => ({
  loading: false,
  adminUserData: []
})
export const mutations = {
  CHANGE_LOADING(state) {
    state.loading = !state.loading
  },
  SET_USERDATA(state, val) {
    if(val){
      window.localStorage.setItem('adminUserData', JSON.stringify(val))
      state.adminUserData = val
    }else{
      window.localStorage.removeItem('adminUserData')
    }
  },
}
export const actions = {
  // 登录
  LOGIN({ commit }, { data, cb }) {
    request.$post('/api/user/login', data, (response) => {
      commit('SET_USERDATA', response.data);
      cb && cb(response)
    })
  },
  // 用户退出
  LOGOUT({ commit }, { data, cb }) {
    request.$post('/api/user/logout', data, (response) => {
      commit('SET_USERDATA')
      cb && cb(response)
    })
  },
  // 运维查询所有年级
  GET_ALL_GRADES({ commit }, { data, cb }) {
    request.$get('/api/admin/allGrades', data, (response) => {
      cb && cb(response)
    })
  },
  // 添加年级
  ADD_GRADE({ commit }, { data, cb }) {
    request.$post('/api/admin/addGrade', data, (response) => {
      cb && cb(response)
    })
  },
  // 添加班级
  ADD_CLASS({ commit }, { data, cb }) {
    request.$post('/api/admin/addClass', data, (response) => {
      cb && cb(response)
    })
  },
  // 添加班级
  EDIT_CLASS({ commit }, { data, cb }) {
    request.$post('/api/admin/editClass', data, (response) => {
      cb && cb(response)
    })
  },
  // 运维根据班级id查询学生
  GET_STUDENT_BY_CLASSID({ commit }, { data, cb }) {
    request.$get('/api/admin/getStudentByClassId', data, (response) => {
      cb && cb(response)
    })
  },
  // 运维查询所有老师
  GET_ALL_TEACHER({ commit }, { data, cb }) {
    request.$get('/api/admin/allTeacher', data, (response) => {
      cb && cb(response)
    })
  },
  // 运维根据班级id查询老师
  GET_TEACHER_BY_CLASSID({ commit }, { data, cb }) {
    request.$get('/api/admin/getTeacherByClassId', data, (response) => {
      cb && cb(response)
    })
  },
  // 运维删除教师
  DELETE_TEACHER({ commit }, { data, cb }) {
    request.$post('/api/admin/deleteTeacher', data, (response) => {
      cb && cb(response)
    })
  },
  // 运维修改老师
  EDIT_TEACHER({ commit }, { data, cb }) {
    request.$post('/api/admin/editTeacher', data, (response) => {
      cb && cb(response)
    })
  },
  // 运维增加老师
  ADD_TEACHER({ commit }, { data, cb }) {
    request.$post('/api/admin/addTeacher', data, (response) => {
      cb && cb(response)
    })
  },
  // 运维绑定教师和班级
  BIND_TEACHER_AND_CLASS({ commit }, { data, cb }) {
    request.$post('/api/admin/bindTeacherAndClass', data, (response) => {
      cb && cb(response)
    })
  },
  // 运维导入教师excel数据
  IMPORT_TEACHER({ commit }, { data, cb }) {
    request.$post('/api/admin/importTeacher', data, (response) => {
      cb && cb(response)
    })
  },
  // 运维导入学生excel模板数据
  IMPORT_STUDENT({ commit }, { data, cb }) {
    request.$post('/api/admin/importStudent', data, (response) => {
      cb && cb(response)
    })
  },
  // 添加学生
  ADD_STUDENT({ commit }, { data, cb }) {
    request.$post('/api/admin/addStudent', data, (response) => {
      cb && cb(response)
    })
  },
  // 编辑单个学生
  EDIT_STUDENT({ commit }, { data, cb }) {
    request.$post('/api/admin/editStudent', data, (response) => {
      cb && cb(response)
    })
  },
  // 删除学生
  DELETE_STUDENT({ commit }, { data, cb }) {
    request.$post('/api/admin/deleteStudent', data, (response) => {
      cb && cb(response)
    })
  },
  // 运维获取一个班级下面所有分组信息
  ALL_GROUP({ commit }, { data, cb }) {
    request.$get('/api/admin/allGroup', data, (response) => {
      cb && cb(response)
    })
  },
  // 运维获取未分组学生信息
  UNGROUPED_STUDENT({ commit }, { data, cb }) {
    request.$get('/api/admin/getUnGroupedStudent', data, (response) => {
      cb && cb(response)
    })
  },
  // 运维重置分组
  RESET_GROUP({ commit }, { data, cb }) {
    request.$post('/api/admin/resetGroup', data, (response) => {
      cb && cb(response)
    })
  },
  // 运维清空一个小组
  CLEAR_ONE_GROUP({ commit }, { data, cb }) {
    request.$post('/api/admin/clearOneGroup', data, (response) => {
      cb && cb(response)
    })
  },
  // 运维给小组分配学生
  GROUP_STUDENT({ commit }, { data, cb }) {
    request.$post('/api/admin/groupStudent', data, (response) => {
      cb && cb(response)
    })
  },
  // 运维获取所有实验室
  GET_ALL_LABS({ commit }, { data, cb }) {
    request.$get('/api/admin/getAllLabs', data, (response) => {
      cb && cb(response)
    })
  },
  // 运维增加实验室
  ADD_LAB({ commit }, { data, cb }) {
    request.$post('/api/admin/addLab', data, (response) => {
      cb && cb(response)
    })
  },
  // 运维编辑实验室
  EDIT_LAB({ commit }, { data, cb }) {
    request.$post('/api/admin/editLab', data, (response) => {
      cb && cb(response)
    })
  },
}
