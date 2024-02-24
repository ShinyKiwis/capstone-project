import { Button } from '@/app/_components';
import { useRole } from '@/app/hooks';
import React from 'react';

interface UserFilterButtonsProps {
	selectedFilter: string;
	filterHandler: (role:Role) => void
}

function UserFilterButtons({selectedFilter, filterHandler}:UserFilterButtonsProps) {
	const {roles} = useRole();
  const filterOptions = [roles[4], roles[1], roles[0]]    // pick out some roles at any orders as filter options

    
	return (
		<div className="flex gap-6">
			{roles.map(role => {
				return(
					<Button
						isPrimary={selectedFilter === role.name ? true : false}
						variant="normal"
						className="px-4"
						onClick={() => filterHandler(role)}
					>
						{role.name}
					</Button>
				)
			})}
		</div>
	);
}

export default UserFilterButtons;