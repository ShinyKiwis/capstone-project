import useSWR from "swr";
import axios from "axios"

const fetcher = (url:string) => axios.get(url).then(res => res.data)

const useProject = () => {
  const {data} = useSWR('localhost:3500/projects', fetcher)

  console.log(data)
  return data
}

export default useProject;