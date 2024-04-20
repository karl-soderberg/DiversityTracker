import { useState } from "react"
import { NavBottom } from "./shared_pages/NavBottom";

function App() {
  const [page, setPage] = useState("chart-home");

  return (
    <>
      <NavBottom 
        page={page}
        setPage={(page) => setPage(page)}
      />
    </>
  )
}

export default App
