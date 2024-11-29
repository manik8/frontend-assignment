import React from "react";
import "./ProjectTable.css";

const ProjectTable = ({ projects, currentPage }) => {
  const pageSize = 5;
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedProjects = projects.slice(startIndex, startIndex + pageSize);

  const formatAmount = (amount, currency) => {
    // co
    try {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: currency || "USD", // Default to USD if no currency provided
      }).format(amount);
    } catch (error) {
      // Fallback if the currency code is invalid
      console.error(`Invalid currency code: ${currency}`);
      return `${amount} ${currency}`;
    }
  };
  

  return (
    <div className="table-container">
      <table className="project-table">
        <thead>
          <tr>
            <th>S.No.</th>
            <th>Percentage Funded</th>
            <th>Amount Pledged</th>
          </tr>
        </thead>
        <tbody>
          {paginatedProjects.map((project, index) => (
            <tr key={index} className="table-row">
              <td>{startIndex + index + 1}</td>
              <td>{project["percentage.funded"]}%</td>
              <td>{formatAmount(project["amt.pledged"], project["currency"])}</td>
            </tr>
          ))}
        </tbody>
        <tbody>
          {
            !paginatedProjects ? (
              <p>No data available</p>
            ) : null
          }
        </tbody>
      </table>
    </div>
  );
};

export default ProjectTable;
