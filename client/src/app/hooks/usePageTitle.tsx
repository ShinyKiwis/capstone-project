import useHasRole from '../lib/hasRole'


const usePageTitle = (url: string) => {
  let pageTitle = ''
  const isStudent = useHasRole("student")
  if(url.includes("project")) {
    if(url.includes("create")) return "Create Project"
    const isSpecialized = url.includes("specialized")
    // console.log(isSpecialized)
    pageTitle = `${isSpecialized ? "Specialized": "Capstone"} Project ${isStudent ? "Enrollment": "Management"}`
  }
  else if (url.includes("administrate")){
    if (url.includes('userManage')) return "Users management"
  }

  return pageTitle
}

export default usePageTitle