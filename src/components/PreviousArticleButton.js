import React from 'react';
import {Link} from 'gatsby';
import {ArrowNarrowRightIcon} from '@heroicons/react/solid';

const PreviousArticleButton = ({to, title}) => {
  return (
    <Link to={to} className="group">
      <div className="flex items-center gap-x-2 text-gray-500 sm:justify-end">
        Précédent
        <ArrowNarrowRightIcon className="w-5 h-5" />
      </div>
      <h3 className="font-bold text-lg text-gray-700 group-hover:underline">
        {title}
      </h3>
    </Link>
  );
};

export default PreviousArticleButton;
