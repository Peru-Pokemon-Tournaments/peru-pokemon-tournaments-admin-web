import { library } from "@fortawesome/fontawesome-svg-core";
import * as FasIcons from "@fortawesome/free-solid-svg-icons";
import * as FarIcons from "@fortawesome/free-regular-svg-icons";

const addIcons = () => {
  const selectedFasIcons: FasIcons.IconDefinition[] = [
    FasIcons.faBalanceScale,
    FasIcons.faChessBishop,
    FasIcons.faClipboardCheck,
    FasIcons.faEdit,
    FasIcons.faEllipsisH,
    FasIcons.faExchangeAlt,
    FasIcons.faEye,
    FasIcons.faGamepad,
    FasIcons.faKey,
    FasIcons.faListOl,
    FasIcons.faMarker,
    FasIcons.faPoll,
    FasIcons.faShapes,
    FasIcons.faSignOutAlt,
    FasIcons.faTimes,
    FasIcons.faTrash,
    FasIcons.faTrashAlt,
    FasIcons.faUser,
  ];

  const selectedFarIcons: FarIcons.IconDefinition[] = [FarIcons.faHeart];

  for (const selectedFasIcon of selectedFasIcons) {
    library.add(selectedFasIcon);
  }

  for (const selectedFarIcon of selectedFarIcons) {
    library.add(selectedFarIcon);
  }
};

export { addIcons };
