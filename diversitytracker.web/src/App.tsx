import { useState } from "react"
import './App.css'
import { NavBottom } from "./shared_pages/NavBottom";
import { ChartPage } from "./pages/ChartPage";
import { FormPage } from "./pages/FormPage";
import { NewFormPage } from "./pages/NewFormPage";
import { AdminPage } from "./pages/AdminPage";
import { useQuery } from "react-query";
import { APIFormsResponse, Question } from "./types/types";
import { GetAllQuestions, GetFormsData } from "./util/Http";

function App() {
  const [page, setPage] = useState("ChartPage");

  const { data, isLoading, isError, error, refetch } = useQuery<Array<Question>, Error>({
    queryKey: ['getQuestions'],
    queryFn: () => GetAllQuestions()
  });

  const { data: formsData, isLoading: isLoadingForms, isError: isErrorForms, error: errorForms } = useQuery<APIFormsResponse>({
    queryKey: ['getFormData'],
    queryFn: () => GetFormsData()
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
          formsData={formsData}
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
