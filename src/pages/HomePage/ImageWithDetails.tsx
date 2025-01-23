import styled from '@emotion/styled';
import { css } from '@emotion/react';

interface ImageWithDetailsProps {
  title: React.ReactNode;
  description: string;
  imageUrl: string;
}

const ImageWithDetails: React.FC<ImageWithDetailsProps> = ({ title, description, imageUrl }) => {
  return (
    <div>
      <h1>{title}</h1>
      <img src={imageUrl} alt={description} />
      <p>{description}</p>
    </div>
  );
};
