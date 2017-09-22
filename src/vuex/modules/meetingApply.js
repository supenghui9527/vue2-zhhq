import * as types from '../mutation-types/meetingApply'

const state = {
}

const getters = {

}

// action
const actions = {
  // 获取我的代办列表
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
  [types.SUBMIT_MEETING] ({rootState}, {Vue, userID, linkman, officeTel, linkmanTel, meetingDate, startTime, endTime, meetingContent, meetingRoomID, isSchedule, peopleCount, rostrumCount, mikeCount, standMike, music, banner, otherService}) {
    Vue.$store.dispatch('axios/act/HTTP', {
      Vue,
      url: rootState.submitMeetingUrl,
      body: {
        userID,
        linkman,
        officeTel,
        linkmanTel,
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
