export const getItem = name => {
  // data可能不是JSON格式字符串
  const data = localStorage.getItem(name)
  try {
    // 尝试把data转为js对象
    return JSON.parse(data)
  } catch (error) {
    // 原样返回
    return data
  }
}
export const setItem = (name, value) => {
  if (typeof value === 'object') {
    value = JSON.stringify(value)
  }
  localStorage.setItem(name, value)
}
export const removeItem = name => {
  localStorage.removeItem(name)
}
