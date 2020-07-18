import React, { useContext } from 'react';
import { Card, CardBody, CardTitle, CardText, Button, Col, CardImg} from 'reactstrap';
import { Link } from 'react-router-dom';

export const Game = ({ game }) => {

    return (
            <Col sm="6" className="gameCards">
            <Card className="game" style={{flex: 1}}>
            
            <CardImg top width="100px" height="350px" src={game.background_image} alt="Card image cap" />
            
            <CardBody>
                <CardTitle> <strong> {game.name} </strong></CardTitle>
                    <CardText>
                        Metacritic: {game.metacritic} 
                    </CardText>
                    <Link to={`details/${game.slug}`}
                         className="btn btn-primary btn-block"> More info
                    </Link>
                </CardBody>
            </Card>
            </Col>
            )  
}
