// String must contain at least 1 lowercase letter, 1 uppercase, 1 digit and should be 7 at length

const extractNumberFromString = (str = "") => {
  return str.replace(/[^\d;]/g, "")
}

export const isValidEmail = (email) => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  if (!re.test(email)) {
    return false
  }

  const [name, host] = email.split("@")
  const zone = host.split(".").pop()

  if (name.length >= 64 || host.length > 64 || (zone && zone?.length > 10)) {
    return false
  }

  return true
}

const handleInputValidation = (val, pattern) => {
  if (!pattern || val === "") return true
  if (typeof pattern === "string") {
    const condition = new RegExp(pattern, "g")
    return condition.test(val)
  }
  if (typeof pattern === "object") {
    const conditions = pattern.map(rule => new RegExp(rule, "g"))
    return conditions.map(condition => condition.test(val))
  }
  return true
}

// const handleInputValidation = (val, pattern) => {
//   if (!pattern || val === "") return true
//   if (typeof pattern === "string") {
//     const condition = new RegExp(pattern, "g")
//     return val.replace(pattern, '');
//   }
//   if (typeof pattern === "object") {
//     const conditions = pattern.map(rule => new RegExp(rule, "g"))
//     return conditions.map(condition => condition.test(val))
//   }
//   return true
// }

export { extractNumberFromString, handleInputValidation }
