const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
const formatTime = str => {
  return str.substr(0, 10) + ' ' + str.substr(11, 5);
}
module.exports = {
  formatTime: formatTime
}
