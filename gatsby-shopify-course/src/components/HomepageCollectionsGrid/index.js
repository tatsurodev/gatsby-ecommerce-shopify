import React from 'react';
import { CollectionTile } from '../CollectionTile';

export function HomepageCollectionsGrid({ collections }) {
  return (
    <div>
      {collections.map(collection => (
        <CollectionTile
          title={collection.title}
          description={collection.description}
          // imageがnullなcollectionもあるのでoptional
          backgroundImage={collection.image?.localFile.childImageSharp.fluid}
          key={collection.shopifyId}
        />
      ))}
    </div>
  );
}
