import React from 'react';

import '../styles/ReportTile.scss'

const ReportTile = ({report, searchTerms, setViewReport, setReportDetails}) => {

  const checkTags = () => {
    let flag = true;
    searchTerms.forEach(searchTerm => {
      if (!report.tags.includes(searchTerm)) flag = false;
    })
    return flag;
  }

  const showReport = () => {
    setReportDetails(report);
    setViewReport(true);
  }

  //ANY REPORT THAT DOESN'T INCLUDE THE SEARCH TERM RETURNS NULL
  if (!checkTags()) {
    return null;
  }

  return (
    <div className="report-tile" style={{animation: 'fadeIn 1s forwards'}}>
      <h2>{report.title}</h2>
      <ul>
        {report.tags.map((tag, index) => {
          return <li key={index}>#{tag}</li>
        })}
      </ul>
      <p>{report.shortDesc}</p>
      <button onClick={showReport}>More info</button>
    </div>
  )
}

export default ReportTile
