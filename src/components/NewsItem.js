import React, { Component } from 'react'

export class NewsItem extends Component {
   
  render() {
    let {title,description,imageUrl,newsUrl} = this.props;
    return (
      <div className ="container">
        <div className="card" >
  <img src={!imageUrl?"https://www.reuters.com/resizer/v6e3QgvKWC2y-1nCrtm9aLNuV9M=/1200x628/smart/filters:quality(80)/cloudfront-us-east-2.images.arcpublishing.com/reuters/ESB7X3WPYBNETOE5WPQ6BJLA5A.jpg":imageUrl} className="card-img-top" alt="..."/>
  <div className="card-body">
    <h5 className="card-title">{title}</h5>
    <p className="card-text">{description}</p>
    <a href={newsUrl} target="_blank" className="btn btn-sm btn-dark">read More</a>
  </div>
</div>
      </div>
    )
  }
}

export default NewsItem
