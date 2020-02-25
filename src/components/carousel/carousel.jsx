import React, { Component, createRef } from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import './carousel.css';

export default class Carousel extends Component {
  state = {
    currentIndex: 0,
    itemsInSlide: 1,
    responsive: { 0: { items: 7 }, 1024: { items: 10 } },
  };

  items = this.props.items;

  carouselRef = createRef();

  slideToIndex = i => {
    const center = Math.floor(this.state.itemsInSlide / 2);

    if (i >= center) {
      this.setState({ currentIndex: i }, () => {
        this.carouselRef.current.slideTo(i - center);
      });
    } else
      this.setState({ currentIndex: i }, () => {
        this.carouselRef.current.slideTo(0);
      });
  };

  handleWheelEvent = e => {
    e.persist();

    const nextIndex =
      e.deltaY > 0
        ? this.state.currentIndex + 1
        : this.state.currentIndex - 1;

    const center = Math.floor(this.state.itemsInSlide / 2);

    if (nextIndex >= 0 && nextIndex < this.items.length) {
      if (this.state.currentIndex >= this.state.itemsInSlide - 1) {
        this.setState({ currentIndex: nextIndex }, () => {
          this.carouselRef.current.slideTo(
            this.state.currentIndex - center,
          );
        });
      } else {
        this.setState({ currentIndex: nextIndex }, () => {
          this.carouselRef.current.slideTo(0);
        });
      }
    }
  };

  handleOnSlideChange = event => {
    const { itemsInSlide } = event;
    this.setState({ itemsInSlide });
  };

  render() {
    const { responsive, currentIndex } = this.state;

    const indexOfArray = i => this.items.indexOf(i);

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
          ref={this.carouselRef}
          infinite={false}
          items={carouselItems}
          responsive={responsive}
          slideToIndex={currentIndex}
          dotsDisabled={true}
          buttonsDisabled={true}
          onInitialized={this.handleOnSlideChange}
          onResized={this.handleOnSlideChange}
        ></AliceCarousel>
      </div>
    );
  }
}
