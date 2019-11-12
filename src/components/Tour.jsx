import React from 'react';
import '../scss/Tour.scss';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import api from "../utills/api";
//import Interactive from 'react-interactjs';

class Tour extends React.Component{
  constructor(){
    super();
    this.state = {
        loader: true,
        services: null
    }
 }
    componentDidMount(){
      api.get('/service')
            .then(response => {
                this.setState({
                    services: response.data,
                    loader: false,
                })
            })
    }

    render(){

        const settings = {
          dots: true,
          infinite: false,
          speed: 500,
          slidesToShow: 3,
          slidesToScroll: 1,
        };

        const draggableOptions = {
          onmove: event => {
              const target = event.target
              // keep the dragged position in the data-x/data-y attributes
              const x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx
              const y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy

              // translate the element
              target.style.webkitTransform =
              target.style.transform =
                'translate(' + x + 'px, ' + y + 'px)'

              // update the posiion attributes
              target.setAttribute('data-x', x);
              target.setAttribute('data-y', y);
            }
          }

        let {loader, services} = this.state;

        if(loader){
          return(
            <div>loading</div>
          )
        }

        return(
            <section id="tour">
                <div className="container">
                    <header>
                        <div>LOGO</div>
                        <div className="burger">
                            <div className="burger-line"></div>
                            <div className="burger-line"></div>
                            <div className="burger-line"></div>
                        </div>
                    </header>

                    <Slider className="days" {...settings}>
                        <div className="days-slide">Day 1</div>
                        <div className="days-slide">Day 2</div>
                        <div className="days-slide">Day 3</div>
                        <div className="days-slide">Day 4</div>
                    </Slider>

                    <div className="services">
                        <div className="service-cards">
                          {services.map((item, i) => { 
                            let photo = item.featured_image_src;
                            return(
                              //<Interactive draggable draggableOptions={draggableOptions}>
                                <div className="card" key={i} style={{background: "url(" + photo + ") center no-repeat / cover"}}></div>
                              //</Interactive>
                            )
                          })}
                          <div className="card">
                            <h2><a href="/">Title</a></h2>
                            <p>Some article description stuff.</p>
                          </div>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}

export default Tour;