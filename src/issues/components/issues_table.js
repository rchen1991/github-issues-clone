import React, { Component } from 'react';
import IssuesHeader from './issues_header';
import IssuesRow from './issues_row';

import '../styles/issues_table.css';

class IssuesTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      issues: [],
      filteredIssues: [],
      selectedOption: [],
    }
  }

  componentDidMount() {
    fetch('https://api.github.com/repos/airbnb/enzyme/issues')
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      this.setState({
        issues: data,
        filteredIssues: data,
        isLoading: false,
      })
    }, (error) => {
      this.setState({
        isLoading: false,
        error,
      })
    })
  }

  filterIssues(option, title) {
    const { issues, selectedOption } = this.state;
    let filteredArray = [];
    let clonedSelectedOption = selectedOption.slice(0);
    let removeFilter = false;

    if (title === 'Author') {
      filteredArray = issues.filter((issue) => {
        if (issue.user.login === option) {
          if (clonedSelectedOption.indexOf(option) !== -1) {
            removeFilter = true;
          }
          return true;
        }
        return false;
      })
    }

    if (title === 'Labels') {
      filteredArray = issues.filter((issue) => {
        if (issue.labels) {
          let isAvailable = false;
          issue.labels.forEach((label) => {
            if (label.name === option) {
              isAvailable = true;
              if (clonedSelectedOption.indexOf(option) !== -1) {
                removeFilter = true;
              }
            }
          });
          return isAvailable;
        }

        return false;
      });
    }

    if (removeFilter) {
      clonedSelectedOption.splice(clonedSelectedOption.indexOf(option),1);
      this.setState({
        filteredIssues: issues,
        selectedOption: clonedSelectedOption,
      });
    } else {
      clonedSelectedOption = [];
      clonedSelectedOption.push(option);
      this.setState({
        filteredIssues: filteredArray,
        selectedOption: clonedSelectedOption,
      });
    }
  }

  render() {
    const { filteredIssues, issues, isLoading } = this.state;

    if (isLoading) return <div>Loading...</div>

    return (
      <div className="issues-table">
        <IssuesHeader
          issues={issues}
          callback={(option, title) => { this.filterIssues(option, title); }}
        />
        {
          filteredIssues.map((issue) => {
            return (
              <IssuesRow
                url={issue.html_url}
                issueNumber={issue.number}
                username={issue.user.login}
                status={issue.state}
                issueTitle={issue.title}
                labels={issue.labels}
                assignees={issue.assignees}
                createdAt={issue.created_at}
                comments={issue.comments}
                key={issue.id}
              />
            )
          })
        }
      </div>
    );
  }
}

export default IssuesTable;
