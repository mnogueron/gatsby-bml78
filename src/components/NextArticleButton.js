import React from 'react';
import {Link} from 'gatsby';
import {ArrowNarrowLeftIcon} from '@heroicons/react/solid';

const NextArticleButton = ({to, title}) => {
  return (
    <Link to={to} className="group">
      <div className="flex items-center gap-x-2 text-gray-500">
        <ArrowNarrowLeftIcon className="w-5 h-5" />
        Suivant
      </div>
      <h3 className="font-bold text-lg text-gray-700 group-hover:underline">
        {title}
      </h3>
    </Link>
  );
};

export default NextArticleButton;
