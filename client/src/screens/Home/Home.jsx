import "./Home.css"
import { useEffect, useState } from "react"
import {getJobs} from "../../services/jobs"

export default function Home() {
  const [jobs, setJobs] = useState([])

  useEffect(() => {
    const fetchJobs = async () => {
      const resp = await getJobs()
      setJobs(resp)
    }
    fetchJobs()
  },[])
  return (
    <div>
      {jobs.map((job) => (
        <>
          <h1>{job.title}</h1>
          <h2>{job.description}</h2>
          <h1>{job.pay}</h1>
        </>
      ))}
    </div>
  )
}
