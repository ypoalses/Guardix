import React from 'react';
import { Tag } from '../../types/tag';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';

interface TagCardProps {
  tag: Tag;
  onClick?: (tag: Tag) => void;
}

export const TagCard: React.FC<TagCardProps> = ({ tag, onClick }) => {
  const statusVariant = tag.status === 'active' ? 'success' : tag.status === 'pending' ? 'warning' : 'default';

  return (
    <Card onClick={() => onClick?.(tag)}>
      <div className="flex items-center justify-between">
        <div>
          <p className="font-medium">{tag.tagId}</p>
          {tag.petId && <p className="text-sm text-gray-600">Assigned to pet</p>}
        </div>
        <Badge variant={statusVariant}>{tag.status}</Badge>
      </div>
    </Card>
  );
};
