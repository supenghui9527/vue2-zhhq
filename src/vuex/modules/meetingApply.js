import * as types from '../mutation-types/meetingApply'

const state = {
}

const getters = {

}

// action
const actions = {
  // 获取会议室列表
  [types.GET_MEETING_ROOM] ({rootState, commit}, {Vue}) {
    Vue.$store.dispatch('axios/act/HTTP', {
      Vue,
      url: rootState.getMeetingRoomUrl,
      body: {
      }
    }).then((data) => {
      Vue.meetingRooms = data.data
    })
  },
  // 提交会议申请
  [types.SUBMIT_MEETING] ({rootState}, {Vue, userID, linkman, officeTel, linkmanTel, isLift, meetingDate, startTime, endTime, meetingContent, meetingRoomID, isSchedule, peopleCount, rostrumCount, mikeCount, standMike, music, banner, otherService}) {
    Vue.$store.dispatch('axios/act/HTTP', {
      Vue,
      url: rootState.submitMeetingUrl,
      body: {
        userID,
        linkman,
        officeTel,
        linkmanTel,
        isLift,
        meetingDate,
        startTime,
        endTime,
        meetingContent,
        meetingRoomID,
        isSchedule,
        peopleCount,
        rostrumCount,
        mikeCount,
        standMike,
        music,
        banner,
        otherService
      }
    }).then((data) => {
      if (data.state === 1) {
        Vue.$message('提交成功')
      }
    })
  },
  // 会议批示
  [types.MEETING_INSTRUCTIONS] ({rootState, commit}, {Vue, userID, meetingApplyID, comment}) {
    Vue.$store.dispatch('axios/act/HTTP', {
      Vue,
      url: rootState.instructionsUrl,
      body: {
        userID,
        meetingApplyID,
        comment
      }
    }).then((data) => {
      Vue.$message(data.message)
    })
  },
  // 获取分配列表
  [types.GET_ALLOT] ({rootState, commit}, {Vue}) {
    Vue.$store.dispatch('axios/act/HTTP', {
      Vue,
      url: rootState.getAllotUrl,
      body: {
      }
    }).then((data) => {
      Vue.allot = data.data
    })
  },
  // 提交分配人员
  [types.SUBMIT_ALLOT] ({rootState, commit}, {Vue, meetingApplyID, userID, comment, serverIDs, state}) {
    Vue.$store.dispatch('axios/act/HTTP', {
      Vue,
      url: rootState.submitAllotUrl,
      body: {
        meetingApplyID,
        userID,
        comment,
        serverIDs,
        state
      }
    }).then((data) => {
      Vue.$message(data.message)
      Vue.allot = null
      Vue.getDetail()
    })
  }
}

const mutations = {

}

export default {
  state,
  getters,
  actions,
  mutations
}
