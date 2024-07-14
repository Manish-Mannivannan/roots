import { Address, FamilyNode } from "@/app/types/interfaces";
import { parentAddress, calculateAge } from "../../data/dataUtils";
import { useCopyButtonState } from "../../data/uiElements";

interface FamilyTreeModalProps {
  familyNode: FamilyNode;
  isSpouse: boolean;
}

const FamilyTreeModal: React.FC<FamilyTreeModalProps> = ({ familyNode, isSpouse }) => {
  const compAddress = (): Address | null => {
    if (familyNode.spouseAdd && isSpouse) return familyNode.spouseAdd; //if spouseadd and spouse true
    if (!familyNode.spouseAdd && isSpouse && familyNode.address)
      return familyNode.address; //if no sposeadd and spouse true and nodeadd
    if (familyNode.address && !isSpouse) return familyNode.address; //if address and not spouse
    if (!familyNode.address && isSpouse) return parentAddress(familyNode.id); //if no nodeadd and spouse true
    return parentAddress(familyNode.id); //if no address and not spouse
  };

  const address = compAddress();
  const age = calculateAge(familyNode, isSpouse);
  const { copyButtonState, copyButtonTimer } = useCopyButtonState();

  return (
    <div>
      <dialog id="my_modal" className="modal">
        <div className="modal-box bg-transparent shadow-none max-w-4xl max-h-full flex justify-between">
          {/* Left Card */}
          <div className="card bg-base-100 w-96 shadow-xl">
            <figure>
              <img
                src={isSpouse ? familyNode.spouseImage : familyNode.image}
                alt="Shoes"
              />
            </figure>
            <div className="card-body max-h-40">
              <h2 className="card-title">
                {isSpouse ? familyNode.spouse : familyNode.name}
              </h2>
              <p>{isSpouse ? familyNode.spouseId : familyNode.id}</p>
            </div>
          </div>
          {/* Right Card */}
          <div className="bg-offWhite w-96 rounded-xl p-6 overflow-y-auto">
            <p className="text-2xl font-bold bg-gradient-to-r from-palette3 via-palette4 to-palette5 bg-clip-text text-transparent">
              Age
            </p>
            <div className="flex w-full justify-around items-center">
              <p>
                Born: {isSpouse ? familyNode.spouseBD : familyNode.birthDate}
                {(isSpouse ? familyNode.spouseDD : familyNode.deathDate) && (
                  <>
                    <br />
                    Died:{" "}
                    {isSpouse ? familyNode.spouseDD : familyNode.deathDate}
                  </>
                )}
              </p>
              <p className="text-2xl">
                {age[0]}
                <br />
                {age[1]}
              </p>
            </div>
            <br />
            <p className="text-2xl font-bold bg-gradient-to-r from-palette3 via-palette4 to-palette5 bg-clip-text text-transparent">
              Contact
            </p>
            <a href="tel: +4733378901" className="underline">
              +4733378901
            </a>
            <br />
            <br />
            <p className="text-2xl font-bold bg-gradient-to-r from-palette3 via-palette4 to-palette5 bg-clip-text text-transparent">
              Address
            </p>
            {address && address.map && (
              <iframe
                src={address.map}
                className="border-0 w-full h-2/3"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            )}
            <button onClick={copyButtonTimer} className="btn flex items-center justify-around bg-offWhite w-full mt-3 rounded">
              {address ? address.name : "No Address"}
              <img src={copyButtonState} alt="copy" width={16} />
            </button>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
};

export default FamilyTreeModal;
