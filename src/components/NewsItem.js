import React, { Component } from 'react'

export default class NewsItem extends Component {
    constructor(){
        super();
        console.log("Farzi ka constructor");
    }
    render() {
        let {title,description,imageUrl,newsUrl,author,date,source} = this.props;
        return (
            <div>
                <div className="my-box my-3">
                     <div className="card">
                     <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"  style = {{zIndex : '1'}}>
                                    {source}
                                </span>
                         <img className="card-img-top" src={imageUrl} alt="..." />
                         <div className="card-body">
                                <h5 className="card-title">{title} </h5>
                                <p className="card-text">{description}...</p>
                                <p className="card-text"><small className="text-muted">By {author?author:"Unknown"} on {new Date(date).toGMTString()} </small></p>
                                 <a rel="noreferrer" target = "_blank"  href={newsUrl} className="btn btn-sm btn-dark">Read More</a>
                          </div>
                    </div>
                </div>
            </div>
        )
    }
}
