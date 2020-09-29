import React, { useState } from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import SlideShow from './SlideShow'

interface PathProps {
    houseType: String;
    pricePerMonth: number;
    roomType: String;
    moveIn: String;
    stayPeriod: String;
    facilities: String[];
    lookingFor: String[];
    distance: String;
    address: String;
  }

const HouseCard: React.FC<PathProps> = ({
    houseType,
    pricePerMonth,
    roomType,
    moveIn,
    stayPeriod,
    facilities,
    lookingFor,
    distance,
    address,
  }) => {
    const [show, setShow] = useState<boolean>(true);
  
    return (
          <Container>
            <Row>
              {/* first column */}
              <Col sm={12} md={4} className="text-center">
                <Card border="secondary" className="house-card">
                    <Card.Body>
                    <Row className="house-pic">
                    <SlideShow></SlideShow>
                    </Row>
                    <Row>
                        <Col md={5} className="house-card-left house-card-price">
                        <Row>${pricePerMonth}</Row>
                        </Col>
                        <Col md={7} className="house-card-right house-card-right-top">
                        <Row><div className="w-100 text-right">{roomType} <span className="divider">|</span> Move In {moveIn}</div></Row>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={5} className="house-card-left house-card-left-bottom">
                            <Row>{distance}</Row>
                        </Col>

                        <Col md={7} className="house-card-right">
                            <Row><div className="w-100 text-right">{address}</div></Row>
                        </Col>
                    </Row>
                    </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
    );
  };

  export default HouseCard;