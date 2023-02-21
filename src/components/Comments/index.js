import {Component} from 'react'

import {v4 as uuidv4} from 'uuid'

import CommentItem from '../CommentItem'

import './index.css'

const initialContainerBackgroundClassNames = [
  'amber',
  'blue',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
]

class Comments extends Component {
  state = {
    commentsList: [],
    name: '',
    comment: '',
  }

  onChangeInputName = event => {
    this.setState({
      name: event.target.value,
    })
  }

  onChangeCommentText = event => {
    this.setState({
      comment: event.target.value,
    })
  }

  addComment = event => {
    event.preventDefault()

    const {name, comment} = this.state

    const backgroundClassNames = `first-letter ${
      initialContainerBackgroundClassNames[Math.floor(Math.random() * 7)]
    }`

    const newComment = {
      id: uuidv4(),
      firstLetter: name[0],
      name,
      comment,
      initialCLassName: backgroundClassNames,
      isLiked: false,
      isDeleted: false,
    }

    this.setState(prevState => ({
      commentsList: [...prevState.commentsList, newComment],
      name: '',
      comment: '',
    }))
  }

  toggleisLiked = id => {
    this.setState(prevState => ({
      commentsList: prevState.commentsList.map(eachComment => {
        if (id === eachComment.id) {
          return {...eachComment, isLiked: !eachComment.isLiked}
        }
        return eachComment
      }),
    }))
  }

  onDeleteElement = id => {
    this.setState(prevState => ({
      commentsList: prevState.commentsList.filter(
        eachComment => id !== eachComment.id,
      ),
    }))
  }

  render() {
    const {commentsList, name, comment} = this.state

    return (
      <div className="app-container">
        <div className="comment-container">
          <h1 className="main-heading">Comments</h1>
          <div className="order-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/comments-app/comments-img.png"
              alt="comments"
              className="comment-img"
            />
            <form className="form-container">
              <p className="description">
                Say something about 4.0 Technologies
              </p>
              <input
                type="text"
                className="comment-input"
                placeholder="Your Name"
                onChange={this.onChangeInputName}
                value={name}
              />
              <textarea
                className="comment-text"
                placeholder="Your Comment"
                onChange={this.onChangeCommentText}
                value={comment}
              />
              <button
                type="button"
                className="add-comment-btn"
                onClick={this.addComment}
              >
                Add Comment
              </button>
            </form>
          </div>
          <hr className="horizontal-line" />
          <ul className="comment-list-container">
            <div className="comment-counter-container">
              <span className="comment-counter">{commentsList.length}</span>
              <p className="comment-counter-text">Comments</p>
            </div>
            {commentsList.map(eachComment => (
              <CommentItem
                commentDetails={eachComment}
                toggleisLiked={this.toggleisLiked}
                onDeleteElement={this.onDeleteElement}
                key={eachComment.id}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Comments
