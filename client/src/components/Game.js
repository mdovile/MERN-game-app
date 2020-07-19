import React from 'react';
import { Card, CardBody, CardTitle, CardText, Col, CardImg} from 'reactstrap';
import { Link } from 'react-router-dom';

export const Game = ({ game }) => {

    return (
        <Link to={`details/${game.slug}`} style={{textDecoration: "none"}}>
            <Col xs="6" className="gameCards">
            <Card tag="a" className="game" style={{flex: 1, cursor: "pointer"}}>
            
            <CardImg top width="100px" height="350px" src={game.background_image} alt="Card image cap" />
            
            <CardBody>
                <CardTitle> <strong> {game.name} </strong></CardTitle>
                    <CardText>
                        Metacritic: {game.metacritic} 
                    </CardText>
                </CardBody>
            </Card>
            </Col>
        </Link>
            )  
}
