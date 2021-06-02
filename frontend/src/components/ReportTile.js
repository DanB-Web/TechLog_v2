import React from 'react';

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
      <div className="report-tile-title">
      <h2>{report.title}</h2>
        <ul>
          {report.tags.map((tag, index) => {
            return <li key={index}>#{tag}</li>
          })}
        </ul>
      </div>
      <div className="report-tile-content">
        <p>{report.shortDesc}</p>
        <button onClick={showReport}>More info</button>
      </div>
    </div>
  )
}

export default ReportTile
