// 判断用户权限
export default function filterAuth ({Vue, roleArr, storeArr, authArr}) {
  for (let i = 0; i < storeArr.length; i++) {
    roleArr.map((role) => {
      if (role === storeArr[i]) {
        Vue[authArr[i]] = true
      }
    })
  }
}
