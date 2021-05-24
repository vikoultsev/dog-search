import React, { Fragment, useEffect, useState } from 'react'
import block from 'bem-cn-lite'
import noImage from '../../images/no_image.jpg'
import './Breed.scss'

import { fetchImageData } from '../../api'

const b = block('Breed')

function Breed(props) {
  const { data = {}, measuringKey } = props;
  const imageId = data.reference_image_id;
  const [imageData, setImageData] = useState({});

  const loadImageData = async () => {
    try {
      const image = await fetchImageData(imageId);
      setImageData(image);
    } catch (error) {
      
    }
  };

  useEffect(() => {
    if (imageId) {
      loadImageData();
    }
    
  }, [imageId]);

  const renderParameter = (key, value = '--', width, unit) => (
    <div className={b('parameter')} style={{ width }}>
      <div className={b('key')}>{key}</div>
      <div className={b('value')}>{unit ? `${value} ${unit}` : value}</div>
    </div>
  )

  const getImage = () => {
    const imgSrc = imageData.url || noImage;
    return (
      <Fragment>
        <img
          src={imgSrc}
          className={b('img')}
        />
      </Fragment>
      
    )
  }


  return (
    <div data-testid='breed-item' className={b()}>
      <div className={b('container')}>
        <div className={b('image')}>
          {getImage()}
        </div>
        <div className={b('info')}>
          <h4 className={b('name')}>{data.name}</h4>
          {renderParameter('Height', data.height[measuringKey], '50%', measuringKey === 'imperial' ? 'in' : 'cm')}
          {renderParameter('Weight', data.weight[measuringKey], '50%', measuringKey === 'imperial' ? 'lb' : 'kg')}
          {renderParameter('Breed Group', data.breed_group, '50%')}
          {renderParameter('Lifespan', data.life_span, '50%')}
          {renderParameter('Breed For', data.bred_for, '100%')}
          {renderParameter('Temperament', data.temperament, '100%')}
        </div>
      </div>
    </div>
  )
}

export default Breed
