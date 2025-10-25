import React from 'react';
import { Tag } from '../../types/tag';
import { TagList } from './TagList';

interface PendingTagsProps {
  tags: Tag[];
  onAssign?: (tag: Tag) => void;
}

export const PendingTags: React.FC<PendingTagsProps> = ({ tags, onAssign }) => {
  const pendingTags = tags.filter(tag => tag.status === 'pending');

  if (pendingTags.length === 0) {
    return <p className="text-gray-600 dark:text-gray-400">No pending tags</p>;
  }

  return <TagList tags={pendingTags} onTagClick={onAssign} />;
};
