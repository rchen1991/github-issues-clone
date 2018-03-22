import React from 'react';
import Dropdown from '../../shared/components/dropdown';

import '../styles/issues_header.css';

const IssuesHeader = ({
  issues,
  callback,
}) => {
  let userArray = [];
  let labelsArray = [];

  issues.forEach((issue) => {
    if (issue.user && issue.user.login) {
      if (userArray.indexOf(issue.user.login) === -1) {
        userArray.push(issue.user.login);
      }
    }

    if (issue.labels) {
      issue.labels.forEach((label) => {
        if (labelsArray.indexOf(label.name) === -1) {
          labelsArray.push(label.name);
        }
      })
    }
  });

  return (
    <div className="issues-header">
      <Dropdown
        title="Author"
        hasFilter
        options={userArray}
        callback={callback}
      />
      <Dropdown
        title="Labels"
        hasFilter
        options={labelsArray}
        callback={callback}
      />
      <Dropdown
        title="Milestones"
        hasFilter
      />
      <Dropdown
        title="Assignees"
        hasFilter
      />
      <Dropdown
        title="Sort"
        hasFilter={false}
      />
    </div>

  )
}

export default IssuesHeader
