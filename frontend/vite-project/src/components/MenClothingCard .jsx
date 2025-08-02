import React, { useState } from 'react';

export const MenClothingCard = () => {
  const menClothingData = [
    // Add the menClothingData here as shown above
  ];

  return (
    <div className="container-fluid card">
      <div className="row">
        {menClothingData.map((item, index) => {
          const { name, category, price, description, full_description } = item;
          const [showMore, setShowMore] = useState(false);

          const toggleDescription = () => {
            setShowMore(!showMore);
          };

          return (
            <div
              key={index} // Using index as key since there's no unique id in the data
              className="card col-12 col-md-6 col-lg-4 col-xl-3 mx-auto py-3 mb-3 d-flex flex-column"
              style={{
                width: '18rem',
                height: showMore ? 'auto' : '38rem',
                transition: 'height 0.3s ease',
              }}
            >
              {/* Image Placeholder */}
              <img src="https://via.placeholder.com/150" alt="img" className="card-img-top" />
              <div className="card-body">
                <p className="card-text">{category}</p>
                <h5 className="card-title">{name}</h5>
                <p className="card-text">
                  {description}
                  {showMore && <p className="card-text">{full_description}</p>}
                  <span className="btn btn-link mt-2" onClick={toggleDescription}>
                    {showMore ? 'Show Less' : 'Show More'}
                  </span>
                </p>
              </div>
              <button className="btn btn-primary ps-1">${price}</button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
