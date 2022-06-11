import { library } from "@fortawesome/fontawesome-svg-core";
import * as FasIcons from "@fortawesome/free-solid-svg-icons";
import * as FarIcons from "@fortawesome/free-regular-svg-icons";

const addIcons = () => {
  const selectedFasIcons: FasIcons.IconDefinition[] = [
    FasIcons.faChessBishop,
    FasIcons.faGamepad,
    FasIcons.faListOl,
    FasIcons.faBalanceScale,
    FasIcons.faClipboardCheck,
    FasIcons.faShapes,
    FasIcons.faPoll,
    FasIcons.faKey,
    FasIcons.faUser,
    FasIcons.faEdit,
    FasIcons.faTrash,
    FasIcons.faEye,
    FasIcons.faExchangeAlt,
    FasIcons.faEllipsisH,
    FasIcons.faTrashAlt,
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
