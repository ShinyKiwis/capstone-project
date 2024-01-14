import hasRole from '../lib/hasRole'


const usePageTitle = (url: string) => {
  let pageTitle = ''
  if(url.includes("project")) {
    if(url.includes("create")) return "Create Project"
    const isSpecialized = url.includes("specialized")
    // console.log(isSpecialized)
    pageTitle = `${isSpecialized ? "Specialized": "Capstone"} Project ${hasRole("student") ? "Enrollment": "Management"}`
  }

  return pageTitle
}

export default usePageTitle