import React from 'react';
import { BiSearch } from 'react-icons/bi';

interface UsersSearchBarProps{
	value: string;
	onChange: (val:string) => void;
	searchHandler: (query:string) => void;
}

function UsersSearchBar({value, onChange, searchHandler} : UsersSearchBarProps){
    
	return(
		<div className="ml-auto w-96">
			<div className="group flex w-full items-center gap-2 rounded-md border-2 border-gray px-4 py-2 focus-within:border-blue">
				<input
					type="text"
					placeholder="Search user name, id..."
					className="w-full outline-none"
					value={value}
					onInput={(e) => onChange(e.currentTarget.value)}
					onKeyDown={(e) => {
						if (e.key === "Enter") {
							searchHandler(value);
						}
					}}
				/>
				<button
					onClick={() => {
						searchHandler(value);
					}}
				>
					<BiSearch
						size={30}
						className="text-gray group-focus-within:text-blue"
					/>
				</button>
			</div>
		</div>
	)
}

export default UsersSearchBar