import { useState } from "react"
import './App.css'
import { NavBottom } from "./shared_pages/NavBottom";
import { ChartPage } from "./pages/ChartPage";
import { FormPage } from "./pages/FormPage";
import { NewFormPage } from "./pages/NewFormPage";
import { AdminPage } from "./pages/AdminPage";
import { useQuery } from "react-query";
import { Question } from "./types/types";
import { GetAllQuestions } from "./util/Http";

function App() {
  const [page, setPage] = useState("ChartPage");

  const { data, isLoading, isError, error, refetch } = useQuery<Array<Question>, Error>({
    queryKey: ['query'],
    queryFn: () => GetAllQuestions()
  });

  return (
    <>
      <NavBottom 
        page={page}
        setPage={(page) => setPage(page)}
      />
      <main className="page-container">
        <FormPage 
            className={"formpage-container " + (page == "FormPage" && "active")}
            questionData={data}
            isLoading={isLoading}
            isError={isError}
            error={error}
            refetch={refetch}
          />
        <NewFormPage 
          className={"newformpage-container " + (page == "NewFormPage" && "active")}
          questionData={data}
          isLoading={isLoading}
          isError={isError}
          error={error}
          refetch={refetch}
        />
        <ChartPage 
          className={"chartpage-container " + (page == "ChartPage" && "active")}
          questionData={data}
          isLoading={isLoading}
          isError={isError}
          error={error}
          refetch={refetch}
        />
        <AdminPage 
          className={"adminpage-container " + (page == "AdminPage" && "active")}
          questionData={data}
          isLoading={isLoading}
          isError={isError}
          error={error}
          refetch={refetch}
        />
      </main>
    </>
  )
}

export default App
