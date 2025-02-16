import React, { useState, useEffect } from "react";
import { Container, Row, Col, Dropdown, Card, Button, Form } from "react-bootstrap";
import { FaFacebook, FaInstagram, FaTwitter, FaTiktok } from "react-icons/fa";
import { SiMastercard, SiVisa, SiPaypal, SiAmazonpay, SiApplepay, SiGooglepay } from "react-icons/si";
import Navigation from "./Navigation";
import axiosInstance from "../api/axiosInstance";
import Banner from "./banner";

const ProductListing = () => {
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");
    const [products, setProducts] = useState([]);
    const [searchProducts,setSearchproducts] =useState([]);
    const [loading, setLoading] = useState(true);
    const [categories, setCategories] = useState([]);
    const [currentPage,setCurrentPage] = useState(1);

    const productsPerPage = 8;

    useEffect(() => {

        axiosInstance.get('/products/categories')
            .then((response) => {

                if (response) {
                    console.log(response.data, "cAT");
                    setCategories(response.data)
                } else {
                    setCategories([]);  
                }
            })
            .catch((error) => {
                console.error("Error fetching products:", error);
                setProducts([]); 
            })
            .finally(() => {
                setLoading(false);
            });

    }, [selectedCategory]); 


    useEffect(() => {
        axiosInstance.get("/products") 
            .then((response) => {
                console.log("value", response.data)
                if (response?.data?.products) {
                    setProducts(response.data.products);  
                    setLoading(false);
                }
            })
            .catch((error) => {
                console.error("Error fetching products:", error);
                setLoading(false);
            });
    }, []);


    function filterByCat(cat) {
        setSelectedCategory(cat.name);
        const data = categories.find(val => val.name === cat.name)
        data && axiosInstance.get(`/products/category/${data.slug}`)
            .then((response) => {

                if (response?.data?.products) {
                    setProducts(response.data.products); 
                    setLoading(false);
                } else {
                    
                }
            })
            .catch((error) => {
                console.error("Error fetching products:", error);
                setProducts([]); 
            })
            .finally(() => {
                setLoading(false);
            });
    }

    function searchProduct(value) {
        setSearchQuery(value)
        axiosInstance.get(`products/search?q=${value}`)
            .then((response) => {

                if (response?.data?.products) {
                    setProducts(response.data.products);  
                    setLoading(false);
                } else {
                   
                }
            })
            .catch((error) => {
                console.error("Error fetching products:", error);
                setProducts([]); 
            })
            .finally(() => {
                setLoading(false);
            });
    }
    const indexOfLastPage = currentPage * productsPerPage;
    const indexOfFirstPage = indexOfLastPage - productsPerPage;
    const currentProducts = products.slice(indexOfFirstPage, indexOfLastPage) 

    const paginate = (pageNumber) =>setCurrentPage(pageNumber);
    
    return (
        <Container fluid className="p-3">
           
            <header className="d-flex flex-wrap justify-content-between align-items-center mb-3">
                <h2 className="fw-bold">
                    <span style={{ color: "#E91E63" }}>MoBoo</span>M
                </h2>
                <Form.Control
                    type="text"
                    placeholder="Search for products..."
                    className="w-50 w-md-15"
                    value={searchQuery}
                    onInput={(e) => searchProduct(e.target.value)}
                />
                <Navigation />

            </header>

           <Banner/>

            
            <Row>
                <Col xs={12} md={3} className="mb-3">
                    <Dropdown>
                        <Dropdown.Toggle variant="light" className="w-100">
                            {selectedCategory}
                        </Dropdown.Toggle>
                        <Dropdown.Menu className="w-100">
                            {categories.map((cat, index) => (
                                <Dropdown.Item key={index} onClick={() => filterByCat(cat)}>
                                    {cat.name}
                                </Dropdown.Item>
                            ))}
                        </Dropdown.Menu>
                    </Dropdown>
                </Col>
            </Row>

           
            <Row>
          {currentProducts.map((product) => (
            <Col xs={6} sm={6} md={4} lg={3} key={product.id} className="mb-4">
              <Card className="shadow-sm d-flex flex-column" style={{height: "100%", maxWidth: "250px"}}>
              <Card.Img variant="top" style={{ height: "170px", objectFit: "cover" }} src={product.thumbnail} />
              <Card.Body className="d-flex flex-column justify-content-between" style={{ flex: "1" }}>
                  <Card.Title>{product.title}</Card.Title>
                  <Card.Text className="d-none d-sm-flex" 
                    style={{
                         display: "block",
                         whiteSpace: "nowrap",  
                         overflow: "hidden",    
                         textOverflow: "ellipsis", 
                      }}>
                    {product.description}</Card.Text>
                  <h5>{product.price}</h5>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
               

<Row className="justify-content-center my-4">
        <Col xs="auto">
          <Button 
            variant="outline-dark" 
            onClick={() => paginate(currentPage - 1)} 
            disabled={currentPage === 1}
          >
            ❮
          </Button>
        </Col>
        {Array.from({ length: Math.ceil(products.length / productsPerPage) }, (_, index) => (
          <Col xs="auto" key={index}>
            <Button 
              variant={currentPage === index + 1 ? "dark" : "outline-dark"} 
              onClick={() => paginate(index + 1)}
            >
              {index + 1}
            </Button>
          </Col>
        ))}
        <Col xs="auto">
          <Button 
            variant="outline-dark" 
            onClick={() => paginate(currentPage + 1)} 
            disabled={currentPage === Math.ceil(products.length / productsPerPage)}
          >
            ❯
          </Button>
        </Col>
      </Row>

           
            <footer className="mt-4 text-center">
                <Row>
                    <Col md={3}>
                        <h5>Company Info</h5>
                        <p>About | Social Responsibility | Affiliate | Fashion Blogger</p>
                    </Col>
                    <Col md={3}>
                        <h5>Help & Support</h5>
                        <p>Shipping Info | Returns | How to Order | Size Chart</p>
                    </Col>
                    <Col md={3}>
                        <h5>Customer Care</h5>
                        <p>Contact Us | Payment | Bonus Points</p>
                    </Col>
                    <Col md={3}>
                        <h5>Socials</h5>
                        <FaFacebook size={24} className="mx-2" />
                        <FaInstagram size={24} className="mx-2" />
                        <FaTwitter size={24} className="mx-2" />
                        <FaTiktok size={24} className="mx-2" />
                    </Col>
                </Row>

                
                <Row className="mt-3">
                    <Col className="text-center">
                        <Form.Control type="email" placeholder="Your email" className="w-50 mx-auto" />
                        <Button variant="dark" className="mt-2">Subscribe</Button>
                    </Col>
                </Row>

                
                <Row className="text-center mt-3">
                    <Col>
                        <SiVisa size={40} className="mx-2" />
                        <SiMastercard size={40} className="mx-2" />
                        <SiPaypal size={40} className="mx-2" />
                        <SiAmazonpay size={40} className="mx-2" />
                        <SiApplepay size={40} className="mx-2" />
                        <SiGooglepay size={40} className="mx-2" />
                    </Col>
                </Row>

                <p className="text-center text-muted mt-3">
                    &copy; 2010-2022 All Rights Reserved | <a href="#">Privacy Policy</a> | <a href="#">Terms & Conditions</a>
                </p>
            </footer>
        </Container>
    );
};

export default ProductListing;
