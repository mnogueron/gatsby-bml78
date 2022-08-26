import React from 'react';
import { Link } from 'gatsby';
import Image from '../components/Image';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import frLocale from 'date-fns/locale/fr';

// TODO use default picture like a shuttle
function Card({ image, heading, date, subheading, url, ...rest }) {
  return (
    <Link
      to={url}
      className="group transform hover:-translate-y-2 duration-200"
      {...rest}
    >
      <Image
        image={image?.image || {url: '/static/assets/shuttle.jpg' }}
        alt={image?.alt || 'image de volant'}
        className="rounded-md overflow-hidden"
      />
      <div className="mt-4 flex items-baseline gap-x-2 justify-between">
        <span className="uppercase text-green-700 font-bold text-xs tracking-wide">
          {subheading}
        </span>
        <span className="text-sm text-gray-600">
          {formatDistanceToNow(new Date(date), {
            addSuffix: true,
            locale: frLocale,
          })}
        </span>
      </div>
      <h3 className="mt-1 font-bold text-lg group-hover:underline">
        {heading}
      </h3>
    </Link>
  );
}

export default Card;
