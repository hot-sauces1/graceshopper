module.exports = (reqUser, reqSession, ...params) => {
  const filterObj = {}
  if (reqUser) {
    filterObj.userId = reqUser.id
  } else {
    filterObj.sessionId = reqSession.id
  }
  params.forEach(param => {
    let key = Object.keys(param)[0]
    filterObj[key] = param[key]
  })
  return filterObj
}
