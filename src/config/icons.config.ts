import { library } from "@fortawesome/fontawesome-svg-core";
import * as FasIcons from "@fortawesome/free-solid-svg-icons";
import * as FarIcons from "@fortawesome/free-regular-svg-icons";

const addIcons = () => {
  const selectedFasIcons: FasIcons.IconDefinition[] = [
    FasIcons.faUser,
    FasIcons.faTimes,
    FasIcons.faUtensilSpoon,
    FasIcons.faFileAlt,
    FasIcons.faClipboardCheck,
    FasIcons.faHeart,
    FasIcons.faAppleAlt,
    FasIcons.faEnvelope,
    FasIcons.faCapsules,
    FasIcons.faGlobeAmericas,
    FasIcons.faBook,
    FasIcons.faTags,
    FasIcons.faEye,
    FasIcons.faEdit,
    FasIcons.faExchangeAlt,
    FasIcons.faBan,
    FasIcons.faKey,
    FasIcons.faPaperPlane,
    FasIcons.faEllipsisH,
    FasIcons.faTrashAlt,
    FasIcons.faDownload,
    FasIcons.faSadTear,
    FasIcons.faPizzaSlice,
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
