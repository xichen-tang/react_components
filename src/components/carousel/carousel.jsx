import React, { Component } from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import './carousel.css';

export default class Carousel extends Component {
  items = this.props.items;
  constructor(props) {
    super(props);
    this.state = {
      currentIndex: 1,
      itemsInSlide: 1,
      responsive: { 0: { items: 7 }, 1024: { items: 10 } },
    };

    this.Carousel = React.createRef();
  }

  handleWheelEvent = e => {
    e.persist();
    let nextIndex =
      e.deltaY > 0
        ? this.state.currentIndex + 1
        : this.state.currentIndex - 1;

    if (nextIndex > this.items.length) return;
    if (nextIndex < 1) return;

    const center = Math.floor(this.state.itemsInSlide / 2);

    if (this.state.currentIndex >= this.state.itemsInSlide - 1) {
      this.setState({ currentIndex: nextIndex }, () => {
        this.Carousel.slideTo(this.state.currentIndex - center);
      });
    } else
      this.setState({ currentIndex: nextIndex }, () => {
        this.Carousel.slideTo(0);
      });
  };

  handleOnSlideChange = event => {
    const { itemsInSlide } = event;
    this.setState({ itemsInSlide });
  };

  slideToIndex = i => {
    const center = Math.floor(this.state.itemsInSlide / 2);

    if (i >= center) {
      this.setState({ currentIndex: i }, () => {
        this.Carousel.slideTo(i - center);
      });
    } else
      this.setState({ currentIndex: i }, () => {
        this.Carousel.slideTo(0);
      });
  };

  render() {
    const { responsive, currentIndex } = this.state;
    const indexOfArray = i => this.items.indexOf(i) + 1;
    const styleSelectedItem = i =>
      this.state.currentIndex === i ? 'selected' : 'normal';

    const styleSelectedTitle = i =>
      this.state.currentIndex === i ? 'the' : 'none';

    const carouselItems = this.items.map(i => (
      <div className="grid-items">
        <span className={styleSelectedTitle(indexOfArray(i))}>
          THE
        </span>

        <span
          key={i}
          className={styleSelectedItem(indexOfArray(i))}
          onClick={() => {
            this.slideToIndex(indexOfArray(i));
          }}
        >
          {i}
        </span>
      </div>
    ));

    return (
      <div
        className="carousel"
        onWheel={e => this.handleWheelEvent(e)}
      >
        <AliceCarousel
          ref={el => (this.Carousel = el)}
          infinite={false}
          items={carouselItems}
          responsive={responsive}
          slideToIndex={currentIndex + 1}
          dotsDisabled={true}
          buttonsDisabled={true}
          onInitialized={this.handleOnSlideChange}
          onResized={this.handleOnSlideChange}
        ></AliceCarousel>
      </div>
    );
  }
}
