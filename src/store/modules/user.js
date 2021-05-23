const user = {
  state: {
    currentUserProfile: {},
    isLogin: false
  },
  mutations: {
    updateCurrentUserProfile(state, userProfile) {
      console.log('user-state')
      state.currentUserProfile = userProfile
    },
    toggleIsLogin(state, isLogin) {
      state.isLogin = typeof isLogin === 'undefined' ? !state.isLogin : isLogin
    },
    reset(state) {
      Object.assign(state, {
        currentUserProfile: {},
        isLogin: false
      })
    }
  },
  actions: {
    // login(context, userID) {
    //   tim
    //     .login({
    //       userID,
    //       userSig: window.genTestUserSig(userID).userSig
    //     })
    //     .then(() => {
    //       context.commit('toggleIsLogin', true)
    //       context.commit('startComputeCurrent')
    //       window.$message({ type: 'success', message: '登录成功' })
    //     })
    //     .catch(imError => {
    //       if (imError.code === 2000) {
    //         window.$message.error(imError.message + ', 请检查是否正确填写了 SDKAPPID')
    //       } else {
    //         window.$message.error(imError.message)
    //       }
    //     })
    // },
    logout(context) {

    }
  }
}

export default user
