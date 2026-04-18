import React from "react";
import { motion } from "framer-motion";
import { Container, Row, Col, Button } from "react-bootstrap";
import { LuShoppingBag, LuHeart } from "react-icons/lu";

export const Shoes = () => {
  const ShoesData = [
      {
        id: 1,
        name: "Nike Air Max 270",
        category: "Sneakers",
        price: 150.00,
        brand: "Nike",
        description: "Nike Air Max 270 provides a perfect combination of comfort ",
        full_description: "and style with its oversized Max Air cushioning.",
        available_colors: ["Black", "White", "Red", "Blue"],
        image_url: "https://rukminim2.flixcart.com/image/612/612/xif0q/shoe/f/7/k/-original-imah6f54fzanj8gg.jpeg?q=70"
      },
      {
        id: 2,
        name: "Adidas Ultraboost 21",
        category: "Running Shoes",
        price: 180.00,
        brand: "Adidas",
        description: "The Ultraboost 21 delivers energy return with its responsive Boost ",
        full_description: " technology and a sleek design.",
        available_colors: ["Black", "White", "Grey"],
        image_url: "https://rukminim2.flixcart.com/image/612/612/xif0q/shoe/3/x/l/-original-imah6gzfwwudatfr.jpeg?q=70"
      },
      {
        id: 3,
        name: "Puma RS-X3 Puzzle",
        category: "Sneakers",
        price: 120.00,
        brand: "Puma",
        description: "The Puma RS-X3 Puzzle features bold colors and retro ",
        full_description: " design with a high level of comfort and support.",
        available_colors: ["Yellow", "Purple", "Blue"],
        image_url: "https://rukminim2.flixcart.com/image/612/612/xif0q/shoe/s/k/p/3-5-380462-01-3-5-puma-white-tigerlily-original-imah7zd9bqqfge8q.jpeg?q=70"
      },
      {
        id: 4,
        name: "Reebok Nano X2 Training",
        category: "Training Shoes",
        price: 140.00,
        brand: "Reebok",
        description: "Reebok Nano X2 is built for versatility, perfect for all ",
        full_description: " kinds of workouts and intense training sessions.",
        available_colors: ["Black", "Grey", "Red"],
        image_url: "https://rukminim2.flixcart.com/image/612/612/xif0q/shoe/3/a/w/6-gw5147-reebok-ftwwht-hinmin-cblack-original-imaghg4gvkpfqpsb.jpeg?q=70"
      },
      {
        id: 5,
        name: "New Balance 574 Classic",
        category: "Casual Shoes",
        price: 90.00,
        brand: "New Balance",
        description: "The New Balance 574 Classic combines style and comfort, making",
        full_description: " it the ideal everyday sneaker.",
        available_colors: ["Navy", "Grey", "Pink"],
        image_url: "https://rukminim2.flixcart.com/image/612/612/xif0q/shoe/m/c/5/10-art-ca387-vellinto-tan-original-imaguqq5ra6yrht5.jpeg?q=70"
      },
      {
        id: 6,
        name: "Under Armour HOVR Phantom 2",
        category: "Running Shoes",
        price: 160.00,
        brand: "Under Armour",
        description: "Under Armour HOVR Phantom 2 offers a responsive cushion and ",
        full_description: "high-energy return, ideal for long-distance runs.",
        available_colors: ["Black", "White", "Red"],
        image_url: "https://rukminim2.flixcart.com/image/612/612/xif0q/shoe/1/v/0/-original-imah46jtcxvcehry.jpeg?q=70"
      },
      {
        id: 7,
        name: "Converse Chuck Taylor All Star",
        category: "Casual Shoes",
        price: 50.00,
        brand: "Converse",
        description: "The iconic Converse Chuck Taylor All Star with a timeless ",
        full_description: "design, perfect for casual wear and everyday use. ",
        available_colors: ["Black", "White", "Red"],
        image_url: "https://rukminim2.flixcart.com/image/612/612/xif0q/shoe/5/h/j/7-clot-100-multi-7-woakers-multicolor-original-imah76h6sfdwwnss.jpeg?q=70"
      },
      {
        id: 8,
        name: "Vans Old Skool",
        category: "Skate Shoes",
        price: 65.00,
        brand: "Vans",
        description: "Vans Old Skool combines skate style with comfort, featuring a ",
        full_description:"durable suede and canvas upper.",
        available_colors: ["Black", "White", "Blue"],
        image_url: "https://rukminim2.flixcart.com/image/612/612/xif0q/shoe/p/q/u/10-hd-56-b-10-hap-dan-black-white-and-black-original-imah7k6jfmdzmfda.jpeg?q=70"
      }
  ];

  return (
    <section className="py-5" id="features"
    style={{background: "var(--background)"}}
    >
      <Container>

        {/* Header */}
        <div className="text-center mb-5">
          <h2 className="fw-light">Featured Shoes</h2>
          <div className="divider"></div>
        </div>

        {/* Grid */}
        <Row className="g-4">
          {ShoesData.map((shoe, index) => (
            <Col key={shoe.id} xs={12} sm={6} md={4} lg={3}>
              
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="product-card"
              >

                {/* Image */}
                <div className="img-wrapper">
                  <img
                    src={shoe.image_url}
                    alt={shoe.name}
                    className="product-img"
                  />

                  {/* Overlay */}
                  <div className="overlay">
                    <div className="overlay-actions">
                      <Button className="btn-add">
                        <LuShoppingBag size={16} />
                        Add
                      </Button>

                      <Button className="btn-like">
                        <LuHeart size={16} />
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Info */}
                <div className="mt-3">
                  <p className="category">{shoe.category}</p>
                  <h5 className="product-title">{shoe.name}</h5>
                  <p className="price">${shoe.price}</p>
                </div>

              </motion.div>

            </Col>
          ))}
        </Row>

      </Container>
    </section>
  );
};