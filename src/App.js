import React, { useState } from "react";
import useFetchProjects from "./hooks/useFetchProjects";
import ProjectTable from "../src/Component/molecules/ProjectTable";
import Pagination from "../src/Component/atoms/Pagination";
import "./App.css";

const API_URL =
  "https://raw.githubusercontent.com/saaslabsco/frontend-assignment/refs/heads/master/frontend-assignment.json";

const App = () => {
  const { data: projects, loading, error } = useFetchProjects(API_URL);
  const [currentPage, setCurrentPage] = useState(1);

  if (loading) return <p className="loading">Loading...</p>;
  if (error) return <p className="error">Error: {error}</p>;

  return (
    <div className="App">
      <header className="hero">
        <h1>SAAS LABS</h1>
        <p>Explore the most funded projects on SAAS LABS!</p>
      </header>
      <ProjectTable projects={projects} currentPage={currentPage} />
      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(projects.length / 5)}
        onPageChange={(page) => setCurrentPage(page)}
      />

    </div>
  );
};

export default App;
