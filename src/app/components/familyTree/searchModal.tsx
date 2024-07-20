"use client"

import { useState } from "react";
import { findMembersWithName } from "../../data/dataUtils";
import { FamilyNode } from "../../types/interfaces";

export const searchButtonClick = () => {
  (document.getElementById("my_modal_2") as HTMLDialogElement).showModal();
};

const SearchModal = () => {
  const [searchResults, setSearchResults] = useState<FamilyNode[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let searchTerm = e.target.value;
    setSearchResults(findMembersWithName(searchTerm));
  };

  return (
    <dialog id="my_modal_2" className="modal">
      <div className="modal-box bg-transparent shadow-none max-w-4xl min-h-full flex flex-col justify-start items-center overflow-visible">
        <label className="input input-bordered input-accent w-3/5 flex items-center">
          <input
            type="text"
            onChange={handleInputChange}
            className="grow min-h-10 text-lg bg-gradient-to-r from-palette3 via-palette4 to-palette5 bg-clip-text text-transparent"
            placeholder="Search"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
              clipRule="evenodd"
            />
          </svg>
        </label>
        {searchResults.length > 0 && (
          <div className="w-full flex-grow bg-white mt-3 rounded-xl grid grid-cols-4 gap-4 p-4 overflow-y-auto">
            {searchResults.map((member) => (
              <div
                key={member.id}
                className="w-44 h-52 rounded flex flex-col items-center justify-around bg-gradient-to-b from-palette3 via-palette4 to-palette5"
              >
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar"
                >
                  <div className="min-w-16 rounded-full scale-150">
                    <img alt="Tailwind CSS Navbar component" src={"people/" + member.image} />
                  </div>
                </div>
                <div className="flex flex-col justify-center items-center text-center text-offWhite text-lg h-1/4">
                  <h1 className="text-wrap flex flex-col">{member.name}</h1>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
};

export default SearchModal;
