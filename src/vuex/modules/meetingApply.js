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
  [types.SUBMIT_MEETING] ({rootState}, {Vue, userID, place, linkman, officeTel, linkmanTel, isLift, meetingDate, openTime, startTime, endTime, meetingContent, meetingRoomID, isSchedule, peopleCount, rostrumCount, mikeCount, standMike, music, banner, otherService}) {
    Vue.$store.dispatch('axios/act/HTTP', {
      Vue,
      url: rootState.submitMeetingUrl,
      body: {
        userID,
        place,
        linkman,
        officeTel,
        linkmanTel,
        isLift,
        meetingDate,
        openTime,
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
      Vue.$message(data.message)
      Vue.$router.go(-1)
    })
  },
  // 主任会议审核
  [types.MEETING_INSTRUCTIONS] ({rootState, commit}, {Vue, userID, meetingApplyID, comment, state}) {
    Vue.$store.dispatch('axios/act/HTTP', {
      Vue,
      url: rootState.instructionsUrl,
      body: {
        userID,
        meetingApplyID,
        comment,
        state
      }
    }).then((data) => {
      Vue.$message(data.message)
      Vue.getDetail()
    })
  },
  // 科长会议审核
  [types.MEETING_INSTRUCTIONS1] ({rootState, commit}, {Vue, userID, meetingApplyID, comment, state}) {
    Vue.$store.dispatch('axios/act/HTTP', {
      Vue,
      url: rootState.instructionsUrl1,
      body: {
        userID,
        meetingApplyID,
        comment,
        state
      }
    }).then((data) => {
      Vue.$message(data.message)
      Vue.getDetail()
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
  },
  // 取消会议申请
  [types.CANCEL_MEETING_APPLY] ({rootState, commit}, {Vue, meetingApplyID}) {
    Vue.$store.dispatch('axios/act/HTTP', {
      Vue,
      url: rootState.cancelMeetingApplyUrl,
      body: {
        meetingApplyID
      }
    }).then((data) => {
      Vue.$message(data.message)
      Vue.$emit('changePage', Vue.typeValue, Vue.timeValue, Vue.stateValue, Vue.val)
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
