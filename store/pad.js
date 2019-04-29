import request from '../util/request.js'

export const state = () => ({
  
})
export const mutations = {
  
}
export const actions = {
  // 登录
  LOGIN({ commit }, { data, cb }) {
    request.$post('/api/manager/login', data, (response) => {
      cb && cb(response)
    })
  },
  // 获取单个考场信息，包括位置
  WORKER_ROOMINFO({ commit }, { data, cb }) {
    request.$post('/api/manager/worker/roomInfo', data, (response) => {
      cb && cb(response)
    })
  },
  // 监考老师查看考场情况
  WATCHER_ROOMINFO({ commit }, { data, cb }) {
    request.$post('/api/manager/watcher/roomInfo', data, (response) => {
      cb && cb(response)
    })
  },
  // 绑定一台设备和考场座位
  BIND_PAD_SEAT({ commit }, { data, cb }) {
    request.$post('/api/admin/bindstudent', data, (response) => {
      cb && cb(response)
    })
  },
  // 验证ipad是否已绑定
  IS_PAD_VALID({ commit }, { data, cb }) {
    request.$get('/api/student/isPadValid', data, (response) => {
      cb && cb(response)
    })
  },
  // 设备绑定信息
  BINDINFO({ commit }, { data, cb }) {
    request.$get('/api/admin/bindInfo', data, (response) => {
      cb && cb(response)
    })
  },
  // 验证ipad是否已绑定
  STUDENT_CONFIRM({ commit }, { data, cb }) {
    request.$post('/api/student/confirm', data, (response) => {
      cb && cb(response)
    })
  },
  // 学生提交试卷
  SUBMIT_PAPER({ commit }, { data, cb }) {
    request.$post('/api/student/submitPaper', data, (response) => {
      cb && cb(response)
    })
  },
  // 教师监考查看实验室信息
  TEACGER_GET_LABINFO({ commit }, { data, cb }) {
    request.$get('/api/teacher/getLabInfo', data, (response) => {
      cb && cb(response)
    })
  },
  // 教师监考查看实验室信息
  TEACGER_GET_CLOSE_LABINFO({ commit }, { data, cb }) {
    request.$get('/api/teacher/getCloseLabInfo', data, (response) => {
      cb && cb(response)
    })
  },
  // 根据实验室id获取座位信息
  GET_SEATS_BY_LABID({ commit }, { data, cb }) {
    request.$get('/api/admin/getSeatsByLabId', data, (response) => {
      cb && cb(response)
    })
  },
  // 获取服务器当前时间
  GET_SERVER_CURRENTDATE({ commit }, { data, cb }) {
    request.$get('/api/student/current', data, (response) => {
      cb && cb(response)
    })
  },
  
}
