import { Address, FamilyNode } from "@/app/types/interfaces";
import moment from "moment";
import { familyData } from "../../data/data";
import { parentAddress } from "../../data/dataUtils";

interface FamilyTreeModalProps {
  familyNode: FamilyNode;
  isSpouse: boolean;
}

const FamilyTreeModal: React.FC<FamilyTreeModalProps> = ({
  familyNode,
  isSpouse,
}) => {
  const compAddress = (): Address | null => {
    if (familyNode.spouseAdd && isSpouse) return familyNode.spouseAdd; //if spouseadd and spouse true
    if (!familyNode.spouseAdd && isSpouse && familyNode.address)
      return familyNode.address; //if no sposeadd and spouse true and nodeadd
    if (familyNode.address && !isSpouse) return familyNode.address; //if address and not spouse
    if (!familyNode.address && isSpouse) return parentAddress(familyNode.id); //if no nodeadd and spouse true
    return parentAddress(familyNode.id); //if no address and not spouse
  };

  const address = compAddress();

  return (
    <div>
      <dialog id="my_modal" className="modal">
        <div className="modal-box bg-transparent shadow-none max-w-4xl max-h-full flex justify-between">
          {/* Left Card */}
          <div className="card bg-base-100 w-96 shadow-xl">
            <figure>
              <img
                src={!isSpouse ? familyNode.image : familyNode.spouseImage}
                alt="Shoes"
              />
            </figure>
            <div className="card-body max-h-40">
              <h2 className="card-title">
                {!isSpouse ? familyNode.name : familyNode.spouse}
              </h2>
              <p>{!isSpouse ? familyNode.id : familyNode.spouseId}</p>
            </div>
          </div>
          {/* Right Card */}
          <div className="bg-offWhite w-96 rounded-xl p-6 overflow-y-auto">
            <p className="text-2xl font-bold bg-gradient-to-r from-palette3 via-palette4 to-palette5 bg-clip-text text-transparent">
              Age
            </p>
            <p>
              Born {!isSpouse ? familyNode.birthDate : familyNode.spouseBD} (
              {moment(
                !isSpouse ? familyNode.birthDate : familyNode.spouseBD,
                "DD.MM.YYYY"
              ).fromNow(true)}
              )
            </p>
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
            <p className="pt-1">{address ? address.name : "No Address"}</p>
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
