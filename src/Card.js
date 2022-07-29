import Accordion from "react-bootstrap/Accordion";
import "bootstrap/dist/css/bootstrap.min.css";
import Card from "react-bootstrap/Card";

function CardNews(props) {

  return (
    <>
      <Card  style={{ width: "18rem" }}>
        <Card.Img variant="top" src={props.news.image} />

        <Card.Body>
          <Card.Title>
            {props.news.story_title}
            {props.news.title}
          </Card.Title>
          <Card.Text>
            <Accordion>
              <Accordion.Item eventKey="0">
                <Accordion.Header>Ver mas</Accordion.Header>
                <Accordion.Body>
                  Autor: {props.news.author} 
                </Accordion.Body>
                <Accordion.Body>
                  Fecha: {props.news.created_at}
                </Accordion.Body>
                <Accordion.Body>
                  <a href={props.news.story_url}>Ir a Fuente </a>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </Card.Text>
        </Card.Body>
      </Card>
    </>
  );
}

export default CardNews;
