import { useState } from "react"
import './App.css'
import { NavBottom } from "./shared_pages/NavBottom";
import { ChartPage } from "./pages/ChartPage";
import { FormPage } from "./pages/FormPage";
import { NewFormPage } from "./pages/NewFormPage";

function App() {
  const [page, setPage] = useState("ChartPage");

  return (
    <>
      <NavBottom 
        page={page}
        setPage={(page) => setPage(page)}
      />
      <main className="page-container">
        <FormPage 
            className={"formpage-container " + (page == "FormPage" && "active")}
          />
          <NewFormPage 
            className={"newformpage-container " + (page == "NewFormPage" && "active")}
          />
        <ChartPage 
          className={"chartpage-container " + (page == "ChartPage" && "active")}
        />
      </main>
    </>
  )
}

export default App
