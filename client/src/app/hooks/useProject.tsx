import useSWR from "swr";
import axios from "axios"

const fetcher = async (url:string) => {
  const res = await axios.get(url)
  return res.data
}

const useProject = (id?: string) => {
  const {data} = useSWR(`http://localhost:3500/projects${id ? `/${id}`: ""}`, fetcher)

  return data
}

export default useProject;