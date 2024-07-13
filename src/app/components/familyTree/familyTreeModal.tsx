import { FamilyNode } from "@/app/types/interfaces";
import moment from "moment";

interface FamilyTreeModalProps {
  familyNode: FamilyNode;
}

const FamilyTreeModal: React.FC<FamilyTreeModalProps> = ({ familyNode }) => {
  return (
    <div>
      <dialog id="my_modal" className="modal">
        <div className="modal-box bg-transparent shadow-none max-w-4xl max-h-full flex justify-between">
          {/* Left Card */}
          <div className="card bg-base-100 w-96 shadow-xl">
            <figure>
              <img src={familyNode.image} alt="Shoes" />
            </figure>
            <div className="card-body max-h-40">
              <h2 className="card-title">{familyNode.name}</h2>
              <p>{familyNode.id}</p>
            </div>
          </div>
          {/* Right Card */}
          <div className="bg-offWhite w-96 rounded-xl p-6 overflow-y-auto">
            <p className="text-2xl font-bold bg-gradient-to-r from-palette3 via-palette4 to-palette5 bg-clip-text text-transparent">
              Age
            </p>
            <p>
              Born {familyNode.birthDate} (
              {moment(familyNode.birthDate, "DD.MM.YYYY").fromNow(true)})
            </p>
            <br />

            <p className="text-2xl font-bold bg-gradient-to-r from-palette3 via-palette4 to-palette5 bg-clip-text text-transparent">
              Address
            </p>
            {familyNode.address?.map && (
              <iframe
                src={familyNode.address.map}
                className="border-0 w-full h-2/3"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            )}
            {familyNode.address?.name ? (
              <p className="pt-1">{familyNode.address.name}</p>
            ) : (
              <p className="pt-1">No address</p>
            )}
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
