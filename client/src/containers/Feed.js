import React, { Component } from 'react';
import Axios from 'axios';
import "../style/Feed.css";
  
export default class Feed extends Component {
    constructor(props) {
        super(props);
        this.state = {
          mems: []
        };
    }

    componentDidMount() {
        Axios.get('/tests/feed')
        .then((res) => {
            this.setState({ mems: res.data });
            console.log("Mems", this.state.mems);
        })
    }

    render() {
        const mems = this.state.mems;
        const memsList = mems.map((mem) =>
            <div key={mem._id}>                
                {mem.captions.map(caption =>
                <div key={caption._id}>
                    <img alt="" className="photo" key={mem._id} src={mem.url} />
                    <br/><br/>
                    <span>{caption.userName}:</span>
                    <br/>
                    <span>{caption.caption}</span>
                    <br/>
                    <span>Likes: {caption.likes}</span>
                    <br/><br/>                    
                </div>
                )}
            </div>
        );
        
        return (
            <div className="gallery">
                <ul>{memsList}</ul>              
            </div>
        );
    }
}
