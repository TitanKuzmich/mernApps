export const handleInputValidation = (val, pattern) => {
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
