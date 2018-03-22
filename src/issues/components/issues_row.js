import React from 'react';
import '../styles/issues_row.css'

const IssuesRow = ({
  url,
  issueNumber,
  username,
  status,
  issueTitle,
  labels,
  assignees,
  createdAt,
  comments,
}) => {
  const labelSpan = labels.map((label) => {
    const spanStyle = {
      backgroundColor: '#'+label.color,
      color: 'white',
      marginRight: 5,
    }
    return <span style={spanStyle} key={label.id}>{label.name}</span>
  })

  const assigneeThumbnails = assignees.map((assignee) => {
    return <img src={assignee.avatar_url} height="20" width="20" alt="assignee" key={assignee.id}/>
  })

  return (
    <div className="issue-row">
      <a href={url}>
        <span className={status} />
        <div className="row-data-container">
          <div className="row-title">
            <span>{issueTitle} </span>
            {labelSpan}
          </div>
          <div className="row-username">
            <span>#{issueNumber} </span>
            <span>Opened {new Date(createdAt).toDateString()} by </span>
            <span>{username} </span>
          </div>
        </div>
        <span className="row-comments">{comments} comments</span>
        <span className="row-comments">{assigneeThumbnails}</span>
      </a>
    </div>
  )
}

export default IssuesRow
