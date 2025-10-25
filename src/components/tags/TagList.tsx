import React from 'react';
import { Tag } from '../../types/tag';
import { TagCard } from './TagCard';

interface TagListProps {
  tags: Tag[];
  onTagClick?: (tag: Tag) => void;
}

export const TagList: React.FC<TagListProps> = ({ tags, onTagClick }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {tags.map((tag) => (
        <TagCard key={tag.id} tag={tag} onClick={onTagClick} />
      ))}
    </div>
  );
};
