import React, { useState, useEffect } from 'react';
import { AddModal } from './AddModal';
import axios from 'axios';
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption, Form
} from 'reactstrap';
import {
  Card, CardText, CardBody, CardHeader, FormGroup
} from 'reactstrap';

export const Details = ( props ) => {

    const [name, setName] = useState('');
    const [images, setImages] = useState([{}]);
    const [release, setRelease] = useState('');
    const [description, setDescription] = useState('');
    const [metacritic, setmetacritic] = useState('');
    const [developers, setDevelopers] = useState([{}]);

    const [activeIndex, setActiveIndex] = useState(0);
    const [animating, setAnimating] = useState(false);
    const [platforms, setPlatforms] = useState([]);

    useEffect(() => {

      Promise.all([
        axios.get(`https://api.rawg.io/api/games/${props.match.params.slug}`),
        axios.get(`https://api.rawg.io/api/games/${props.match.params.slug}/screenshots`)
      ])
      .then(axios.spread(function (detailsResponse, screenshotsResponse) {
        let name = detailsResponse.data.name;
        setName(name);
        let receivedImages = screenshotsResponse.data.results;
        setImages(receivedImages);
        let release = detailsResponse.data.released;
        setRelease(release);
        let description = detailsResponse.data.description;
        setDescription(description);
        let metacritic = detailsResponse.data.metacritic;
        setmetacritic(metacritic);
        let developers = detailsResponse.data.developers;
        setDevelopers(developers);
        let receivedPlatforms = detailsResponse.data.platforms;

        for(let i = 0; i < receivedPlatforms.length; i++ ) {
          platforms[i] = receivedPlatforms[i].platform;
        }
        setPlatforms(platforms); 
      }));
    }, []);

    const next = () => {
      if (animating) return;
      const nextIndex = activeIndex === images.length - 1 ? 0 : activeIndex + 1;
      setActiveIndex(nextIndex);
    }
  
    const previous = () => {
      if (animating) return;
      const nextIndex = activeIndex === 0 ? images.length - 1 : activeIndex - 1;
      setActiveIndex(nextIndex);
    }
  
    const goToIndex = (newIndex) => {
      if (animating) return;
      setActiveIndex(newIndex);
    }

    const slides = images.map((image) => {
      return (
        <CarouselItem
          onExiting={() => setAnimating(true)}
          onExited={() => setAnimating(false)}
          key={image.id}
        >
          <img src={image.image} alt="game-screenshot" />
          <CarouselCaption className="carouselCaption" captionText="Actual Game Footage" captionHeader={name} />
        </CarouselItem>
      );
    });

    return (
         <div >  
            <Carousel
              activeIndex={activeIndex}
              next={next}
              previous={previous}
            >
              <CarouselIndicators items={images} activeIndex={activeIndex} onClickHandler={goToIndex} />
              {slides}
              <CarouselControl direction="prev" directionText="Previous" onClickHandler={previous} />
              <CarouselControl direction="next" directionText="Next" onClickHandler={next} />
            </Carousel>

            <Card>
                <CardBody>
                 <CardHeader className="detailsGameTitle">
                   <Form inline>
                 <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                     {name}
                     <AddModal title={name}/>
                </FormGroup>
                </Form>
                </CardHeader>          
                  <br />

                <ul className="list-group mt-3">
                    <li className="list-group-item">
                      <strong>Metacritic</strong>: {metacritic}
                    </li>
                    <li className="list-group-item">
                      <strong>Release</strong>: {release}
                    </li>
                    <li className="list-group-item">
                      <strong>Developed by</strong>: {developers.map(dev => `${dev.name} `)}
                    </li>
                    <li className="list-group-item">
                      <strong>Platforms</strong>: 
                      <ul> 
                      {platforms.map(platform => <li key={platform.id}>{platform.name}</li>)}
                        </ul>
                    </li>
                  </ul>

                  <CardText>
                   <p className="card-text"  dangerouslySetInnerHTML={{ __html: description }}>
                   </p>
                 </CardText>
           </CardBody> 
        </Card>

        </div>
    )  
}