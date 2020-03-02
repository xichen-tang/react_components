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
    // const center = Math.floor(this.state.itemsInSlide / 2);

    // if (i >= center) {
    this.setState({ currentIndex: i }, () => {
      this.carouselRef.current.slideTo(i);
    });
    // } else
    //   this.setState({ currentIndex: i }, () => {
    //     this.carouselRef.current.slideTo(0);
    //   });
  };

  handleWheelEvent = e => {
    e.persist();

    const { currentIndex, itemsInSlide } = this.state;

    const nextIndex =
      e.deltaY > 0 ? currentIndex + 1 : currentIndex - 1;

    if (nextIndex >= 0 && nextIndex < this.items.length) {
      if (currentIndex >= itemsInSlide - 1) {
        this.setState({ currentIndex: nextIndex }, () => {
          this.carouselRef.current.slideTo(nextIndex);
        });
      }
    }

    // const center = Math.floor(itemsInSlide / 2);

    // if (nextIndex >= 0 && nextIndex < this.items.length) {
    //   if (currentIndex >= itemsInSlide - 1) {
    //     this.setState({ currentIndex: nextIndex }, () => {
    //       this.carouselRef.current.slideTo(currentIndex - center);
    //     });
    //   } else {
    //     this.setState({ currentIndex: nextIndex }, () => {
    //       this.carouselRef.current.slideTo(0);
    //     });
    //   }
    // }
  };

  handleTouchEvent = i => {
    this.setState({ currentIndex: i }, () => {
      this.carouselRef.current.slideTo(i);
    });
  };

  handleOnSlideChange = event => {
    const { itemsInSlide } = event;
    this.setState({ itemsInSlide });
  };

  render() {
    const { responsive, currentIndex } = this.state;
    const { title } = this.props;

    const indexOfArray = i => this.items.indexOf(i);

    const styleSelectedItem = i =>
      currentIndex === i ? 'selected' : 'normal';

    const carouselItems = this.items.map(i => (
      <div className="grid-items">
        <span
          key={i}
          className={styleSelectedItem(indexOfArray(i))}
          onClick={() => {
            this.slideToIndex(indexOfArray(i));
          }}
          onTouchMove={() => this.handleTouchEvent(i)}
        >
          {i}
        </span>
      </div>
    ));

    return (
      <>
        <header className="header">{title}</header>
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
            swipeDisabled={true}
            dotsDisabled={true}
            buttonsDisabled={true}
            onInitialized={this.handleOnSlideChange}
            onResized={this.handleOnSlideChange}
          ></AliceCarousel>
        </div>
      </>
    );
  }
}
