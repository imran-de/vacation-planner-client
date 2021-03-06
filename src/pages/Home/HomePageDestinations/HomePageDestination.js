import React, { useEffect, useState } from 'react';
import { Card, Col, Placeholder, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const HomePageDestination = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [destinations, setDestinations] = useState([])
    useEffect(() => {
        setIsLoading(true);
        fetch('https://mysterious-island-52828.herokuapp.com/homePageShowEvent')
            .then(res => res.json())
            .then(data => {
                setDestinations(data);
                setIsLoading(false);
            })
    }, [])

    if (isLoading) {
        return <Card className="container" style={{ width: '18rem' }}>
            <Card.Img variant="top" src="https://thealmanian.com/wp-content/uploads/2019/01/product_image_thumbnail_placeholder.png" />
            <Card.Body>
                <Placeholder as={Card.Title} animation="glow">
                    <Placeholder xs={6} />
                </Placeholder>
                <Placeholder as={Card.Text} animation="glow">
                    <Placeholder xs={7} /> <Placeholder xs={4} /> <Placeholder xs={4} />{' '}
                    <Placeholder xs={6} /> <Placeholder xs={8} />
                </Placeholder>
                <Placeholder.Button variant="primary" xs={6} />
            </Card.Body>
        </Card>
    }

    return (
        <div style={{ backgroundColor: "#F3F6F5" }}>
            <div className="container py-5">
                <h2 className="text-center pb-2 text-decoration-underline">Our Destinations</h2>
                <Row xs={1} md={3} lg={4} className="g-4">
                    {destinations.map((destination, index) => <Col key={Math.random()}>
                        <Card className="border-0 shadow rounded-3" style={{ backgroundColor: "#F3F6F5" }}>
                            <Card.Img className="rounded-bottom" variant="top" height="480" src={destination?.imgURL} style={{ objectFit: 'cover' }} />
                            <Card.Body className="card-img-overlay text-light w-100">
                                <div className="w-100 pe-5" style={{ position: 'absolute', bottom: '10px' }}>
                                    <h5>Place: {destination?.location}</h5>
                                    <Card.Title>{destination?.eventName}</Card.Title>
                                    <Card.Text>
                                        <Row>
                                            <Col className="col-sm-6 border-end">
                                                <span>Dates</span><br />
                                                <span>{destination?.date}</span>
                                            </Col>
                                            <Col className="col-sm-6">
                                                <span>Price</span><br />
                                                <span>From ${destination?.price}pp</span>
                                            </Col>
                                        </Row>
                                    </Card.Text>
                                    <Row>
                                        <Link className="btn btn-primary" to={`/destination/${destination?._id}/${destination?.eventName}`}>Book Now</Link>
                                    </Row>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>)}
                </Row>


                {/* see all btn */}
                <div className="text-center mt-5">
                    <Link className="btn btn-outline-info" to="/destinations" rel="noreferrer"><i className="fab fa-buromobelexperte"></i> See all destinations</Link>
                </div>
            </div>
        </div>
    );
};

export default HomePageDestination;