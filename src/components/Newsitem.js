import React, { Component } from 'react'
import moment from 'moment/moment';

export class Newsitem extends Component {
    render() {
        let {title, description,imageUrl,newsUrl,date,author}= this.props;
        return (
            <div className='my-3'>
                <div className="card">
                    <img src={imageUrl} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{title}...</h5>
                        <p className="card-text">{description}...</p>
                        <p className='card-text'><small>by {author? author: 'unknown'} on {moment(date).format('LLLL')}</small></p>
                        <a href={newsUrl} className="btn btn-dark" target='_blank' rel='noreferrer'>Read more</a>
                    </div>
                </div>
            </div>
        )
    }
}

export default Newsitem
