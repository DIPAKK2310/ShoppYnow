import React, { useState } from 'react'
import "bootstrap/dist/css/bootstrap.min.css"; // Ensure Bootstrap is importe

export const Shoes = () => {

  const [expandedCards, setExpandedCards] = useState({}); // Track expanded descriptions



  const toggleDescription = (id) => {
    setExpandedCards((prev) => ({
      ...prev,
      [id]: !prev[id], // Toggle based on shoe ID
    }));
  };

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



    ]
    return (
      <>
     <div className='container-fluid card'>
     <div className='row justify-content-center'>
     <div className=' text-center col-12  py-3'>
     <h2>Featured_Products</h2>
     </div>
    
          {
            ShoesData.map(({id,image_url,category,name,description,full_description,price,button})=>{
              const [showMore, setShowMore] = useState(false); // State to toggle full description



        return(
          <div 
          key={id}
          
          className="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-3 mb-4">
          
            
              <div
                className="card shadow-sm"
                style={{
                  height: showMore ? 'auto' : '30rem',
                  width:'16rem', // Adjust height when showing more description
                  transition: 'height 0.3s ease',
                }}
              >
                <img src={image_url} alt={name} className="card-img-top" 
                 style={{ maxHeight: '250px', objectFit: 'contain' }}
                />
                <div className="card-body">
                  <p className="card-text">{category}</p>
                  <h5 className="card-title">{name}</h5>
                  <p className="card-text">
                    {description}
                    {expandedCards[id] && <span>{full_description}</span>}
                    <button className="btn btn-secondary btn-sm mx-2 pt-2" onClick={toggleDescription}>
                      {showMore ? 'Show Less' : 'Show More'}
                    </button>
                  </p>
                </div>
                <button href="#" className="btn btn-primary ps-1">
                  ${price}
                </button>
              </div>
            </div>
            );
          }
        )}
      </div>
    </div>
    </>
    

  )
}
