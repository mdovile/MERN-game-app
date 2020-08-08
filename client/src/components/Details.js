import React, { useState, useEffect } from 'react';
import { AddModal } from './AddModal';
import axios from 'axios';
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption,
  Form,
} from 'reactstrap';
import { ListGroup, ListGroupItem } from 'reactstrap';
import { Card, CardText, CardBody, CardHeader, FormGroup } from 'reactstrap';

export const Details = (props) => {
  const [name, setName] = useState('');
  const [images, setImages] = useState([{}]);
  const [release, setRelease] = useState('');
  const [description, setDescription] = useState('');
  const [metacritic, setmetacritic] = useState('');
  const [developers, setDevelopers] = useState([{}]);
  const [slug, setSlug] = useState('');

  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [platforms, setPlatforms] = useState([]);

  useEffect(() => {
    Promise.all([
      axios.get(`https://api.rawg.io/api/games/${props.match.params.slug}`),
      axios.get(`https://api.rawg.io/api/games/${props.match.params.slug}/screenshots`),
    ]).then(
      axios.spread(function (detailsResponse, screenshotsResponse) {
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
        let slug = detailsResponse.data.slug;
        setSlug(slug);

        for (let i = 0; i < receivedPlatforms.length; i++) {
          platforms[i] = receivedPlatforms[i].platform;
        }
        setPlatforms(platforms);
      }),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === images.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? images.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  };

  const goToIndex = (newIndex) => {
    if (animating) return;
    setActiveIndex(newIndex);
  };

  const slides = images.map((image) => {
    return (
      <CarouselItem
        onExiting={() => setAnimating(true)}
        onExited={() => setAnimating(false)}
        key={image.id}
      >
        <img src={image.image} alt="game-screenshot" />
        <CarouselCaption
          className="carouselCaption"
          captionText="Actual Game Footage"
          captionHeader={name}
        />
      </CarouselItem>
    );
  });

  return (
    <div style={{ position: 'relative', top: '8px' }}>
      <Carousel activeIndex={activeIndex} next={next} previous={previous}>
        <CarouselIndicators items={images} activeIndex={activeIndex} onClickHandler={goToIndex} />
        {slides}
        <CarouselControl direction="prev" directionText="Previous" onClickHandler={previous} />
        <CarouselControl direction="next" directionText="Next" onClickHandler={next} />
      </Carousel>

      <Card>
        <CardBody>
          <CardHeader className="detailsGameTitle">
            <Form inline>
              <FormGroup>
                {name}
                <AddModal title={name} slug={slug} />
              </FormGroup>
            </Form>
          </CardHeader>
          <br />

          <ListGroup>
            <ListGroupItem>
              <strong>Metacritic</strong>: {metacritic}
            </ListGroupItem>
            <ListGroupItem>
              <strong>Release</strong>: {release}
            </ListGroupItem>
            <ListGroupItem>
              <strong>Developed by</strong>:
              <ul>
                {developers.map((dev) => (
                  <li key={dev.id}> {dev.name} </li>
                ))}
              </ul>
            </ListGroupItem>
            <ListGroupItem>
              <strong>Platforms</strong>:
              <ul>
                {platforms.map((platform) => (
                  <li key={platform.id}>{platform.name}</li>
                ))}
              </ul>
            </ListGroupItem>

            <ListGroupItem>
              <CardText>
                <p dangerouslySetInnerHTML={{ __html: description }}></p>
              </CardText>
            </ListGroupItem>
          </ListGroup>
        </CardBody>
      </Card>
    </div>
  );
};
